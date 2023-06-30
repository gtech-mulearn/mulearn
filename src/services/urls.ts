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
    requestEmailOrMuidOtp: "/api/v1/auth/request-otp/"
};

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
    getPublicUserProfile: "/api/v1/dashboard/profile/user-profile/${muid}/",
    editUserProfile: "/api/v1/dashboard/profile/edit-user-profile/",
    getUserLog: "/api/v1/dashboard/profile/user-log/",
    getUserLevels:"/api/v1/dashboard/profile/get-user-levels/",
    putIsPublic: "/api/v1/dashboard/profile/share-user-profile/",
    getPublicUserLog: "/api/v1/dashboard/profile/user-log/${muid}/",
    getUserSuggestion: "/api/v1/dashboard/profile/user-suggestion/",
    getStudentLeaderBoard: "api/v1/leaderboard/students/",
    
    zonalStudentDetails: "/api/v1/dashboard/zonal/student-details/",
    zonalStudentData: "/api/v1/dashboard/zonal/student-details/csv/",
    zonalCampusDetails: "/api/v1/dashboard/zonal/campus-details/",
    zonalCampusData: "/api/v1/dashboard/zonal/campus-details/csv/",

    districtStudentDetails: "/api/v1/dashboard/district/student-details/",
    districtStudentData: "/api/v1/dashboard/district/student-details/csv/",
    districtCampusDetails: "/api/v1/dashboard/district/campus-details/",
    districtCampusData: "/api/v1/dashboard/district/campus-details/csv/",

    getHackathonFormData: "/api/v1/hackathon/list-default-form-fields/",
    createHackathon: "/api/v1/hackathon/create-hackathon/",
    getHackathons: "/api/v1/hackathon/list-hackathons/"
};

export const organizationRoutes = {
    getOrganizationsAll: "/api/v1/organisation/institutes/info/all_inst",
    getCompany: "/api/v1/organisation/institutes/show/Company",
    getAffiliation: "/api/v1/organisation/institutes/org/affiliation",
    getLocation: "/api/v1/location",
    postAddOrganization: "/api/v1/organisation/institutes/add",
    putUpdateOrganization: "/api/v1/organisation/institutes",
    deleteOrgnaization: "/api/v1/organisation/institutes/",
    postGetInfo: "/api/v1/organisation/institutes/info/",
    getOrgCsv: "/api/v1/organisation/institutes/csv"
};

export const KKEMRoutes = {
    userAuth: "/api/v1/integrations/kkem/authorization/"
};
