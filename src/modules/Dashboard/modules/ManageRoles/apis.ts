import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { SetStateAction } from "react";

export const getManageRoles = async (
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getRolesData,
            {
                params: {
                    perPage: selectedValue,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            }
        );
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

export const createManageRoles = async (title: string, description: string) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getRolesData,
            {
                title: title,
                description: description
            }
        );

        const message: any = response?.data;
        console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const editManageRoles = async (
    id: string | undefined,
    title: string,
    description: string,
    toast:any
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getRolesData + id + "/",
            {
                title: title,
                description: description
            }
        );
        const message: any = response?.data;
        console.log(message);
        toast({
            title: "Rolescreated",
            status: "success",
            duration: 3000,
            isClosable: true
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getManageRolesDetails = async (
    id: string | undefined,
    setData: React.Dispatch<SetStateAction<any[]>>
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getRolesData + id + "/"
        );
        const message: any = response?.data;
        console.log(message);
        console.log(message.response.data);
        setData(message.response.data);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const deleteManageRoles = async (
    id: string | undefined,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.getRolesData + id + "/"
        );
        toast({
            title: "Roles deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        const message: any = response?.data;
        console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
