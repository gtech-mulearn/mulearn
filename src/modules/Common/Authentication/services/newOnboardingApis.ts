import { publicGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";
import { getInfo } from "../../../Dashboard/modules/ConnectDiscord/services/apis";

export const createAccount = async ({
    userData,
    setIsSubmitting,
    toast,
    navigate
}: {
    userData: Object;
    setIsSubmitting: Dispatch<SetStateAction<boolean>>;
    toast: (options?: UseToastOptions | undefined) => ToastId;
    navigate: NavigateFunction;
}) => {
    setIsSubmitting(true);
    console.log("UserData", userData);

    try {
        const response = await publicGateway.post(
            onboardingRoutes.createAccount,
            userData
        );
        const tokens = response.data.response;
        console.log("createAccount - response.data.response", tokens);
        localStorage.setItem("accessToken", tokens.accessToken);
        localStorage.setItem("refreshToken", tokens.refreshToken);
        getInfo(() => navigate("/role"));
    } catch (err: any) {
        const messages = err.response.data.message.general[0];
        console.log("Create Account Error", messages[0]);
        Object.entries(messages).forEach(([fieldName, errorMessage]) => {
            if (Array.isArray(errorMessage)) {
                toast({
                    title: errorMessage?.join(", ") || "",
                    status: "error",
                    isClosable: true
                });
            }
        });
    }
    setIsSubmitting(false);
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
        console.log("getColleges - ", colleges);
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
        console.log("getDepartments - ", departments);
        setDepartments(departments);
        setIsLoading(false);
    } catch (err: any) {
        console.log("getColleges Error", err);
    }
};
