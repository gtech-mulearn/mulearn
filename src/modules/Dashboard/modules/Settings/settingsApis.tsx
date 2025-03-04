import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";
import { Dispatch, SetStateAction } from "react";
import { NavigateFunction } from "react-router-dom";

export const selectOrganization = async ({
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
            "/api/v1/dashboard/user/organization/",
            userData
        );
        if (res.status == 200 && !res.data.hasError) {
            toast.success(res.data.message.general[0]);
        } else {
            toast.error("Org link failed");
        }
        setIsLoading(false);
    } catch (err: any) {
        toast.error("Unable to select college.");
    }
};
