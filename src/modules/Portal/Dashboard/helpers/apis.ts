import React from "react";

import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import { privateGateway } from "../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../services/urls";

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

export const getInfo = (
  setConnected: React.Dispatch<React.SetStateAction<boolean>>
) => {
  privateGateway
    .get(dashboardRoutes.getInfo)
    .then((response) => {
      console.log(response);
      setConnected(response.data.response.exist_in_guild);
    })
    .catch((error) => {
      console.log(error);
    });
};
