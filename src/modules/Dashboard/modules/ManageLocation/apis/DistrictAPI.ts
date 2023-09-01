import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

//*WORKING✅
export const getDistrictData = async (
    country: string,
    state: string,
    zone: string,
    setData: UseStateFunc<any>,
    setTotalPages?: UseStateFunc<any>
) => {
    try {
        await privateGateway
            .get(ManageLocationsRoutes.getDistrictData.replace("${zone}", zone))
            .then(({ data }) => data.response)
            .then(({ data }) => {
                setData(data);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
    }
};

//!Error : "You do not have the required role to access this page."
//*NOT WORKING ❌
export const postDistrictData = async (
    country: string,
    state: string,
    zone: string,
    stateName: string
) => {
    try {
        await privateGateway
            .post(
                ManageLocationsRoutes.getDistrictData
                    .replace("${country}", country)
                    .replace("${state}", state)
                    .replace("${zone}", zone),
                {
                    name: stateName
                }
            )
            .then(({ data }) => data.response)
            .then(({ data }) => {});
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//*NOT WORKING ❌
export const patchDistrictData = async (
    districtID: string,
    newName: string
) => {
    try {
        await privateGateway
            .patch(
                ManageLocationsRoutes.patchDistrictData.replace(
                    "${district}",
                    districtID
                ),
                {
                    id: districtID,
                    name: newName
                }
            )
            .then(({ data }) => data.response)
            .then(({ data }) => {});
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//* NOT WORKING ❌
export const deleteDistrictData = async (
    country: string,
    state: string,
    zone: string,
    districtName: string
) => {
    try {
        const requestConfig: any = {
            data: {
                name: districtName
            }
        };

        await privateGateway.delete(
            ManageLocationsRoutes.getDistrictData
                .replace("${country}", country)
                .replace("${state}", state)
                .replace("${zone}", zone),
            requestConfig
        );
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
