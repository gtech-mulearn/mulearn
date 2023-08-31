import { AxiosError } from "axios";
import axios from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, organizationRoutes } from "@/MuLearnServices/urls";

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
                .then(
                    (
                        response: APIResponse<{
                            data: any[];
                            pagination: { totalPages: number };
                        }>
                    ) => {
                        return response.data;
                    }
                )
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
                .then(
                    (
                        response: APIResponse<{
                            data: any[];
                            pagination: { totalPages: number };
                        }>
                    ) => {
                        return response.data;
                    }
                )
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
            .then(
                (
                    response: APIResponse<{
                        data: { affiliation: CountryProps[] };
                    }>
                ) => {
                    return response.data;
                }
            )
            .then(data => {
                const affiliation = data.response.data.affiliation;
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
            .then(
                (
                    response: APIResponse<{
                        data: { countries: CountryProps[] };
                    }>
                ) => {
                    return response.data;
                }
            )
            .then(data => {
                const countries = data.response.data.countries;
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
            .then(
                (
                    response: APIResponse<{ data: { states: CountryProps[] } }>
                ) => {
                    return response.data;
                }
            )
            .then(data => {
                const states = data.response.data.states;
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
            .then(
                (
                    response: APIResponse<{ data: { states: CountryProps[] } }>
                ) => {
                    return response.data;
                }
            )
            .then(data => {
                const states = data.response.data.states;
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
            .then(
                (
                    response: APIResponse<{ data: { states: CountryProps[] } }>
                ) => {
                    return response.data;
                }
            )
            .then(data => {
                const districts = data.response.data.states;
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
            `${organizationRoutes.postGetInfo}${code}/`
        );
        return response.data.response.institution;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getStudentLevels = async () => {
    const sum = (arr: number[]) => {
        return arr.slice(1).reduce((acc, curr) => acc + curr);
    };
    const response = await privateGateway.get(
        dashboardRoutes.getZonalStudentLevels
    );
    const data = response.data.response;
    //Combining all colleges student levels into one
    console.log(data);
    return [
        [
            " ",
            data[2].students_count,
            data[3].students_count,
            data[0].students_count,
            data[1].students_count
        ]
    ];
};

export const getTopDistrict = async () => {
    const response = await privateGateway.get(
        dashboardRoutes.getZonalTopDistrict
    );
    const data = response.data.response;
    const returnData: any[] = [["Districts"], [" "]];
    for (let item of data) {
        returnData[0].push(item.district);
        returnData[1].push(item.karma);
    }
    return returnData;
};
