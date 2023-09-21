import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/toast";

//*WORKING✅
export const getZoneData = async (
    setData?: UseStateFunc<any>,
    state?: string,

    perPage?: number,
    page?: number,
    setTotalPages?: UseStateFunc<any>,
    search?: string,
    sortID?: string
) => {
    try {
        const data = (
            await privateGateway.get(
                ManageLocationsRoutes.getZoneData.replace(
                    "${state}/",
                    state ? state + "/" : ""
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
        console.log(data.data);
        if (setTotalPages) setTotalPages(data.pagination.totalPages);
        if (setData) setData(data.data);
        else return data.data;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            // alert(error?.response?.data?.message.general[0]);
            console.log(error.response);
        }
    }
};

//*WORKING ✅
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
