import { AxiosError } from "axios";
import { privateGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";
import { SetStateAction } from "react";
import { HackList } from "./Hackathon";

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
