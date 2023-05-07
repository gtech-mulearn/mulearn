import React from "react";
import { dashboardRoutes } from "../../../services/urls";
import { privateGateway } from "../../../services/apiGateways";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

type name = React.Dispatch<React.SetStateAction<string>>;

export const getname = (setname: name) => {
  privateGateway
    .get(dashboardRoutes.getname)
    .then((response) => {
      // console.log(response);
      setname(response.data.response);
    })
    .catch((error) => {
      console.log(error);
    });
};
