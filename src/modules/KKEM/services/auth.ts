import { publicGateway } from "../../../services/apiGateways";
import { KKEMRoutes } from "../../../services/urls";

export const userAuth = async (
    mu_id: string,
    dwms_id: string,
    controller?: AbortController
) => {
    return await publicGateway
        .post(
            KKEMRoutes.userAuth,
            { mu_id, dwms_id },
            { signal: controller?.signal }
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
