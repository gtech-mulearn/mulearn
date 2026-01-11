import { privateGateway } from "../../../../../services/apiGateways";
import { qseverseRoutes } from "../../../../../services/urls";
import * as React from "react";

export const getAchievements = async (
    setData: React.Dispatch<React.SetStateAction<any[]>>
) => {
    try {
        const response = await privateGateway.get(qseverseRoutes.getAchievements);
        setData(response.data.response);
    } catch (err) {
        console.log(err);
    }
};

export const getAchievementLogs = async (
    setData: React.Dispatch<React.SetStateAction<any[]>>,
    page: number,
    limit: number,
    setTotalPages?: React.Dispatch<React.SetStateAction<number>>,
    search?: string
) => {
    try {
        const response = await privateGateway.get(
            qseverseRoutes.issuedLog,
            {
                params: {
                    search: search,
                    pageIndex: page,
                    perPage: limit,
                }
            }
        );
        setData(response.data.response.data);
        if (setTotalPages) setTotalPages(response.data.response.pagination.totalPages);
    } catch (err) {
        console.log(err);
    }
};

export const downloadBulkTemplate = async () => {
    try {
        const response = await privateGateway.get(
            qseverseRoutes.bulkIssueTemplate,
            {
                responseType: 'blob',
            }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'achievement_bulk_import_template.xlsx');
        document.body.appendChild(link);
        link.click();
    } catch (err) {
        console.log(err);
    }
};

export const bulkIssueAchievements = async (
    data: FormData,
    toast: any,
    onSuccess: () => void
) => {
    try {
        // Set Content-Type to undefined to remove the default JSON header
        // This allows axios to auto-set the correct multipart/form-data header with boundary
        const response = await privateGateway.post(
            qseverseRoutes.bulkIssue,
            data,
            {
                headers: {
                    "Content-Type": undefined,
                },
            }
        );
        toast.success(response.data.message.general_message);
        onSuccess();
    } catch (err: any) {
        console.log(err);
        const errorMessage = err.response?.data?.message?.general_message || "Something went wrong";
        toast.error(errorMessage);
        if (err.response?.data?.message?.response?.failed_muids) {
             // Optionally display failed MUIDs
             console.error("Failed MUIDs:", err.response.data.message.response.failed_muids);
        }
    }
};
