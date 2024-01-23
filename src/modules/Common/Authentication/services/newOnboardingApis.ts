import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { showToasts } from "@/MuLearnServices/common_functions";
import { KKEMRoutes, onboardingRoutes } from "@/MuLearnServices/urls";

import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { bool, boolean } from "yup";
import { getInfo } from "../../../Dashboard/modules/ConnectDiscord/services/apis";
import { DWMSDetails } from "./onboardingApis";
import toast from "react-hot-toast";

export const validate = async ({
    userData,
    setIsSubmitting
}: {
    userData: Object;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}): Promise<boolean> => {
    let returnval = false;
    try {
        setIsSubmitting(true);
        await privateGateway.put(onboardingRoutes.validate, userData);
        returnval = true;
        setIsSubmitting(false);
    } catch (err: any) {
        setIsSubmitting(false);
        const messages = err.response.data.message.general[0];
        console.log("validate - messages", messages);
        showToasts({
            messages: messages
        });
    }
    return returnval;
};

export const createAccount = async ({
    userData,
    setIsSubmitting,
    navigate
}: {
    userData: Object;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    navigate: NavigateFunction;
}) => {
    setIsSubmitting(true);
    console.log("UserData", userData);

    try {
        const response = await publicGateway.post(
            onboardingRoutes.register,
            userData
        );
        const tokens = response.data.response;
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        getInfo(() => {
            navigate("/role");
        });
    } catch (err: any) {
        const messages = err.response.data.message.general[0];
        showToasts({
            messages: messages
        });
    }
    setIsSubmitting(false);
};

export const getRoles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await publicGateway.get(onboardingRoutes.roles);
            const roles = response.data.response.roles;
            resolve(roles);
        } catch (err) {
            console.log("getRoles Error", err);
            reject(err);
        }
    });
};

export const getInterestGroups = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await publicGateway.get(
                onboardingRoutes.areaOfInterestList
            );
            const interestGroups = response.data.response.aois;
            resolve(interestGroups);
        } catch (err) {
            console.log("getInterestGroups Error", err);
            reject(err);
        }
    });
};

export const getColleges = async ({
    setIsLoading,
    setColleges
}: {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setColleges: Dispatch<SetStateAction<any[]>>;
}) => {
    try {
        const response = await publicGateway.get(onboardingRoutes.colleges);
        const colleges = response.data.response.colleges;
        setColleges(colleges);
        setIsLoading(false);
    } catch (err: any) {
        console.log("getColleges Error", err);
    }
};

export const getDepartments = async ({
    setIsLoading,
    setDepartments
}: {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setDepartments: Dispatch<SetStateAction<any[]>>;
}) => {
    try {
        const response = await publicGateway.get(onboardingRoutes.departments);
        const departments = response.data.response.departments;

        setDepartments(departments);
        setIsLoading(false);
    } catch (err: any) {
        console.log("getColleges Error", err);
    }
};

export const getCompanies = async ({
    setIsLoading,
    setCompanies
}: {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setCompanies: Dispatch<SetStateAction<any[]>>;
}) => {
    try {
        const response = await publicGateway.get(onboardingRoutes.companies);
        const companies = response.data.response.companies;

        setCompanies(companies);
        setIsLoading(false);
    } catch (err: any) {
        console.log("getCompanies Error", err);
    }
};

export const submitUserData = async ({
    setIsLoading,
    userData,
    navigate
}: {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    userData: Object;
    navigate: NavigateFunction;
}) => {
    console.log("UserData", userData);
    try {
        setIsLoading(true);
        const res = await privateGateway.post(
            onboardingRoutes.register,
            userData
        );
        const tokens = res.data.response;
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        getInfo(() => navigate("/dashboard/connect-discord"));
    } catch (err: any) {
        setIsLoading(false);
        const messages = err.response.data.message.general[0];
        showToasts({
            messages: messages
        });
    }
};

export const getDWMSDetails = (
    param: string | null,
    setDWMSDetails: (data: DWMSDetails) => void
) => {
    publicGateway
        .get(
            KKEMRoutes.getDWMSDetails.replace(
                "${param}",
                param === null ? "" : param
            )
        )
        .then(response => {
            const {
                job_seeker_fname,
                job_seeker_lname,
                email_id,
                mobile_no,
                gender,
                dob,
                key_skills,
                param,
                job_seeker_id
            } = response.data.response.registration;
            const dwmsDetails: DWMSDetails = {
                job_seeker_fname,
                job_seeker_lname,
                email_id,
                mobile_no,
                gender,
                dob,
                key_skills,
                param,
                job_seeker_id
                // Initialize other fields here
            };
            setDWMSDetails(dwmsDetails);
        })
        .catch((error: APIError) => {
            const errorMessage =
                (error.response.data as { message?: { general?: string[] } })
                    .message?.general?.[0] || "An error occurred";
            //close the toast
            toast.dismiss();
            toast.error(errorMessage);
        });
};
