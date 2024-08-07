export const onboardingRoutes = {
    countryList: "/api/v1/register/country/list/",
    stateList: "/api/v1/register/state/list/",
    districtList: "/api/v1/register/district/list/",
    collegeList: "/api/v1/register/college/list/",
    schoolList: "/api/v1/register/schools/list/",
    companyList: "/api/v1/register/company/list/",
    roleList: "/api/v1/register/role/list/",
    areaOfInterestList: "/api/v1/register/area-of-interest/list/",
    communityList: "/api/v1/register/community/list/",
    register: "/api/v1/register/",
    emailVerification: "/api/v1/register/email-verification/",
    // New Onboarding Routes
    createAccount: "/api/v1/register/new/",
    roles: "/api/v1/register/role/list/",
    colleges: "/api/v1/register/colleges/",
    departments: "/api/v1/register/department/list/",
    companies: "/api/v1/register/company/list/",
    validate: "/api/v1/register/validate/",
    location: "/api/v1/register/location/?q=${param}"
} as const;

export const authRoutes = {
    login: "/api/v1/auth/user-authentication/",
    getAccessToken: "/api/v1/auth/get-access-token/",
    otpVerification: "/api/v1/auth/token-verification/",
    requestEmailOrMuidOtp: "/api/v1/auth/request-otp/"
} as const;
export const NotificationRoutes = {
    getNotification: "/api/v1/notification/list/",
    deleteNotification: "api/v1/notification/delete/id/",
    deleteAllNotification: "api/v1/notification/delete/all/"
};
export const dashboardRoutes = {
    forgetPassword: "/api/v1/dashboard/user/forgot-password/",
    resetPassword: "/api/v1/dashboard/user/reset-password/${token}/",
    resetPasswordVerify:
        "/api/v1/dashboard/user/reset-password/verify-token/${token}/",
    getInfo: "/api/v1/dashboard/user/info/",
    getIgData: "/api/v1/dashboard/ig/",
    getIgList: "/api/v1/dashboard/ig/csv/",
    getUsersData: "/api/v1/dashboard/user/",
    getUsersEditData: "/api/v1/dashboard/user/edit/",
    getUsersList: "/api/v1/dashboard/user/csv/",
    getUsersRoleVerificationData: "/api/v1/dashboard/user/verification/",
    getUsersRoleDelete: "/api/v1/dashboard/user/verification/",
    getUserRoleVerificationCSV: "/api/v1/dashboard/user/verification/csv/",
    getTasksData: "/api/v1/dashboard/task/",
    getRolesData: "/api/v1/dashboard/roles/",
    getRolesList: "api/v1/dashboard/roles/csv/",
    getStudentDetails: "/api/v1/dashboard/campus/student-details/",
    getStudentsList: "/api/v1/dashboard/campus/student-details/csv/",
    getCampusDetails: "/api/v1/dashboard/campus/campus-details/",
    getTaskLevels: "/api/v1/dashboard/task/level/",
    getTaskIGs: "/api/v1/dashboard/task/ig/",
    getTaskOrganizations: "/api/v1/dashboard/task/organization/",
    getTaskChannels: "/api/v1/dashboard/task/channel/",
    getTaskTypes: "/api/v1/dashboard/task/task-types/",
    setAlumniStatus: "/api/v1/dashboard/campus/change-student-type/",
    getTaskTemplate: "/api/v1/dashboard/task/base-template/",

    getKarmaVoucher: "/api/v1/dashboard/karma-voucher/",
    getKarmaVoucherList: "api/v1/dashboard/karma-voucher/import/",
    getKarmaVoucherTemplate: "api/v1/dashboard/karma-voucher/base-template/",

    getChannels: "/api/v1/dashboard/channels/",
    createChannel: "/api/v1/dashboard/channels/",
    editChannel: "/api/v1/dashboard/channels/${channelId}/",
    deleteChannel: "/api/v1/dashboard/channels/${channelId}/",

    getAffiliation: "/api/v1/dashboard/affiliation/",
    createAffiliation: "/api/v1/dashboard/affiliation/",
    editAffiliation: "/api/v1/dashboard/affiliation/${affiliationId}/",
    deleteAffiliation: "/api/v1/dashboard/affiliation/${affiliationId}/",

    getShortenUrl: "/api/v1/url-shortener/list/",
    createShortenUrl: "/api/v1/url-shortener/create/",
    editShortenUrl: "/api/v1/url-shortener/edit/${urlId}/",
    deleteShortenUrl: "/api/v1/url-shortener/delete/${urlId}/",
    getAnalytics: "/api/v1/url-shortener/get-analytics/${urlId}/",

    getUserProfile: "/api/v1/dashboard/profile/user-profile/",
    getPublicUserProfile: "/api/v1/dashboard/profile/user-profile/${muid}/",
    getEditUserProfile: "/api/v1/dashboard/profile/",
    getUserLog: "/api/v1/dashboard/profile/user-log/",
    getUserLevels: "/api/v1/dashboard/profile/get-user-levels/",
    getPublicUserLevels: "/api/v1/dashboard/profile/get-user-levels/${muid}/",
    putIsPublic: "/api/v1/dashboard/profile/share-user-profile/",
    getPublicUserLog: "/api/v1/dashboard/profile/user-log/${muid}/",
    getUserSuggestion: "/api/v1/dashboard/profile/user-suggestion/",
    getStudentLeaderBoard: "/api/v1/leaderboard/students/",
    getIgDetails: "/api/v1/dashboard/profile/ig-edit/",
    getSocials: "/api/v1/dashboard/profile/socials/",
    postProfileImage: "/api/v1/dashboard/user/profile/update/",

    zonalStudentDetails: "/api/v1/dashboard/zonal/student-details/",
    zonalStudentData: "/api/v1/dashboard/zonal/student-details/csv/",
    zonalCampusDetails: "/api/v1/dashboard/zonal/college-details/",
    zonalCampusData: "/api/v1/dashboard/zonal/campus-details/csv/",

    departments: "/api/v1/dashboard/organisation/departments/",
    createDepartment: "/api/v1/dashboard/organisation/departments/create/",
    editDepartment: "/api/v1/dashboard/organisation/departments/edit/",
    deleteDepartment: "/api/v1/dashboard/organisation/departments/delete/",
    districtStudentDetails: "/api/v1/dashboard/district/student-details/",
    districtStudentData: "/api/v1/dashboard/district/student-details/csv/",
    districtCampusDetails: "/api/v1/dashboard/district/college-details/",
    districtCampusData: "/api/v1/dashboard/district/campus-details/csv/",

    getHackathonFormData: "/api/v1/hackathon/list-default-form-fields/",
    createHackathon: "/api/v1/hackathon/create-hackathon/",
    editHackathon: "/api/v1/hackathon/edit-hackathon/",
    getHackathons: "/api/v1/hackathon/list-hackathons/",
    getHackathonInfo: "/api/v1/hackathon/info/",
    getOrganizers: "/api/v1/hackathon/list-organiser-hackathons/",
    deleteHackathon: "/api/v1/hackathon/delete-hackathon/",
    publishHackathon: "/api/v1/hackathon/publish-hackathon/",
    addOrganizer: "/api/v1/hackathon/add-organiser/",
    submitApplication: "/api/v1/hackathon/submit-hackathon/",
    getApplicationForm: "/api/v1/hackathon/list-form/",
    getApplicants: "/api/v1/hackathon/list-applicants/",

    lc: "/api/v1/dashboard/lc/",
    searchLearningCircleWithCircleCode: "/api/v1/dashboard/lc/list-all/",
    getCampusLearningCircles: "/api/v1/dashboard/lc/",
    getLearningCirclesLead: "/api/v1/dashboard/lc/lead/",
    createLearningCircle: "/api/v1/dashboard/lc/create/",
    listLearningCircle: "/api/v1/dashboard/lc/list-all/",
    joinLearningCircle: "/api/v1/dashboard/lc/join/",
    setLCMeetTime: "/api/v1/dashboard/lc/meet/",
    reportLCMeet: "/api/v1/dashboard/lc/meet-record/create/",
    getLCMeetReport: "/api/v1/dashboard/lc/meet-record/show/",
    getCampusIg: "api/v1/dashboard/ig/list/",
    getCount: "api/v1/dashboard/lc/stats/",

    getAllOrganisations: "/api/v1/hackathon/list-organisations/",
    getAllDistricts: "/api/v1/hackathon/list-districts/",

    referredUsersList: "/api/v1/dashboard/referral/",
    createInviteEmail: "/api/v1/dashboard/referral/send-referral/",

    //graphs
    //campus
    getCampusWeeklyKarma: "/api/v1/dashboard/campus/weekly-karma/",
    getStudentLevels: "api/v1/dashboard/campus/student-level/",
    //district
    getDistrictStudentLevels: "api/v1/dashboard/district/student-level/",
    getDistrictTopCampus: "api/v1/dashboard/district/top-campus/",
    //zonal
    getZonalTopDistrict: "api/v1/dashboard/zonal/top-districts/",
    getZonalStudentLevels: "api/v1/dashboard/zonal/student-level/",

    collegeLevels: "api/v1/dashboard/college/",
    collegeLevlesDelete: "api/v1/dashboard/college/delete/",

    //Dyanmic Type
    dtGetRoles: "api/v1/dashboard/dynamic-management/roles/",
    dtGetTypes: "api/v1/dashboard/dynamic-management/types/",
    getDynamicRoles: "api/v1/dashboard/dynamic-management/dynamic-role/",
    getDynamicUser: "api/v1/dashboard/dynamic-management/dynamic-user/",

    getErrorLog: "api/v1/dashboard/error-log/",
    clearErrorLog: "api/v1/dashboard/error-log/clear/",
    patchLogError: "api/v1/dashboard/error-log/patch/",

    //Settings
    changePassword: "api/v1/dashboard/profile/change-password/",
    deleteUser: "/api/v1/dashboard/user/",

    //discord moderation
    taskList: "api/v1/dashboard/discord-moderator/tasklist",
    taskListCount: "api/v1/dashboard/discord-moderator/pendingcounts/",
    leaderboard: "api/v1/dashboard/discord-moderator/leaderboard/",

    //Bulk User Role Management
    roleBulkAssign: "api/v1/dashboard/roles/bulk-assign/",
    roleBulkAssignExcel: "api/v1/dashboard/roles/bulk-assign-excel/",
    getRolesTemplate: "api/v1/dashboard/roles/base-template/",

    //Wadhwani
    getWadhwaniClientToken: "api/v1/integrations/wadhwani/auth-token/",
    getWadhwaniCourses: "api/v1/integrations/wadhwani/course-details/",
    getWadhwaniCourseLink: "api/v1/integrations/wadhwani/user-login/",

    //OpenGrad
    getOpenGradClientToken: "api/v1/integrations/OpenGrad/auth-token/",
    getOpenGradCourses: "api/v1/integrations/OpenGrad/course-details/",
    getOpenGradCourseLink: "api/v1/integrations/OpenGrad/user-login/"
} as const;

export const organizationRoutes = {
    getOrganizationsAll: "/api/v1/dashboard/organisation/institutes/",
    getCompany: "/api/v1/dashboard/organisation/institutes/show/Company/",
    getCollege: "/api/v1/dashboard/organisation/institutes/show/College/",
    getCommunity: "/api/v1/dashboard/organisation/institutes/show/Community/",
    getAffiliation: "/api/v1/dashboard/organisation/affiliation/list/",
    createAffiliation:
        "/api/v1/dashboard/organisation/institutes/affiliation/create/",
    editAffiliation:
        "/api/v1/dashboard/organisation/institutes/affiliation/edit/",
    deleteAffiliation:
        "/api/v1/dashboard/organisation/institutes/affiliation/delete/",

    getLocation: "/api/v1/dashboard/location/",
    postAddOrganization: "/api/v1/dashboard/organisation/institutes/create/",
    putUpdateOrganization: "/api/v1/dashboard/organisation/institutes/edit/",
    deleteOrgnaization: "/api/v1/dashboard/organisation/institutes/delete/",
    postGetInfo: "/api/v1/dashboard/organisation/institutes/info/",
    getOrgCsv: (org_type: string) =>
        `/api/v1/dashboard/organisation/institutes/${org_type}/csv/`,

    createOrganisation: "/api/v1/dashboard/organisation/institutes/create/",
    getOrganisationDetails: "/api/v1/dashboard/organisation/institutes/info/",
    editOrganisation: "/api/v1/dashboard/organisation/institutes/edit/"
} as const;

export const ManageLocationsRoutes = {
    getCountryData: "/api/v1/dashboard/location/countries/",
    patchCountryData: "/api/v1/dashboard/location/countries/",
    getStateData: "/api/v1/dashboard/location/states/",
    patchStateData: "/api/v1/dashboard/location/states/",
    getZoneData: "/api/v1/dashboard/location/zones/",
    patchZoneData: "/api/v1/dashboard/location/zones/",
    getDistrictData: "/api/v1/dashboard/location/districts/",
    patchDistrictData: "/api/v1/dashboard/location/districts/"
} as const;

export const KKEMRoutes = {
    userAuth: "/api/v1/integrations/kkem/authorization/",
    userLogin: "/api/v1/integrations/kkem/login/",
    getDWMSDetails: "/api/v1/integrations/kkem/user/${param}/",
    userStatus: "/api/v1/integrations/kkem/user/status/",
    getLcReport: "/api/v1/public/lc-enrollment/csv/"
};

export const PublicRoutes = {
    getRandomLc: "/api/v1/dashboard/lc/list/",
    getLcDashboard: "/api/v1/public/lc-dashboard/",
    getLcReport: "/api/v1/public/lc-enrollment/",
    getOrgWiseReport: "/api/v1/public/college-wise-lc-report/"
} as const;

export const googleSheetRoutes = {
    getHackathonData:
        "https://opensheet.elk.sh/1w2Ax918fkkumNiCJ42tc5T9fJeidVGL9_9B-2j7klDM/Sheet1/",
    getHackathonDashboardData:
        "https://opensheet.elk.sh/1cGUHmdPd8ticzuuEpkX6j7G5p7hU47SZvnvgUnd6xBk/Sheet1"
};

export const donationRoutes = {
    order: "api/v1/donate/order/",
    verify: "api/v1/donate/verify/"
};
