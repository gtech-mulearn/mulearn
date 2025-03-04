import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";
import { NavigateFunction } from "react-router-dom";

type muid = UseStateFunc<string>;
export const connectDiscord = async (code: string) => {
    try {
        return await privateGateway
            .get(onboardingRoutes.connectDiscord, {
                params: {
                    code
                }
            })
            .then(response => {
                return response.status === 200;
            })
            .catch(err => {
                console.log(err);
                return false;
            });
    } catch (err: any) {
        return false;
    }
};
export const getInfo = (
    navigate: NavigateFunction,
    setMuid?: muid,
    onComplete?: Function
) => {
    privateGateway
        .get(dashboardRoutes.getInfo)
        .then((response: APIResponse<UserInfo>) => {
            localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.response)
            );
            if (response.data.response?.interest_selected) {
                toast.error(response.data.response?.interest_selected);
                navigate("/register/pathfinder?ruri=noredirect");
            }
            if (setMuid) setMuid(response.data.response.muid);
            if (onComplete) onComplete();
        })
        .catch(error => {
            console.log(error);
        });
};
