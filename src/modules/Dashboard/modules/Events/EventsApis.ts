import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { EventsRoutes, dynamicRoute } from "@/MuLearnServices/endpoints";
import toast from "react-hot-toast";

export const getEvents = async (
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
        const response = await privateGateway.get(EventsRoutes.getEvents, {
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

export const createEvent = async (name: string, description: string) => {
    try {
        const response = await privateGateway.post(
            dynamicRoute(EventsRoutes.getEvents),
            {
                name: name,
                description: description
            }
        );

        toast.success("Task Created Successfully");
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getEventDetails = async (
    id: string | undefined,
    setData: UseStateFunc<{
        name: string;
        description: string;
    }>
) => {
    try {
        const response = await privateGateway.get(EventsRoutes.getEvents);
        const message: any = response?.data;
        const list = message.response.data;
        const { name, description } = list.filter((item: any) => {
            return item.id == id;
        })[0];
        setData({
            name: name as string,
            description: description as string
        });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const editEvent = async (
    name: string,
    description: string | undefined,
    id: string | undefined
) => {
    try {
        const response = await privateGateway.put(
            dynamicRoute(EventsRoutes.editEvents, id as string),
            {
                name: name,
                description: description
            }
        );

        toast.success("Task Updated Successfully");
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
            toast.error("Task Update Failed");
        }
    }
};

export const deleteEvent = async (id: string | undefined) => {
    try {
        const response = await privateGateway.delete(
            dynamicRoute(EventsRoutes.editEvents, id as string)
        );
        toast.success("Task Deleted Successfully");
        const message: any = response?.data;
        console.log(dynamicRoute(EventsRoutes.editEvents, id as string));
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
            toast.error("Task Deletion Failed");
        }
    }
};
