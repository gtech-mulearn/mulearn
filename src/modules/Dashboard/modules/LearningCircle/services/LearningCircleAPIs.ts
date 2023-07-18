import { AxiosError } from "axios";
import { privateGateway } from "../../../../../services/apiGateways"
import { dashboardRoutes } from "../../../../../services/urls";

export const getUserLearningCircles = async (
    setUserCircleList: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getUserLearningCircles
        );
        const message: any = response?.data;
        console.log(message);
        setUserCircleList(message.response.interestGroup.name);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
