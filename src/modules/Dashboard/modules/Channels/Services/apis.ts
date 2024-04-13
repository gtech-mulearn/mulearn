import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useFormik } from "formik";

type channelData = {
    id: string;
    name: string;
    discord_id: string;
    created_at: string;
    updated_at: string;
    created_by: string;
    updated_by: string;
};

type channelCreate = {
    id: string;
    name: string;
    discord_id: string;
};

type FormikType = ReturnType<typeof useFormik<channelCreate>>;

type hasValidationError = UseStateFunc<{
    error: boolean;
    message: string;
}>;

export const getChannels = async (
    setChannelsData: UseStateFunc<channelData[]>,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string,
    errorHandler?: Function,
    setLoading?: UseStateFunc<boolean>
) => {
    setLoading && setLoading(true);
    try {
        privateGateway
            .get(dashboardRoutes.getChannels, {
                params: {
                    perPage: selectedValue,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            })
            .then(
                (
                    response: APIResponse<{
                        data: any[];
                        pagination: { totalPages: number };
                    }>
                ) => {
                    const channelsData = response.data.response.data;
                    setChannelsData(channelsData);
                    if (setTotalPages)
                        setTotalPages(
                            response.data.response.pagination.totalPages
                        );
                }
            );
    } catch (err) {
        setLoading && setLoading(false);
        const error = err as AxiosError;
        console.log(error);
        if (error?.response) {
            if (errorHandler) errorHandler();
            else console.log(error.response);
        }
    }
};

export const createChannel = (
    channelData: channelCreate,
    formik: FormikType
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .post(dashboardRoutes.createChannel, channelData)
            .then(response => {
                resolve(true);
                toast.success("Channel Created");
            })
            .catch((error: APIError<{ general: string[] }>) => {
                reject(false);
                error?.response?.data?.message?.general?.length != 0 &&
                    toast.error(error.response.data.message.general[0]);
                if (
                    error.response.data.message &&
                    Object.keys(error.response.data.message).length > 0
                ) {
                    Object.entries(error.response.data.message).forEach(
                        ([fieldName, errorMessage]) => {
                            if (Array.isArray(errorMessage)) {
                                formik.setFieldError(
                                    fieldName,
                                    errorMessage?.join(", ") || ""
                                );
                            }
                        }
                    );
                }
            });
    });
};

export const editChannel = (
    id: string,
    channelEditedData: channelCreate,
    formik: FormikType
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .put(
                dashboardRoutes.editChannel.replace("${channelId}", id),
                channelEditedData
            )
            .then(response => {
                resolve(true);
                toast.success("Channel Edited");
            })
            .catch(error => {
                reject(false);
                if (
                    error.response.data.message &&
                    Object.keys(error.response.data.message).length > 0
                ) {
                    Object.entries(error.response.data.message).forEach(
                        ([fieldName, errorMessage]) => {
                            if (Array.isArray(errorMessage)) {
                                formik.setFieldError(
                                    fieldName,
                                    errorMessage?.join(", ") || ""
                                );
                            }
                        }
                    );
                }
                error.response.data.message.general.length != 0 &&
                    toast.error(error.response.data.message.general[0]);
            });
    });
};

export const deleteChannel = (id: string) => {
    privateGateway
        .delete(dashboardRoutes.deleteChannel.replace("${channelId}", id))
        .then(response => {
            //console.log(response.data.response);
            toast.error("Channel Deleted");
        })
        .catch(error => {
            console.log(error);
        });
};
