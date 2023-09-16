import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import { Option } from "../pages/LearningCircleFilter";
import { AxiosError } from "axios";

export const fetchDistrictOptions = async (
    state: string,
    setDistrict: UseStateFunc<Option[]>
) => {
    try {
        const response = (await privateGateway.post(
            onboardingRoutes.districtList,
            {
                state: state
            }
        )) as APIResponse<{ districts: { id: string; name: string }[] }>;
        setDistrict(
            response.data.response.districts
                .sort((a, b) => a.name.localeCompare(b.name))
                .map(sate => ({
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

export const fetchCampusOptions = async (
    district: string,
    setCampus: UseStateFunc<Option[]>
) => {
    try {
        const response = (await privateGateway.post(
            onboardingRoutes.collegeList,
            {
                district: district
            }
        )) as APIResponse<{ colleges: { id: string; title: string }[] }>;
        const colleges = response.data.response.colleges;
        setCampus(
            colleges
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(college => ({
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
        const response = (await privateGateway.get(dashboardRoutes.getCampusIg))
            ?.data?.response.interestGroup as { id: string; name: string }[];
        return response?.map(obj => ({
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

export const fetchLCFull = async (
    setData: UseStateFunc<any>,
    campus: string,
    district: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.listLearningCircle ,
            {
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

export const fetchInterestGroupLc = async (
    setData: UseStateFunc<any>,
    ig: string | null,
    campus: string,
    district: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.listLearningCircle ,
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
export const fetchDistrictLc = async ( 
    setLc: UseStateFunc<any>,
    district: string
) => {
    try {
        const response = await privateGateway.post(
            dashboardRoutes.listLearningCircle ,
            {
                district_id: district
            }
        );
        setLc(response.data.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }
    }
};