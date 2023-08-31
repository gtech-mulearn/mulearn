import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

export const getCollegeLevels = async (
    {
        setData,
        page,
        selectedValue,
        setIsLoading,
        setTotalPages,
        search,
        sortID
    }: {
        setData: UseStateFunc<any>;
        page: number;
        selectedValue: number;
        setIsLoading: UseStateFunc<boolean>;
        setTotalPages?: UseStateFunc<any>;
        search?: string;
        sortID?: string;
    },
    errHandler?: Function
) => {
    try {
        setIsLoading(true);
        const response = await privateGateway.get(
            dashboardRoutes.collegeLevels,
            {
                params: {
                    perPage: selectedValue,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            }
        );
        console.log(response.data.response);
        setData(response.data.response);
    } catch (err) {
        if (errHandler) errHandler(err);
        console.log(err);
    } finally {
        setIsLoading(false);
    }
};

export const createCollegeLevels = async (data: any, errHandler?: Function) => {
    try {
        await privateGateway.post(dashboardRoutes.collegeLevels, data);
    } catch (err) {
        if (errHandler) errHandler(err);
        else console.log(err);
    }
};

export const editCollegeLevels = async (data: any, errHandler?: Function) => {
    try {
        await privateGateway.patch(dashboardRoutes.collegeLevels, data);
    } catch (err) {
        if (errHandler) errHandler(err);
        else console.log(err);
    }
};

export const deleteCollegeLevels = async (data: any, errHandler?: Function) => {
    try {
        await privateGateway.put(dashboardRoutes.collegeLevels, data);
    } catch (err) {
        if (errHandler) errHandler(err);
        else console.log(err);
    }
};
