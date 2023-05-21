import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";

export const getUsersData = async (
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        console.log(`=====USER Data==>\n${page}`);

        const response = await privateGateway.get(
            dashboardRoutes.getUsersData,
            {
                params: {
                    perPage: selectedValue,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            }
        );
        const usersData: any = response?.data;
        // localStorage.setItem('count', usersData.response.dataCount)
        console.log(`===USER Data Res====>\n${usersData.response.users}`);
        setData(usersData.response.users);
        setTotalPages(usersData.response.pagination.totalPages);
    } catch (err: unknown) {
        console.log(`=====USER Data Error==>\n${err}`);
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
