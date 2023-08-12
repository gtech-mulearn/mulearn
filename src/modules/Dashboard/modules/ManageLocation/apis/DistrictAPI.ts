import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

//*WORKING✅
export const getDistrictData = async (
    country: string,
    state:string,
    zone:string,
    setData: UseStateFunc<any>,
    setTotalPages?: UseStateFunc<any>,
) => {
    try {
        await privateGateway.get(
            ManageLocationsRoutes.getDistrictData
            .replace("${country}",country)
            .replace("${state}",state)
            .replace("${zone}",zone)
        )
        .then(({data})=>data.response)
        .then(({data})=>{
            console.log(data)
            setData(data.districts)
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};


//!Error : "You do not have the required role to access this page." 
export const postDistrictData = async (
    country:string,
    state:string,
    zone:string,
    stateName:string
) => {
    try {
        await privateGateway.post(
            ManageLocationsRoutes.getDistrictData
            .replace("${country}",country)
            .replace("${state}",state)
            .replace("${zone}",zone),
            {
                name: stateName
            }
        )
        .then(({data})=>data.response)
        .then(({data})=>{
            console.log(data)
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

//*WORKING✅
export const putDistrictData = async (
    country:string,
    state:string,
    zone:string,
    oldName:string,
    newName:string
) => {
    try {
        await privateGateway.put(ManageLocationsRoutes.getDistrictData
            .replace("${country}",country)
            .replace("${state}",state)
            .replace("${zone}",zone),
            {
                zone: zone,
                oldName: oldName,
                newName: newName
            }
        )
        .then(({data})=>data.response)
        .then(({data})=>{
            console.log(data)
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}

//*WORKING✅
export const deleteDistrictData = async (
    country:string,
    state:string,
    zone:string,
    districtName: string
    ) => {
    try {
        const requestConfig:any = {
            data: {
                name: districtName,
            }
        };

        await privateGateway.delete(
            ManageLocationsRoutes.getDistrictData
            .replace("${country}",country)
            .replace("${state}",state)
            .replace("${zone}",zone)
            , requestConfig)
            .then(({ data }) => console.log(data.message.general[0]))
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};