import { privateGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const selectDomainCategory = async (data: { domains: string[] }) => {
    try {
        const response = await privateGateway.post(
            onboardingRoutes.register + 'select-domains',
            data
        );

        toast.success("Domain Changes Successfully");
        const message: any = response?.data;
    } catch (err: unknown) {
        const error = err as AxiosError;
        if (error?.response) {
            throw error;
        }

        toast.error("Delete Failed");
    }
};