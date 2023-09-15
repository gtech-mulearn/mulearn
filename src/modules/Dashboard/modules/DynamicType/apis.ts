import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

export const getRoles = async (errHandler: Function) => {
    try {
        const response = (await privateGateway.get(dashboardRoutes.dtGetRoles))
            .data.response;
        return response.map((data: any) => ({
            label: data.title,
            value: data.id
        }));
    } catch (err) {
        errHandler(err);
        return [];
    }
};

export const getTypes = async (errHandler: Function) => {
    try {
        const response = (await privateGateway.get(dashboardRoutes.dtGetTypes))
            .data.response;
        return response.map((data: any) => ({ label: data, value: data }));
    } catch (err) {
        errHandler(err);
        return [];
    }
};

// try{

// }catch(err){
//     errHandler(err)
// }

export const getDynamicRoles = async (
    errHandler: Function,
    setData: UseStateFunc<any>,
    page?: number,
    perPage?: number,
    setIsLoading?: UseStateFunc<boolean>,
    setTotalPages?: UseStateFunc<any>,
    search?: string,
    sortID?: string
) => {
    try {
        if (setIsLoading) setIsLoading(true);
        const response = (
            await privateGateway.get(dashboardRoutes.getDynamicRoles, {
                params: {
                    perPage: perPage,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            })
        ).data.response;
        const data = [];
        for (let i of response.data) {
            for (let j of i.roles) {
                //storing the data json as id for fetching while deleting
                data.push({
                    id: j.id,
                    type: i.type,
                    role: j.role
                });
            }
        }
        setData(data);
        if (setTotalPages) setTotalPages(response.pagination.totalPages);
        if (setIsLoading) setIsLoading(false);
    } catch (err) {
        errHandler(err);
    }
};

export const createRoleType = async (
    errHandler: Function,
    succHandler: Function,
    type: string,
    role: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getDynamicRoles + "create/",
            {
                type: type,
                role: role
            }
        );
        succHandler("Role added");
    } catch (err) {
        errHandler((err as any).response.data.message.non_field_errors[0]);
    }
};

export const deleteRoleType = async (
    errHandler: Function,
    succHandler: Function,
    id: any
) => {
    try {
        await privateGateway.delete(
            dashboardRoutes.getDynamicRoles + "delete/" + id
        );
        succHandler("Role removed");
    } catch (err) {
        errHandler(err);
    }
};

export const updateRoleType = async (
    errHandler: Function,
    succHandler: Function,
    id: any,
    role: string
) => {
    try {
        await privateGateway.patch(
            dashboardRoutes.getDynamicRoles + "update/" + id + "/",
            { new_role: role }
        );
        succHandler("Role updated");
    } catch (err) {
        errHandler(err);
    }
};

export const getDynamicUsers = async (
    errHandler: Function,
    setData: UseStateFunc<any>,
    page?: number,
    perPage?: number,
    setIsLoading?: UseStateFunc<boolean>,
    setTotalPages?: UseStateFunc<any>,
    search?: string,
    sortID?: string
) => {
    try {
        if (setIsLoading) setIsLoading(true);
        const response = (
            await privateGateway.get(dashboardRoutes.getDynamicUser, {
                params: {
                    perPage: perPage,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            })
        ).data.response;
        const data = [];
        for (let i of response.data) {
            for (let j of i.roles) {
                //storing the data json as id for fetching while deleting
                data.push({
                    id: j.id,
                    type: i.type,
                    user: j
                });
            }
        }
        setData(data);
        if (setTotalPages) setTotalPages(response.pagination.totalPages);
        if (setIsLoading) setIsLoading(false);
    } catch (err) {
        errHandler(err);
    }
};

export const createUserType = async (
    errHandler: Function,
    succHandler: Function,
    type: string,
    user: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getDynamicUser + "create/",
            {
                type: type,
                user: user
            }
        );
        succHandler("User added");
    } catch (err) {
        errHandler((err as any).response.data.message.non_field_errors[0]);
    }
};

export const deleteUserType = async (
    errHandler: Function,
    succHandler: Function,
    id: any
) => {
    try {
        console.log(id);
        succHandler("User removed");
    } catch (err) {
        errHandler(err);
    }
};
