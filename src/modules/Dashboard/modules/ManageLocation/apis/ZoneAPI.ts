import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

//*WORKING✅
export const getZoneData = async (
    country: string,
    state: string,
    setData: UseStateFunc<any>,
    setTotalPages?: UseStateFunc<any>
) => {
    try {
        await privateGateway
            .get(ManageLocationsRoutes.getZoneData.replace("${state}", state))
            .then(({ data }) => data.response)
            .then(({ data }) => {
                setData(data);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            // alert(error?.response?.data?.message.general[0]);
            console.log(error.response);
        }
    }
};

//*NOT WORKING❌
export const postZoneData = async (state: string, stateName: string) => {
    try {
        await privateGateway
            .post(ManageLocationsRoutes.patchZoneData.replace("${zone}/", ""), {
                state: state,
                name: stateName
            })
            .then(({ data }) => data.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//*WORKING ✅
export const patchZoneData = async (
    country: string,
    state: string,
    zoneID: string,
    newName: string
) => {
    try {
        await privateGateway
            .patch(
                ManageLocationsRoutes.patchZoneData.replace("${zone}", zoneID),
                {
                    state: state,
                    id: zoneID,
                    name: newName
                }
            )
            .then(({ data }) => data.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//*WORKING ✅
export const deleteZoneData = async (zoneName: string) => {
    try {
        await privateGateway.delete(
            ManageLocationsRoutes.patchZoneData.replace("${zone}", zoneName)
        );
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
