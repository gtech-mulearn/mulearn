import React from "react";
import { ToastId, UseToastOptions } from "@chakra-ui/react";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";

type profileDetails = {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    gender: string;
    dob: string;
    communities: any;
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
                communities
            } = response.data.response;
            const profileDetails: profileDetails = {
                first_name: first_name,
                last_name: last_name,
                email,
                mobile: mobile,
                gender,
                dob,
                communities
            };
            setProfileDetails(profileDetails);
        })
        .catch(error => {
            console.log(error);
        });
};

export const patchEditUserProfile = (
    toast: ToastAsPara,
    editedProfileDetails: profileDetails,
    setEditPopUp: (value: boolean) => void,
    setFieldError: (field: string, message: string) => void
) => {
    privateGateway
        .patch(dashboardRoutes.getEditUserProfile, editedProfileDetails)
        .then(response => {
            // console.log(response.data.response);
            toast({
                title: "Profile Updated",
                description: "Your profile has been updated",
                status: "success",
                duration: 3000,
                isClosable: true
            });
            setTimeout(() => {
                setEditPopUp(false);
            }, 1000);
        })
        .catch(error => {
            console.log(error.response.data.response);
            const fieldErrors = error.response.data.response;
            Object.keys(fieldErrors).forEach(field => {
                console.log(`${field}: ${fieldErrors[field][0]}`);
                setFieldError(field, fieldErrors[field][0]);
                toast({
                    title: `${field} Error`,
                    description: `${fieldErrors[field][0]}`,
                    status: "error",
                    duration: 3000,
                    isClosable: true
                });
            });
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
