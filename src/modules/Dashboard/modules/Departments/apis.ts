import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

export const getDepartments = async ({
    setDepartments,
    page = 1,
    setIsLoading
}: {
    setDepartments: Dispatch<SetStateAction<any[]>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    page?: number;
}) => {
    setIsLoading(true);
    try {
        const response = await privateGateway.get(dashboardRoutes.departments, {
            params: {
                pageIndex: page
            }
        });
        const departments: any = response?.data;
        console.log("getDepartments - data", departments.response);
        setDepartments(departments.response);
    } catch (err: unknown) {
        console.log(err);
    }
    setIsLoading(false);
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
