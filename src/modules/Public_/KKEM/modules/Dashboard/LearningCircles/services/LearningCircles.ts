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
        .get(googleSheetRoutes.getLcData, {})
        .then(response => {
            setLcCounts({
                lc_count: 2226,
                total_enrollment: 5276,
                circle_count_by_ig: response.data,
                unique_users: 3009
            });
        })
        .catch(error => {
            console.error("error", error);
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
        .get(googleSheetRoutes.getLcReport, {
            // params: {
            //     perPage: selectedValue,
            //     pageIndex: page,
            //     search: search,
            //     sortBy: sortID,
            //     date: date
            // }
        })
        .then(response => {
            let filteredData = response.data;
            if (search != null && search != "") {
                filteredData = filteredData.filter((item: any) => {
                    return (
                        (item.full_name?.toLowerCase() || "").includes(search.toLowerCase()) ||
                        (item.muid?.toLowerCase() || "").includes(search.toLowerCase()) ||
                        (item.email?.toLowerCase() || "").includes(search.toLowerCase()) ||
                        (item.circle_name?.toLowerCase() || "").includes(search.toLowerCase())
                    );
                });
            }

            const startIndex = (page - 1) * selectedValue;
            const endIndex = page * selectedValue;
            const paginatedData = filteredData.slice(startIndex, endIndex);
            setLcReport(paginatedData);
            if (setTotalPages) {
                const totalPages = Math.ceil(filteredData.length / selectedValue);
                setTotalPages(totalPages);
            }
            // setLcReport(response.data.slice(0, 20));
            // if (setTotalPages) {
            //     const totalPages = response.data.response.pagination.totalPages;
            //     setTotalPages(totalPages);
            // }
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
