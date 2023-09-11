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

// try{

// }catch(err){
//     errHandler(err)
// }

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
