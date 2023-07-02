import { AxiosError } from "axios";
import axios from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes, organizationRoutes } from "../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast"

import { useNavigate } from "react-router-dom";
import { ErrorMessage } from "formik";



export const getOrganizations = async (
    activeTab: string,
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        await privateGateway.get(organizationRoutes.getOrganizationsAll, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        })
            .then(response => {
                return response.data
            })
            .then(data => {
                if (activeTab === "Colleges") {
                    setData(data.response.data.colleges);
                    setTotalPages(data.response.pagination.colleges.totalPages);
                } else if (activeTab === "Companies") {
                    setData(data.response.data.companies);
                    setTotalPages(data.response.pagination.companies.totalPages);
                } else if (activeTab === "Communities") {
                    setData(data.response.data.communities);
                    setTotalPages(data.response.pagination.communities.totalPages);
                } else {
                    alert("error to Load Data")
                }
            })
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
        await privateGateway.get(organizationRoutes.getAffiliation)
            .then(response => {
                return response.data
            })
            .then(data => {
                const affiliation: CountryProps[] = data.response.data.affiliation;
                setAffiliationData(affiliation);
            })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}
export const getCountry = async (setCountryData: any) => {
    try {
        await privateGateway.get(organizationRoutes.getLocation + "/country")
            .then(response => {
                return response.data
            })
            .then(data => {
                const countries: CountryProps[] = data.response.data.countries;
                setCountryData(countries);
            })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const getStates = async (country: string, setStatesData: any) => {
    try {
        await privateGateway.get(`${organizationRoutes.getLocation}/${country}/states`)
            .then(response => {
                return response.data
            })
            .then(data => {
                const states: CountryProps[] = data.response.data.states;
                setStatesData(states);
            })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const getZones = async (country: string, state: string, setZonesData: any) => {
    try {
        await privateGateway.get(`${organizationRoutes.getLocation}/${country}/${state}/zone`)
            .then(response => {
                return response.data
            })
            .then(data => {
                const states: CountryProps[] = data.response.data.zones;
                setZonesData(states);
            })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const getDistricts = async (country: string, state: string, zone: string, setDistrictsData: any) => {
    try {
        await privateGateway.get(`${organizationRoutes.getLocation}/${country}/${state}/${zone}/district`)
            .then(response => {
                return response.data
            })
            .then(data => {
                const districts: CountryProps[] = data.response.data.districts;
                setDistrictsData(districts);
            })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const createOrganization = async (
    title: string,
    code: string,
    country: string,
    state: string,
    zone: string,
    district: string,
    orgType: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    affiliation?: string,
    setIsSuccess?: any,
    setIsLoading?: any,
) => {

    const addDataProps = () => {
        if (orgType === "College") {
            return {
                "title": title,
                "code": code,
                "state": state,
                "zone": zone,
                "district": district,
                "country": country,
                "affiliation": affiliation,
                "orgType": orgType
            }
        }
        else {
            return {
                "title": title,
                "code": code,
                "state": state,
                "zone": zone,
                "district": district,
                "country": country,
                "orgType": orgType
            }
        }
    }

    try {
        setIsLoading(true);
        const response = await privateGateway.post(organizationRoutes.postAddOrganization, addDataProps());
        toast({
            title: "Organizations created",
            status: "success",
            duration: 3000,
            isClosable: true
        });
        const message: any = response?.data;
        console.log("created a new " + orgType)
        setIsSuccess(true)
        setIsLoading(false);
    } catch (error: any) {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
        }, 2000);
        if (error.response) {
            const errorMsg = error.response.data.message.general[0].code[0] || 'Something went wrong!';
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            //   toast({
            //     title: "Error occurred",
            //     description: error.message,
            //     status: "error",
            //     duration: 3000,
            //     isClosable: true,
            //   });
        }
    }
}
// const navigate = useNavigate()

export const updateOrganization = async (
    title: string,
    code: string,
    oldCode: string,
    country: string,
    state: string,
    zone: string,
    district: string,
    orgType: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    affiliation?: string,
    setIsSuccess?: any,
    setIsLoading?: any,
) => {

    const addDataProps = () => {
        if (orgType === "College") {
            return {
                "title": title,
                "code":code,
                "state": state,
                "zone": zone,
                "district": district,
                "country": country,
                "affiliation": affiliation,
                "orgType": orgType
            }
        }
        else {
            return {
                "title": title,
                "code": code,
                "state": state,
                "zone": zone,
                "district": district,
                "country": country,
                "orgType": orgType
            }
        }
    }
    try {
        setIsLoading(true);
        const response = await privateGateway.put(
            `${organizationRoutes.putUpdateOrganization}/${oldCode}`,
            addDataProps()
        );
        console.log("status is ", response.status);

        if (response.status === 200) {
            toast({
                title: "Organizations Updated",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
            setIsSuccess(true)
            setIsLoading(false);
        }
    } catch (error: any) {
        setIsLoading(true);
        setTimeout(function () {
            setIsLoading(false);
        }, 1000);
        if (error.response) {
            const errorMsg = error.response.data.message.general[0] || 'Something went wrong!';
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: "Error occurred",
                description: error.message,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }

}

export const deleteOrganization = async (
    code: any,
    toast: (options?: UseToastOptions | undefined) => ToastId,
) => {
    try {
        const response = await privateGateway.delete(`${organizationRoutes.deleteOrgnaization}${code}`);
        const message: any = response?.data;
        console.log(message);
        toast({
            title: "Organizations Deleted",
            status: "success",
            duration: 3000,
            isClosable: true
        });

    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const getInfo = async (
    code: string
) => {
    try {
        const response = await privateGateway.post(`${organizationRoutes.postGetInfo}${code}`);
        return response.data.response.institution
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}