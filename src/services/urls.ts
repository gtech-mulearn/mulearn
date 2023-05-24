export const onboardingRoutes = {
    countryList: "/api/v1/register/country/list/",
    stateList: "/api/v1/register/state/list/",
    districtList: "/api/v1/register/district/list/",
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
    getUsersData: "/api/v1/dashboard/user/",
	getTasksData: "/api/v1/dashboard/task/"
};

export const campusRoutes = {
    getStudentDetails: "/api/v1/campus/student-details/",
    getCampusDetails: "/api/v1/campus/campus-details/",
    getStudentsList: "/api/v1/campus/student-details/csv/"
};

export const organizationRoutes = {
    getOrganizationsAll: "/api/v1/organisation/institutes/info/all_inst",
    getCompany: "/api/v1/organisation/institutes/show/Company",
    getCountry: "/api/v1/location/country"
}
