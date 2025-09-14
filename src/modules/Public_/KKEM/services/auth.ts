import { publicGateway } from "@/MuLearnServices/apiGateways";
import { KKEMRoutes } from "@/MuLearnServices/urls";

export const userAuth = async (
    muid: string,
    param: string,
    controller?: AbortController
) => {
    return await publicGateway
        .post(
            KKEMRoutes.userAuth,
            {
                emailOrMuid: muid,
                param: param,
                integration: "DWMS"
            },
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
