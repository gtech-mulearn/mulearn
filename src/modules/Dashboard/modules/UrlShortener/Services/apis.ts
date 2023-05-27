import React from "react";
import { privateGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/react";

type shortUrlData = React.Dispatch<React.SetStateAction<any>>;
type campusData = React.Dispatch<React.SetStateAction<any>>;

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
            setShortUrlData(response.data.response);
            // setTotalPages(response.data.response.pagination.totalPages);
        })
        .catch(error => {
            console.log(error);
        });
};

export const createShortenUrl = (
    toast: (options?: UseToastOptions | undefined) => ToastId,
    urlData: any
) => {
    privateGateway
        .post(dashboardRoutes.createShortenUrl, urlData)
        .then(response => {
            console.log(response.data.response);
            toast({
                title: "Shorten Url Created",
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

export const editShortenUrl = (
    id: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    urlEditedData: any
) => {
    privateGateway
        .post(
            dashboardRoutes.editShortenUrl.replace("${urlId}", id),
            urlEditedData
        )
        .then(response => {
            console.log(response.data.response);
            toast({
                title: "Shorten Url Edited",
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

export const deleteShortenUrl = (
    id: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    privateGateway
        .delete(dashboardRoutes.deleteShortenUrl.replace("${urlId}", id))
        .then(response => {
            console.log(response.data.response);
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
