import "./App.css";
import { lazy } from "react";
import {
    RouterProvider,
    createBrowserRouter,
    Navigate
} from "react-router-dom";
import AuthRoutes from "./components/AuthRoutes";
import Onboarding from "./modules/Common/Authentication/pages/Onboarding";
import Login from "./modules/Common/Authentication/pages/Login";
import ForgotPassword from "./modules/Common/Authentication/pages/ForgotPassword";

import PrivateRoutes from "./components/PrivateRoutes";
import DashboardRootLayout from "./modules/Dashboard/layouts/DashboardRootLayout";
import NotFound from "./components/NotFound";

import { roles, managementTypes } from "./services/types";
import SecureAuthRoutes from "./services/authCheck";

import { CampusStudentList, ConnectDiscord } from "./modules/Dashboard/modules";

import LandingPage from "./modules/Public/LearningCircles/pages/LandingPage";
import ProfileV2 from "./modules/Dashboard/modules/ProfileV2/pages/Profile";
import AccountCreation from "./modules/Common/Authentication/pages/Onboarding/AccountCreation/AccountCreation";
import Rolepage from "./modules/Common/Authentication/pages/Onboarding/RolePage/RolePage";
import CollegePage from "./modules/Common/Authentication/pages/Onboarding/CollegePage/CollegePage";
import CompanyPage from "./modules/Common/Authentication/pages/Onboarding/CompanyPage/CompanyPage";
import SignIn from "./modules/Common/Authentication/pages/Onboarding/SignIn/SignIn";

import ErrorLog from "./modules/Dashboard/modules/ErrorLog/ErrorLog";
import KKEMEventBeyondUs from "./modules/Public/KKEM/modules/KKEMEventTemplate/KKEMEventBeyondUs";

import LearningCircles from "./modules/Public/KKEM/modules/Dashboard/LearningCircles/LearningCircles";
import ForgetPassword from "./modules/Common/Authentication/pages/Onboarding/ForgetPassword/ForgetPassword";
import ResetPassword from "./modules/Common/Authentication/pages/Onboarding/ResetPassword/ResetPassword";
import LcDashboard from "./modules/Dashboard/modules/LearningCircle/pages/LcDashboard/LcDashboard";
import { Toaster } from "react-hot-toast";
import CommunityPage from "./modules/Common/Authentication/pages/Onboarding/CommunityPage/CommunityPage";
import Foundation from "./modules/Public/Foundation/Foundation";
import Channels from "./modules/Dashboard/modules/Channels/Pages/Channels";
import Settings from "./modules/Dashboard/modules/Settings/Settings";
import Account from "./modules/Dashboard/modules/Settings/pages/Account/Account";
import DiscordModeration from "./modules/Dashboard/modules/DiscordModeration/DiscordModeration";
import Test from "./modules/Dashboard/modules/Test/Test";
import Analytics from "./modules/Dashboard/modules/UrlShortener/Pages/Analytics";
import Donation from "./modules/Public/Donation/Donation";
import Refund from "./modules/Public/Donation/pages/Refund";
import DonationSuccess from "./modules/Public/Donation/pages/DonationSuccess";
import OpenGrad from "./modules/Dashboard/modules/OpenGrad";

const Profile = lazy(
    () => import("./modules/Dashboard/modules/Profile/pages/Profile")
);
const KarmaVoucher = lazy(
    () => import("./modules/Dashboard/modules/KarmaVoucher/KarmaVoucher")
);
const KarmaVoucherBulkImport = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/KarmaVoucher/components/KarmaVoucherBulkImport"
        )
);
const Tasks = lazy(() =>
    import("./modules/Dashboard/modules/Tasks/Tasks").then(module => ({
        default: module.Tasks
    }))
);

const TaskType = lazy(() =>
    import("./modules/Dashboard/modules/TaskType/TaskType").then(module => ({
        default: module.TaskType
    }))
);

const Events = lazy(() =>
    import("./modules/Dashboard/modules/Events/Events").then(module => ({
        default: module.Events
    }))
);
const DynamicType = lazy(
    () => import("./modules/Dashboard/modules/DynamicType/DynamicType")
);
const ManageRoles = lazy(
    () => import("./modules/Dashboard/modules/ManageRoles/ManageRoles")
);
const UserRoleVerification = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/UserRoleVerification/UserRoleVerification"
        )
);
const UserRoleVerificationEdit = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/UserRoleVerification/UserRoleVerificationEdit"
        )
);
const Affiliation = lazy(
    () => import("./modules/Dashboard/modules/Affiliation/Pages/Affiliation")
);
const UrlShortener = lazy(
    () => import("./modules/Dashboard/modules/UrlShortener/Pages/UrlShortener")
);
const TaskEdit = lazy(
    () => import("./modules/Dashboard/modules/Tasks/TaskEdit")
);
const TaskCreate = lazy(
    () => import("./modules/Dashboard/modules/Tasks/TaskCreate")
);
const TaskBulkImport = lazy(
    () => import("./modules/Dashboard/modules/Tasks/TaskBulkImport")
);
const RolesBulkImport = lazy(
    () => import("./modules/Dashboard/modules/ManageRoles/RolesBulkImport")
);
const Hackathon = lazy(
    () => import("./modules/Dashboard/modules/Hackathon/pages/Hackathon")
);
const HackathonCreate = lazy(
    () => import("./modules/Dashboard/modules/Hackathon/pages/HackathonCreate")
);
const KKEMLanding = lazy(
    () => import("./modules/Public/KKEM/modules/KKEMLanding")
);
const KKEMAuth = lazy(() => import("./modules/Public/KKEM/modules/KKEMAuth"));
const ManageLocation = lazy(
    () => import("./modules/Dashboard/modules/ManageLocation/ManageLocation")
);
const AddLocation = lazy(
    () => import("./modules/Dashboard/modules/ManageLocation/AddLocation")
);
const EditLocation = lazy(
    () => import("./modules/Dashboard/modules/ManageLocation/EditLocation")
);
const HackathonOrganizers = lazy(() =>
    import(
        "./modules/Dashboard/modules/Hackathon/pages/HackathonOrganizers"
    ).then(module => ({ default: module.HackathonOrganizers }))
);
const Organizations = lazy(
    () => import("./modules/Dashboard/modules/Organizations/Organizations")
);
const OrganizationTransfer = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/OrganizationTransfer/components/organizationTransfer"
        )
);
const ManageUsers = lazy(
    () => import("./modules/Dashboard/modules/ManageUsers/ManageUsers")
);
const InterestGroup = lazy(
    () => import("./modules/Dashboard/modules/InterestGroup/InterestGroup")
);

const HackathonDetails = lazy(
    () => import("./modules/Dashboard/modules/Hackathon/pages/HackathonDetails")
);
const DistrictDashboard = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/DistrictDashboard/DistrictDashboard"
        )
);
const ZonalDashboard = lazy(
    () => import("./modules/Dashboard/modules/ZonalDashboard/ZonalDashboard")
);
const HackathonRegistration = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/Hackathon/pages/HackathonRegistration"
        )
);
const HackathonParticipants = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/Hackathon/pages/HackathonParticipants"
        )
);
const CollegeLevels = lazy(
    () => import("./modules/Dashboard/modules/CollegeLevels/CollegeLevels")
);

const Refer = lazy(() => import("./modules/Dashboard/modules/Refer/Refer"));
const LearningCircle = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/LearningCircle/pages/LearningCircle"
        )
);
const LearningCircleCreate = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/LearningCircle/pages/LearningCircleCreate"
        )
);
const FindCircle = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/LearningCircle/pages/LearningCircleFind"
        )
);
const Departments = lazy(
    () => import("./modules/Dashboard/modules/Departments/Departments")
);
const LearningCircleLandingPage = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/LearningCircle/pages/LearningCircleLandingPage"
        )
);
const MarketPlaceHistory = lazy(
    () => import("./modules/Dashboard/modules/Marketplace/MarketPlaceHistory")
);
const Marketplace = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/Marketplace/UserMarketplace/UserMarketplce"
        )
);
const MarketAddItem = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/Marketplace/MarketAddItem/MarketAddItem"
        )
);
const AdminMarketPlace = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/Marketplace/AdminMarketplace/AdminMarketplace"
        )
);
const PurchaseInventory = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/Marketplace/PurchaseInventory/PurchaseInventory"
        )
);

const ConnectedDevices = lazy(
    () => import("./modules/Dashboard/modules/Settings/pages/ConnectedDevices")
);
const Wadhwani = lazy(() => import("./modules/Dashboard/modules/Wadhwani"));

const Trivial = lazy(
    () => import("./modules/Public/TrivialIdeas/modules/trivial")
);

function App() {
    const AuthChecker = SecureAuthRoutes();
    const router = createBrowserRouter([
        // Add redirect from '/' to '/login'
        {
            path: "/",
            element: <Navigate to="/login" replace />
        },
        {
            path: "*",
            element: <NotFound />
        },
        {
            path: "404",
            element: <NotFound />
        },
        {
            path: "kkem",
            element: <KKEMLanding />
        },
        {
            path: "kkem/authorization/:token",
            element: <KKEMAuth />
        },
        {
            path: "donation",
            element: <Donation />
        },
        {
            path: "donation/success",
            element: <DonationSuccess />
        },
        {
            path: "donation/refund",
            element: <Refund />
        },
        {
            path: "trivial-ideas",
            element: <Trivial />
        },
        {
            path: "/",
            element: <AuthRoutes />,
            children: [
                { path: "register/:role", element: <AccountCreation /> },
                { path: "register/", element: <AccountCreation /> },
                { path: "login", element: <SignIn /> },
                { path: "forgot-password", element: <ForgetPassword /> },
                { path: "reset-password", element: <ResetPassword /> }
            ]
        },
        {
            path: "/signin",
            element: <SignIn />
        },
        // {
        //     path: "/signup/:role",
        //     element: <AccountCreation />
        // },
        {
            path: "register/about",
            element: <Rolepage />
        },
        // { path: "register/select-community", element: <CommunityPage /> },
        {
            path: "/",
            element: <PrivateRoutes />,
            children: [
                {
                    path: "/dashboard",
                    element: <DashboardRootLayout />,
                    children: [
                        { path: "profile", element: <Profile /> },
                        { path: "profileV2", element: <ProfileV2 /> },
                        {
                            path: "connect-discord",
                            element: <ConnectDiscord />
                        },
                        {
                            path: "wadhwani",
                            element: <Wadhwani />
                        },
                        {
                            path: "opengrad",
                            element: <OpenGrad />
                        },
                        {
                            path: "refer",
                            element: <Refer />
                        },
                        {
                            path: "interest-groups",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    dynamicType={[
                                        managementTypes.INTEREST_GROUP
                                    ]}
                                    children={<InterestGroup />}
                                />
                            )
                        },
                        {
                            path: "campus-details",
                            element: (
                                <AuthChecker
                                    // might have to remove campus_lead and enabler with lead_enabler only
                                    roles={[
                                        roles.CAMPUS_LEAD,
                                        roles.LEAD_ENABLER
                                    ]}
                                    dynamicType={[managementTypes.CAMPUS]}
                                    children={<CampusStudentList />}
                                />
                            )
                        },
                        {
                            path: "manage-users",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    dynamicType={[
                                        managementTypes.USER_MANAGEMENT
                                    ]}
                                    children={<ManageUsers />}
                                />
                            )
                        },
                        {
                            path: "manage-roles",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    dynamicType={[managementTypes.MANAGE_ROLES]}
                                    children={<ManageRoles />}
                                />
                            )
                        },
                        {
                            path: "dynamic-type",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    dynamicType={[managementTypes.DYNAMIC_TYPE]}
                                    children={<DynamicType />}
                                />
                            )
                        },

                        {
                            path: "user-role-verification",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<UserRoleVerification />}
                                />
                            )
                        },
                        {
                            path: "user-role-verification/edit/:id",
                            element: <UserRoleVerificationEdit />
                        },
                        {
                            path: "manage-departments",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<Departments />}
                                />
                            )
                        },
                        {
                            path: "zonal-dashboard",
                            element: (
                                <AuthChecker
                                    roles={[
                                        roles.ADMIN,
                                        roles.FELLOW,
                                        roles.ZONAL_CAMPUS_LEAD
                                    ]}
                                    children={<ZonalDashboard />}
                                />
                            )
                        },
                        {
                            path: "district-dashboard",
                            element: (
                                <AuthChecker
                                    roles={[
                                        roles.ADMIN,
                                        roles.FELLOW,
                                        roles.DISTRICT_CAMPUS_LEAD
                                    ]}
                                    children={<DistrictDashboard />}
                                />
                            )
                        },
                        {
                            path: "organizations",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<Organizations />}
                                />
                            )
                        },
                        {
                            path: "college-levels",
                            element: (
                                <AuthChecker
                                    roles={[
                                        roles.ADMIN,
                                        roles.FELLOW,
                                        roles.CAMPUS_ACTIVATION_TEAM
                                    ]}
                                    children={<CollegeLevels />}
                                />
                            )
                        },
                        {
                            path: "tasks",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<Tasks />}
                                />
                            )
                        },
                        {
                            path: "tasks/create",
                            element: <TaskCreate />
                        },
                        {
                            path: "tasks/edit/:id",
                            element: <TaskEdit />
                        },
                        {
                            path: "task-type",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<TaskType />}
                                />
                            )
                        },
                        {
                            path: "tasks/bulk-import",
                            element: <TaskBulkImport />
                        },
                        {
                            path: "roles/bulk-import",
                            element: <RolesBulkImport />
                        },
                        {
                            path: "events",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<Events />}
                                />
                            )
                        },
                        {
                            path: "karma-voucher",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<KarmaVoucher />}
                                />
                            )
                        },
                        {
                            path: "/dashboard/error-log",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN, roles.TECH_TEAM]}
                                    children={<ErrorLog />}
                                />
                            )
                        },
                        {
                            path: "karma-voucher/bulk-import",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<KarmaVoucherBulkImport />}
                                />
                            )
                        },
                        {
                            path: "channels",
                            element: (
                                <AuthChecker
                                    roles={[
                                        roles.ADMIN,
                                        roles.FELLOW,
                                        roles.ASSOCIATE
                                    ]}
                                    children={<Channels />}
                                />
                            )
                        },
                        {
                            path: "affiliation",
                            element: (
                                <AuthChecker
                                    roles={[
                                        roles.ADMIN,
                                        roles.FELLOW,
                                        roles.ASSOCIATE
                                    ]}
                                    children={<Affiliation />}
                                />
                            )
                        },
                        {
                            path: "url-shortener",
                            element: (
                                <AuthChecker
                                    roles={[
                                        roles.ADMIN,
                                        roles.FELLOW,
                                        roles.ASSOCIATE
                                    ]}
                                    dynamicType={[
                                        managementTypes.URL_SHORTENER
                                    ]}
                                    children={<UrlShortener />}
                                />
                            )
                        },
                        {
                            path: "url-shortener/analytics/:id",
                            element: (
                                <AuthChecker
                                    roles={[
                                        roles.ADMIN,
                                        roles.FELLOW,
                                        roles.ASSOCIATE
                                    ]}
                                    children={<Analytics />}
                                />
                            )
                        },
                        {
                            path: "hackathon",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<Hackathon />}
                                />
                            )
                        },
                        {
                            path: "hackathon/edit/:id",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonCreate />}
                                />
                            )
                        },
                        {
                            path: "hackathon/create",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonCreate />}
                                />
                            )
                        },
                        {
                            path: "hackathon/details/:id",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonDetails />}
                                />
                            )
                        },
                        {
                            path: "hackathon/apply/:id",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonRegistration />}
                                />
                            )
                        },
                        {
                            path: "hackathon/applicants/:id",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonParticipants />}
                                />
                            )
                        },
                        {
                            path: "discord-moderation",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<DiscordModeration />}
                                />
                            )
                        },
                        {
                            path: "manage-locations",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<ManageLocation />}
                                />
                            )
                        },
                        {
                            path: "manage-locations/add/:item",
                            element: <AddLocation />
                        },
                        {
                            path: "manage-locations/edit/:item",
                            element: <EditLocation />
                        },
                        {
                            path: "hackathon/organizers/:id",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonOrganizers />}
                                />
                            )
                        },
                        {
                            path: "learning-circle",
                            element: <LearningCircleLandingPage />
                        },
                        {
                            path: "learning-circle/details/:id",
                            element: <LearningCircle />
                        },
                        {
                            path: "learning-circle/dashboard/:id",
                            element: <LcDashboard />
                        },
                        {
                            path: "learning-circle/find-circle",
                            element: <FindCircle />
                        },
                        {
                            path: "learning-circle/create-circle",
                            element: <LearningCircleCreate />
                        },
                        {
                            path: "organization-transfer",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<OrganizationTransfer />}
                                />
                            )
                        },
                        {
                            path: "test",
                            element: (
                                <AuthChecker
                                    roles={[roles.ADMIN]}
                                    children={<Test />}
                                />
                            )
                        },
                        {
                            path: "settings",
                            element: <Settings />,
                            children: [
                                {
                                    path: "account",
                                    element: <Account />
                                }
                            ]
                        }
                        // {
                        //     path: "marketplace",
                        //     element: <Marketplace />
                        // },
                        // {
                        //     path: "marketplace-history",
                        //     element: <MarketPlaceHistory />
                        // },
                        // {
                        //     path: "marketplace-additem",
                        //     element: <MarketAddItem />
                        // },
                        // {
                        //     path: "marketplace-admin",
                        //     element: <AdminMarketPlace />
                        // },
                        // {
                        //     path: "marketplace-purchaseinv",
                        //     element: <PurchaseInventory />
                        // }
                    ]
                }
            ]
        },
        // {
        //     path: "thread",
        //     element:<Thread />
        // },
        {
            path: "/profile/:id",
            element: <Profile />
        },
        {
            path: "/learning-circle",
            element: <LandingPage />
        },
        {
            path: "/kkem/events/beyondus",
            element: <KKEMEventBeyondUs />
        },
        {
            path: "/kkem/learningcircles/dashboard",
            element: <LearningCircles />
        },
        {
            path: "/foundation",
            element: <Foundation />
        }
    ]);

    return (
        <>
            <RouterProvider router={router} />
            <Toaster position="bottom-center" reverseOrder={true} />
        </>
    );
}

export default App;
