import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { Dispatch, SetStateAction } from "react";

import { modalStatesType } from "./InterestGroup";

export const getInterestGroups = async (
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        const response = await privateGateway.get(dashboardRoutes.getIgData, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        });
        const interestGroups: any = response?.data;

        setData(interestGroups.response.data);
        setTotalPages(interestGroups.response.pagination.totalPages);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const createInterestGroups = async (
    name: string,
    code: string,
    icon: string
) => {
    try {
        const response = await privateGateway.post(dashboardRoutes.getIgData, {
            name: name,
            code: code,
            icon: icon
        });
        if (response.data?.statusCode === 200) {
        }
        const message: any = response?.data;
        //console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const editInterestGroups = async (
    name: string|undefined,
    id: string | undefined,
    code: string | undefined,
    icon: string | undefined,
    setHasError: (hasError: boolean) => void,
) => {
    try {
        const response = await privateGateway.put(
            dashboardRoutes.getIgData + id + "/",
            {
                name: name,
                code: code,
                icon: icon
            }
        );
        const message: any = response?.data;
        toast({
            title: " Edited Successfully..",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
        //console.log(message);
        setHasError(message?.hasError)
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
        toast({
            title: error.message,
            description: "",
            status: "error",
            duration: 2000,
            isClosable: true
        });
    }
};

export const getIGDetails = async (
    id: string | undefined,
    setInput: Dispatch<React.SetStateAction<string | any>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getIgData + "get/" + id + "/"
        );
        const message: any = response?.data;
        setInput(message.response.interestGroup);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const deleteInterestGroups = async (
    id: string | undefined,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.getIgData + id + "/"
        );
        toast({
            title: "Interest Group deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        const message: any = response?.data;
        //console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
function toast(arg0: { title: string; description: string; status: string; duration: number; isClosable: boolean; }) {
    throw new Error("Function not implemented.");
}

