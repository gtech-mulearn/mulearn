import axios from "axios";
import { publicGateway } from "@/MuLearnServices/apiGateways";
import { PublicRoutes } from "@/MuLearnServices/urls";

type ResponseType = (data: any) => void;
type UserDetail = (data: any) => void;

export const getLCDashboard = (setLcCounts: ResponseType) => {
    publicGateway
        .get(PublicRoutes.getLcDashboard)
        .then(response => {
            setLcCounts(response.data.response);
        })
        .catch(error => {
            console.error(error);
        });
};

export const getLCReport = (
    setLcReport: UserDetail,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string,
    setLoading?: UseStateFunc<boolean>
) => {
    publicGateway
        .get(PublicRoutes.getLcReport, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        })
        .then(response => {
            setLcReport(response.data.response.data);
            if (setTotalPages){
                const totalPages = response.data.response.pagination.totalPages;
                setTotalPages(totalPages);
            }
        })
        .catch(error => {
            console.error(error);
        });
};
