export const onboardingRoutes = {
  validate: "/api/v1/user/register/jwt/validate/",
  collegeList: "/api/v1/user/register/college/list/",
  companyList: "/api/v1/user/register/company/list/",
  roleList: "/api/v1/user/register/role/list/",
  areaOfInterestList: "/api/v1/user/register/area-of-interest/list/",
  communityList: "/api/v1/user/register/community/list/",
  register: "/api/v1/user/register/",
  emailVerification: "/api/v1/user/email-verification/",
};

export const authRoutes = {
  forgetPassword: "/api/v1/user/forgot-password/",
  login: "/api/v1/auth/user-authentication/",
  getMuid: "/api/v1/user/reset-password/verify-token/${token}/",
  resetPassword: "/api/v1/user/reset-password/${token}/",
  getAccessToken: "/api/v1/auth/get-access-token/",
};

export const dashboardRoutes = {
  getInfo: "/api/v1/user/info/",
};
