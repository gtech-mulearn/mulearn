import React from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { dashboardRoutes } from "../../../../../../.././services/urls";
import { privateGateway } from "../../../../../../.././services/apiGateways";

type userLevelData = React.Dispatch<React.SetStateAction<any>>;

export const getUserLevels = (setUserLevelData: userLevelData) => {
    privateGateway
        .get(dashboardRoutes.getUserLevels)
        .then(response => {
            // console.log(response.data);
            setUserLevelData(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};
