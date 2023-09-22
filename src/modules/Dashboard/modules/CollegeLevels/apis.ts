import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";

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

export const editCollegeLevels = async (
    id: string,
    data: any,
    errHandler?: Function
) => {
    try {
        await privateGateway.patch(dashboardRoutes.collegeLevels + id, data);
    } catch (err) {
        if (errHandler) errHandler(err);
        else console.log(err);
    }
};

export const deleteCollegeLevels = async (
    id: string,
    errHandler?: Function
) => {
    try {
        await privateGateway.delete(dashboardRoutes.collegeLevels + id);
    } catch (err) {
        if (errHandler) errHandler(err);
        else console.log(err);
    }
};
