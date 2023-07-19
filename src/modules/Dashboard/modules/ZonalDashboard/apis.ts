import { AxiosError } from "axios";
import axios from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, organizationRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

export const getzonaldashboard = async (
    activeTab: string,
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        // await privateGateway
        //     .get(organizationRoutes.getOrganizationsAll, {
        //         params: {
        //             perPage: selectedValue,
        //             pageIndex: page,
        //             search: search,
        //             sortBy: sortID
        //         }
        //     })
        //     .then(response => {
        //         return response.data;
        //     })
        //     .then(data => {
        //         if (activeTab === "Student management") {
        //             setData(data.response.data.colleges);
        //             setTotalPages(data.response.pagination.colleges.totalPages);
        //         } else if (activeTab === "Campus management") {
        //             setData(data.response.data.companies);
        //             setTotalPages(
        //                 data.response.pagination.companies.totalPages
        //             );
        //         } else {
        //             alert("error to Load Data");
        //         }
        //     });

        if (activeTab === "Student management") {
            await privateGateway
                .get(dashboardRoutes.zonalStudentDetails, {
                    params: {
                        perPage: selectedValue,
                        pageIndex: page,
                        search: search,
                        sortBy: sortID
                    }
                })
                .then(response => {
                    return response.data;
                })
                .then(data => {
                    setData(data.response.data);
                    setTotalPages(data.response.pagination.totalPages);
                });
        } else if (activeTab === "Campus management") {
            await privateGateway
                .get(dashboardRoutes.zonalCampusDetails, {
                    params: {
                        perPage: selectedValue,
                        pageIndex: page,
                        search: search,
                        sortBy: sortID
                    }
                })
                .then(response => {
                    return response.data;
                })
                .then(data => {
                    setData(data.response.data);
                    setTotalPages(data.response.pagination.totalPages);
                });
        } else {
            alert("error to Load Data");
        }
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

interface CountryProps {
    id: string;
    name: string;
    updated_at: string;
    created_at: string;
    updated_by: string;
    created_by: string;
}

export const getAffiliation = async (setAffiliationData: any) => {
    try {
        await privateGateway
            .get(organizationRoutes.getAffiliation)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const affiliation: CountryProps[] =
                    data.response.data.affiliation;
                setAffiliationData(affiliation);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
export const getCountry = async (setCountryData: any) => {
    try {
        await privateGateway
            .get(organizationRoutes.getLocation + "/country")
            .then(response => {
                return response.data;
            })
            .then(data => {
                const countries: CountryProps[] = data.response.data.countries;
                setCountryData(countries);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getStates = async (country: string, setStatesData: any) => {
    try {
        await privateGateway
            .get(`${organizationRoutes.getLocation}/${country}/states`)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const states: CountryProps[] = data.response.data.states;
                setStatesData(states);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getZones = async (
    country: string,
    state: string,
    setZonesData: any
) => {
    try {
        await privateGateway
            .get(`${organizationRoutes.getLocation}/${country}/${state}/zone`)
            .then(response => {
                return response.data;
            })
            .then(data => {
                const states: CountryProps[] = data.response.data.states;
                setZonesData(states);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getDistricts = async (
    country: string,
    state: string,
    zone: string,
    setDistrictsData: any
) => {
    try {
        await privateGateway
            .get(
                `${organizationRoutes.getLocation}/${country}/${state}/${zone}/district`
            )
            .then(response => {
                return response.data;
            })
            .then(data => {
                const districts: CountryProps[] = data.response.data.states;
                setDistrictsData(districts);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getInfo = async (code: string) => {
    try {
        const response = await privateGateway.post(
            `${organizationRoutes.postGetInfo}${code}`
        );
        return response.data.response.institution;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
