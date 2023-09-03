import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

//*WORKING✅
export const getStateData = async (
    country: string,
    setData: UseStateFunc<any>,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    perPage?: number,
    page?: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string
) => {
    try {
        await privateGateway
            .get(
                ManageLocationsRoutes.getStateData.replace(
                    "${country}",
                    country
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
            .then(({ data }) => data.response)
            .then(({ data, pagination }) => {
                console.log(data);
                setData(data);
                if (setTotalPages) setTotalPages(pagination.totalPages);
            });
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
