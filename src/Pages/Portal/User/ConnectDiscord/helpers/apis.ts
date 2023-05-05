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
    });
};
