import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import React from "react";

type muid = React.Dispatch<React.SetStateAction<string>>;

export const getInfo = (setMuid: muid) => {
  privateGateway
    .get(dashboardRoutes.getInfo)
    .then((response) => {
      localStorage.setItem("userInfo", JSON.stringify(response.data.response));
      setMuid(response.data.response.muid);
    })
    .catch((error) => {
      console.log(error);
    });
};
