import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { Dispatch, SetStateAction } from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { TaskEditInterface } from "./TaskInterface";
import { utils, writeFile } from "xlsx";

type uuidType = {
    level: { id: string; name: string }[];
    ig: { id: string; name: string }[];
    organization: { id: string; title: string }[];
    channel: { id: string; name: string }[];
    type: { id: string; title: string }[];
};

//function that converts the uuid object into a map
//with uuid as key and name/title as value
const uuidMapper = (uuid: Partial<uuidType>) => {
    for (const key of Object.keys(uuid)) {
        const uuidMap: any = {};
        uuid[key as keyof uuidType]?.forEach(elem => {
            if (key === "type" || key === "organization")
                uuidMap[elem.id] = (elem as any).title;
            else uuidMap[elem.id] = (elem as any).name;
        });
        uuid[key as keyof uuidType] = uuidMap;
    }

    return uuid;
};

//Converts all uuids to corresponding string in taskdata
const uuidToString = (data: any, uuid: Partial<uuidType>) => {
    const Mapper = uuidMapper(uuid);
    const newData = data.map((task: any) => {
        task.level = Mapper.level![task.level];
        task.ig = Mapper.ig![task.ig];
        task.org = Mapper.organization![task.org];
        task.type = Mapper.type![task.type];
        task.channel = Mapper.channel![task.channel];

        return task;
    });
    return newData;
};

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
        const uuids: Partial<uuidType> = await getUUID();
        setData(uuidToString(tasks.response.data, uuids));
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
    setData: React.Dispatch<SetStateAction<TaskEditInterface>>
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
    channel_id: string,
    type_id: string,
    level_id: string,
    ig_id: string,
    org_id: string,
    id: string | undefined,
    toast: (options?: UseToastOptions | undefined) => ToastId
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
                variable_karma: parseInt(variable_karma),
                channel: channel_id,
                type: type_id,
                level: level_id,
                ig: ig_id,
                org: org_id
            }
        );
        const message: any = response?.data;
        toast({
            title: "Task Updated",
            description: "Task has been updated successfully",
            status: "success",
            duration: 5000,
            isClosable: true
        });
        //console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
            toast({
                title: "Task Update Failed",
                status: "error",
                duration: 5000,
                isClosable: true
            });
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
    ig_id: string,
    org_id: string
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
                channel: channel_id,
                type: type_id,
                level: level_id,
                ig: ig_id,
                org: org_id
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

export const getUUID = async () => {
    const uuids: { [index: string]: string } = {
        level: dashboardRoutes.getTaskLevels,
        ig: dashboardRoutes.getTaskIGs,
        organization: dashboardRoutes.getTaskOrganizations,
        channel: dashboardRoutes.getTaskChannels,
        type: dashboardRoutes.getTaskTypes
    };

    const response: Partial<uuidType> = {};
    for (let key in uuids) {
        response[key as keyof uuidType] = (
            (await privateGateway.get(uuids[key])).data.response as Array<any>
        ).sort((a, b) =>
            //check for name/title key and then compare
            (a.name !== undefined && a.name < b.name) ||
            (a.title !== undefined && a.title < b.title)
                ? -1
                : 1
        );
    }
    return response;
};

// function to take a js object and convert it to a XLSX file using the SheetJS library

export const convertToXLSX = (data: any, fileName: string) => {
    const ws = utils.json_to_sheet(data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, "Result 1");
    writeFile(wb, fileName);
};
