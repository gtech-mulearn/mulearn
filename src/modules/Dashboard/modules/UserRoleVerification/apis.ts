import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { Dispatch, SetStateAction } from "react";
export const getUserRoleVerification = async (
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getUsersRoleVerificationData,
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
        console.log(dashboardRoutes.getUsersRoleVerificationData);
        // setData(manageusers.response.data);
        const datasuser = manageusers.response.data;
        console.log(datasuser);
        for (let i = 0; i < datasuser.length; i++) {
            if (datasuser[i].verified == false) {
                console.log(datasuser[i].verified);
                datasuser[i].verified = "Not Verified"
            } 
            else {
                console.log(datasuser[i].verified);
                datasuser[i].verified = "Verified";
            }
        }
        setData(datasuser);
        console.log(manageusers.response.data);
        setTotalPages(manageusers.response.pagination.totalPages);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const editUserRoleVerification = async (
    verified: boolean,
    id: string | number | boolean
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getUsersRoleVerificationData + id + "/",
            {
                verified: verified
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
interface IData {
    verified: boolean;
}
export const getUserRoleVerificationDetails = async (
    id: string | undefined,
    setData: Dispatch<SetStateAction<IData>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getUsersData + "get/" + id + "/"
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

export const deleteUserRoleVerification = async (
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
