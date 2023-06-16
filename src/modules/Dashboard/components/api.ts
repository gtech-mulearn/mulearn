import React from "react";
import { privateGateway } from "../../../services/apiGateways";
import { dashboardRoutes } from "../../../services/urls";

type userProfile = React.Dispatch<React.SetStateAction<any>>;

export const getUserProfile = (
    setProfilePic: userProfile,
) => {
    privateGateway
        .get(dashboardRoutes.getUserProfile)
        .then(response => {
            // console.log(response.data.response.profile_pic);
            setProfilePic(response.data.response.profile_pic);
        })
        .catch(error => {
            console.log(error);
        });
};