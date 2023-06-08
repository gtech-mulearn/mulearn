import React from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import { privateGateway } from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";

type userProfile = React.Dispatch<React.SetStateAction<any>>;
type userLog = React.Dispatch<React.SetStateAction<any>>;

export const getUserProfile = (setUserProfile: userProfile) => {
  privateGateway
    .get(dashboardRoutes.getUserProfile)
    .then((response) => {
      console.log(response.data.response);
      setUserProfile(response.data.response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getUserLog = (setUserLog: userLog) => {
  privateGateway
    .get(dashboardRoutes.getUserLog)
    .then((response) => {
      console.log(response.data.response);
      setUserLog(response.data.response);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getUserIg = (setUserIg: userLog) => {
  privateGateway
    .get(dashboardRoutes.getUserIg)
    .then((response) => {
      console.log(response.data.response);
      setUserIg(response.data.response);
    })
    .catch((error) => {
      console.log(error);
    });
};
export const getUserTaskLog = (setUserIg: userLog) => {
  privateGateway
    .get(dashboardRoutes.getUserTaskLog)
    .then((response) => {
      console.log(response.data.response);
      setUserIg(response.data.response);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const getStudentLeaderBoard = (setStudentLeaderBoard: userLog) => {
  privateGateway
    .get(dashboardRoutes.getStudentLeaderBoard)
    .then((response) => {
      console.log(response.data.response);
      setStudentLeaderBoard(response.data.response);
    })
    .catch((error) => {
      console.log(error);
    });
};
