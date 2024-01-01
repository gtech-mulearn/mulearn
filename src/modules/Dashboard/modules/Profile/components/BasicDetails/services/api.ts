import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import {
    authRoutes,
    dashboardRoutes,
    onboardingRoutes
} from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

export const getIgDetails = (setIg: UseStateFunc<any>) => {
    privateGateway
        .get(dashboardRoutes.getIgDetails)
        .then(response => {
            setIg(response.data.response);
        })
        .catch(error => {
            toast.error(error.response?.data?.message?.general[0]);
        });
};

export const editIgDetails = (ig: any): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        privateGateway
            .patch(dashboardRoutes.getIgDetails, { interest_group: ig })
            .then(response => {
                resolve(true);
            })
            .catch(error => {
                toast.error(error.response?.data?.message?.general[0]);
            });
    });
};

export const getAllIg = (setAllIg: UseStateFunc<any>) => {
    privateGateway
        .get(onboardingRoutes.areaOfInterestList)
        .then((response: APIResponse<{ aois: [] }>) => {
            setAllIg(response.data.response.aois);
        })
        .catch(error => {
            console.log(error);
        });
};
