import { AxiosError, AxiosRequestConfig } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { ManageLocationsRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

// Cache for state data
const stateCache = new Map<string, {
    data: any[];
    totalPages: number;
    timestamp: number;
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

//*WORKING✅
export const getStateData = async (
    setData?: UseStateFunc<any>,
    country?: string,
    perPage?: number,
    page?: number,
    setTotalPages?: UseStateFunc<number>,
    search?: string,
    sortID?: string
) => {
    try {
        const cacheKey = `${country}-${perPage}-${page}-${search}-${sortID}`;
        const cachedData = stateCache.get(cacheKey);
        
        // Return cached data if available and not expired
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
            if (setTotalPages) setTotalPages(cachedData.totalPages);
            if (setData) setData(cachedData.data);
            else return cachedData.data;
            return;
        }

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

        // Cache the new data
        stateCache.set(cacheKey, {
            data: data.data,
            totalPages: data.pagination.totalPages,
            timestamp: Date.now()
        });

        if (setTotalPages) setTotalPages(data.pagination.totalPages);
        if (setData) setData(data.data);
        else return data.data;
    } catch (err: any) {
        if (err?.response) {
            const errorMsg = err.response?.data?.message?.general[0] ?? "";
            toast.error(errorMsg);
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
            .patch(ManageLocationsRoutes.patchStateData + `${stateID}/`, {
                // country: country,
                id: stateID,
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
