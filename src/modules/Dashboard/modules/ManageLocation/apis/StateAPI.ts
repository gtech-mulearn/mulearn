import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "../../../../../services/apiGateways";
import { ManageLocationsRoutes } from "../../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { Dispatch, SetStateAction } from "react";

//*WORKING✅
export const getStateData = async (
    country: string,
    setData: any,
    setTotalPages?: any,
) => {
    try {
        await privateGateway.get(ManageLocationsRoutes.getStateData.replace("${country}",country))
        .then(({data})=>data.response)
        .then(({data})=>{
            console.log(data)
            setData(data.states)
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//*WORKING✅
export const postStateData = async (
    country:string,
    stateName:string
) => {
    try {
        await privateGateway.post(ManageLocationsRoutes.getStateData.replace("${country}",country),
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
export const putStateData = async (
    country:string,
    oldName:string,
    newName:string
) => {
    try {
        await privateGateway.put(ManageLocationsRoutes.getStateData.replace("${country}",country),
            {
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
export const deleteStateData = async (
    country:string,
    stateName: string
    ) => {
    try {
        const requestConfig:any = {
            data: {
                name: stateName,
            }
        };

        await privateGateway.delete(ManageLocationsRoutes.getStateData.replace("${country}",country), requestConfig)
            .then(({ data }) => console.log(data.message.general[0]))
            // .then(({ data }) => {
            //     console.log(data);
            // });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};