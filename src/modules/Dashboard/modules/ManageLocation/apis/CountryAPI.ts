import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "../../../../../services/apiGateways";
import { ManageLocationsRoutes } from "../../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { Dispatch, SetStateAction } from "react";

//* WORKING✅
export const getCountryData = async (
    setData: any,
    toast?: (options?: UseToastOptions | undefined) => ToastId,
    setTotalPages?: any
) => {
    try {
        await privateGateway.get(ManageLocationsRoutes.getCountryData)
        .then(({data})=>data.response)
        .then(({data})=>{
            console.log(data)
            setData(data.countries)
        })
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//*WORKING✅
export const postCountryData = async (
    countryName:string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
) => {
    try {
        await privateGateway.post(ManageLocationsRoutes.getCountryData,
            {
                name: countryName
            }
        )
        .then(({data})=>data.response)
        .then(({data})=>{
            console.log(data)
        })
    } catch (err: any) {
        if (err?.response) {
            const errorMsg = err.response.data.message.general[0]
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    }
}

//*WORKING✅
export const putCountryData = async (
    oldName:string,
    newName:string,
    toast?: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        await privateGateway.put(ManageLocationsRoutes.getCountryData,
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

//!Error: "You do not have the required role to access this page.
export const deleteCountryData = async (
    countryName: string,
    toast?: (options?: UseToastOptions | undefined) => ToastId
    ) => {
    try {
        const requestConfig: any = {
            data: {
                name: countryName,
            }
        };

        await privateGateway.delete(ManageLocationsRoutes.getCountryData, requestConfig)
            .then(({ data }) => data.response)
            .then(({ data }) => {
                console.log(data);
            });
        await privateGateway.delete(ManageLocationsRoutes.getCountryData,
            // {
            //     name: countryName
            // }
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
};