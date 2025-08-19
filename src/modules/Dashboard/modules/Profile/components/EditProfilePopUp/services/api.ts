import React, { Dispatch, SetStateAction } from "react";
import axios, { AxiosError } from "axios";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";
import { collegeOptions, TT } from "@/modules/Common/Authentication/services/onboardingApis";

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



export const getLocations = async (
    param: string,
    setLocationData: Dispatch<SetStateAction<any[]>>,
    setIsApiCalled: UseStateFunc<boolean>
) => {
    setIsApiCalled(true);
    await publicGateway
        .get(
            onboardingRoutes.location.replace(
                "${param}",
                param === "" ? "india" : param
            )
        )
        .then(response => {
            if (response.data.response.length === 0) {
                setIsApiCalled(false);
                setLocationData([{ id: "", location: "" }]);
                console.log("success");
            } else {
                setIsApiCalled(false);
                console.log(response.data.response);
                setLocationData(response.data.response);
            }
        })
        .catch((error: APIError) => {
            setIsApiCalled(false);
            console.log(error);
        });
};

export const getCollegeOptions = async (
    setCollegeOptions: collegeOptions,
    setDepartmentAPI: collegeOptions,
    district: string
) => {
    try {
        const response: APIResponse<{ colleges: TT[]; departments: TT[] }> =
            await publicGateway.post(onboardingRoutes.collegeList, {
                district: district
            });

        const response2: APIResponse<{ schools: TT[] }> =
            await publicGateway.post(onboardingRoutes.schoolList, {
                district: district
            });

        const colleges = response.data.response.colleges;
        const schools = response2.data.response.schools;
        setCollegeOptions([
            ...colleges
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(college => ({
                    value: college.id,
                    label: college.title
                })),
            ...schools
                .sort((a, b) => a.title.localeCompare(b.title))
                .map(school => ({
                    value: school.id,
                    label: school.title
                }))
        ]);
        setDepartmentAPI(
            response.data.response.departments.map(dept => ({
                value: dept.id,
                label: dept.title
            }))
        );
    } catch (error: any) {
        console.log(error);
        //errorHandler(error.response.status, error.response.data.status);
    }
};


export const getEditUserProfile = (
    setProfileDetails: (data: profileDetails) => void
) => {
    privateGateway
        .get(dashboardRoutes.getEditUserProfile)
        .then(response => {
            // console.log(response.data.response);
            const { full_name, email, mobile, gender, dob, communities } =
                response.data.response;
            const profileDetails: profileDetails = {
                first_name: full_name.split(" ")[0],
                last_name: full_name.split(" ")[1] ?? "",
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

export const updateProfileImage = async (profile: File, id: string) => {
    const access = localStorage.getItem("accessToken");
    const payload = new FormData();
    payload.append("profile", profile);
    payload.append("user_id", id);
    const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}${
            dashboardRoutes.postProfileImage
        }`,
        payload,
        {
            headers: {
                Authorization: `Bearer ${access}`,
                "Content-Type": "multipart/form-data"
            }
        }
    );
    reloadLocalImage(
        res.data.response.profile_pic + `?${Math.random() * 1000}`
    );
};
export const syncDiscordImage = async (
    succ?: (msg: string) => void,
    fail?: (msg: string) => void
) => {
    try {
        const res = await privateGateway.patch(
            dashboardRoutes.postProfileImage
        );
        console.log(res);
        if (succ) succ(res.toString());
    } catch (err) {
        if (fail) fail(err as any);
    }
};
export const patchEditUserProfile = async (
    editedProfileDetails: profileDetails,
    id: string,
    setEditPopUp: (value: boolean) => void,
    setFieldError: (field: string, message: string) => void,
    image?: File
) => {
    try {
        if (image) await updateProfileImage(image, id);

        // concat first_name and last_name and store it in full_name
        const full_name = `${editedProfileDetails.first_name} ${editedProfileDetails.last_name}`;
        const payload = {
            ...editedProfileDetails,
            full_name
        };

        privateGateway
            .patch(dashboardRoutes.getEditUserProfile, payload)
            .then(response => {
                // console.log(response.data.response);

                toast.success("Profile Data Updated");
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
                    toast.error(`${fieldErrors[field][0]}`);
                });
            });
    } catch (err) {
        if (err instanceof AxiosError)
            toast.error(
                err.response?.data.message.general[0] ?? "Image Upload Failed"
            );
    }
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

const reloadLocalImage = async (newLink: string) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "");
    userInfo.profile_pic = newLink;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    window.location.reload();
};
