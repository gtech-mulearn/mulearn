import axios from "axios";
import { publicGateway } from "@/MuLearnServices/apiGateways";
import { PublicRoutes, googleSheetRoutes } from "@/MuLearnServices/urls";

type ResponseType = (data: any) => void;
type UserDetail = (data: any) => void;
type OrgData = (data: any) => void;
type HackData = (data: any) => void;
type HackDashboard = (data: any) => void;

export const getHackDashboard = (setHackDashboard: HackDashboard) => {
    publicGateway;
    publicGateway
        .get(googleSheetRoutes.getHackathonDashboardData, {})
        .then(response => {
            setHackDashboard(response.data);
        })
        .catch(error => {
            console.error(error);
        });
};
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
    date?: string,
    setLoading?: UseStateFunc<boolean>
) => {
    setLoading && setLoading(true);
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
        })
        .finally(() => {
            setLoading && setLoading(false);
        });
};

export const getOrgWiseReport = (
    setOrgWiseReport: OrgData,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string,
    date?: string,
    setLoading?: UseStateFunc<boolean>
) => {
    setLoading && setLoading(true);
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
            setOrgWiseReport(response.data.response.data);
            if (setTotalPages) {
                const totalPages = response.data.response.pagination.totalPages;
                setTotalPages(totalPages);
            }
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            setLoading && setLoading(false);
        });
};
export const getHackathonReport = (
    setHackathonReport: HackData,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    date?: string,
    setLoading?: UseStateFunc<boolean>
) => {
    publicGateway
        .get(googleSheetRoutes.getHackathonData, {})
        .then(response => {
            if (search != null && search != "") {
                response.data = response.data.filter((item: any) => {
                    if (
                        (item.CandidateName?.toLowerCase() || "").includes(
                            search.toLowerCase()
                        ) ||
                        (item.DWMSID?.toLowerCase() || "").includes(
                            search.toLowerCase()
                        ) ||
                        (item.Email?.toLowerCase() || "").includes(
                            search.toLowerCase()
                        ) ||
                        (item.HackathonName?.toLowerCase() || "").includes(
                            search.toLowerCase()
                        )
                    ) {
                        return item;
                    }
                });
            }
            const startIndex = (page - 1) * selectedValue;
            const endIndex = page * selectedValue;
            const paginatedData = response.data.slice(startIndex, endIndex);
            setHackathonReport(paginatedData);
            if (setTotalPages) {
                const totalPages = Math.ceil(
                    response.data.length / selectedValue
                );
                setTotalPages(totalPages);
            }
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {
            setLoading && setLoading(false);
        });
};
