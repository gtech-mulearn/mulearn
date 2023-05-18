export const onboardingRoutes = {
    collegeList: "/api/v1/register/college/list/",
    companyList: "/api/v1/register/company/list/",
    roleList: "/api/v1/register/role/list/",
    areaOfInterestList: "/api/v1/register/area-of-interest/list/",
    communityList: "/api/v1/register/community/list/",
    register: "/api/v1/register/",
    emailVerification: "/api/v1/register/email-verification/"
};

export const authRoutes = {
    forgetPassword: "/api/v1/register/forgot-password/",
    login: "/api/v1/auth/user-authentication/",
    getMuid: "/api/v1/register/reset-password/verify-token/${token}/",
    resetPassword: "/api/v1/register/reset-password/${token}/",
    getAccessToken: "/api/v1/auth/get-access-token/",
    requestEmailOrMuidOtp: "/api/v1/auth/request-otp/",
    otpVerification: "/api/v1/auth/otp-verification/"
};

export const dashboardRoutes = {
    getInfo: "/api/v1/register/info/",
    getIgData: "/api/v1/dashboard/ig/",
    getUsersData: "/api/v1/dashboard/user/"
};

export const campusRoutes = {
    getStudentDetails: "/api/v1/campus/student-details/",
    getCampusDetails: "/api/v1/campus/campus-details/",
};
