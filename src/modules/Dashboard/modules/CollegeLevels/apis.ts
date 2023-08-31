import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

export const getCollegeLevels = async (errHandler?: Function) => {
    try {
    } catch (err) {
        if (errHandler) errHandler(err);
        console.log(err);
    }
    const response = await privateGateway.get(dashboardRoutes.collegeLevels);
    console.log(response);
};

export const createCollegeLevels = async (data: any) => {
    console.log(data);
    return;
    await privateGateway.post(dashboardRoutes.collegeLevels, data);
};
