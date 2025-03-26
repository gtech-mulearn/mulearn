import { AxiosError } from "axios";
import axios from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, organizationRoutes } from "@/MuLearnServices/urls";

// Add debounce utility
const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// Cache for dashboard data
const dashboardCache = new Map<string, {
    data: any[];
    totalPages: number;
    timestamp: number;
}>();

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const getzonaldashboard = async (
    activeTab: string,
    setData: any,
    page: number,
    selectedValue: number,
    setTotalPages?: any,
    search?: string,
    sortID?: string
) => {
    try {
        const cacheKey = `${activeTab}-${page}-${selectedValue}-${search}-${sortID}`;
        const cachedData = dashboardCache.get(cacheKey);
        
        // Return cached data if available and not expired
        if (cachedData && Date.now() - cachedData.timestamp < CACHE_DURATION) {
            setData(cachedData.data);
            if (setTotalPages) setTotalPages(cachedData.totalPages);
            return;
        }

        const endpoint = activeTab === "Student management" 
            ? dashboardRoutes.zonalStudentDetails 
            : dashboardRoutes.zonalCampusDetails;

        const response = await privateGateway.get(endpoint, {
            params: {
                perPage: selectedValue,
                pageIndex: page,
                search: search,
                sortBy: sortID
            }
        });

        const data = response.data.response;
        
        // Cache the new data
        dashboardCache.set(cacheKey, {
            data: data.data,
            totalPages: data.pagination.totalPages,
            timestamp: Date.now()
        });

        setData(data.data);
        if (setTotalPages) setTotalPages(data.pagination.totalPages);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

// Debounced version of getzonaldashboard
export const debouncedGetZonalDashboard = debounce(getzonaldashboard, 300);

interface CountryProps {
    id: string;
    name: string;
    updated_at: string;
    created_at: string;
    updated_by: string;
    created_by: string;
}

export const getAffiliation = async (setAffiliationData: any) => {
    try {
        await privateGateway
            .get(organizationRoutes.getAffiliation)
            .then(
                (
                    response: APIResponse<{
                        data: { affiliation: CountryProps[] };
                    }>
                ) => {
                    return response.data;
                }
            )
            .then(data => {
                const affiliation = data.response.data.affiliation;
                setAffiliationData(affiliation);
            });
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

// Add cache for location data
const locationCache = {
    countries: null as CountryProps[] | null,
    states: new Map<string, CountryProps[]>(),
    zones: new Map<string, CountryProps[]>(),
    districts: new Map<string, CountryProps[]>()
};

export const getCountry = async (setCountryData: any) => {
    try {
        // Return cached data if available
        if (locationCache.countries) {
            setCountryData(locationCache.countries);
            return;
        }

        const response = await privateGateway.get(organizationRoutes.getLocation + "/countries/");
        const countries = response.data.response.data;
        locationCache.countries = countries;
        setCountryData(countries);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const getStates = async (country: string, setStatesData: any) => {
    try {
        // Return cached data if available
        const cacheKey = country;
        if (locationCache.states.has(cacheKey)) {
            setStatesData(locationCache.states.get(cacheKey));
            return;
        }

        const response = await privateGateway.get(`${organizationRoutes.getLocation}/${country}/states`);
        const states = response.data.response.data.states;
        locationCache.states.set(cacheKey, states);
        setStatesData(states);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const getZones = async (country: string, state: string, setZonesData: any) => {
    try {
        // Return cached data if available
        const cacheKey = `${country}-${state}`;
        if (locationCache.zones.has(cacheKey)) {
            setZonesData(locationCache.zones.get(cacheKey));
            return;
        }

        const response = await privateGateway.get(`${organizationRoutes.getLocation}/${country}/${state}/zone`);
        const zones = response.data.response.data.states;
        locationCache.zones.set(cacheKey, zones);
        setZonesData(zones);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const getDistricts = async (country: string, state: string, zone: string, setDistrictsData: any) => {
    try {
        // Return cached data if available
        const cacheKey = `${country}-${state}-${zone}`;
        if (locationCache.districts.has(cacheKey)) {
            setDistrictsData(locationCache.districts.get(cacheKey));
            return;
        }

        const response = await privateGateway.get(
            `${organizationRoutes.getLocation}/${country}/${state}/${zone}/district`
        );
        const districts = response.data.response.data.states;
        locationCache.districts.set(cacheKey, districts);
        setDistrictsData(districts);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const getInfo = async (code: string) => {
    try {
        const response = await privateGateway.post(
            `${organizationRoutes.postGetInfo}${code}/`
        );
        return response.data.response.institution;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const getStudentLevels = async (errHandler: (err: string) => void) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getZonalStudentLevels
        );
        const data = response.data.response;
        //Combining all colleges student levels into one
        return [
            [
                " ",
                data[2].students_count,
                data[3].students_count,
                data[0].students_count,
                data[1].students_count
            ]
        ];
    } catch (err: any) {
        errHandler((err as AxiosError).message);
        return [];
    }
};

export const getTopDistrict = async (errHandler: (err: string) => void) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getZonalTopDistrict
        );
        const data = response.data.response;
        const returnData: any[] = [["Districts"], [" "]];
        for (let item of data) {
            returnData[0].push(item.district);
            returnData[1].push(item.karma);
        }
        return returnData;
    } catch (err: any) {
        errHandler(err);
        return [];
    }
};
