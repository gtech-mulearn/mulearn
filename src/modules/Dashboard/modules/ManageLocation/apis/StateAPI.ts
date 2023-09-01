import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

//*WORKING✅
export const getStateData = async (
    country: string,
    setData: UseStateFunc<any>,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    setTotalPages?: UseStateFunc<any>
) => {
    try {
        await privateGateway
            .get(
                ManageLocationsRoutes.getStateData.replace(
                    "${country}",
                    country
                )
            )
            .then(({ data }) => data.response)
            .then(({ data }) => {
                console.log(data);
                setData(data);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            alert(error.response);
        }
    }
};

//*WORKING ✅
export const postStateData = async (country: string, stateName: string) => {
    try {
        await privateGateway
            .post(
                ManageLocationsRoutes.patchStateData.replace("${state}/", ""),
                {
                    country: country,
                    name: stateName
                }
            )
            .then(({ data }) => data.response)
            .then(({ data }) => {
                console.log(data);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//*WORKING ✅
export const patchStateData = async (
    country: string,
    stateID: string,
    newName: string
) => {
    try {
        await privateGateway
            .patch(
                ManageLocationsRoutes.patchStateData.replace(
                    "${state}",
                    stateID
                ),
                {
                    country: country,
                    id: stateID,
                    name: newName
                }
            )
            .then(({ data }) => data.response)
            .then(({ data }) => {
                console.log(data);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

//*WORKING ✅
export const deleteStateData = async (stateID: string) => {
    try {
        await privateGateway
            .delete(
                ManageLocationsRoutes.patchStateData.replace(
                    "${state}",
                    stateID
                )
            )
            .then(({ data }) => console.log(data.message.general[0]));
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
