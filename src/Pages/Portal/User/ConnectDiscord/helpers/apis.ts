import React from "react";
import { dashboardRoutes } from "../../../../../services/urls";
import { privateGateway } from "../../../../../services/apiGateways";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

export const connectDiscord = (
  toast: (options?: UseToastOptions | undefined) => ToastId,
  navigate: NavigateFunction
) => {
  privateGateway
    .get(dashboardRoutes.connectDiscord)
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    //   toast({
    //     title: "Session Expired",
    //     description: "Kindly login again, you will be redirected!",
    //     status: "error",
    //     duration: 3000,
    //     isClosable: true,
    //   });
    //   setTimeout(() => {
    //     navigate("/user/login");
    //   }, 5000);
    });
};
