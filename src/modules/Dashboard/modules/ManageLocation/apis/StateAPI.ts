import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

//*WORKING✅
export const getStateData = async (
    setData?: UseStateFunc<any>,
    country?: string,
    toast?: (options?: UseToastOptions | undefined) => ToastId,
    perPage?: number,
    page?: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string
) => {
    try {
        const data = (
            await privateGateway.get(
                ManageLocationsRoutes.getStateData.replace(
                    "${country}/",
                    country ? country + "/" : ""
                ),
                {
                    params: {
                        perPage: perPage,
                        pageIndex: page,
                        search: search,
                        sortBy: sortID
                    }
                }
            )
        ).data.response;

        if (setTotalPages) setTotalPages(data.pagination.totalPages);
        if (setData) setData(data.data);
        else return data.data;
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
export const postStateData = async (country: string, stateName: string) => {
    try {
        await privateGateway
            .post(
                ManageLocationsRoutes.patchStateData.replace("${state}/", ""),
                {
                    country: country,
                    label: stateName
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
            .delete(ManageLocationsRoutes.patchStateData + `${stateID}`)
            .then(({ data }) => console.log(data.message.general[0]));
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
