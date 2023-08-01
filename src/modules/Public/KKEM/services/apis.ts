import {  NavigateFunction } from "react-router-dom";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { KKEMRoutes, dashboardRoutes } from "@/MuLearnServices/urls";

export const KKEMLogin = (
    emailOrMuid: string,
    password: string,
    toast: ToastAsPara,
    navigate: NavigateFunction,
    setIsLoading: (loading: boolean) => void,
    redirectPath: string
) => {
    console.log({emailOrMuid, password,integration:"DWMS"})
    setIsLoading(true);
    publicGateway
        .post(KKEMRoutes.userLogin, { emailOrMuid, password})
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
                toast({
                    title: "Login Successful",
                    description: "You have been logged in successfully",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
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
            setIsLoading(false);
            toast({
                title: error.response.data.message.general[0],
                status: "error",
                duration: 3000,
                isClosable: true
            });
        });
};