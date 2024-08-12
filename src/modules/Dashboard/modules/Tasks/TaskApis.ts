import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

//function that converts the uuid object into a map
//with uuid as key and name/title as value
const uuidMapper = (uuid: Partial<uuidType>) => {
    for (const key of Object.keys(uuid)) {
        const uuidMap: any = {};
        uuid[key as keyof uuidType]?.forEach(elem => {
            if (key === "type" || key === "organization") {
                uuidMap[elem.id] = (elem as any).title;
            } else {
                uuidMap[elem.id] = (elem as any).name;
            }
        });
        uuid[key as keyof uuidType] = uuidMap;
    }

    return uuid;
};

//Converts all uuids to corresponding string in taskdata
export const uuidToString = (data: any, uuid: Partial<uuidType>) => {
    const Mapper = uuidMapper(uuid);
    return data.map((task: any) => {
        task.level = Mapper.level![task.level];
        task.ig = Mapper.ig![task.ig];
        task.org = Mapper.organization![task.org];
        task.type = Mapper.type![task.type];
        task.channel = Mapper.channel![task.channel];

        return task;
    });
};

export const getTasks = async (
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

export const getTaskDetails = async (
    id: string | undefined,
    setData: UseStateFunc<TaskEditInterface>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getTasksData + id
        );
        const message: any = response?.data;
        setData(message.response);
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
    active: boolean,
    variable_karma: boolean,
    usage_count: string,
    channel_id: string,
    type_id: string,
    level_id: string,
    ig_id: string,
    org_id: string,
    description: string,
    discord_link: string,
    id: string | undefined,
    event: string,
    bonus_time?: string,
    bonus_karma?: string
) => {
    try {
        const formattedBonusTime = (bonus_time && bonus_time != "")
            ? new Date(bonus_time).toISOString() // Convert bonus_time to ISO format
            : null;

        const response = await privateGateway.put(
            dashboardRoutes.getTasksData + id,
            {
                title: title,
                hashtag: hashtag,
                karma: parseInt(karma),
                usage_count: parseInt(usage_count),
                active: active,
                variable_karma: variable_karma,
                channel: channel_id,
                type: type_id,
                description: description === "" ? null : description,
                level: level_id === "" ? null : level_id,
                ig: ig_id === "" ? null : ig_id,
                org: org_id === "" ? null : org_id,
                discord_link: discord_link,
                event: event === "" ? null : event,
                bonus_time:
                    formattedBonusTime === "" ? null : formattedBonusTime,
                bonus_karma: parseInt(bonus_karma ?? "0")
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

export const createTask = async (
    hashtag: string,
    title: string,
    karma: string,
    usage_count: string,
    active: boolean,
    variable_karma: boolean,
    description: string,
    channel_id: string,
    type_id: string,
    level_id: string,
    ig_id: string,
    org_id: string,
    discord_link: string,
    event: string,
    bonus_time?: string,
    bonus_karma?: string
) => {
    try {
        const formattedBonusTime = bonus_time
            ? new Date(bonus_time).toISOString() // Convert bonus_time to ISO format
            : null;

        const response = await privateGateway.post(
            dashboardRoutes.getTasksData,
            {
                title: title,
                hashtag: hashtag,
                karma: parseInt(karma),
                usage_count: parseInt(usage_count),
                active: active,
                variable_karma: variable_karma,
                description: description === "" ? null : description,
                channel: channel_id,
                type: type_id,
                level: level_id === "" ? null : level_id,
                ig: ig_id === "" ? null : ig_id,
                org: org_id === "" ? null : org_id,
                discord_link: discord_link,
                event: event === "" ? null : event,
                bonus_time:
                    formattedBonusTime === "" ? null : formattedBonusTime,
                bonus_karma: parseInt(bonus_karma ?? "0")
            }
        );

        toast.success("Task has been created successfully");
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const deleteTask = async (id: string | undefined) => {
    try {
        const response = await privateGateway.delete(
            dashboardRoutes.getTasksData + id + "/"
        );

        toast.success("Task has been deleted successfully");
        const message: any = response?.data;
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

export const getTaskTemplate = async () => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getTaskTemplate,
            { responseType: "blob" } // Set the response type to 'blob'
        );
        const blob = new Blob([response.data], {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        }); // Set the correct MIME type for XLSX files

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "TaskTemplate.xlsx");

        document.body.appendChild(link);
        link.click();
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

// function to take a js object and convert it to a XLSX file using the SheetJS library
// bundle size increased from 106kb to 160kb, but dynamically imported

export const convertToXLSX = (data: any, fileName: string) => {
    import("xlsx")
        .then(({ utils, writeFile }) => {
            const ws = utils.json_to_sheet(data);
            const wb = utils.book_new();
            utils.book_append_sheet(wb, ws, "Result 1");
            writeFile(wb, fileName);
        })
        .catch(err => console.error(err));
};
