import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

//* WORKING✅
export const getCountryData = async (
    setData?: UseStateFunc<any>,
    toast?: (options?: UseToastOptions | undefined) => ToastId,
    perPage?: number,
    page?: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string
) => {
    try {
        const data = (
            await privateGateway.get(ManageLocationsRoutes.getCountryData, {
                params: {
                    perPage: perPage,
                    pageIndex: page,
                    search: search,
                    sortBy: sortID
                }
            })
        ).data.response;

        if (setTotalPages) setTotalPages(data.pagination.totalPages);
        if (setData) setData(data.data);
        else {
            return data.data;
        }
    } catch (err: any) {
        if (err?.response) {
            const errorMsg = err.response?.data?.message?.general[0] ?? "";
            if (!toast) return console.log(errorMsg);
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }
};

//*WORKING ✅
export const postCountryData = async (
    countryName: string,
    toast: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        await privateGateway
            .post(ManageLocationsRoutes.getCountryData, {
                label: countryName
            })
            .then(({ data }) => data.response)
            .then(({ data }) => {
                console.log(data);
            });
    } catch (err: any) {
        if (err?.response) {
            const errorMsg = err.response.data.message.general[0];
            toast({
                title: `Error`,
                description: errorMsg,
                status: "error",
                duration: 3000,
                isClosable: true
            });
        }
    }
};

//*WORKING ✅
export const patchCountryData = async (
    countryID: string,
    newName: string,
    toast?: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        console.log(countryID);
        await privateGateway
            .patch(ManageLocationsRoutes.patchCountryData + `${countryID}/`, {
                id: countryID,
                label: newName
            })
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
export const deleteCountryData = async (
    id: string,
    toast?: (options?: UseToastOptions | undefined) => ToastId
) => {
    try {
        await privateGateway
            .delete(
                ManageLocationsRoutes.patchCountryData + `${id}`
                // {
                //     name: countryName
                // }
            )
            .then(({ data }) => data.response)
            .then(({ data }) => {
                console.log(data);
                window.location.reload(); // TODO: Temporary fix, better solution needed (delete takes time, API fetch after delete doesnt give the omitted data)
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
