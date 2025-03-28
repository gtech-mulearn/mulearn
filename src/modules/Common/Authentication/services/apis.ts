import { useNavigate, NavigateFunction } from "react-router-dom";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { authRoutes, dashboardRoutes } from "@/MuLearnServices/urls";
import { refreshRoles } from "@/MuLearnServices/authCheck";
import toast from "react-hot-toast";
import { useUserStore } from "/src/ZustandProvider";

export const forgetPassword = (
    emailOrMuid: string,
    navigate: NavigateFunction,
    setShowLoader: UseStateFunc<boolean>
) => {
    setShowLoader(true);
    privateGateway
        .post(dashboardRoutes.forgetPassword, { emailOrMuid })
        .then(response => {
            setShowLoader(false);
            toast.success("Kindly check your mail for the reset password link");
            setTimeout(() => {
                navigate("/login");
            }, 4000);
        })
        .catch(error => {
            setShowLoader(false);
            toast.error(
                error.response?.data?.message?.general[0]
                    ? error.response?.data?.message?.general[0]
                    : "Something went wrong"
            );
        });
};

type authRoutesLoginRes = APIResponse<{
    accessToken: string;
    refreshToken: string;
    expiry: string;
}>;

type authGetUserInfo = APIResponse<UserInfo>;

export const login = (
    emailOrMuid: string,
    password: string,
    navigate: NavigateFunction,
    setIsLoading: (value: boolean) => void,
    redirectPath: string
) => {
    setIsLoading(true);
    publicGateway
        .post(authRoutes.login, { emailOrMuid, password })
        .then((response: any) => {
            if (response.data.hasError === false) {
                localStorage.setItem(
                    "accessToken",
                    response.data.response.accessToken
                );
                localStorage.setItem(
                    "refreshToken",
                    response.data.response.refreshToken
                );
                toast.success("Login Successful");
                privateGateway
                    .get(dashboardRoutes.getInfo)
                    .then(async (response: any) => {
                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(response.data.response)
                        );
                        await privateGateway.get(dashboardRoutes.getUserProfile).then(response => {
                            useUserStore.setState((prev) => ({
                                ...prev,
                                userProfile: {
                                    ...response.data.response,
                                    first_name: response.data.response.full_name.split(" ")[0],
                                    college_id: response.data.response.college_id,
                                },
                            }));
                        });
                        if (redirectPath) {
                            navigate(`/${redirectPath}`);
                        } else if (response.data.response.exist_in_guild) {
                            navigate("/dashboard/home");
                        } else {
                            navigate("/dashboard/home"); 
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        setIsLoading(false);
                    });
            }
        })
        .catch((error) => {
            setIsLoading(false);
            if (error.response?.data) {
                toast.error(error.response.data.message.general[0]);
            } else {
                toast.error("Something went wrong");
            }
        });
};
export const getMuid = (
    token: string,
    navigate: NavigateFunction,
    setMuID: UseStateFunc<string>
) => {
    privateGateway
        .post(dashboardRoutes.resetPasswordVerify.replace("${token}", token))
        .then((response: APIResponse<{ muid: string }>) => {
            //console.log(response.data);
            toast.success("Token validated, reset your password");
            setMuID(response.data.response.muid);
        })
        .catch(error => {
            toast.error("Make sure you entered the correct token, try again");

            setTimeout(() => {
                navigate("/forgot-password");
            }, 5000);
        });
};

export const resetPassword = (
    token: string,
    password: string,
    navigate: NavigateFunction
) => {
    privateGateway
        .post(dashboardRoutes.resetPassword.replace("${token}", token), {
            password
        })
        .then((response: APIResponse<{}, {}>) => {
            if (response.data.statusCode === 200) {
                toast.success(
                    "Password Reset Successful, you will be redirected to login page shortly"
                );
                setTimeout(() => {
                    navigate("/login");
                }, 4000);
            }
        })
        .catch(error => {
            toast.error("Make sure you entered the correct token, try again");
            setTimeout(() => {
                navigate("/forgot-password");
            }, 4000);
        });
};

export const requestEmailOrMuidOtp = ({
    emailOrMuid,
    setHasError,
    setStatus,
    setOtpLoading,
    setOtpError,
    setDidOtpSent
}: {
    emailOrMuid: string;
    setHasError?: UseStateFunc<boolean>;
    setStatus?: UseStateFunc<number>;
    setOtpLoading: UseStateFunc<boolean>;
    setOtpError?: UseStateFunc<boolean>;
    setDidOtpSent?: UseStateFunc<boolean>;
}) => {
    setOtpLoading(true);
    publicGateway
        .post(authRoutes.requestEmailOrMuidOtp, { emailOrMuid })
        .then((response: APIResponse) => {
            setOtpLoading(false);
            setStatus && setStatus(response.data.statusCode);
            if (response.data.hasError == false) {
                setOtpError && setOtpError(false);
                setHasError && setHasError(false);
                setDidOtpSent && setDidOtpSent(true);
                toast.success("OTP has been sent to your email");
            }
        })
        .catch(error => {
            setOtpLoading(false);
            setOtpError && setOtpError(true);

            toast.error("Kindly enter a valid email or Muid");
        });
};

export const otpVerification = (
    emailOrMuid: string,
    otp: string,
    navigate: NavigateFunction,
    setOtpVerifyLoading: UseStateFunc<boolean>,
    redirectPath: string
) => {
    setOtpVerifyLoading(true);
    publicGateway
        .post(authRoutes.login, { emailOrMuid, otp })
        .then((response: authRoutesLoginRes) => {
            localStorage.setItem(
                "accessToken",
                response.data.response.accessToken
            );
            localStorage.setItem(
                "refreshToken",
                response.data.response.refreshToken
            );
            if (response.data.hasError === false) {
                setOtpVerifyLoading(false);
                toast.success("OTP verified, you will be redirected shortly");
            }
            privateGateway
                .get(dashboardRoutes.getInfo)
                .then((response: authGetUserInfo) => {
                    localStorage.setItem(
                        "userInfo",
                        JSON.stringify(response.data.response)
                    );
                    refreshRoles();

                    if (redirectPath) {
                        navigate(`/${redirectPath}`);
                    } else if (response.data.response.exist_in_guild) {
                        navigate("/dashboard/profile");
                    } else {
                        navigate("/dashboard/home"); 
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(error => {
            setOtpVerifyLoading(false);
            toast.error("OTP verification failed, try again");
        });
};