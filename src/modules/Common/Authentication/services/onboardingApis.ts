import { publicGateway } from "@/MuLearnServices/apiGateways";
import { KKEMRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import { NavigateFunction } from "react-router-dom";
import { useFormik } from "formik";
import { getInfo } from "../../../Dashboard/modules/ConnectDiscord/services/apis";
import { Dispatch, SetStateAction } from "react";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import toast from "react-hot-toast";

// Define the type of MyValues
type NN = { name: string; id: string };
export type TT = { title: string; id: string };

type InitialValues = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    mobile: undefined;
    gender: string;
    dob: string;
    role: string;
    country: string;
    state: string;
    district: string;
    organization: string;
    community: string[];
    dept: string;
    yog: string;
    mentorRole: string;
    areaOfInterest: never[];
    general: string;
    muid: string;
};
type FormikType = ReturnType<typeof useFormik<InitialValues>>;

type getAPI = UseStateFunc<TT[]>;
type AoiAPI = UseStateFunc<NN[]>;

export type collegeOptions = UseStateFunc<
    {
        value: string;
        label: string;
    }[]
>;

type hasValidationError = UseStateFunc<{
    error: boolean;
    message: string;
}>;

type FormSuccess = UseStateFunc<boolean>;
type RoleVerified = UseStateFunc<boolean>;
type firstQuesion = UseStateFunc<boolean>;
type emailVerificationResultBtn = UseStateFunc<string>;
type opacity0 = UseStateFunc<number>;
type display0 = UseStateFunc<string>;

export interface DWMSDetails {
    job_seeker_fname: string;
    job_seeker_lname: string;
    email_id: string;
    mobile_no: number;
    gender: string;
    dob: string;
    key_skills: string;
    param: string;
    job_seeker_id: string;
}

type errorHandler = (status: number, dataStatus: number) => void;

// request for country list
export const getCountries = (
    errorHandler: errorHandler,
    setCountry: collegeOptions
) => {
    publicGateway
        .get(onboardingRoutes.countryList)
        .then((response: APIResponse<{ countries: NN[] }>) => {
            setCountry(
                response.data.response.countries
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(country => ({
                        value: country.id,
                        label: country.name
                    }))
            );
        })
        .catch((error: APIError) => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// request for state list
export const getState = (
    errorHandler: errorHandler,
    setState: collegeOptions,
    country: any
) => {
    publicGateway
        .post(onboardingRoutes.stateList, country)
        .then((response: APIResponse<{ states: NN[] }>) => {
            setState(
                response.data.response.states
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(state => ({
                        value: state.id,
                        label: state.name
                    }))
            );
        })
        .catch((error: APIError) => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// request for district list
export const getDistrict = (
    errorHandler: errorHandler,
    setState: collegeOptions,
    state: any
) => {
    publicGateway
        .post(onboardingRoutes.districtList, state)
        .then((response: APIResponse<{ districts: NN[] }>) => {
            setState(
                response.data.response.districts
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map(dist => ({
                        value: dist.id,
                        label: dist.name
                    }))
            );
        })
        .catch((error: APIError) => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// request for colleges list
export const getColleges = (
    setCollegeAPI: getAPI,
    setCollegeOptions: collegeOptions,
    setDepartmentAPI: collegeOptions,
    errorHandler: errorHandler,
    district: any
) => {
    publicGateway
        .post(onboardingRoutes.collegeList, district)
        .then(
            (response: APIResponse<{ colleges: TT[]; departments: TT[] }>) => {
                const colleges = response.data.response.colleges;
                setCollegeAPI(colleges);
                setCollegeOptions(
                    colleges
                        .sort((a, b) => a.title.localeCompare(b.title))
                        .map(college => ({
                            value: college.id,
                            label: college.title
                        }))
                );
                setDepartmentAPI(
                    response.data.response.departments.map(dept => ({
                        value: dept.id,
                        label: dept.title
                    }))
                );
            }
        )
        .catch((error: APIError) => {
            // errorHandler(error.response.status, error.response.data.status);
        });
};

// request for company list
export const getCompanies = (
    errorHandler: errorHandler,
    setCompanyAPI: getAPI
) => {
    publicGateway
        .get(onboardingRoutes.companyList)
        .then((response: APIResponse<{ companies: TT[] }>) => {
            setCompanyAPI(response.data.response.companies);
        })
        .catch((error: APIError) => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// request for role list
export const getRoles = (errorHandler: errorHandler, setRoleAPI: getAPI) => {
    publicGateway
        .get(onboardingRoutes.roleList)
        .then((response: APIResponse<{ roles: TT[] }>) => {
            setRoleAPI(response.data.response.roles);
        })
        .catch((error: APIError) => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// request for area of intersts list
export const getInterests = (errorHandler: errorHandler, setAoiAPI: AoiAPI) => {
    publicGateway
        .get(onboardingRoutes.areaOfInterestList)
        .then((response: APIResponse<{ aois: NN[] }>) => {
            setAoiAPI(response.data.response.aois);
        })
        .catch((error: APIError) => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// request for community list
export const getCommunities = ({
    errorHandler,
    setCommunityAPI,
    setIsLoading
}: {
    errorHandler?: errorHandler;
    setCommunityAPI: getAPI;
    setIsLoading?: UseStateFunc<boolean>;
}) => {
    setIsLoading && setIsLoading(true);
    publicGateway
        .get(onboardingRoutes.communityList)
        .then(response => {
            setCommunityAPI(response.data.response.communities);
        })
        .catch((error: APIError) => {
            errorHandler &&
                errorHandler(error.response.status, error.response.data.status);
        });
    setIsLoading && setIsLoading(false);
};

export const createNewOrganization = async ({
    setIsLoading,
    org_data
}: {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    org_data: Object;
}) => {
    try {
        setIsLoading(true);
        const res = await privateGateway.post(
            "/api/v1/register/organization/create/",
            org_data
        );
        if (res.status == 200 && !res.data.hasError) {
            toast.success(res.data.message.general[0]);
            return true;
        } else {
            toast.error("Organization selection failed.");
        }
        setIsLoading(false);
    } catch (err: any) {
        toast.error("Unable to select organization.");
    }
    return false;
};
export const selectOrganization = async ({
    setIsLoading,
    userData
}: {
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    userData: Object;
}) => {
    try {
        setIsLoading(true);
        const res = await privateGateway.post(
            "/api/v1/dashboard/user/organization/",
            userData
        );
        if (res.status == 200 && !res.data.hasError) {
            toast.success(res.data.message.general[0]);
            return true;
        } else {
            toast.error("Organization selection failed.");
        }
        setIsLoading(false);
    } catch (err: any) {
        toast.error("Unable to select organization.");
    }
    return false;
};

// POST request for registration
export const registerUser = (
    setFormSuccess: FormSuccess,
    setRoleVerified: RoleVerified,
    formik: FormikType,
    setHasValidationError: hasValidationError,
    userData: unknown,
    navigate: NavigateFunction,
    setShowSubmitLoader: UseStateFunc<boolean>
) => {
    setShowSubmitLoader(true);
    console.log(userData);
    publicGateway
        .post(onboardingRoutes.register, userData)
        .then((response: APIResponse<AllTokens>) => {
            setFormSuccess(true);
            setRoleVerified(response.data.roleVerified as boolean);
            localStorage.setItem(
                "accessToken",
                response.data.response.accessToken
            );
            localStorage.setItem(
                "refreshToken",
                response.data.response.refreshToken
            );
            getInfo(navigate, () => {
                navigate("/dashboard/home");
                setShowSubmitLoader(false);
            });
        })

        .catch((error: APIError<{ key: any[] }>) => {
            setShowSubmitLoader(false);
            if (
                error.response.data.message &&
                Object.keys(error.response.data.message).length > 0
            ) {
                Object.entries(error.response.data.message).forEach(
                    ([fieldName, errorMessage]) => {
                        if (Array.isArray(errorMessage)) {
                            formik.setFieldError(
                                fieldName,
                                errorMessage?.join(", ") || ""
                            );
                        } else {
                            Object.entries(errorMessage).forEach(
                                ([subFieldName, subErrorMessage]) => {
                                    console.log(subFieldName, subErrorMessage);
                                    formik.setFieldError(
                                        subFieldName,
                                        (subErrorMessage as string[]).join(
                                            ", "
                                        ) || ""
                                    );
                                }
                            );
                        }
                    }
                );
            }
            setTimeout(() => {
                setHasValidationError({
                    error: false,
                    message: ""
                });
            }, 3000);
        });
};

export const emailVerification = (
    email: string,
    setFirstQuesion: firstQuesion,
    formik: FormikType,
    setEmailVerificationResultBtn: emailVerificationResultBtn,
    setOpacity0: opacity0,
    setDisplay0: display0,
    setShowLoader: UseStateFunc<boolean>
) => {
    setShowLoader(true);
    publicGateway
        .post(onboardingRoutes.emailVerification, { email: email })
        .then((response: APIResponse<{ value: boolean }, string>) => {
            setFirstQuesion(!response.data.response.value);

            if (response.data.response.value) {
                setShowLoader(false);
                formik.errors.email = response.data.message.general;
                setEmailVerificationResultBtn("Login");
            } else {
                setShowLoader(false);
                setTimeout(() => {
                    setOpacity0(0);
                    setDisplay0("none");
                }, 1000);
            }
        })
        .catch((error: APIError) => {
            setShowLoader(false);
            console.error(error);
        });
};

export const getDWMSDetails = (
    errorHandler: errorHandler,
    param: string | null,
    setDWMSDetails: (data: DWMSDetails) => void
) => {
    publicGateway
        .get(
            KKEMRoutes.getDWMSDetails.replace(
                "${param}",
                param === null ? "" : param
            )
        )
        .then(response => {
            const {
                job_seeker_fname,
                job_seeker_lname,
                email_id,
                mobile_no,
                gender,
                dob,
                key_skills,
                param,
                job_seeker_id
            } = response.data.response.registration;
            const dwmsDetails: DWMSDetails = {
                job_seeker_fname,
                job_seeker_lname,
                email_id,
                mobile_no,
                gender,
                dob,
                key_skills,
                param,
                job_seeker_id
                // Initialize other fields here
            };
            setDWMSDetails(dwmsDetails);
        })
        .catch((error: APIError) => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

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
