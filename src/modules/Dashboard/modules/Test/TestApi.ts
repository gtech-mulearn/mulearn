import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";

export const getTestData = async (data: TestData | undefined) => {
    try {
        const response = await privateGateway.get(dashboardRoutes.getIgData, {
            params: data
        });
        const message = response?.data;
        return message;
    } catch (err: unknown) {
        const error = err as AxiosError;
        throw error;
    }
};
