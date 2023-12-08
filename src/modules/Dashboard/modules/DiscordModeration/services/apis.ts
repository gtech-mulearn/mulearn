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
        setpeerTaskCount(taskData.peer_pending)
        setappraiserTaskCount(taskData.peer_pending)
        setCountLoading(false);
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

export const getLeaderBoard = async (
    setLeaderBoardData: UseStateFunc<any>,
    setIsLoading: UseStateFunc<boolean>,
    moderatorType:String | null
) => {
    setIsLoading(true);
    try {
        console.log("api called",moderatorType)
        const response = await privateGateway.get(dashboardRoutes.leaderboard,{
            params:{
                option:moderatorType
            },
        });
        const leaderboardList: any = response?.data.response;
        console.log(leaderboardList)
        setLeaderBoardData(leaderboardList)
        setIsLoading(false);
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.log(err)
    }
};