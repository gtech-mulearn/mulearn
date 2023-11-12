import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

type channelData = UseStateFunc<any>;
type hasValidationError = UseStateFunc<{
    error: boolean;
    message: string;
}>;

export const getChannels = (
    setChannelsData: channelData,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string,
    setLoading?: UseStateFunc<boolean>
) => {
    setLoading && setLoading(true);
    privateGateway
        .get(dashboardRoutes.getChannels, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        })
        .then((
                response: APIResponse<{
                    data: any[];
                    pagination: { totalPages: number };
                }>
            ) => {
                const channelsData = response.data.response.data;
                setChannelsData(channelsData);
                if (setTotalPages)
                    setTotalPages(response.data.response.pagination.totalPages);
            }
        )
        .catch(error => {
            console.log(error);
        })
        .finally(() => {
            setLoading && setLoading(false);
        });
};

export const createChannel= (
    toast: ToastAsPara,
    channelData: any,
    formik: any
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .post(dashboardRoutes.createChannel, channelData)
            .then(response => {
                resolve(true);
                toast({
                    title: "Channel Created",
                    description: "its added to your list",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
            })
            .catch((error: APIError<{ general: string[] }>) => {
                reject(false);
                error?.response?.data?.message?.general?.length != 0 &&
                    toast({
                        title: error.response.data.message.general[0],
                        description: "",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
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
    toast: ToastAsPara,
    channelEditedData: any,
    formik: any
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .put(
                dashboardRoutes.editChannel.replace("${channelId}", id),
                channelEditedData
            )
            .then(response => {
                resolve(true);
                toast({
                    title: "Channel Edited",
                    description: "its added to your list",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
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
                    toast({
                        title: error.response.data.message.general[0],
                        description: "",
                        status: "error",
                        duration: 3000,
                        isClosable: true
                    });
            });
    });
};

export const deleteChannel = (id: string, toast: ToastAsPara) => {
    privateGateway
        .delete(dashboardRoutes.deleteChannel.replace("${channelId}", id))
        .then(response => {
            //console.log(response.data.response);
            toast({
                title: "Channel Deleted",
                description: "it's deleted from your list",
                status: "error",
                duration: 3000,
                isClosable: true
            });
        })
        .catch(error => {
            console.log(error);
        });
};
