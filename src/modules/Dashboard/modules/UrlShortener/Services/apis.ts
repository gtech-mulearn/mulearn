import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

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
    sortID?: string,
    setLoading?: UseStateFunc<boolean>
) => {
    setLoading && setLoading(true);
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
        })
        .finally(() => {
            setLoading && setLoading(false);
        });
};

export const createShortenUrl = (
    urlData: any,
    formik: any
    // setHasValidationError: hasValidationError
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .post(dashboardRoutes.createShortenUrl, urlData)
            .then(response => {
                resolve(true);

                toast.success("Shorten Url Created");
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

export const editShortenUrl = (
    id: string,
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

                toast.success("Shorten Url Edited");
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

export const deleteShortenUrl = (id: string) => {
    privateGateway
        .delete(dashboardRoutes.deleteShortenUrl.replace("${urlId}", id))
        .then(response => {
            //console.log(response.data.response);

            toast.error("Shorten Url Deleted");
        })
        .catch(error => {
            console.log(error);
        });
};

export const getAnalytics = (
    // setResponseData: shortUrlData,
    id: string
): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .get(dashboardRoutes.getAnalytics.replace("${urlId}", id))
            .then(response => {
                resolve(response.data.response);
                // console.log(response.data.response);

                // setResponseData(response.data.response);
            })
            .catch(error => {
                reject(false);
                console.log(error);
            });
    });
};
