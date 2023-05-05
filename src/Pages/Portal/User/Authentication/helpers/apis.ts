import { ToastId, UseToastOptions } from "@chakra-ui/react";
import React from "react";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { publicGateway } from "../../../../../services/apiGateways";
import { authRoutes } from "../../../../../services/urls";

type setMuID = React.Dispatch<React.SetStateAction<string>>;

export const forgetPassword = (
  muid: string,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  navigate: NavigateFunction
) => {
  publicGateway
    .post(authRoutes.forgetPassword, { muid })
    .then((response) => {
      toast({
        title: "Token Mail Sent",
        description: "Kindly check your mail for the reset password link",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/user/login");
      }, 5000);
    })
    .catch((error) => {
      toast({
        title: error.response?.data?.message?.general[0],
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
};

export const login = (
  muid: string,
  password: string,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  navigate: NavigateFunction
) => {
  publicGateway
    .post(authRoutes.login, { muid, password })
    .then((response) => {
      if (response.data.hasError == false) {
        localStorage.setItem("accessToken", response.data.response.accessToken);
        localStorage.setItem(
          "refreshToken",
          response.data.response.refreshToken
        );
        toast({
          title: "Login Successful",
          description: "You have been logged in successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        navigate("/user/connect-discord");
      }
    })
    .catch((error) => {
      toast({
        title: error.response.data.message.general[0],
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    });
};

export const getMuid = (
  token: string,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  navigate: NavigateFunction,
  setMuID: setMuID
) => {
  publicGateway
    .post(authRoutes.getMuid.replace("${token}", token))
    .then((response) => {
      console.log(response.data);
      toast({
        title: "User Verified",
        description: "Your Token has been validated,reset your password",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setMuID(response.data.response.muid);
    })
    .catch((error) => {
      toast({
        title: "Invalid Token",
        description: "Make sure you entered the correct token, try again",
        status: "error",
        duration: 4000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/user/forgot-password");
      }, 5000);
    });
};

export const resetPassword = (
  token: string,
  new_password: string,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  navigate: NavigateFunction
) => {
  publicGateway
    .post(authRoutes.resetPassword.replace("${token}", token), { new_password })
    .then((response) => {
      if (response.data.statusCode === 200) {
        toast({
          title: "Password Reset Successful",
          description: "You will be redirected to login page shortly",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => {
          navigate("/user/login");
        }, 4000);
      }
    })
    .catch((error) => {
      toast({
        title: "Invalid Token",
        description: "Kindly request for a new token, you will be redirected.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate("/user/forgot-password");
      }, 4000);
    });
};
