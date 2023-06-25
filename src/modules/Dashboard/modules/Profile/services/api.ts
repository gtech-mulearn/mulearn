import React from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { NavigateFunction } from "react-router-dom";
import {
    privateGateway,
    publicGateway
} from "../../../../../services/apiGateways";
import { dashboardRoutes } from "../../../../../services/urls";

type userProfile = React.Dispatch<React.SetStateAction<any>>;
type userLog = React.Dispatch<React.SetStateAction<any>>;
type APILoadStatus = React.Dispatch<React.SetStateAction<any>>;

export const getUserProfile = (
    setUserProfile: userProfile,
    setAPILoadStatus: APILoadStatus,
    setProfileStatus: any
) => {
    privateGateway
        .get(dashboardRoutes.getUserProfile)
        .then(response => {
            setAPILoadStatus(response.data.statusCode);
            // console.log(response.data.response.is_public);
            setUserProfile(response.data.response);
            setProfileStatus(response.data.response.is_public);
        })
        .catch(error => {
            console.log(error);
        });
};

export const getUserLog = (setUserLog: userLog) => {
    privateGateway
        .get(dashboardRoutes.getUserLog)
        .then(response => {
            setUserLog(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};
export const getPublicUserProfile = (
    setUserProfile: userProfile,
    setAPILoadStatus: APILoadStatus,
    muid: string
) => {
    publicGateway
        .get(dashboardRoutes.getPublicUserProfile.replace("${muid}", muid))
        .then(response => {
            setAPILoadStatus(response.data.statusCode);
            // console.log(response.data.response);
            setUserProfile(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};

export const getPublicUserLog = (setUserLog: userLog, muid: string) => {
    publicGateway
        .get(dashboardRoutes.getPublicUserLog.replace("${muid}", muid))
        .then(response => {
            setUserLog(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};
export const putIsPublic = (isPublic: boolean,toast: (options?: UseToastOptions | undefined) => ToastId,) => {
    privateGateway
        .put(dashboardRoutes.putIsPublic, { isPublic })
        .then(response => {
            console.log(response.data.message.general[0]);
            
            toast({
                title: response.data.message.general[0],
                description: "Profile status is updated",
                status: "success",
                duration: 3000,
                isClosable: true
            });
                
        })
        .catch(error => {
            console.log(error);
        });
};
