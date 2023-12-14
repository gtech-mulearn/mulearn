import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { roleUsers } from "./components/ManageUsers";

export const getManageRoles = async (
    setData?: UseStateFunc<any>,
    page?: number,
    selectedValue?: number,
    setIsLoading?: UseStateFunc<boolean>,
    setTotalPages?: UseStateFunc<any>,
    search?: string,
    sortID?: string
) => {
    if (setIsLoading) setIsLoading(true);
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
        if (setData && setIsLoading) {
            setData(interestGroups.response.data);
            if (setTotalPages)
                setTotalPages(interestGroups.response.pagination.totalPages);
            setIsLoading(false);
        } else {
            return interestGroups.response.data;
        }
    } catch (err: unknown) {
        if (setIsLoading) setIsLoading(false);
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
    toast: any
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
        toast({
            title: "Role edited",
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
    title: string;
    description: string;
}
export const getManageRolesDetails = async (
    id: string | undefined,
    setData?: UseStateFunc<IData>
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getRolesData + id + "/"
        );
        const message: any = response?.data;
        if (setData) setData(message.response.data);
        else return message.response.data;
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
            title: "Role deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        const message: any = response?.data;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//return true if rolename not used before and is available
export const isRoleUnique = (roleName: string, roles: string[]): boolean => {
    return roles.includes(roleName);
};

type ResultHandler = (msg: string) => void;
export const deleteUser = async (userId: string, roleId: string,
    error?: ResultHandler,
    success?: ResultHandler) => {
        try{
            const res = await privateGateway.patch(dashboardRoutes.roleBulkAssign + roleId + "/",{
                users:[userId]
            })
            if(success)success('User role removed')
        } catch (err) {
            if (err instanceof AxiosError) if (error) error(err.response?.data);
        }
};

export const addUsers = async (userIds: string[], roleId: string,
    error?: ResultHandler,
    success?: ResultHandler) => {
    try{
        console.log(userIds)
        const res = await privateGateway.post(dashboardRoutes.roleBulkAssign + roleId + "/",{
            users:userIds
        })
        if(success)success('User role added')
    } catch (err) {
        if (err instanceof AxiosError) if (error) error(err.response?.data);
    }
};

export const getUser = async (
    roleId: string,
    hasRole = true,
    error?: ResultHandler,
    success?: ResultHandler
) => {
    type userReqBody = {
        fullname: string;
        id: string;
        muid: string;
    };

    try {

        const res = hasRole?await privateGateway.get(
            dashboardRoutes.roleBulkAssign + roleId + "/"
        ):await privateGateway.put(
            dashboardRoutes.roleBulkAssign + roleId + "/"
        )

        const data: roleUsers[] = res.data.response
            .map((user: userReqBody) => ({
                label: user.fullname,
                value: user.id
            }));

        return data;
    } catch (err) {
        if (err instanceof AxiosError) if (error) error(err.response?.data);
    }
};
