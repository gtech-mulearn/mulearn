import { AxiosError } from "axios";
import { log } from "console";
import { privateGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";

export const getInterestGroups = async (
    setData: any,
    page: number,
    setTotalPages?: any,
    search?: string
) => {
    try {
        const response = await privateGateway.get(dashboardRoutes.getIgData, {
            params: {
                perPage: 5,
                pageIndex: page,
                search: search
            }
        });
        const interestGroups: any = response?.data;
        setData(interestGroups.response.interestGroups);
        setTotalPages(Math.ceil(interestGroups.response.dataCount / 5));
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
