import axios from "axios";
import { publicGateway } from "@/MuLearnServices/apiGateways";
import { PublicRoutes } from "@/MuLearnServices/urls";

type ResponseType = (data: any) => void;
type UserDetail = (data: any) => void;

export const getLCDashboard = (setLcCounts: ResponseType) => {
    publicGateway
        .get(PublicRoutes.getLcDashboard)
        .then(response => {
            console.log(response.data);
            setLcCounts(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};

export const getLCReport = ({ setLcReport }: { setLcReport: UserDetail }) => {
    publicGateway
        .get(PublicRoutes.getLcReport)
        .then(response => {
            console.log(response.data);
            setLcReport(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};
