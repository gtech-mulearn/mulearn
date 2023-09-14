import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export const getDepartments = async ({
    setDepartments,
    page = 1,
    setIsLoading,
    search,
    perPage = 10,
    setTotalPages,
    sortBy
}: {
    setDepartments: Dispatch<SetStateAction<any[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    page?: number;
    search?: string;
    perPage?: number;
    setTotalPages?: Dispatch<SetStateAction<number>>;
    sortBy?: string;
}) => {
    console.log("getDepartments - page", page);

    setIsLoading(true);
    try {
        const response = await privateGateway.get(dashboardRoutes.departments, {
            params: {
                pageIndex: page,
                search: search,
                perPage: perPage,
                sortBy: sortBy
            }
        });
        const departments: any = response?.data.response.data;
        const pagination: any = response?.data.response.pagination;
        console.log("getDepartments - data", departments.response);
        setDepartments(departments);
        setTotalPages && setTotalPages(pagination.totalPages);
    } catch (err: unknown) {
        console.log(err);
    }
    setIsLoading(false);
};

export const getDepartmentData = async (
    id: string,
    setdept: Dispatch<SetStateAction<string>>,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.get(
            `${dashboardRoutes.departments}${id}/`
        );
        const department: any = response?.data;
        console.log("getDepartmentData - data", department.response);
    } catch (err: unknown) {
        console.log(err);
        toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            isClosable: true
        });
    }
};

export const createDepartment = async (
    title: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.departments,
            { title: title }
        );
        const message: String = response?.data.message.general[0];
        console.log("createDepartment - data", message);
        toast({
            title: message,
            status: "success",
            isClosable: true
        });
    } catch (err: unknown) {
        console.log(err);

        toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            isClosable: true
        });
    }
};

export const updateDepartment = async (
    id: string,
    title: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    console.log("updateDepartment - id", id);
    try {
        const response = await privateGateway.put(
            `${dashboardRoutes.departments}edit/${id}/`,
            { title: title }
        );
        const message: String = response?.data.message.general[0];
        toast({
            title: message,
            status: "success",
            isClosable: true
        });
    } catch (err: unknown) {
        console.log(err);
        toast({
            title: "Error",
            description: "Something went wrong",
            status: "error",
            isClosable: true
        });
    }
};

export const deleteDepartment = async (id: string) => {
    try {
        const response = await privateGateway.delete(
            `${dashboardRoutes.departments}delete/${id}/`
        );
        const departments: any = response?.data;
        console.log("deleteDepartment - data", departments.response);
    } catch (err: unknown) {
        console.log(err);
    }
};
