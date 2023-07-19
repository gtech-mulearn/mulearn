import { publicGateway } from "../../../services/apiGateways";
import { KKEMRoutes } from "../../../services/urls";

const tempToken = "1c332a95-8411-40c1-ab64-18b56bd91988";

export const userAuth = async (
    mu_id: string,
    dwms_id: string,
    controller?: AbortController
) => {
    return await publicGateway
        .post(
            KKEMRoutes.userAuth,
            { mu_id, dwms_id,integration:"KKEM" },
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
        .post(`${KKEMRoutes.userAuth}${token}/`, null, {
            signal: controller?.signal
        })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            throw error.response.data;
        });
};
