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
        setTaskData(taskList)
        setIsLoading(false);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const getTaskCount = async (
    setpeerTaskCount: UseStateFunc<any>,
    setappraiserTaskCount: UseStateFunc<any>,
    setCountLoading: UseStateFunc<boolean>
) => {
    setCountLoading(true);
    try {
        const response = await privateGateway.get(dashboardRoutes.taskListCount);
        const taskData: any = response?.data.response;
        console.log(taskData)
        setpeerTaskCount(taskData.peer_pending)
        setappraiserTaskCount(taskData.peer_pending)
        setCountLoading(false);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};