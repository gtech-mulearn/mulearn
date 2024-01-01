import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { taskTypeRoutes, dynamicRoute } from "@/MuLearnServices/endpoints";
import toast from "react-hot-toast";

export const getTaskTypes = async (
    setData: any,
    page: number,
    selectedValue: number,
    setIsLoading: UseStateFunc<boolean>,
    setTotalPages?: UseStateFunc<any>,
    search?: string,
    sortID?: string
) => {
    setIsLoading(true);
    try {
        const response = await privateGateway.get(taskTypeRoutes.getTaskTypes, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        });
        const tasks: any = response?.data;
        setData(tasks.response.data);
        // const uuids: Partial<uuidType> = await getUUID();
        // setData(uuidToString(tasks.response.data, uuids));
        if (setTotalPages) {
            setTotalPages(tasks.response.pagination.totalPages);
        }
        setIsLoading(false);
    } catch (err: unknown) {
        setIsLoading(false);
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const createTaskType = async (title: string) => {
    try {
        const response = await privateGateway.post(
            dynamicRoute(taskTypeRoutes.getTaskTypes),
            {
                title: title
            }
        );

        toast.success("Task created");
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getTaskTypeDetails = async (
    id: string | undefined,
    setData: UseStateFunc<{ title: string }>
) => {
    try {
        const response = await privateGateway.get(taskTypeRoutes.getTaskTypes);
        const message: any = response?.data;
        const list = message.response.data;
        const { title } = list.filter((item: any) => {
            return item.id == id;
        })[0];
        setData({ title: title as string });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const editTaskType = async (title: string, id: string | undefined) => {
    try {
        const response = await privateGateway.put(
            dynamicRoute(taskTypeRoutes.editTaskType, id as string),
            {
                title: title
            }
        );

        toast.success("Task has been updated successfully");
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);

            toast.error("Task Update Failed");
        }
    }
};

export const deleteTaskType = async (id: string | undefined) => {
    try {
        const response = await privateGateway.delete(
            dynamicRoute(taskTypeRoutes.editTaskType, id as string)
        );

        toast.success("Task has been deleted successfully");
        const message: any = response?.data;
        console.log(dynamicRoute(taskTypeRoutes.editTaskType, id as string));
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
