import React from "react";
import { dashboardRoutes } from "../../../../../src/services/urls";
import { privateGateway } from "../../../../../src/services/apiGateways";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

type muid = React.Dispatch<React.SetStateAction<string>>;

export const getInfo = (setMuid: muid) => {
  privateGateway
    .get(dashboardRoutes.getInfo)
    .then((response) => {
      console.log(response);
      localStorage.setItem("userInfo", JSON.stringify(response.data.response));
      setMuid(response.data.response.mu_id);
    })
    .catch((error) => {
      console.log(error);
    });
};
