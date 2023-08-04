import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";
import { SetStateAction, useState } from "react";

interface Option {
    value: string;
    label: string;
}
export const fetchLC = async (
    setData: React.Dispatch<any>,
    ig: string,
    campus: string,
    district: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.getCampusLearningCircles + "list" + "/",
            {
                ig_id: ig,
                org_id: campus,
                district_id: district
            }
        );
        setData(response.data.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const fetchCountryOptions = async (
    setCountry: React.Dispatch<SetStateAction<Option[]>>
) => {
    try {
        const response = await privateGateway.get(onboardingRoutes.countryList);
        setCountry(
            response.data.response.countries
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((country: any) => ({
                    value: country.id,
                    label: country.name
                }))
        );
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const fetchStateOptions = async (
    country: string,
    setState: React.Dispatch<SetStateAction<Option[]>>
) => {
    try {
        const response = await privateGateway.post(onboardingRoutes.stateList, {
            country: country
        });
        const message: any = response?.data;
        setState(
            response.data.response.states
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((sate: any) => ({
                    value: sate.id,
                    label: sate.name
                }))
        );
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const fetchDistrictOptions = async (
    state: string,
    setDistrict: React.Dispatch<SetStateAction<Option[]>>
) => {
    try {
        const response = await privateGateway.post(
            onboardingRoutes.districtList,
            {
                state: state
            }
        );
        setDistrict(
            response.data.response.districts
                .sort((a: any, b: any) => a.name.localeCompare(b.name))
                .map((sate: any) => ({
                    value: sate.id,
                    label: sate.name
                }))
        );
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

type getAPI = (
    value: SetStateAction<
        {
            id: string;
            title: string;
        }[]
    >
) => void;
export const fetchCampusOptions = async (
    district: string,
    setCampus: React.Dispatch<SetStateAction<Option[]>>
) => {
    try {
        const response = await privateGateway.post(
            onboardingRoutes.collegeList,
            {
                district: district
            }
        );
        const colleges = response.data.response.colleges;
        setCampus(
            colleges
                .sort((a: any, b: any) => a.title.localeCompare(b.title))
                .map((college: any) => ({
                    value: college.id,
                    label: college.title
                }))
        );
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};

export const getInterestGroups = async () => {
    try {
        const response = (await privateGateway.get(dashboardRoutes.getTaskIGs))
            ?.data?.response;
        return response?.map((obj: any) => ({
            value: obj.id,
            label: obj.name
        }));
    } catch (err) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};