import React from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import { privateGateway } from "../../../../../services/apiGateways";
import { campusRoutes } from "../../../../../services/urls";

type studentData = React.Dispatch<React.SetStateAction<any>>;
type campusData = React.Dispatch<React.SetStateAction<any>>;

export const getStudentDetails = (setStudentData: studentData) => {
    privateGateway
        .get(campusRoutes.getStudentDetails)
        .then(response => {
            // console.log(response.data.response);
            setStudentData(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};
export const getCampusDetails = (setCampusData:campusData) => {
    privateGateway
        .get(campusRoutes.getCampusDetails)
        .then(response => {
            // console.log(response.data.response);
            setCampusData(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};
