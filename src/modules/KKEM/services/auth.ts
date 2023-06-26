import { publicGateway } from "../../../services/apiGateways";
import { KKEMRoutes } from "../../../services/urls";

export const userAuth = async (mu_id: string, dwms_id: string) => {
    return await publicGateway
        .post(KKEMRoutes.userAuth, { mu_id, dwms_id })
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error.response.data;
        });
};
