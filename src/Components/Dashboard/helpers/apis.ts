import React from "react";
import { dashboardRoutes } from "../../../services/urls";
import { privateGateway } from "../../../services/apiGateways";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";

type name = React.Dispatch<React.SetStateAction<string>>;

export const getname = (setName: name) => {
  privateGateway
    .get(dashboardRoutes.getInfo)
    .then((response) => {
      setName(response.data.response.first_name);
    })
    .catch((error) => {
      console.log(error);
    });
};
