import { AxiosError } from "axios";
import { privateGateway } from "../../../../services/apiGateways";
import { ManageLocationsRoutes } from "../../../../services/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";
import { Dispatch, SetStateAction } from "react";

export const getCountryData = async (
    setData: any,
    setTotalPages?: any,
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

export const postCountryData = async (
    countryName:string
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
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
}