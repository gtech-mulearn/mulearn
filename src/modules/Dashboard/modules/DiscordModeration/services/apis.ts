import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";

export const getTaskList = async (
    setTaskData: UseStateFunc<any>,
    pageTD: number,
    selectedValue: number,
    setTotalPagesTD?: UseStateFunc<number>,
    sortID?: string,
    setIsLoading?: UseStateFunc<boolean>,
) => {
    console.log(sortID);
    
    setIsLoading && setIsLoading(true);
    privateGateway
    .get(dashboardRoutes.taskList, {
        params: {
            perPage: selectedValue,
            pageIndex: pageTD,
            sortBy: sortID
        }
    })
    .then(
        (
            response: APIResponse<{
                data: any[];
                pagination: { totalPages: number };
            }>
        ) => {
            console.log(response.data);
            
            const updatedTaskData= response.data.response.data
            setTaskData(updatedTaskData);
            if (setTotalPagesTD)
                setTotalPagesTD(response.data.response.pagination.totalPages);
        }
    )
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        setIsLoading && setIsLoading(false);
    });
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
    pageLD: number,
    selectedValue: number,
    moderatorType:String | null,
    setTotalPagesLD?: UseStateFunc<number>,
    sortID?: string,
    setIsLoading?: UseStateFunc<boolean>,
) => {
    setIsLoading && setIsLoading(true);
    privateGateway
    .get(dashboardRoutes.leaderboard, {
        params: {
            perPage: selectedValue,
            pageIndex: pageLD,
            sortBy: sortID,
            option:moderatorType
        }
    })
    .then(
        (
            response: APIResponse<{
                data: any[];
                pagination: { totalPages: number };
            }>
        ) => {
            const updatedLeaderBoardData= response.data.response.data           
            setLeaderBoardData(updatedLeaderBoardData);
            if (setTotalPagesLD)
                setTotalPagesLD(response.data.response.pagination.totalPages);
        }
    )
    .catch(error => {
        console.log(error);
    })
    .finally(() => {
        setIsLoading && setIsLoading(false);
    });
};
