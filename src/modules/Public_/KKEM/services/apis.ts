import { NavigateFunction } from "react-router-dom";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { KKEMRoutes, dashboardRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

export const KKEMLogin = (
    emailOrMuid: string,
    password: string,
    navigate: NavigateFunction,
    setIsLoading: UseStateFunc<boolean>,
    redirectPath: string,
    param?: string
) => {
    setIsLoading(true);
    publicGateway
        .post(KKEMRoutes.userLogin, { emailOrMuid, password, param })
        .then(response => {
            if (response.data.hasError == false) {
                localStorage.setItem(
                    "accessToken",
                    response.data.response.accessToken
                );
                localStorage.setItem(
                    "refreshToken",
                    response.data.response.refreshToken
                );

                toast.success("You have been logged in successfully");
                if (response.data.response.data.verified) {
                    toast.success(
                        "Your account has been verified successfully and connected with KKEM"
                    );
                } else if (response.data.response.data.verified) {
                    toast.success(
                        "There was an error while verifying your account. Please try again later."
                    );
                }
                privateGateway
                    .get(dashboardRoutes.getInfo)
                    .then(response => {
                        //console.log(response);
                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(response.data.response)
                        );
                        if (response.data.response.exist_in_guild) {
                            navigate("/dashboard/learning-circle");
                        } else {
                            if (redirectPath) {
                                // navigate(`/${redirectPath}`);
                                navigate("/dashboard/learning-circle");
                            } else {
                                navigate("/dashboard/learning-circle");
                            }
                        }
                    })
                    .catch(error => {
                        console.log(error);
                        setIsLoading(false);
                    });
            }
        })
        .catch(error => {
            console.log(error);
            setIsLoading(false);

            toast.error(error.response.data.message.general[0]);
        });
};
