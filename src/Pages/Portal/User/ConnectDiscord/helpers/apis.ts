import React from "react";
import { dashboardRoutes } from "../../../../../services/urls";
import { privateGateway } from "../../../../../services/apiGateways";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

type muid = React.Dispatch<React.SetStateAction<string>>;

export const connectDiscord = (
  toast: (options?: UseToastOptions | undefined) => ToastId,
  navigate: NavigateFunction
) => {
  privateGateway
    .get(dashboardRoutes.connectDiscord)
    .then((response) => {
      // console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getmuid = (
  toast: (options?: UseToastOptions | undefined) => ToastId,
  navigate: NavigateFunction,
  setmuid: muid
) => {
  privateGateway
    .get(dashboardRoutes.getmuid)
    .then((response) => {
      // console.log(response);
      setmuid(response.data.response);
    })
    .catch((error) => {
      console.log(error);
    });
};
