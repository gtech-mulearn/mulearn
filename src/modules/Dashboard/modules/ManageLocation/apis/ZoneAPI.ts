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
export const postZoneData = async (
    country: string,
    state: string,
    stateName: string
) => {
    try {
        await privateGateway
            .post(
                ManageLocationsRoutes.getZoneData
                    .replace("${country}", country)
                    .replace("${state}", state),
                {
                    name: stateName
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

//*NOT WORKING❌
export const putZoneData = async (
    country: string,
    state: string,
    oldName: string,
    newName: string
) => {
    try {
        await privateGateway
            .put(
                ManageLocationsRoutes.getZoneData
                    .replace("${country}", country)
                    .replace("${state}", state),
                {
                    state: state,
                    oldName: oldName,
                    newName: newName
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

//*NOT WORKING❌
export const deleteZoneData = async (
    country: string,
    state: string,
    zoneName: string
) => {
    try {
        const requestConfig: any = {
            data: {
                name: zoneName
            }
        };

        await privateGateway.delete(
            ManageLocationsRoutes.getZoneData
                .replace("${country}", country)
                .replace("${state}", state),
            requestConfig
        );
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
