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
            throw error;
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
            throw error;
        }
    }
};
export const getCountry = async (
    setCountryData: UseStateFunc<CountryProps[]>
) => {
    try {
        await privateGateway
            .get(organizationRoutes.getLocation + "/countries")
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
            throw error;
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
            throw error;
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
            throw error;
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
            throw error;
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
            throw error;
        }
    }
};
export const getStudentLevels = async (errHandler: (err: string) => void) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getDistrictStudentLevels
        );
        const data = response.data.response;

        return [
            [
                " ",
                data[2].students_count,
                data[3].students_count,
                data[0].students_count,
                data[1].students_count
            ]
        ];
    } catch (err: any) {
        console.log(err);
        errHandler((err as AxiosError).message);
        return [];
    }
};

export const getTopCampus = async (errHandler: (err: string) => void) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getDistrictTopCampus
        );
        const data = response.data.response;
        const returnData: any[] = [["Colleges"], [" "]];
        for (let item of data) {
            returnData[0].push(item.campus_code);
            returnData[1].push(item.karma);
        }
        return returnData;
    } catch (err: any) {
        console.log(err);
        errHandler((err as AxiosError).message);
        return [];
    }
};
