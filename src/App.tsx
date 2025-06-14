import "./App.css";
import { lazy, Suspense } from "react";
import {
  RouterProvider,
  createBrowserRouter,
  Navigate
} from "react-router-dom";
import AuthRoutes from "./components/AuthRoutes";
import PrivateRoutes from "./components/PrivateRoutes";
import DashboardRootLayout from "./modules/Dashboard/layouts/DashboardRootLayout";
import NotFound from "./components/NotFound";
import { roles, managementTypes } from "./services/types";
import SecureAuthRoutes from "./services/authCheck";
import { Toaster } from "react-hot-toast";
import MuLoader from "./components/MuComponents/MuLoader/MuLoader";
import In50Hours from "./modules/Public/In50Hours/In50Hours";
import LaunchPad from "./modules/Public/Launchpad/Launchpad";
import Calendar from "./modules/Public/Calendar/Calendar";
import EventsHome from "./modules/Public/Events/Events";
import EnablersPage from "./modules/Public/EnablersPage/EnablersPage";
import TermsAndCondition from "./modules/Public/Home/components/TermsandConditions/TermsandConditions";
import PrivacyPolicy from "./modules/Public/Home/components/PrivacyPolicy/PrivacyPolicy";

// Lazy-loaded components
const ArtofTeaching = lazy(() => import("./modules/Public/ArtOfTeaching/ArtOfTeaching"));
const CampusStudentList = lazy(() => import("./modules/Dashboard/modules").then(module => ({ default: module.CampusStudentList })));
const ConnectDiscord = lazy(() => import("./modules/Dashboard/modules").then(module => ({ default: module.ConnectDiscord })));
const LandingPage = lazy(() => import("./modules/Public/LearningCircles/pages/LandingPage"));
const ProfileV2 = lazy(() => import("./modules/Dashboard/modules/ProfileV2/pages/Profile"));
const Rolepage = lazy(() => import("./modules/Common/Authentication/pages/Onboarding/RolePage/RolePage"));
const CollegePage = lazy(() => import("./modules/Common/Authentication/pages/Onboarding/CollegePage/CollegePage"));
const SignIn = lazy(() => import("./modules/Common/Authentication/pages/Onboarding/SignIn/SignIn"));
const ErrorLog = lazy(() => import("./modules/Dashboard/modules/ErrorLog/ErrorLog"));
const KKEMEventBeyondUs = lazy(() => import("./modules/Public/KKEM/modules/KKEMEventTemplate/KKEMEventBeyondUs"));
const LearningCircles = lazy(() => import("./modules/Public/KKEM/modules/Dashboard/LearningCircles/LearningCircles"));
const ForgetPassword = lazy(() => import("./modules/Common/Authentication/pages/Onboarding/ForgetPassword/ForgetPassword"));
const ResetPassword = lazy(() => import("./modules/Common/Authentication/pages/Onboarding/ResetPassword/ResetPassword"));
const LcDashboard = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LcDashboard/LcDashboard"));
const CommunityPage = lazy(() => import("./modules/Common/Authentication/pages/Onboarding/CommunityPage/CommunityPage"));
// const Foundation = lazy(() => import("./modules/Public/Foundation/Foundation"));
const Channels = lazy(() => import("./modules/Dashboard/modules/Channels/Pages/Channels"));
const Settings = lazy(() => import("./modules/Dashboard/modules/Settings/Settings"));
const Account = lazy(() => import("./modules/Dashboard/modules/Settings/pages/Account/Account"));
const DiscordModeration = lazy(() => import("./modules/Dashboard/modules/DiscordModeration/DiscordModeration"));
const Test = lazy(() => import("./modules/Dashboard/modules/Test/Test"));
const Analytics = lazy(() => import("./modules/Dashboard/modules/UrlShortener/Pages/Analytics"));
const Donation = lazy(() => import("./modules/Public/Donation/Donation"));
const Refund = lazy(() => import("./modules/Public/Donation/pages/Refund"));
const DonationSuccess = lazy(() => import("./modules/Public/Donation/pages/DonationSuccess"));
const OpenGrad = lazy(() => import("./modules/Dashboard/modules/OpenGrad"));
const LcMeetupIfo = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/Meetup/LcMeetup"));
const OrganizationSetting = lazy(() => import("./modules/Dashboard/modules/Settings/pages/Organization/Organization"));
const SettingsHome = lazy(() => import("./modules/Dashboard/modules/Settings/pages/Settings/SettingsHome"));
const LcReportAttendee = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LcDashboard/components/LcAttendeeReport"));
const LcAdmin = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LcAdmin/LcAdmin"));
const VerifyOrganizations = lazy(() => import("./modules/Dashboard/modules/VerifyOrganizations/VerifyOrganizations"));
const CreateLC = lazy(() => import("./modules/Dashboard/modules/LearningCircleV2/pages/CreateLC/CreateLC"));
const LearningCircleLanding = lazy(() => import("./modules/Dashboard/modules/LearningCircleV2/pages/landing/LearningCircleLanding"));
const LearningCircleLanding2 = lazy(() => import("./modules/Dashboard/modules/LearningCircleV2/pages/landing/LearningCircleLanding2"));
const CreateLCMeetup = lazy(() => import("./modules/Dashboard/modules/LearningCircleV2/pages/CreateLCMeetup/CreateLCMeetup"));
const CommunityPartners = lazy(() => import("./modules/Public/CommPartners/CommPartners"));
const CompanyPartners = lazy(() => import("./modules/Public/CompanyPartners/CompanyParnters"));
const DashboardLC = lazy(() => import("./modules/Dashboard/modules/LearningCircleV2/pages/dashboard/DashboardLC"));
const YourLC = lazy(() => import("./modules/Dashboard/modules/LearningCircleV2/pages/YourLC/YourLC"));
const MoreInfoLC = lazy(() => import("./modules/Dashboard/modules/LearningCircleV2/pages/moreInfoLC/MoreInfoLC"));
const AttendeeReport = lazy(() => import("./modules/Dashboard/modules/LearningCircleV2/pages/AttendeeReport/AttendeeReport"));
const LCReport = lazy(() => import("./modules/Dashboard/modules/LearningCircleV2/pages/LCReport/LCReport"));
const UserInterest = lazy(() => import("./modules/Common/Authentication/pages/Onboarding/UserInterest/UserInterest"));
const PathFinder = lazy(() => import("./modules/Common/Authentication/pages/Onboarding/PathFinder/PathFinder"));
const RegisterPage = lazy(() => import("./modules/Common/Authentication/pages/Onboarding/Register/Register"));
const LearningPaths = lazy(() => import("./modules/Dashboard/modules/LearningPaths/pages/LearningPaths"));
const LearningPathOne = lazy(() => import("./modules/Dashboard/modules/LearningPaths/pages/LearningPathOne/LearningPathOne"));
const ComingSoonPage = lazy(() => import("./modules/Common/Authentication/pages/ComingSoon"));
const MuLearnLanding = lazy(() => import("./modules/Public/Home/pages/LandingPage"));
const Manifesto = lazy(() => import("./modules/Public/Manifesto/Manifesto"));
const TeamsPage = lazy(() => import("./modules/Public/Team/pages/Team"));
const CoursesMainPage = lazy(() => import("./modules/Dashboard/modules/Courses/Pages/CoursesMainPage"));
const ManagementPage = lazy(() => import("./modules/Dashboard/modules/Management/Pages/ManagementPage"));
const ManageUsersPage = lazy(() => import("./modules/Dashboard/modules/ManageUsers/ManageUsers"));
const UserRoleVerificationPage = lazy(() => import("./modules/Dashboard/modules/UserRoleVerification/UserRoleVerification"));
const AffiliationPage = lazy(() => import("./modules/Dashboard/modules/Affiliation/Pages/Affiliation"));
const OrganizationTransferPage = lazy(() => import("./modules/Dashboard/modules/OrganizationTransfer/components/organizationTransfer"));
const ManageDepartmentsPage = lazy(() => import("./modules/Dashboard/modules/Departments/Departments"));
const OrganizationsPage = lazy(() => import("./modules/Dashboard/modules/Organizations/Organizations"));
const LCMeetupVerificationPage = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/Meetup/LcMeetup"));
const VerifyOrganizationsPage = lazy(() => import("./modules/Dashboard/modules/VerifyOrganizations/VerifyOrganizations"));
const CollegeLevelsPage = lazy(() => import("./modules/Dashboard/modules/CollegeLevels/CollegeLevels"));
const KarmaVoucherPage = lazy(() => import("./modules/Dashboard/modules/KarmaVoucher/KarmaVoucher"));
const ErrorLogPage = lazy(() => import("./modules/Dashboard/modules/ErrorLog/ErrorLog"));
const DynamicTypePage = lazy(() => import("./modules/Dashboard/modules/DynamicType/DynamicType"));
const ManageRolesPage = lazy(() => import("./modules/Dashboard/modules/ManageRoles/ManageRoles"));
const ManageLocationsPage = lazy(() => import("./modules/Dashboard/modules/ManageLocation/ManageLocation"));
const ChannelsPage = lazy(() => import("./modules/Dashboard/modules/Channels/Pages/Channels"));
const URLShortenerPage = lazy(() => import("./modules/Dashboard/modules/UrlShortener/Pages/UrlShortener"));
const DiscordModerationPage = lazy(() => import("./modules/Dashboard/modules/DiscordModeration/DiscordModeration"));
const MentorSearchPage = lazy(() => import("./modules/Dashboard/modules/Mentors/Pages/MentorPage"));
const InterestGroupsPage = lazy(() => import("./modules/Dashboard/modules/InterestGroups/pages/InterestGroupsPage"));
const InterestGroupOne = lazy(() => import("./modules/Dashboard/modules/InterestGroups/pages/One/InterestGroupOne"));
const InterestGroupManage = lazy(()=> import("./modules/Dashboard/modules/InterestGroup/InterestGroup"));
const SpecialEvents = lazy(() => import("./modules/Dashboard/modules/SpecialEvents/pages/SpecialEvents"));
const Leaderboard = lazy(() => import("./modules/Dashboard/modules/LeaderBoard/components/Leaderboard"));
const CampusPage = lazy(() => import("./modules/Dashboard/modules/Campus/components/CampusForum/CampusPage-demo"));
const MuLeaderboardPage = lazy(() => import("./modules/Dashboard/modules/LeaderBoard/pages/MuLeaderboardPage"));
const CampusSearchPage = lazy(() => import("./modules/Dashboard/modules/Campus/pages/CampusSearchPage"));
const MuLearnersSearchPage = lazy(() => import("./modules/Dashboard/modules/Search/Pages/MulearnersSearchPage"));
const CampusForumPage = lazy(() => import("./modules/Dashboard/modules/Campus/components/CampusForum/CampusForumPage"));
const CampusForumLandingPage = lazy(() => import("./modules/Dashboard/modules/Campus/components/CampusForum/CampusForumLanding"));
const Dashboardpage = lazy(() => import("./modules/Dashboard/modules/Dashboard/Pages/Dashboardpage"));
const LearningPathPage = lazy(() => import("./modules/Dashboard/modules/LearningPathNew/Pages/LearningPathPage"));
const SearchMain = lazy(() => import("./modules/Dashboard/modules/Search/Pages/SearchMain"));
const CampusDetails = lazy(() => import("./modules/Dashboard/modules/Campus/components/CampusForum/CampusPage-demo"));
const LearningPathDetailPage = lazy(() => import("./modules/Dashboard/modules/InterestGroups/components/LearningPathDetailPage"));
const ManageAchievements = lazy(() => import("./modules/Dashboard/modules/ManageAchievements/ManageAchievements"));
const Profile = lazy(() => import("./modules/Dashboard/modules/Profile/pages/Profile"));
const KarmaVoucher = lazy(() => import("./modules/Dashboard/modules/KarmaVoucher/KarmaVoucher"));
const KarmaVoucherBulkImport = lazy(() => import("./modules/Dashboard/modules/KarmaVoucher/components/KarmaVoucherBulkImport"));
const Tasks = lazy(() => import("./modules/Dashboard/modules/Tasks/Tasks").then(module => ({ default: module.Tasks })));
const TaskType = lazy(() => import("./modules/Dashboard/modules/TaskType/TaskType").then(module => ({ default: module.TaskType })));
const Events = lazy(() => import("./modules/Dashboard/modules/Events/Events").then(module => ({ default: module.Events })));
const DynamicType = lazy(() => import("./modules/Dashboard/modules/DynamicType/DynamicType"));
const ManageRoles = lazy(() => import("./modules/Dashboard/modules/ManageRoles/ManageRoles"));
const UserRoleVerification = lazy(() => import("./modules/Dashboard/modules/UserRoleVerification/UserRoleVerification"));
const UserRoleVerificationEdit = lazy(() => import("./modules/Dashboard/modules/UserRoleVerification/UserRoleVerificationEdit"));
const Affiliation = lazy(() => import("./modules/Dashboard/modules/Affiliation/Pages/Affiliation"));
const UrlShortener = lazy(() => import("./modules/Dashboard/modules/UrlShortener/Pages/UrlShortener"));
const TaskEdit = lazy(() => import("./modules/Dashboard/modules/Tasks/TaskEdit"));
const TaskCreate = lazy(() => import("./modules/Dashboard/modules/Tasks/TaskCreate"));
const TaskBulkImport = lazy(() => import("./modules/Dashboard/modules/Tasks/TaskBulkImport"));
const RolesBulkImport = lazy(() => import("./modules/Dashboard/modules/ManageRoles/RolesBulkImport"));
const Hackathon = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/Hackathon"));
const HackathonCreate = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonCreate"));
const KKEMLanding = lazy(() => import("./modules/Public/KKEM/modules/KKEMLanding"));
const KKEMAuth = lazy(() => import("./modules/Public/KKEM/modules/KKEMAuth"));
const ManageLocation = lazy(() => import("./modules/Dashboard/modules/ManageLocation/ManageLocation"));
const AddLocation = lazy(() => import("./modules/Dashboard/modules/ManageLocation/AddLocation"));
const EditLocation = lazy(() => import("./modules/Dashboard/modules/ManageLocation/EditLocation"));
const HackathonOrganizers = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonOrganizers").then(module => ({ default: module.HackathonOrganizers })));
const Organizations = lazy(() => import("./modules/Dashboard/modules/Organizations/Organizations"));
const OrganizationTransfer = lazy(() => import("./modules/Dashboard/modules/OrganizationTransfer/components/organizationTransfer"));
const ManageUsers = lazy(() => import("./modules/Dashboard/modules/ManageUsers/ManageUsers"));
const InterestGroup = lazy(() => import("./modules/Dashboard/modules/InterestGroup/InterestGroup"));
const HackathonDetails = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonDetails"));
const DistrictDashboard = lazy(() => import("./modules/Dashboard/modules/DistrictDashboard/DistrictDashboard"));
const ZonalDashboard = lazy(() => import("./modules/Dashboard/modules/ZonalDashboard/ZonalDashboard"));
const HackathonRegistration = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonRegistration"));
const HackathonParticipants = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonParticipants"));
const CollegeLevels = lazy(() => import("./modules/Dashboard/modules/CollegeLevels/CollegeLevels"));
const Refer = lazy(() => import("./modules/Dashboard/modules/Refer/Refer"));
const LearningCircle = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LearningCircle"));
const LearningCircleCreate = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LearningCircleCreate"));
const FindCircle = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LearningCircleFind"));
const Departments = lazy(() => import("./modules/Dashboard/modules/Departments/Departments"));
const LearningCircleLandingPage = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LearningCircleLandingPage"));
const MarketPlaceHistory = lazy(() => import("./modules/Dashboard/modules/Marketplace/MarketPlaceHistory"));
const Marketplace = lazy(() => import("./modules/Dashboard/modules/Marketplace/UserMarketplace/UserMarketplce"));
const MarketAddItem = lazy(() => import("./modules/Dashboard/modules/Marketplace/MarketAddItem/MarketAddItem"));
const AdminMarketPlace = lazy(() => import("./modules/Dashboard/modules/Marketplace/AdminMarketplace/AdminMarketplace"));
const PurchaseInventory = lazy(() => import("./modules/Dashboard/modules/Marketplace/PurchaseInventory/PurchaseInventory"));
const ConnectedDevices = lazy(() => import("./modules/Dashboard/modules/Settings/pages/ConnectedDevices"));
const Wadhwani = lazy(() => import("./modules/Dashboard/modules/Wadhwani"));
const Trivial = lazy(() => import("./modules/Public/TrivialIdeas/modules/trivial"));
const YIP = lazy(() => import("./modules/Public/yip/YIP2023"));

function App() {
  const AuthChecker = SecureAuthRoutes();
  const router = createBrowserRouter([
    { path: "/", element: <MuLearnLanding /> },
    { path: "/manifesto", element: <Manifesto /> },
    {path: "/enablers", element: <EnablersPage/>},
    { path: "/community-partners", element: <CommunityPartners /> },
    { path: "/company-partners", element: <CompanyPartners /> },
    { path: "/yip", element: <YIP /> },
    { path: "/artofteaching", element: <ArtofTeaching /> },
    { path: "/in50hours", element: <In50Hours /> },
    { path: "/launchpad", element: <LaunchPad /> },
    {path: "/events/calendar", element: <Calendar/>},
    {path: "/events/weekly", element: <EventsHome/>},
    { path: "*", element: <NotFound /> },
    { path: "404", element: <NotFound /> },
    { path: "kkem", element: <KKEMLanding /> },
    { path: "kkem/authorization/:token", element: <KKEMAuth /> },
    { path: "donation", element: <Donation /> },
    { path: "donation/success", element: <DonationSuccess /> },
    { path: "donation/refund", element: <Refund /> },
    { path: "trivial-ideas", element: <Trivial /> },
    { path: "register/:role", element: <RegisterPage /> },
    { path: "register/", children: [{ path: "", element: <RegisterPage /> }] },
    { path: "login", element: <SignIn /> },
    { path: "forgot-password", element: <ForgetPassword /> },
    // { path: "reset-password", element: <ResetPassword /> },
    { path: "/register/interests", element: <UserInterest /> },
    { path: "/register/organization", element: <CollegePage /> },
    { path: "/register/pathfinder", element: <PathFinder /> },
    // { path: "/signin", element: <SignIn /> },
    { path: "register/about", element: <Rolepage /> },
    { path: "team", element: <TeamsPage /> },
    {path: "termsandconditions", element: <TermsAndCondition/>},
    {path: "privacypolicy", element: <PrivacyPolicy/>},
    {
      path: "/dashboard",
      element: <DashboardRootLayout />,
      children: [
        // { path: "learning-paths", element: <LearningPaths /> },
        // { path: "learning-paths/:id", element: <LearningPathOne /> },
        { path: "campus/:org_id", element: <CampusDetails /> },
        { path: "interestgroups", element: <InterestGroupsPage /> },
        { path: "interestgroups/:id", element: <InterestGroupOne /> },
        { path: "special-events", element: <SpecialEvents /> },
        { path: "leaderboard", element: <MuLeaderboardPage /> },
        { path: "bootcamps", element: <ComingSoonPage /> },
        // { path: "learningCircles", element: <ComingSoonPage /> },
        { path: "courses", element: <CoursesMainPage /> },
      ]
    },
    {
      path: "/",
      element: <PrivateRoutes />,
      children: [
        {
          path: "/dashboard",
          element: <DashboardRootLayout />,
          children: [
            { path: "home", element: <Dashboardpage /> },
            { path: "mujourney", element: <LearningPathPage /> },
            { path: "learning-path/:id", element: <LearningPathPage /> },
            { path: "profile", element: <Profile /> },
            { path: "muverse", element: <ComingSoonPage /> },
            { path: "interestgroups", element: <ComingSoonPage /> },
            { path: "learningcircle", element: <LearningCircleLanding2 /> },
            { path: "search", element: <SearchMain /> },
            { path: "mulearners", element: <MuLearnersSearchPage /> },
            { path: "mentors", element: <MentorSearchPage /> },
            { path: "campus", element: <CampusSearchPage /> },
            { path: "management", element: <AuthChecker roles={[roles.ADMIN]} children={<ManagementPage />} /> },
            { path: "management/manage-achievements", element: <AuthChecker roles={[roles.ADMIN]} children={<ManageAchievements />} /> },
            { path: "management/user-management/manage-users", element: <AuthChecker roles={[roles.ADMIN]} children={<ManageUsersPage />} /> },
            { path: "management/user-management/user-role-verification", element: <AuthChecker roles={[roles.ADMIN]} children={<UserRoleVerificationPage />} /> },
            { path: "management/organization/affiliation", element: <AuthChecker roles={[roles.ADMIN]} children={<AffiliationPage />} /> },
            { path: "management/organization/organization-transfer", element: <AuthChecker roles={[roles.ADMIN]} children={<OrganizationTransferPage />} /> },
            { path: "management/organization/manage-departments", element: <AuthChecker roles={[roles.ADMIN]} children={<ManageDepartmentsPage />} /> },
            { path: "management/manage-interest-groups", element: <AuthChecker roles={[roles.ADMIN]} children={<InterestGroupManage />} /> },
            { path: "management/organization/organizations", element: <AuthChecker roles={[roles.ADMIN]} children={<OrganizationsPage />} /> },
            { path: "management/interest-groups", element: <AuthChecker roles={[roles.ADMIN]} children={<InterestGroupsPage />} /> },
            { path: "management/lc-meetup-verification", element: <AuthChecker roles={[roles.ADMIN]} children={<LCMeetupVerificationPage />} /> },
            { path: "management/verify-organizations", element: <AuthChecker roles={[roles.ADMIN]} children={<VerifyOrganizationsPage />} /> },
            { path: "management/college-levels", element: <AuthChecker roles={[roles.ADMIN]} children={<CollegeLevelsPage />} /> },
            { path: "management/karma-voucher", element: <AuthChecker roles={[roles.ADMIN]} children={<KarmaVoucherPage />} /> },
            { path: "management/error-log", element: <AuthChecker roles={[roles.ADMIN]} children={<ErrorLogPage />} /> },
            { path: "management/dynamic-type", element: <AuthChecker roles={[roles.ADMIN]} children={<DynamicTypePage />} /> },
            { path: "management/manage-roles", element: <AuthChecker roles={[roles.ADMIN]} children={<ManageRolesPage />} /> },
            { path: "management/manage-locations", element: <AuthChecker roles={[roles.ADMIN]} children={<ManageLocationsPage />} /> },
            { path: "management/channels", element: <AuthChecker roles={[roles.ADMIN]} children={<ChannelsPage />} /> },
            { path: "/dashboard/url-shortener", element: <AuthChecker roles={[roles.ADMIN, roles.ASSOCIATE]} children={<URLShortenerPage />} /> },
            { path: "management/discord-moderation", element: <AuthChecker roles={[roles.ADMIN]} children={<DiscordModerationPage />} /> },
            { path: "connect-discord", element: <ConnectDiscord /> },
            { path: "wadhwani", element: <Wadhwani /> },
            { path: "opengrad", element: <OpenGrad /> },
            { path: "refer", element: <Refer /> },
            { path: "interest-groups", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW]} dynamicType={[managementTypes.INTEREST_GROUP]} children={<InterestGroup />} /> },
            { path: "lc-meetup-verification", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW]} children={<LcAdmin />} /> },
            { path: "verify-organizations", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW]} children={<VerifyOrganizations />} /> },
            { path: "campus-details", element: <AuthChecker roles={[roles.CAMPUS_LEAD, roles.LEAD_ENABLER]} dynamicType={[managementTypes.CAMPUS]} children={<CampusStudentList />} /> },
            { path: "manage-users", element: <AuthChecker roles={[roles.ADMIN]} dynamicType={[managementTypes.USER_MANAGEMENT]} children={<ManageUsers />} /> },
            { path: "manage-roles", element: <AuthChecker roles={[roles.ADMIN]} dynamicType={[managementTypes.MANAGE_ROLES]} children={<ManageRoles />} /> },
            { path: "dynamic-type", element: <AuthChecker roles={[roles.ADMIN]} dynamicType={[managementTypes.DYNAMIC_TYPE]} children={<DynamicType />} /> },
            { path: "user-role-verification", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW]} children={<UserRoleVerification />} /> },
            { path: "user-role-verification/edit/:id", element: <UserRoleVerificationEdit /> },
            { path: "manage-departments", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW]} children={<Departments />} /> },
            { path: "zonal-dashboard", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW, roles.ZONAL_CAMPUS_LEAD]} children={<ZonalDashboard />} /> },
            { path: "district-dashboard", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW, roles.DISTRICT_CAMPUS_LEAD]} children={<DistrictDashboard />} /> },
            { path: "organizations", element: <AuthChecker roles={[roles.ADMIN]} children={<Organizations />} /> },
            { path: "college-levels", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW, roles.CAMPUS_ACTIVATION_TEAM]} children={<CollegeLevels />} /> },
            { path: "tasks", element: <AuthChecker roles={[roles.ADMIN]} children={<Tasks />} /> },
            { path: "tasks/create", element: <TaskCreate /> },
            { path: "tasks/edit/:id", element: <TaskEdit /> },
            { path: "task-type", element: <AuthChecker roles={[roles.ADMIN]} children={<TaskType />} /> },
            { path: "tasks/bulk-import", element: <TaskBulkImport /> },
            { path: "roles/bulk-import", element: <RolesBulkImport /> },
            { path: "events", element: <AuthChecker roles={[roles.ADMIN]} children={<Events />} /> },
            { path: "karma-voucher", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW]} children={<KarmaVoucher />} /> },
            { path: "/dashboard/error-log", element: <AuthChecker roles={[roles.ADMIN, roles.TECH_TEAM]} children={<ErrorLog />} /> },
            { path: "karma-voucher/bulk-import", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW]} children={<KarmaVoucherBulkImport />} /> },
            { path: "channels", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW, roles.ASSOCIATE]} children={<Channels />} /> },
            { path: "affiliation", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW, roles.ASSOCIATE]} children={<Affiliation />} /> },
            { path: "url-shortener", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW, roles.ASSOCIATE]} dynamicType={[managementTypes.URL_SHORTENER]} children={<UrlShortener />} /> },
            { path: "url-shortener/analytics/:id", element: <AuthChecker roles={[roles.ADMIN, roles.FELLOW, roles.ASSOCIATE]} children={<Analytics />} /> },
            { path: "hackathon", element: <AuthChecker roles={[roles.ADMIN]} children={<Hackathon />} /> },
            { path: "hackathon/edit/:id", element: <AuthChecker roles={[roles.ADMIN]} children={<HackathonCreate />} /> },
            { path: "hackathon/create", element: <AuthChecker roles={[roles.ADMIN]} children={<HackathonCreate />} /> },
            { path: "hackathon/details/:id", element: <AuthChecker roles={[roles.ADMIN]} children={<HackathonDetails />} /> },
            { path: "hackathon/apply/:id", element: <AuthChecker roles={[roles.ADMIN]} children={<HackathonRegistration />} /> },
            { path: "hackathon/applicants/:id", element: <AuthChecker roles={[roles.ADMIN]} children={<HackathonParticipants />} /> },
            { path: "discord-moderation", element: <AuthChecker roles={[roles.ADMIN]} children={<DiscordModeration />} /> },
            { path: "manage-locations", element: <AuthChecker roles={[roles.ADMIN]} children={<ManageLocation />} /> },
            { path: "manage-locations/add/:item", element: <AddLocation /> },
            { path: "manage-locations/edit/:item", element: <EditLocation /> },
            { path: "hackathon/organizers/:id", element: <AuthChecker roles={[roles.ADMIN]} children={<HackathonOrganizers />} /> },
            { path: "learningcircle/your-circles", element: <YourLC /> },
            { path: "learningcircle/dashboard/:id", element: <DashboardLC /> },
            { path: "learningcircle/create", element: <CreateLC /> },
            { path: "learningcircle/meetup/:id", element: <MoreInfoLC /> },
            { path: "learningcircle/attendee-report/:meet_id", element: <AttendeeReport /> },
            { path: "learningcircle/report/:meet_id", element: <LCReport /> },
            { path: "learningcircle/create-meetup/:circle_id", element: <CreateLCMeetup /> },
            { path: "learning-circle/meetup/:id", element: <LcMeetupIfo /> },
            { path: "learning-circle/meetup/:id/attendee-report", element: <LcReportAttendee /> },
            { path: "learning-circle/details/:id", element: <LearningCircle /> },
            { path: "learning-circle/dashboard/:id", element: <LcDashboard /> },
            { path: "learning-circle/find-circle", element: <FindCircle /> },
            { path: "learning-circle/create-circle", element: <LearningCircleCreate /> },
            { path: "organization-transfer", element: <AuthChecker roles={[roles.ADMIN]} children={<OrganizationTransfer />} /> },
            { path: "test", element: <AuthChecker roles={[roles.ADMIN]} children={<Test />} /> },
            {
              path: "settings",
              element: <Settings />,
              children: [
                { path: "", element: <SettingsHome /> },
                { path: "organization", element: <OrganizationSetting /> },
                { path: "account", element: <Account /> }
              ]
            }
          ]
        }
      ]
    },
    { path: "/profile/:id", element: <DashboardRootLayout />, children: [{ index: true, element: <Profile /> }] },
    { path: "/learning-circle", element: <LandingPage /> },
    { path: "/kkem/events/beyondus", element: <KKEMEventBeyondUs /> },
    { path: "/kkem/learningcircles/dashboard", element: <LearningCircles /> },
    // { path: "/foundation", element: <Foundation /> }
  ]);

  return (
    <>
      <Suspense fallback={<div className="flex items-center justify-center w-screen h-screen"><MuLoader /></div>}>
        <RouterProvider router={router} />
      </Suspense>
      <Toaster position="bottom-center" reverseOrder={true} />
    </>
  );
}

export default App;