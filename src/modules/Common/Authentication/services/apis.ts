import { ToastId, UseToastOptions } from "@chakra-ui/react";
import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import {
    privateGateway,
    publicGateway
} from "../../../../services/apiGateways";
import { authRoutes, dashboardRoutes } from "../../../../services/urls";

type setMuID = React.Dispatch<React.SetStateAction<string>>;
type setStatus = React.Dispatch<React.SetStateAction<number>>;
type setHasError = React.Dispatch<React.SetStateAction<boolean>>;

export const forgetPassword = (
    emailOrMuid: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    navigate: NavigateFunction,
    setShowLoader: (showLoader: boolean) => void
) => {
    setShowLoader(true);
    privateGateway
        .post(dashboardRoutes.forgetPassword, { emailOrMuid })
        .then(response => {
            setShowLoader(false);
            toast({
                title: "Token Mail Sent",
                description:
                    "Kindly check your mail for the reset password link",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            setTimeout(() => {
                navigate("/login");
            }, 4000);
        })
        .catch(error => {
            setShowLoader(false);
            toast({
                title: error.response?.data?.message?.general[0],
                status: "error",
                duration: 3000,
                isClosable: true
            });
        });
};

export const login = (
    emailOrMuid: string,
    password: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    navigate: NavigateFunction,
    setIsLoading: (loading: boolean) => void,
    redirectPath: string
) => {
    setIsLoading(true);
    publicGateway
        .post(authRoutes.login, { emailOrMuid, password })
        .then(response => {
            if (response.data.hasError == false) {
                console.log("=======> Login Res: ", response.data.response);

                console.log(response.data.response.accessToken);
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
                        console.log(response);
                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(response.data.response)
                        );
                        if (response.data.response.exist_in_guild) {
                            navigate("/profile");
                        } else {
                            // navigate("/connect-discord");
                            navigate(`/${redirectPath}`);
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

export const getMuid = (
    token: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    navigate: NavigateFunction,
    setMuID: setMuID
) => {
    privateGateway
        .post(dashboardRoutes.resetPasswordVerify.replace("${token}", token))
        .then(response => {
            console.log(response.data);
            toast({
                title: "User Verified",
                description:
                    "Your Token has been validated,reset your password",
                status: "success",
                duration: 5000,
                isClosable: true
            });
            setMuID(response.data.response.muid);
        })
        .catch(error => {
            toast({
                title: "Invalid Token",
                description:
                    "Make sure you entered the correct token, try again",
                status: "error",
                duration: 4000,
                isClosable: true
            });

            setTimeout(() => {
                navigate("/forgot-password");
            }, 5000);
        });
};

export const resetPassword = (
    token: string,
    password: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    navigate: NavigateFunction
) => {
    privateGateway
        .post(dashboardRoutes.resetPassword.replace("${token}", token), {
            password
        })
        .then(response => {
            if (response.data.statusCode === 200) {
                toast({
                    title: "Password Reset Successful",
                    description: "You will be redirected to login page shortly",
                    status: "success",
                    duration: 3000,
                    isClosable: true
                });
                setTimeout(() => {
                    navigate("/login");
                }, 4000);
            }
        })
        .catch(error => {
            toast({
                title: "Invalid Token",
                description:
                    "Kindly request for a new token, you will be redirected.",
                status: "error",
                duration: 3000,
                isClosable: true
            });
            setTimeout(() => {
                navigate("/forgot-password");
            }, 4000);
        });
};

export const requestEmailOrMuidOtp = (
    emailOrMuid: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    setHasError: setHasError,
    setStatus: setStatus,
    setOtpLoading: (otpLoading: boolean) => void,
    setOtpError: (otpError: boolean) => void
) => {
    setOtpLoading(true);
    publicGateway
        .post(authRoutes.requestEmailOrMuidOtp, { emailOrMuid })
        .then(response => {
            setOtpLoading(false);
            setStatus(response.data.statusCode);
            if (response.data.hasError == false) {
                setOtpError(false);
                setHasError(false);
                toast({
                    title: "OTP Sent",
                    description: "OTP has been sent to your email",
                    status: "success",
                    duration: 5000,
                    isClosable: true
                });
            }
        })
        .catch(error => {
            setOtpLoading(false);
            setOtpError(true);
            toast({
                title: "Invalid Email or Muid",
                description: "Kindly enter a valid email or Muid",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        });
};

export const otpVerification = (
    emailOrMuid: string,
    otp: string,
    toast: (options?: UseToastOptions | undefined) => ToastId,
    navigate: NavigateFunction,
    setOtpVerifyLoading: (otpverifyLoading: boolean) => void,
    redirectPath: string
) => {
    setOtpVerifyLoading(true);
    publicGateway
        .post(authRoutes.otpVerification, { emailOrMuid, otp })
        .then(response => {
            console.log(response.data);
            localStorage.setItem(
                "accessToken",
                response.data.response.accessToken
            );
            localStorage.setItem(
                "refreshToken",
                response.data.response.refreshToken
            );
            if (response.data.hasError == false) {
                setOtpVerifyLoading(false);
                toast({
                    title: "OTP verified",
                    description: "You will be redirected to home page",
                    status: "success",
                    duration: 5000,
                    isClosable: true
                });
            }
            privateGateway
                .get(dashboardRoutes.getInfo)
                .then(response => {
                    console.log(response);
                    localStorage.setItem(
                        "userInfo",
                        JSON.stringify(response.data.response)
                    );
                    if (response.data.response.exist_in_guild) {
                        navigate("/profile");
                    } else {
                        if (redirectPath) {
                            navigate(`/${redirectPath}`);
                        } else {
                            navigate("/connect-discord");
                        }
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            setOtpVerifyLoading(false);
            toast({
                title: "Invalid OTP",
                description: "Kindly enter a valid OTP",
                status: "error",
                duration: 5000,
                isClosable: true
            });
        });
};
