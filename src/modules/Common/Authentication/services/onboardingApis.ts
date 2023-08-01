import { publicGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";
import { NavigateFunction } from "react-router-dom";

// Define the type of MyValues
type hasError = UseStateFunc<{
        error: boolean;
        statusCode: number;
        message: string;
    }>

type getAPI = UseStateFunc<
        {
            id: string;
            title: string;
        }[]
    >

type AoiAPI = UseStateFunc<
        {
            id: string;
            name: string;
        }[]
    >

type collegeOptions = UseStateFunc<
        {
            value: string;
            label: string;
        }[]
    >

type hasValidationError = UseStateFunc<{
        error: boolean;
        message: string;
    }>

type FormSuccess = UseStateFunc<boolean>
type RoleVerified = UseStateFunc<boolean>
type firstQuesion = UseStateFunc<boolean>
type emailVerificationResultBtn = UseStateFunc<string>
type opacity0 = UseStateFunc<number>
type display0 = UseStateFunc<string>

export interface DWMSDetails {
    job_seeker_fname: string;
    job_seeker_lname: string;
    email_id: string;
    mobile_no: number;
    gender: string;
    dob: string;
    key_skills: string;
    dwms_id: string;
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
        .then(response => {
            setCountry(
                response.data.response.countries
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((country: any) => ({
                        value: country.id,
                        label: country.name
                    }))
            );
        })
        .catch(error => {
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
        .then(response => {
            setState(
                response.data.response.states
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((sate: any) => ({
                        value: sate.id,
                        label: sate.name
                    }))
            );
        })
        .catch(error => {
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
        .then(response => {
            setState(
                response.data.response.districts
                    .sort((a: any, b: any) => a.name.localeCompare(b.name))
                    .map((sate: any) => ({
                        value: sate.id,
                        label: sate.name
                    }))
            );
        })
        .catch(error => {
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
        .then(response => {
            const colleges = response.data.response.colleges;
            setCollegeAPI(colleges);
            setCollegeOptions(
                colleges
                    .sort((a: any, b: any) => a.title.localeCompare(b.title))
                    .map((college: any) => ({
                        value: college.id,
                        label: college.title
                    }))
            );
            setDepartmentAPI(
                response.data.response.departments.map((dept: any) => ({
                    value: dept.id,
                    label: dept.title
                }))
            );
        })
        .catch(error => {
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
        .then(response => {
            setCompanyAPI(response.data.response.companies);
        })
        .catch(error => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// request for role list
export const getRoles = (errorHandler: errorHandler, setRoleAPI: getAPI) => {
    publicGateway
        .get(onboardingRoutes.roleList)
        .then(response => {
            setRoleAPI(response.data.response.roles);
        })
        .catch(error => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// request for area of intersts list
export const getInterests = (errorHandler: errorHandler, setAoiAPI: AoiAPI) => {
    publicGateway
        .get(onboardingRoutes.areaOfInterestList)
        .then(response => {
            setAoiAPI(response.data.response.aois);
        })
        .catch(error => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// request for community list
export const getCommunities = (
    errorHandler: errorHandler,
    setCommunityAPI: getAPI
) => {
    publicGateway
        .get(onboardingRoutes.communityList)
        .then(response => {
            setCommunityAPI(response.data.response.communities);
        })
        .catch(error => {
            errorHandler(error.response.status, error.response.data.status);
        });
};

// POST request for registration
export const registerUser = (
    setFormSuccess: FormSuccess,
    setRoleVerified: RoleVerified,
    formik: any,
    setHasValidationError: hasValidationError,
    userData: unknown,
    navigate: NavigateFunction,
    setShowSubmitLoader: (showSubmitLoader: boolean) => void
) => {
    setShowSubmitLoader(true);
    publicGateway
        .post(onboardingRoutes.register, userData)
        .then(function (response) {
            setFormSuccess(true);
            setRoleVerified(response.data.roleVerified);
            localStorage.setItem(
                "accessToken",
                response.data.response.accessToken
            );
            localStorage.setItem(
                "refreshToken",
                response.data.response.refreshToken
            );
            navigate("/dashboard/connect-discord");
            setShowSubmitLoader(false);
        })
        .catch(function (error) {
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
    formik: any,
    setEmailVerificationResultBtn: emailVerificationResultBtn,
    setOpacity0: opacity0,
    setDisplay0: display0,
    setShowLoader: (showLoader: boolean) => void
) => {
    setShowLoader(true);
    publicGateway
        .post(onboardingRoutes.emailVerification, { email: email })
        .then(function (response) {
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
        .catch(function (error) {
            setShowLoader(false);
            console.error(error);
        });
};

export const getDWMSDetails = (
    errorHandler: errorHandler,
    setDWMSDetails: (data: DWMSDetails) => void
) => {
    publicGateway
        .get("https://dummyjson.com/products/1")
        .then(response => {
            // console.log(response.data);

            const {
                job_seeker_fname,
                job_seeker_lname,
                email_id,
                mobile_no,
                gender,
                dob,
                key_skills,
                dwms_id,
                job_seeker_id
            } = response.data;
            const dwmsDetails: DWMSDetails = {
                job_seeker_fname,
                job_seeker_lname,
                email_id,
                mobile_no,
                gender,
                dob,
                key_skills,
                dwms_id,
                job_seeker_id
                // Initialize other fields here
            };
            setDWMSDetails(dwmsDetails);
        })
        .catch(error => {
            errorHandler(error.response.status, error.response.data.status);
        });
};
