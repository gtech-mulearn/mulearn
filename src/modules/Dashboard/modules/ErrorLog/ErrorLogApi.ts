import axios from "axios";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { Dispatch, SetStateAction } from "react";
import { displayData } from "./ErrorLogTypes";

export const getLog = async (
    logName: string,
    setErrorData: Dispatch<SetStateAction<string>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getErrorLog + logName
        );
        setErrorData(response.data);

        // Download the response data
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${logName}`);
        document.body.appendChild(link);
        link.click();
    } catch (err) {
        console.error("Error getting CSV:", err);
    }
};

export const clearLog = async (logName: string, toast: any) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.clearErrorLog + logName
        );
        toast.success(response.data.message.general[0]);
    } catch (err) {
        toast.success("Something went wrong!");
    }
};

export const getDisplay = async (
    setDisplayData: React.Dispatch<React.SetStateAction<displayData[]>>
) => {
    privateGateway
        .get(dashboardRoutes.getErrorLog, {})
        .then(response => {
            const formattedData: displayData[] = response.data.response.map(
                (data: any) => {
                    return {
                        id: data.id,
                        type: data.type,
                        message: data.message,
                        method: data.method,
                        path: data.path,
                        timestamp: data.timestamp[0],
                        muid: data.auth
                            .map((item: any) => {
                                return item.muid;
                            })
                            .join(", ")
                    };
                }
            );

            console.log(response.data.response);
            setDisplayData(formattedData);
        })
        .catch(error => {
            console.error(error);
        });
};

export const patchLog = async (id: string, toast: any) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.patchLogError + id
        );
        toast.success(response.data.response);
    } catch (err) {
        toast.success("Something went wrong!");
    }
};
