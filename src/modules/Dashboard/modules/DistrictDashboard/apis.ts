import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, organizationRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";

export const getdistrictdashboard = async (
    activeTab: string,
    setData: UseStateFunc<any[]>,
    page: number,
    selectedValue: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string
) => {
    try {
        if (activeTab === "Student management") {
            await privateGateway
                .get(dashboardRoutes.districtStudentDetails, {
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
                            data: any;
                            pagination: { totalPages: number };
                        }>
                    ) => {
                        return response.data;
                    }
                )
                .then(data => {
                    setData(data.response.data);
                    //console.log(data.response.data);
                    if (setTotalPages)
                        setTotalPages(data.response.pagination.totalPages);
                });
        } else if (activeTab === "Campus management") {
            await privateGateway
                .get(dashboardRoutes.districtCampusDetails, {
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
                            data: any;
                            pagination: { totalPages: number };
                        }>
                    ) => {
                        return response.data;
                    }
                )
                .then(data => {
                    setData(data.response.data);
                    if (setTotalPages)
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

export const getAffiliation = async (
    setAffiliationData: UseStateFunc<CountryProps[]>
) => {
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
export const getCountry = async (
    setCountryData: UseStateFunc<CountryProps[]>
) => {
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

export const getStates = async (
    country: string,
    setStatesData: UseStateFunc<CountryProps[]>
) => {
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
    setZonesData: UseStateFunc<CountryProps[]>
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
    setDistrictsData: UseStateFunc<CountryProps[]>
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
        dashboardRoutes.getDistrictStudentLevels
    );
    const data = response.data.response;
    return [
        data.reduce(
            (acc: any[], curr: any) => {
                //api returns levels in incorrect order
                acc[1] += curr.level[2].students_count;
                acc[2] += curr.level[3].students_count;
                acc[3] += curr.level[0].students_count;
                acc[4] += curr.level[1].students_count;
                return acc;
            },
            [" ", 0, 0, 0, 0]
        )
    ];
};

export const getTopCampus = async () => {
    const response = await privateGateway.get(
        dashboardRoutes.getDistrictTopCampus
    );
    const data = response.data.response;
    const returnData: any[] = [["Colleges"], [" "]];
    for (let item of data) {
        returnData[0].push(item.campus_code);
        returnData[1].push(item.rank as -4);
    }
    return returnData;
};
