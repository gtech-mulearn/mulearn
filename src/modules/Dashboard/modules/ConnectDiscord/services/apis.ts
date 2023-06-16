import React from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import { privateGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";

type muid = React.Dispatch<React.SetStateAction<string>>;

export const getInfo = (setMuid: muid) => {
  privateGateway
    .get(dashboardRoutes.getInfo)
    .then((response) => {
      // console.log(response);
      localStorage.setItem("userInfo", JSON.stringify(response.data.response));
      setMuid(response.data.response.muid);
    })
    .catch((error) => {
      console.log(error);
    });
};
