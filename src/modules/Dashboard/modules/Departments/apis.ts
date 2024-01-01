import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { Dispatch, SetStateAction } from "react";
import toast from "react-hot-toast";

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

export const createDepartment = async (title: string) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.createDepartment,
            { title: title }
        );
        const message = response?.data.message.general[0];
        console.log("createDepartment - data", message);
        toast.success(message);
    } catch (err: unknown) {
        console.log(err);
        toast.error("Something went wrong");
    }
};

export const updateDepartment = async (id: string, title: string) => {
    console.log("updateDepartment - id", id);
    try {
        const response = await privateGateway.put(
            `${dashboardRoutes.editDepartment}${id}/`,
            { title: title }
        );
        const message = response?.data.message.general[0];

        toast.success(message);
    } catch (err: unknown) {
        console.log(err);

        toast.error("Something went wrong");
    }
};

export const deleteDepartment = async (id: string) => {
    try {
        const response = await privateGateway.delete(
            `${dashboardRoutes.deleteDepartment}${id}/`
        );
        const departments: any = response?.data;
        console.log("deleteDepartment - data", departments.response);
    } catch (err: unknown) {
        console.log(err);
    }
};
