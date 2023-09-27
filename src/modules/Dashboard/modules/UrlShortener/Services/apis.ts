import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

type shortUrlData = UseStateFunc<any>;
type campusData = UseStateFunc<any>;
type hasValidationError = UseStateFunc<{
    error: boolean;
    message: string;
}>;

export const getShortenUrls = (
    setShortUrlData: shortUrlData,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string
) => {
    privateGateway
        .get(dashboardRoutes.getShortenUrl, {
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
                const updatedShortUrlData = response.data.response.data.map(
                    (item: any) => ({
                        ...item,
                        short_url: `${import.meta.env.VITE_BACKEND_URL}/r/${
                            item.short_url
                        }`
                    })
                );
                setShortUrlData(updatedShortUrlData);
                if (setTotalPages)
                    setTotalPages(response.data.response.pagination.totalPages);
            }
        )
        .catch(error => {
            console.log(error);
        });
};

export const createShortenUrl = (
    toast: ToastAsPara,
    urlData: any,
    formik: any
    // setHasValidationError: hasValidationError
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .post(dashboardRoutes.createShortenUrl, urlData)
            .then(response => {
                resolve(true);
                toast({
                    title: "Shorten Url Created",
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

export const editShortenUrl = (
    id: string,
    toast: ToastAsPara,
    urlEditedData: any,
    formik: any
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .put(
                dashboardRoutes.editShortenUrl.replace("${urlId}", id),
                urlEditedData
            )
            .then(response => {
                resolve(true);
                toast({
                    title: "Shorten Url Edited",
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

export const deleteShortenUrl = (id: string, toast: ToastAsPara) => {
    privateGateway
        .delete(dashboardRoutes.deleteShortenUrl.replace("${urlId}", id))
        .then(response => {
            //console.log(response.data.response);
            toast({
                title: "Shorten Url Deleted",
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
