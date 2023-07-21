import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "../../../../../services/apiGateways";
import { ManageLocationsRoutes } from "../../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { Dispatch, SetStateAction } from "react";

//*WORKING✅
export const getZoneData = async (
    country: string,
    state:string,
    setData: any,
    setTotalPages?: any,
) => {
    try {
        await privateGateway.get(
            ManageLocationsRoutes.getZoneData
            .replace("${country}",country)
            .replace("${state}",state)
        )
        .then(({data})=>data.response)
        .then(({data})=>{
            console.log(data)
            setData(data.zones)
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            alert(error?.response?.data?.message.general[0]);
        }
    }
};

//*WORKING✅
export const postZoneData = async (
    country:string,
    state:string,
    stateName:string
) => {
    try {
        await privateGateway.post(
            ManageLocationsRoutes.getZoneData
            .replace("${country}",country)
            .replace("${state}",state),
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
export const putZoneData = async (
    country:string,
    state:string,
    oldName:string,
    newName:string
) => {
    try {
        await privateGateway.put(
            ManageLocationsRoutes.getZoneData
            .replace("${country}",country)
            .replace("${state}",state),
            {
                state: state,
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
export const deleteZoneData = async (
    country:string,
    state:string,
    zoneName: string
    ) => {
    try {
        const requestConfig:any = {
            data: {
                name: zoneName,
            }
        };

        await privateGateway.delete(
            ManageLocationsRoutes.getZoneData
            .replace("${country}",country)
            .replace("${state}",state)
            , requestConfig)
            .then(({ data }) => console.log(data.message.general[0]))
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};