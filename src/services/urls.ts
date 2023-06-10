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
    requestEmailOrMuidOtp: "/api/v1/auth/request-otp/"};

export const dashboardRoutes = {
    forgetPassword: "/api/v1/dashboard/user/forgot-password/",
    resetPassword: "/api/v1/dashboard/user/reset-password/${token}/",
    resetPasswordVerify:
        "/api/v1/dashboard/user/reset-password/verify-token/${token}/",
    getInfo: "/api/v1/dashboard/user/info/",
    getIgData: "/api/v1/dashboard/ig/",
    getIgList: "/api/v1/dashboard/ig/csv",
    getUsersData: "/api/v1/dashboard/user/",
    getUsersList: "/api/v1/dashboard/user/csv/",
    getUsersRoleVerificationData: "/api/v1/dashboard/user/verification/",
    getUsersRoleVerificationList: "/api/v1/dashboard/user/verification/csv",
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

    getUserProfile: "/api/v1/dashboard/profile/user-profile/",
    editUserProfile: "/api/v1/dashboard/profile/edit-user-profile/",
    getUserLog: "/api/v1/dashboard/profile/user-log/",
    getUserTaskLog: "/api/v1/dashboard/profile/user-task-log/",
    getUserIg: "/api/v1/dashboard/profile/user-ig/",
    getUserSuggestion: "/api/v1/dashboard/profile/user-suggestion/",
    getStudentLeaderBoard: "api/v1/leaderboard/students/",

    zonalStudentDetails: "/api/v1/dashboard/zonal/student-details/",
    zonalCampusDetails: "/api/v1/dashboard/zonal/campus-details/"
};

export const organizationRoutes = {
    getOrganizationsAll: "/api/v1/organisation/institutes/info/all_inst",
    getCompany: "/api/v1/organisation/institutes/show/Company",
    getAffiliation: "/api/v1/organisation/institutes/org/affiliation",
    getLocation: "/api/v1/location",
    postAddOrganization: "/api/v1/organisation/institutes/add",
    putUpdateOrganization: "/api/v1/organisation/institutes",
    deleteOrgnaization: "/api/v1/organisation/institutes/",
    postGetInfo: "/api/v1/organisation/institutes/info/"
};
