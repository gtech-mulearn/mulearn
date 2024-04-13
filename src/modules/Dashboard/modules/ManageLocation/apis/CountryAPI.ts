import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

//* WORKING✅
export const getCountryData = async (
    setData?: UseStateFunc<any>,
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

        if (setTotalPages) {
            setTotalPages(data.pagination.totalPages);
        }
        if (setData) {
            setData(data.data);
        } else {
            return data.data;
        }
    } catch (err: any) {
        if (err?.response) {
            const errorMsg = err.response?.data?.message?.general[0] ?? "";
            toast.error(errorMsg);
        }
    }
};

//*WORKING ✅
export const postCountryData = async (countryName: string) => {
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

            toast.error(errorMsg);
        }
    }
};

//*WORKING ✅
export const patchCountryData = async (countryID: string, newName: string) => {
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
export const deleteCountryData = async (id: string) => {
    try {
        await privateGateway
            .delete(
                ManageLocationsRoutes.patchCountryData + `${id}/`
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
