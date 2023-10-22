import { privateGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";

export interface Option {
    value: string;
    label: string;
}

export const getCountryOptions = async (): Promise<Option[]> => {
    try {
        const response = await privateGateway.get(onboardingRoutes.countryList);
        return response.data.response.countries
            .sort((a: any, b: any) => a.name.localeCompare(b.name))
            .map((country: any) => ({
                value: country.id,
                label: country.name
            }));
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
        throw err;
    }
};

export const getStateOptions = async (country: string): Promise<Option[]> => {
    try {
        const response = await privateGateway.post(onboardingRoutes.stateList, {
            country: country
        });
        return response.data.response.states
            .sort(
                (
                    a: { id: string; name: string },
                    b: { id: string; name: string }
                ) => a.name.localeCompare(b.name)
            )
            .map((state: { id: any; name: any; }) => ({
                value: state.id,
                label: state.name
            }));
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
        throw err;
    }
};

export const getDistrictOptions = async (state: string): Promise<Option[]> => {
    try {
        const response = await privateGateway.post(
            onboardingRoutes.districtList,
            {
                state: state
            }
        );
        return response.data.response.districts
            .sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name))
            .map((district: { id: any; name: any; }) => ({
                value: district.id,
                label: district.name
            }));
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
        throw err;
    }
};