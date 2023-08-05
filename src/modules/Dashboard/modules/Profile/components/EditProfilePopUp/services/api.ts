import React from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";

type profileDetails = {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    gender: string;
    dob: string;
    community: [];
};
type getAPI = React.Dispatch<
    React.SetStateAction<
        {
            id: string;
            title: string;
        }[]
    >
>;
// type errorHandler = (status: number, dataStatus: number) => void;

export const getEditUserProfile = (
    setProfileDetails: (data: profileDetails) => void
) => {
    privateGateway
        .get(dashboardRoutes.getEditUserProfile)
        .then(response => {
            // console.log(response.data.response);
            const {
                first_name,
                last_name,
                email,
                mobile,
                gender,
                dob,
                community
            } = response.data.response;
            const profileDetails: profileDetails = {
                firstName: first_name,
                lastName: last_name,
                email,
                phone: mobile,
                gender,
                dob,
                community
            };
            setProfileDetails(profileDetails);
        })
        .catch(error => {
            console.log(error);
        });
};

// request for community list
export const getCommunities = (
    setCommunityAPI: getAPI,
    setLoadStatus: React.Dispatch<React.SetStateAction<boolean>>
) => {
    publicGateway
        .get(onboardingRoutes.communityList)
        .then(response => {
            // console.log(response.data.statusCode);
            response.data.statusCode === 200 &&
                setTimeout(() => {
                    setLoadStatus(true);
                }, 500);
            setCommunityAPI(response.data.response.communities);
        })
        .catch(error => {
            // errorHandler(error.response.status, error.response.data.status);
        });
};
