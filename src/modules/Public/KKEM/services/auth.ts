import { publicGateway } from "@/MuLearnServices/apiGateways";
import { KKEMRoutes } from "@/MuLearnServices/urls";

export const userAuth = async (
    mu_id: string,
    dwms_id: string,
    controller?: AbortController
) => {
    return await publicGateway
        .post(
            KKEMRoutes.userAuth,
            { emailOrMuid:mu_id, dwms_id,integration:"DWMS" },
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
