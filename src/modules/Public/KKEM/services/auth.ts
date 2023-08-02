import { publicGateway } from "@/MuLearnServices/apiGateways";
import { KKEMRoutes } from "@/MuLearnServices/urls";

export const userAuth = async (
    mu_id: string,
    jsid: string,
    controller?: AbortController
) => {
    return await publicGateway
        .post(
            KKEMRoutes.userAuth,
            { emailOrMuid:mu_id, jsid:jsid,integration:"DWMS" },
            {
                signal: controller?.signal
            }
        )
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};

export const userAuthConfirm = async (
    token: string,
    controller?: AbortController
) => {
    return await publicGateway
        .patch(`${KKEMRoutes.userAuth}${token}/`, null, {
            signal: controller?.signal
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response.data;
        });
};
