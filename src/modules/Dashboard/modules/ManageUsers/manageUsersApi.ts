import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";

export const getUsersData = async (
    setData: any,
    page: number,
    setTotalPages?: any
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getUsersData
            // { params: { perPage: 5, page: page } }
        );
        const usersData: any = response?.data;
        // localStorage.setItem('count', usersData.response.dataCount)
        console.log(`=======>\n${usersData.response}`);
        setData(usersData.response.users);
        setTotalPages(Math.ceil(usersData.response.dataCount / 5));
        console.log(usersData.response.dataCount);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
