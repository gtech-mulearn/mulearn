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
        const data = response.data.response.data;
        if (setTotalPages) {
            setTotalPages(response.data.response.pagination.totalPages);
        }
        setData(
            data.map((data: any) => ({
                id: data.id,
                no_of_alumni: data.no_of_alumni,
                level: data.level,
                org: data.org,
                ...data.no_of_lc,
                ...data.number_of_members,
                ...data.total_karma
            }))
        );
    } catch (err) {
        console.log(err);
        if (errHandler) errHandler(err);
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
        await privateGateway.patch(
            dashboardRoutes.collegeLevlesDelete + `${id}/`,
            data
        );
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
