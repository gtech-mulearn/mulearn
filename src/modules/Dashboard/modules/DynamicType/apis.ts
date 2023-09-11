import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

export const getRoles = async (errHandler: Function) => {
    try {
        const response = (await privateGateway.get(dashboardRoutes.dtGetRoles))
            .data.response;
        return response.map((data: any) => ({
            label: data.title,
            value: data.title
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

export const getUsers = async (errHandler: Function) => {
    try {
        return [];
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
                    id: JSON.stringify({ type: i.type, role: j }),
                    type: i.type,
                    role: j
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
                    id: JSON.stringify({ type: i.type, user: j }),
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

export const createRoleType = async (
    errHandler: Function,
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
    } catch (err) {
        errHandler((err as any).response.data.message.non_field_errors[0]);
    }
};

export const deleteRoleType = async (errHandler: Function, data: any) => {
    try {
        console.log(JSON.parse(data), "deleted");
    } catch (err) {
        errHandler(err);
    }
};

export const createUserType = async (
    errHandler: Function,
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
    } catch (err) {
        errHandler((err as any).response.data.message.non_field_errors[0]);
    }
};

export const deleteUserType = async (errHandler: Function, data: any) => {
    try {
        console.log(JSON.parse(data), "deleted");
    } catch (err) {
        errHandler(err);
    }
};
