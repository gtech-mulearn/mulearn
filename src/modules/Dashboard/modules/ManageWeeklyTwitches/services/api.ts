import { privateGateway } from "@/MuLearnServices/apiGateways";
import { mediaContentRoutes } from "@/MuLearnServices/urls";
import {
    BulkImportResult,
    MediaContentError,
    MediaContentRecord,
    MediaListParams,
    MediaListResult
} from "./types";

// Normalises the API envelope. Throws MediaContentError when hasError is true,
// extracting message.general and any field-level error arrays.
function unwrap(data: any) {
    if (data?.hasError) {
        const messageObj = data.message ?? {};
        const general: string[] = messageObj.general ?? [];
        const fieldErrors: Record<string, string[]> = {};
        Object.keys(messageObj).forEach(key => {
            if (key !== "general") fieldErrors[key] = messageObj[key];
        });
        throw new MediaContentError(
            general[0] || "Something went wrong.",
            fieldErrors
        );
    }
    return data.response;
}

// Axios throws on 400; the API still puts useful field errors in the body.
function toError(error: any): MediaContentError {
    const body = error?.response?.data;
    if (body?.message) {
        const messageObj = body.message;
        const general: string[] = messageObj.general ?? [];
        const fieldErrors: Record<string, string[]> = {};
        Object.keys(messageObj).forEach(key => {
            if (key !== "general") fieldErrors[key] = messageObj[key];
        });
        return new MediaContentError(
            general[0] || "Request failed.",
            fieldErrors
        );
    }
    return new MediaContentError(error?.message || "Network error.");
}

export async function listMediaContent(
    route: string,
    params: MediaListParams
): Promise<MediaListResult> {
    try {
        // Drop empty-string params so they aren't sent as filters.
        const cleaned: Record<string, any> = {};
        Object.entries(params).forEach(([k, v]) => {
            if (v !== "" && v !== undefined && v !== null) cleaned[k] = v;
        });
        const res = await privateGateway.get(route, { params: cleaned });
        return unwrap(res.data) as MediaListResult;
    } catch (error: any) {
        if (error instanceof MediaContentError) throw error;
        throw toError(error);
    }
}

export async function createMediaContent(
    route: string,
    body: Record<string, any>
): Promise<MediaContentRecord> {
    try {
        const res = await privateGateway.post(route, body);
        return unwrap(res.data) as MediaContentRecord;
    } catch (error: any) {
        if (error instanceof MediaContentError) throw error;
        throw toError(error);
    }
}

export async function updateMediaContent(
    route: string,
    id: string,
    body: Record<string, any>
): Promise<MediaContentRecord> {
    try {
        const res = await privateGateway.patch(`${route}${id}/`, body);
        return unwrap(res.data) as MediaContentRecord;
    } catch (error: any) {
        if (error instanceof MediaContentError) throw error;
        throw toError(error);
    }
}

export async function deleteMediaContent(
    route: string,
    id: string
): Promise<void> {
    try {
        const res = await privateGateway.delete(`${route}${id}/`);
        unwrap(res.data);
    } catch (error: any) {
        if (error instanceof MediaContentError) throw error;
        throw toError(error);
    }
}

// Bulk import a CSV of media content. Returns per-row success/failure counts;
// note the API returns HTTP 200 with failed_rows even on partial failure.
export async function importMediaContent(
    file: File
): Promise<BulkImportResult> {
    try {
        const form = new FormData();
        form.append("file", file);
        // Content-Type: undefined lets axios set the multipart boundary itself
        // (repo idiom — see IssueAchievements/services/api.ts bulkIssueAchievements).
        const res = await privateGateway.post(
            mediaContentRoutes.bulkImport,
            form,
            { headers: { "Content-Type": undefined } }
        );
        return unwrap(res.data) as BulkImportResult;
    } catch (error: any) {
        if (error instanceof MediaContentError) throw error;
        throw toError(error);
    }
}

// Bulk export all active records of a content type as a downloaded CSV file.
export async function exportMediaContent(contentType: string): Promise<void> {
    const res = await privateGateway.get(
        `${mediaContentRoutes.bulkExport}${contentType}/`,
        { responseType: "blob" }
    );
    const blob = new Blob([res.data], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${contentType}_export.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
}
