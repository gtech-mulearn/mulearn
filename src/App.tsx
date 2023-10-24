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
const ManageUsersCreate = lazy(
    () => import("./modules/Dashboard/modules/ManageUsers/ManageUsersCreate")
);
const ManageUsersEdit = lazy(
    () => import("./modules/Dashboard/modules/ManageUsers/ManageUsersEdit")
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

import { roles } from "./services/types";
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
import LcDashboard from "./modules/Dashboard/modules/LearningCircle/pages/LcDashboard";
import { Toaster } from "react-hot-toast";

const ConnectedDevices = lazy(
    () => import("./modules/Dashboard/modules/Settings/pages/ConnectedDevices")
);

function App() {
    const RoleChecker = SecureAuthRoutes();
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
            path: "/",
            element: <AuthRoutes />,
            children: [
                { path: "register", element: <AccountCreation /> },
                { path: "login", element: <SignIn /> },
                { path: "forgot-password", element: <ForgetPassword /> },
                { path: "reset-password", element: <ResetPassword /> }
            ]
        },
        {
            path: "/signin",
            element: <SignIn />
        },
        {
            path: "/signup",
            element: <AccountCreation />
        },
        {
            path: "/role",
            element: <Rolepage />
        },
        {
            path: "/college",
            element: <CollegePage />
        },
        {
            path: "/company",
            element: <CompanyPage />
        },
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
                            path: "refer",
                            element: <Refer />
                        },
                        {
                            path: "interest-groups",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<InterestGroup />}
                                />
                            )
                        },
                        {
                            path: "campus-details",
                            element: (
                                <RoleChecker
                                    roles={[roles.CAMPUS_LEAD, roles.ENABLER]}
                                    children={<CampusStudentList />}
                                />
                            )
                        },
                        {
                            path: "manage-users",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<ManageUsers />}
                                />
                            )
                        },
                        {
                            path: "manage-users/create",
                            element: <ManageUsersCreate />
                        },
                        {
                            path: "manage-users/edit/:id",
                            element: <ManageUsersEdit />
                        },
                        {
                            path: "manage-roles",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<ManageRoles />}
                                />
                            )
                        },
                        {
                            path: "dynamic-type",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<DynamicType />}
                                />
                            )
                        },

                        {
                            path: "user-role-verification",
                            element: (
                                <RoleChecker
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
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<Departments />}
                                />
                            )
                        },
                        {
                            path: "zonal-dashboard",
                            element: (
                                <RoleChecker
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
                                <RoleChecker
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
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<Organizations />}
                                />
                            )
                        },
                        {
                            path: "college-levels",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<CollegeLevels />}
                                />
                            )
                        },
                        {
                            path: "tasks",
                            element: (
                                <RoleChecker
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
                            path: "tasks/bulk-import",
                            element: <TaskBulkImport />
                        },
                        {
                            path: "karma-voucher",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<KarmaVoucher />}
                                />
                            )
                        },
                        {
                            path: "/dashboard/error-log",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<ErrorLog />}
                                />
                            )
                        },
                        {
                            path: "karma-voucher/bulk-import",
                            element: <KarmaVoucherBulkImport />
                        },
                        {
                            path: "url-shortener",
                            element: (
                                <RoleChecker
                                    roles={[
                                        roles.ADMIN,
                                        roles.FELLOW,
                                        roles.ASSOCIATE
                                    ]}
                                    children={<UrlShortener />}
                                />
                            )
                        },
                        {
                            path: "hackathon",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<Hackathon />}
                                />
                            )
                        },
                        {
                            path: "hackathon/edit/:id",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonCreate />}
                                />
                            )
                        },
                        {
                            path: "hackathon/create",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonCreate />}
                                />
                            )
                        },
                        {
                            path: "hackathon/details/:id",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonDetails />}
                                />
                            )
                        },
                        {
                            path: "hackathon/apply/:id",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonRegistration />}
                                />
                            )
                        },
                        {
                            path: "hackathon/applicants/:id",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN]}
                                    children={<HackathonParticipants />}
                                />
                            )
                        },
                        {
                            path: "manage-locations",
                            element: (
                                <RoleChecker
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
                                <RoleChecker
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
                            path: "marketplace",
                            element: <Marketplace />
                        },
                        {
                            path: "marketplace-history",
                            element: <MarketPlaceHistory />
                        },
                        {
                            path: "marketplace-additem",
                            element: <MarketAddItem />
                        },
                        {
                            path: "marketplace-admin",
                            element: <AdminMarketPlace />
                        },
                        {
                            path: "marketplace-purchaseinv",
                            element: <PurchaseInventory />
                        }
                        // {
                        //     path: "settings",
                        //     element: <Settings />,
                        //     children: [
                        //         {
                        //             path: "connected-devices",
                        //             element: <ConnectedDevices />
                        //         }
                        //     ]
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
