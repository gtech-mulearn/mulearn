import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

import { modalStatesType } from "./InterestGroup";

export const getInterestGroups = async (
    setData: UseStateFunc<any>,
    page: number,
    selectedValue: number,
    setIsLoading: UseStateFunc<boolean>,
    setTotalPages?: UseStateFunc<any>,
    search?: string,
    sortID?: string
) => {
    setIsLoading(true);
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
        if (setTotalPages)
            setTotalPages(interestGroups.response.pagination.totalPages);
        setIsLoading(false);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const createInterestGroups = async (
    name: string,
    code: string,
    icon: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
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
        toast({
            title: "Created  Successfully..",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            toast({
                title: "Some Error Occured..",
                description: "",
                status: "error",
                duration: 2000,
                isClosable: true
            });
        }
        toast({
            title: " Create Failed",
            description: "",
            status: "error",
            duration: 3000,
            isClosable: true
        });
    }
};

export const editInterestGroups = async (
    name: string | undefined,
    id: string | undefined,
    code: string | undefined,
    icon: string | undefined,
    setHasError: (hasError: boolean) => void,
    toast: (options?: UseToastOptions | undefined) => ToastId
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
        setHasError(message?.hasError);
        toast({
            title: " Edited Successfully..",
            description: "",
            status: "success",
            duration: 2000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        toast({
            title: "Some Error Occured..",
            description: "",
            status: "error",
            duration: 2000,
            isClosable: true
        });
    }
};

export const getIGDetails = async (
    id: string | undefined,
    setInput: UseStateFunc<string | any>
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
            throw error;
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
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
        toast({
            title: "Delete Failed",
            status: "error",
            duration: 3000,
            isClosable: true
        });
    }
};
