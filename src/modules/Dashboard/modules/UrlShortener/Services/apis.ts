import React, { Dispatch, SetStateAction } from "react";
import { privateGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/react";

type shortUrlData = React.Dispatch<React.SetStateAction<any>>;
type campusData = React.Dispatch<React.SetStateAction<any>>;
type hasValidationError = Dispatch<
    SetStateAction<{
        error: boolean;
        message: string;
    }>
>;

export const getShortenUrls = (
    setShortUrlData: shortUrlData,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
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
        .then(response => {
            setShortUrlData(response.data.response.data);
            // setTotalPages(response.data.response.pagination.totalPages);
        })
        .catch(error => {
            console.log(error);
        });
};

export const createShortenUrl = (
    toast: (options?: UseToastOptions | undefined) => ToastId,
    urlData: any,
    formik: any,
    setHasValidationError: hasValidationError
) => {
    privateGateway
        .post(dashboardRoutes.createShortenUrl, urlData)
        .then(response => {
            //console.log(response.data.response);
            toast({
                title: "Shorten Url Created",
                description: "its added to your list",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        })
        .catch(error => {
            if (error?.response?.data?.message?.general[0]) {
                toast({
                    title: error.response.data.message.general[0],
                    description: "",
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            }

            if (error.response.data.message.general.length > 0) {
                setHasValidationError({
                    error: true,
                    message: error.response.data.message.general[0]
                });
            }
            if (
                error.response.data.message &&
                Object.keys(error.response.data.message).length > 0
            ) {
                Object.entries(error.response.data.message).forEach(
                    ([fieldName, errorMessage]) => {
                        if (Array.isArray(errorMessage)) {
                            console.log(errorMessage);

                            formik.setFieldError(
                                fieldName,
                                errorMessage?.join(", ") || ""
                            );
                        }
                    }
                );
            }
            setTimeout(() => {
                setHasValidationError({
                    error: false,
                    message: ""
                });
            }, 3000);
        });
};

export const editShortenUrl = (
    id: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    urlEditedData: any,
    formik: any,
    setHasValidationError: hasValidationError
) => {
    privateGateway
        .put(
            dashboardRoutes.editShortenUrl.replace("${urlId}", id),
            urlEditedData
        )
        .then(response => {
            //console.log(response.data.response);
            toast({
                title: "Shorten Url Edited",
                description: "its added to your list",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        })
        .catch(error => {
            // console.log(error.response.data.message.general[0]);
            toast({
                title: error.response.data.message.general[0],
                description: "",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            if (error.response.data.message.general.length > 0) {
                setHasValidationError({
                    error: true,
                    message: error.response.data.message.general[0]
                });
            }
            // if (
            //     error.response.data.message.general &&
            //     Object.keys(error.response.data.message.general).length > 0
            // ) {
            //     Object.entries(error.response.data.message.general).forEach(
            //         ([fieldName, errorMessage]) => {
            //             if (Array.isArray(errorMessage)) {
            //                 formik.setFieldError(
            //                     fieldName,
            //                     errorMessage?.join(", ") || ""
            //                 );
            //             }
            //         }
            //     );
            // }
            // setTimeout(() => {
            //     setHasValidationError({
            //         error: false,
            //         message: ""
            //     });
            // }, 3000);
        });
};

export const deleteShortenUrl = (
    id: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    privateGateway
        .delete(dashboardRoutes.deleteShortenUrl.replace("${urlId}", id))
        .then(response => {
            //console.log(response.data.response);
            toast({
                title: "Shorten Url deleted",
                description: "its added to your list",
                status: "success",
                duration: 3000,
                isClosable: true
            });
        })
        .catch(error => {
            console.log(error);
        });
};
