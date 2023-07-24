import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { SetStateAction } from "react";
import { HackList } from "../services/HackathonInterface";

export const getHackathons = async (
    setData: React.Dispatch<SetStateAction<HackList[]>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getHackathons
        );
        const defaultForm: any = response?.data;
        setData(defaultForm.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};

export const getOwnHackathons = async (
    setOwnData: React.Dispatch<SetStateAction<HackList[]>>
) => {
    try {
        const response = await privateGateway.get(
            dashboardRoutes.getOwnHackathons
        );
        const defaultForm: any = response?.data;
        setOwnData(defaultForm.response);
		console.log(defaultForm.response);
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            console.log(error.response);
        }
    }
};
