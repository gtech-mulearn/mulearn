import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";

export const getUsersData = async (
    setData: any,
    page: number,
    setTotalPages?: any,
    search?: string
) => {
    try {
        console.log(`=====USER Data==>\n${page}`);

        const response = await privateGateway.get(
            dashboardRoutes.getUsersData,
            { params: { perPage: 5, pageIndex: page, search: search } }
        );
        const usersData: any = response?.data;
        // localStorage.setItem('count', usersData.response.dataCount)
        console.log(`===USER Data Res====>\n${usersData.response.users}`);
        setData(usersData.response.users);
        setTotalPages(Math.ceil(usersData.response.dataCount / 5));
        console.log(usersData.response.dataCount);
    } catch (err: unknown) {
        console.log(`=====USER Data Error==>\n${err}`);
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
