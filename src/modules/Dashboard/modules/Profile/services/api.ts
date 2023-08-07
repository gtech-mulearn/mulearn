import { ToastId, UseToastOptions } from "@chakra-ui/react";
import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";

type userProfile = UseStateFunc<any>;
type userLog = UseStateFunc<any>;
type APILoadStatus = UseStateFunc<any>;
type userLevelData = UseStateFunc<any>;

export const getUserProfile = (
    setUserProfile: userProfile,
    setAPILoadStatus: APILoadStatus,
    setProfileStatus: any
) => {
    privateGateway
        .get(dashboardRoutes.getUserProfile)
        .then(response => {
            setAPILoadStatus(response.data.statusCode);
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
            // console.log(response.data.statusCode);
            setUserProfile(response.data.response);
        })
        .catch(error => {
            console.log(error);
            setAPILoadStatus(error.response.data.statusCode);
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
export const putIsPublic = (is_public: boolean, toast: ToastAsPara) => {
    privateGateway
        .put(dashboardRoutes.putIsPublic, { is_public })
        .then((response: APIResponse<{}, string[]>) => {
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

export const getPublicUserLevels = (
    setUserLevelData: userLevelData,
    muid: string
) => {
    publicGateway
        .get(dashboardRoutes.getPublicUserLevels.replace("${muid}", muid))
        .then(response => {
            // console.log(response.data);
            setUserLevelData(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};

export const fetchQRCode = async (setBlob: any) => {
    try {
        const muid = fetchLocalStorage<UserInfo>("userInfo")?.muid;

        const url = `https://quickchart.io/qr?text=${
            import.meta.env.VITE_FRONTEND_URL
        }/dashboard/profile/${muid}&centerImageUrl=https://avatars.githubusercontent.com/u/98015594?s=88&v=4`;
        const response = await axios
            .get(url, {
                responseType: "arraybuffer"
            })
            .then(response => {
                // console.log(response.data);
                const blob = new Blob([response.data], {
                    type: "image/png"
                });
                setBlob(URL.createObjectURL(blob));
                // const imageUrl = URL.createObjectURL(blob);
                // console.log(blob);
            });
    } catch (error) {
        console.error(error);
    }
};
