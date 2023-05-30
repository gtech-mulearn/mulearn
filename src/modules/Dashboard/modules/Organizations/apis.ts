import { AxiosError } from "axios";
import axios from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes, organizationRoutes } from "../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import countries from './dummyData/Countries.json'

export const getOrganizations = async (
    activeTab:string,
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        await privateGateway.get(organizationRoutes.getOrganizationsAll,{
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        })
        .then(response=>{
            return response.data
        })
        .then(data => {
            if(activeTab === "Colleges"){
                setData(data.response.data.colleges);
                setTotalPages(data.response.pagination.colleges.totalPages);
            }else if (activeTab === "Companies"){
                setData(data.response.data.companies);
                setTotalPages(data.response.pagination.companies.totalPages);
            }else if(activeTab === "Communities"){
                setData(data.response.data.communities);
                setTotalPages(data.response.pagination.communities.totalPages);
            }else{
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

export const getCountry = async (setCountryData:any) => {
    try {
        await privateGateway.get(organizationRoutes.getLocation+"/country")
        .then(response=>{
            console.log("country-data",response.data.response.data.countries)
            return response.data
        })
        .then(data => {
            const countries:CountryProps[] = data.response.data.countries;
            setCountryData(countries);
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const getStates = async (country:string,setStatesData:any) => {
    try {
        await privateGateway.get(`${organizationRoutes.getLocation}/${country}/states`)
        .then(response=>{
            console.log("states-data",response.data.response.data.states)
            return response.data
        })
        .then(data => {
            const states:CountryProps[] = data.response.data.states;
            setStatesData(states);
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const getZones = async (country:string,state:string,setZonesData:any) => {
    try {
        await privateGateway.get(`${organizationRoutes.getLocation}/${country}/${state}/zone`)
        .then(response=>{
            console.log("zones-data",response.data.response.data.states)
            return response.data
        })
        .then(data => {
            const states:CountryProps[] = data.response.data.states;
            setZonesData(states);
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const getDistricts = async (country:string,state:string,zone:string,setDistrictsData:any) => {
    try {
        await privateGateway.get(`${organizationRoutes.getLocation}/${country}/${state}/${zone}/district`)
        .then(response=>{
            console.log("districts-data",response.data.response.data.states)
            return response.data
        })
        .then(data => {
            const districts:CountryProps[] = data.response.data.states;
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
    title:string,
    code:string,
    affiliation: string,
    country: string,
    state: string,
    district: string,
    zone:string,
    orgType:string, 
    toast: (options?: UseToastOptions | undefined) => ToastId,) => {

	try {
        const response = await privateGateway.post(organizationRoutes.postAddOrganization, {
			"title": title,
            "code":code,
            "state":state,
            "zone":zone,
            "district":district,
            "country":country,
            "affiliation":affiliation,
            "orgType" : orgType
		});
		toast({
			title: "Organizations created",
			status: "success",
			duration: 3000,
			isClosable: true
		});
        const message: any = response?.data;
		console.log(message);
        console.log("created a new "+orgType)

    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const deleteOrganization = async (
    code:string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    ) => {
	try {
        const response = await privateGateway.delete(`${organizationRoutes.deleteOrgnaization}${code}`);
        const message: any = response?.data;
		console.log(message);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

export const getInfo = async(
    code:string
) =>  {
    try{
        const response = await privateGateway.post(`${organizationRoutes.postGetInfo}${code}`);
        return response.data.response.institution
    }catch(err:unknown){
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}