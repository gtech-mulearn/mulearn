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
    login: "/api/v1/auth/user-authentication/",
    getAccessToken: "/api/v1/auth/get-access-token/",
    otpVerification: "/api/v1/auth/otp-verification/",
    requestEmailOrMuidOtp: "/api/v1/auth/request-otp/",
};

export const dashboardRoutes = {
    forgetPassword: "/api/v1/dashboard/user/forgot-password/",
    resetPassword: "/api/v1/dashboard/user/reset-password/${token}/",
    resetPasswordVerify: "/api/v1/dashboard/user/reset-password/verify-token/${token}/",
    getInfo: "/api/v1/dashboard/user/info/",
    getIgData: "/api/v1/dashboard/ig/",
    getIgList: "/api/v1/dashboard/ig/csv",
    getUsersData: "/api/v1/dashboard/user/",
    getTasksData: "/api/v1/dashboard/task/",
    getRolesData: "/api/v1/dashboard/roles/",
    getRolesList: "api/v1/dashboard/roles/csv/",
    getStudentDetails: "/api/v1/dashboard/campus/student-details/",
    getStudentsList: "/api/v1/dashboard/campus/student-details/csv/",
    getCampusDetails: "/api/v1/dashboard/campus/campus-details/",
    getShortenUrl: "/api/v1/url-shortener/list/",
    createShortenUrl: "/api/v1/url-shortener/create/",
    editShortenUrl: "/api/v1/url-shortener/edit/${urlId}/",
    deleteShortenUrl: "/api/v1/url-shortener/delete/${urlId}/",
};

export const organizationRoutes = {
    getOrganizationsAll: "/api/v1/organisation/institutes/info/all_inst",
    getCompany: "/api/v1/organisation/institutes/show/Company",
    getLocation: "/api/v1/location",
    postAddOrganization: "/api/v1/organisation/institutes/add",
    putUpdateOrganization: "/api/v1/organisation/institutes",
    deleteOrgnaization: "/api/v1/organisation/institutes/",
    postGetInfo: "/api/v1/organisation/institutes/info/"
}
