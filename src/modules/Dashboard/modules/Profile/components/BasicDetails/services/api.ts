import { ToastId, UseToastOptions } from "@chakra-ui/react";
import {
    privateGateway,
    publicGatewayAuth
} from "@/MuLearnServices/apiGateways";
import {
    authRoutes,
    dashboardRoutes,
    onboardingRoutes
} from "@/MuLearnServices/urls";

export const getIgDetails = (toast: ToastAsPara, setIg: UseStateFunc<any>) => {
    privateGateway
        .get(dashboardRoutes.getIgDetails)
        .then(response => {
            setIg(response.data.response);
        })
        .catch(error => {
            toast({
                title: error.response?.data?.message?.general[0],
                status: "error",
                duration: 3000,
                isClosable: true
            });
        });
};
export const editIgDetails = (toast: ToastAsPara, ig: any) => {
    privateGateway
        .patch(dashboardRoutes.getIgDetails, { interest_group: ig })
        .then(response => {
            // toast({
            //     title: response.data.message.general[0],
            //     status: "success",
            //     duration: 3000,
            //     isClosable: true
            // });
        })
        .catch(error => {
            toast({
                title: error.response?.data?.message?.general[0],
                status: "error",
                duration: 3000,
                isClosable: true
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
