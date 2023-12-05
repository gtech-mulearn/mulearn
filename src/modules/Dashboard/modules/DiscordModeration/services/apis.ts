import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";

export const getTaskList = async (
    setTaskData: UseStateFunc<any>,
    setIsLoading: UseStateFunc<boolean>
) => {
    setIsLoading(true);
    try {
        const response = await privateGateway.get(dashboardRoutes.taskList);
        const taskList: any = response?.data.response;
        console.log(taskList)
        setTaskData(taskList)
        setIsLoading(false);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};