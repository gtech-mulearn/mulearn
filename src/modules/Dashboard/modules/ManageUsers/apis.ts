import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { Dispatch, SetStateAction } from "react";
export const getManageUsers = async (
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getUsersData,
            {
                params: {
                    perPage: selectedValue,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            }
        );
        const manageusers: any = response?.data;

        setData(manageusers.response.data);
        setTotalPages(manageusers.response.pagination.totalPages);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const createManageUsers = async (
    firstName: string,
    last_name: string,
    email: string,
    mobile: string,
    dob: string,
    gender: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getUsersData,
            {
                first_name: firstName,
                last_name: last_name,
                email: email,
                mobile: mobile
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

export const editManageUsers = async (
    id: string | undefined,
    first_name: string,
    last_name: string,
    email: string,
    mobile: string,
    discord_id: string,
    mu_id: string,
    toast:any
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getUsersData + id + "/",
            {
                first_name: first_name,
                last_name: last_name,
                email: email,
                mobile: mobile,
                discord_id: discord_id,
                mu_id: mu_id
            }
        );
        console.log(first_name, last_name, email);
        const message: any = response?.data;
        console.log(message);
         toast({
             title: "User created",
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

interface IData {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    discord_id: string;
    mu_id: string;
  }

export const getManageUsersDetails = async (
    id: string | undefined,
    setData: Dispatch<SetStateAction<IData>>
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getUsersData + id + "/"
        );
        const message: any = response?.data;
        console.log(message);
        console.log(message.response.users);
        setData(message.response.users);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const deleteManageUsers = async (
    id: string | undefined,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.getUsersData + id + "/"
        );
        toast({
            title: "User deleted",
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
