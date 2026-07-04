export type MediaContentStatus = "upcoming" | "ongoing" | "completed";
export type Zone = "north" | "central" | "south";

export interface MediaContentPagination {
    count: number;
    totalPages: number;
    isNext: boolean;
    isPrev: boolean;
    nextPage: number | null;
}

export interface BaseRecord {
    id: string;
    date: string; // YYYY-MM-DD on read
    description?: string | null;
    link?: string | null;
    status: MediaContentStatus;
    created_at: string;
    updated_at: string;
}

export interface OfficeHoursRecord extends BaseRecord {
    title: string;
    performer?: string | null;
    designation?: string | null;
    interest_groups?: string[] | null;
    poster_thumbnail?: string | null;
}

export interface EpisodeRecord extends BaseRecord {
    topic: string;
    campus: string;
    zone?: Zone | null;
}

export type MediaContentRecord = OfficeHoursRecord & EpisodeRecord;

export interface MediaListParams {
    pageIndex?: number;
    perPage?: number;
    search?: string;
    sortBy?: string;
    status?: MediaContentStatus | "";
    zone?: Zone | "";
}

export interface MediaListResult {
    data: MediaContentRecord[];
    pagination: MediaContentPagination;
}

export type ContentTypeDiscriminator =
    | "office_hours"
    | "salt_mango_tree"
    | "inspiration_station";

export interface BulkImportFailedRow {
    row: number;
    title: string;
    reason: Record<string, string[]> | string;
}

export interface BulkImportResult {
    success_count: number;
    failed_count: number;
    failed_rows: BulkImportFailedRow[];
}

export class MediaContentError extends Error {
    fieldErrors: Record<string, string[]>;
    constructor(message: string, fieldErrors: Record<string, string[]> = {}) {
        super(message);
        this.name = "MediaContentError";
        this.fieldErrors = fieldErrors;
    }
}

export type ContentTypeKey =
    | "officeHours"
    | "saltMangoTree"
    | "inspirationStation";

export interface ColumnConfig {
    column: string;
    Label: string;
    isSortable: boolean;
}

export type FieldKind =
    | "text"
    | "textarea"
    | "date"
    | "url"
    | "zone"
    | "interestGroups";

export interface FieldConfig {
    name: string;
    label: string;
    kind: FieldKind;
    required?: boolean;
}

export interface ContentTypeConfig {
    key: ContentTypeKey;
    label: string; // tab label
    route: string;
    // API discriminator, used to build the bulk-export URL.
    contentType: ContentTypeDiscriminator;
    columns: ColumnConfig[];
    fields: FieldConfig[];
    hasZoneFilter: boolean;
    // Office Hours writes DD/MM/YYYY; episodes write YYYY-MM-DD.
    dateWriteFormat: "DD/MM/YYYY" | "YYYY-MM-DD";
}
