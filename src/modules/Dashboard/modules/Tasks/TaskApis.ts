import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";
import { SetStateAction } from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { TaskEditInterface } from "./TaskInterface";
export const getTasks = async (
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getTasksData,
            {
                params: {
                    perPage: selectedValue,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            }
        );
        const tasks: any = response?.data;
        setData(tasks.response.data);
        setTotalPages(tasks.response.pagination.totalPages);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getTaskDetails = async (
    id: string | undefined,
    setData: React.Dispatch<SetStateAction<TaskEditInterface>>,
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getTasksData + "get/" + id + "/"
        );
        const message: any = response?.data;
        //console.log(message);
        setData(message.response.Task);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const editTask = async (
    hashtag: string,
    title: string,
    karma: string,
    active: string,
    variable_karma: string,
    usage_count: string,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.put(
            dashboardRoutes.getTasksData + "edit/" + id + "/",
            {
                title: title,
                hashtag: hashtag,
                karma: parseInt(karma),
                usage_count: parseInt(usage_count),
                active: parseInt(active),
                variable_karma: parseInt(variable_karma)
            }
        );
        const message: any = response?.data;
        //console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const createTask = async (
    hashtag: string,
    title: string,
    karma: string,
    usage_count: string,
    active: string,
    variable_karma: string,
    description: string,
    channel_id: string,
    type_id: string,
    level_id: string,
    ig_id: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getTasksData + "create/",
            {
                title: title,
                hashtag: hashtag,
                karma: parseInt(karma),
                usage_count: parseInt(usage_count),
                active: parseInt(active),
                variable_karma: parseInt(variable_karma),
                description: description,
                channel_id: parseInt(channel_id),
                type_id: parseInt(type_id),
                level_id: parseInt(level_id),
                ig_id: parseInt(ig_id)
            }
        );
        const message: any = response?.data;
        //console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const deleteTask = async (
    id: string | undefined,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        const response = await privateGateway.patch(
            dashboardRoutes.getTasksData + "delete/" + id + "/"
        );
        toast({
            title: "Interest Group deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        const message: any = response?.data;
        //console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
