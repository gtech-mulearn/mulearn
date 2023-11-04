import axios from "axios";
import { publicGateway } from "@/MuLearnServices/apiGateways";
import { PublicRoutes } from "@/MuLearnServices/urls";

type ResponseType = (data: any) => void;
type UserDetail = (data: any) => void;
type OrgData = (data: any) => void;

export const getLCDashboard = (setLcCounts: ResponseType, date?: string) => {
    publicGateway
        .get(PublicRoutes.getLcDashboard, {
            params: {
                date: date
            }
        })
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
    setLoading?: UseStateFunc<boolean>,
    date?: string
) => {
    publicGateway
        .get(PublicRoutes.getLcReport, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID,
                date: date
            }
        })
        .then(response => {
            setLcReport(response.data.response.data);
            if (setTotalPages) {
                const totalPages = response.data.response.pagination.totalPages;
                setTotalPages(totalPages);
            }
        })
        .catch(error => {
            console.error(error);
        });
};

export const getOrgWiseReport = (
    setOrgWiseReport: OrgData,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string,
    setLoading?: UseStateFunc<boolean>,
    date?: string
) => {
    publicGateway
        .get(PublicRoutes.getOrgWiseReport, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID,
                date: date
            }
        })
        .then(response => {
            setOrgWiseReport(response.data.response);
            if (setTotalPages) {
                const totalPages = response.data.response.pagination.totalPages;
                setTotalPages(totalPages);
            }
        })
        .catch(error => {
            console.error(error);
        });
};
