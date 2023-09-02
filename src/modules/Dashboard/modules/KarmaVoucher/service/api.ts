import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

export const getKarmaVoucher = async (
    setData: any,
    page: number,
    selectedValue: number,
    setIsLoading: UseStateFunc<boolean>,
    setTotalPages?: UseStateFunc<any>,
    errorHandler?: Function,
    search?: string,
    sortID?: string
) => {
    setIsLoading(true);
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getKarmaVoucher,
            {
                params: {
                    perPage: selectedValue,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            }
        );
        const data: any = response?.data.response;
        setData(data.data);
        if (setTotalPages) setTotalPages(data.pagination.totalPages);
        setIsLoading(false);
    } catch (err: unknown) {
        setIsLoading(false);
        const error = err as AxiosError;
        if (error?.response) {
            if (errorHandler) errorHandler();
            else console.log(error.response);
        }
    }
};

export const getTaskDetails = async (
    id: string | undefined,
    setData: UseStateFunc<TaskEditInterface>
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getKarmaVoucher + "get/" + id + "/"
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
