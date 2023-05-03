import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import apiGateway from "../../../../../services/apiGateway";
import { authRoutes } from "../../../../../services/urls";

type setSuccess = React.Dispatch<React.SetStateAction<boolean>>;
type setError = React.Dispatch<React.SetStateAction<string>>;

export const forgetPassword = (
  muid: string,
  toast: (options?: UseToastOptions | undefined) => ToastId,
  navigate: NavigateFunction
) => {
  apiGateway
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
  toast: (options?: UseToastOptions | undefined) => ToastId
) => {
  apiGateway
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
