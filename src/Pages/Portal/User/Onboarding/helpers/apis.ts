import publicGateway from "../../../../../services/apiGateway";
import { onboardingRoutes } from "../../../../../services/urls";
import { Dispatch, SetStateAction } from "react";
import { AxiosResponse, AxiosError } from "axios";

// Define the type of the function parameter
type MyFunction = () => void;

// Define the type of MyValues
type hasError = Dispatch<
  SetStateAction<{
    error: boolean;
    statusCode: number;
    message: string;
  }>
>;

type getAPI = Dispatch<
  SetStateAction<
    {
      id: string;
      title: string;
    }[]
  >
>;

type AoiAPI = Dispatch<
  SetStateAction<
    {
      id: string;
      name: string;
    }[]
  >
>;

type collegeOptions = Dispatch<
  SetStateAction<
    {
      value: string;
      label: string;
    }[]
  >
>;

type hasValidationError = Dispatch<
  SetStateAction<{
    error: boolean;
    message: string;
  }>
>;

type FormSuccess = Dispatch<SetStateAction<boolean>>;
type RoleVerified = Dispatch<SetStateAction<boolean>>;
type firstQuesion = Dispatch<SetStateAction<boolean>>;
type emailVerificationResultBtn = Dispatch<SetStateAction<string>>;
type opacity0 = Dispatch<SetStateAction<number>>;
type display0 = Dispatch<SetStateAction<string>>;

type errorHandler = (status: number, dataStatus: number) => void;

// request for token validation
export const validateToken = (setHasError: hasError) => {
  publicGateway
    .get(onboardingRoutes.validate)
    .then((response) => {})
    .catch((error) => {
      setHasError({
        error: error.response.data.hasError,
        statusCode: error.response.data.statusCode,
        message: error.response.data.message.general,
      });
    });
};

// request for colleges list
export const getColleges = (
  setCollegeAPI: getAPI,
  setCollegeOptions: collegeOptions,
  setDepartmentAPI: getAPI,
  errorHandler: errorHandler
) => {
  publicGateway
    .get(onboardingRoutes.collegeList)
    .then((response) => {
      const colleges = response.data.response.colleges;
      setCollegeAPI(colleges);
      setCollegeOptions(
        colleges
          .sort((a: any, b: any) => a.title.localeCompare(b.title))
          .map((college: any) => ({
            value: college.id,
            label: college.title,
          }))
      );
      setDepartmentAPI(response.data.response.departments);
    })
    .catch((error) => {
      errorHandler(error.response.status, error.response.data.status);
    });
};

// request for company list
export const getCompanies = (
  errorHandler: errorHandler,
  setCompanyAPI: getAPI
) => {
  publicGateway
    .get(onboardingRoutes.companyList)
    .then((response) => {
      setCompanyAPI(response.data.response.companies);
    })
    .catch((error) => {
      errorHandler(error.response.status, error.response.data.status);
    });
};

// request for role list
export const getRoles = (errorHandler: errorHandler, setRoleAPI: getAPI) => {
  publicGateway
    .get(onboardingRoutes.roleList)
    .then((response) => {
      setRoleAPI(response.data.response.roles);
    })
    .catch((error) => {
      errorHandler(error.response.status, error.response.data.status);
    });
};

// request for area of intersts list
export const getInterests = (errorHandler: errorHandler, setAoiAPI: AoiAPI) => {
  publicGateway
    .get(onboardingRoutes.areaOfInterestList)
    .then((response) => {
      setAoiAPI(response.data.response.aois);
    })
    .catch((error) => {
      errorHandler(error.response.status, error.response.data.status);
    });
};

// request for community list
export const getCommunties = (
  errorHandler: errorHandler,
  setCommunityAPI: getAPI
) => {
  publicGateway
    .get(onboardingRoutes.communityList)
    .then((response) => {
      setCommunityAPI(response.data.response.communities);
    })
    .catch((error) => {
      errorHandler(error.response.status, error.response.data.status);
    });
};

// POST request for registration
export const registerUser = (
  setFormSuccess: FormSuccess,
  setRoleVerified: RoleVerified,
  formik: any,
  setHasValidationError: hasValidationError,
  userData: unknown
) => {
  publicGateway
    .post(onboardingRoutes.register, userData)
    .then(function (response) {
      setFormSuccess(true);
      setRoleVerified(response.data.roleVerified);
      console.log(response);
      localStorage.setItem("accessToken", response.data.response.accessToken);
      localStorage.setItem("refreshToken", response.data.response.refreshToken);
      // navigate("/user/connect-discord");
    })
    .catch(function (error) {
      if (
        error.response.data.message &&
        Object.keys(error.response.data.message).length > 0
      ) {
        Object.entries(error.response.data.message).forEach(
          ([fieldName, errorMessage]) => {
            if (Array.isArray(errorMessage)) {
              formik.setFieldError(fieldName, errorMessage?.join(", ") || "");
            }
          }
        );
      }
      setTimeout(() => {
        setHasValidationError({
          error: false,
          message: "",
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
  setDisplay0: display0
) => {
  publicGateway
    .post(onboardingRoutes.emailVerification, { email: email })
    .then(function (response) {
      setFirstQuesion(!response.data.response.value);

      if (response.data.response.value) {
        formik.errors.email = response.data.message.general;
        setEmailVerificationResultBtn("Login");
      } else {
        setTimeout(() => {
          setOpacity0(0);
          setDisplay0("none");
        }, 1000);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
};
