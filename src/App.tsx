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
import ResetPassword from "./modules/Common/Authentication/pages/ResetPassword";
import PrivateRoutes from "./components/PrivateRoutes";
import DashboardRootLayout from "./modules/Dashboard/layouts/DashboardRootLayout";
import NotFound from "./components/NotFound";
import Profile from "./modules/Dashboard/modules/Profile/pages/Profile"

const Tasks = lazy(() =>
    import("./modules/Dashboard/modules/Tasks/Tasks").then(module => ({
        default: module.Tasks
    }))
);
const CreateOrganization = lazy(
    () => import("./modules/Dashboard/modules/Organizations/CreateOrganization")
);
const DeleteOrganizations = lazy(
    () =>
        import("./modules/Dashboard/modules/Organizations/DeleteOrganizations")
);
const ManageUsersCreate = lazy(
    () => import("./modules/Dashboard/modules/ManageUsers/ManageUsersCreate")
);
const ManageUsersDelete = lazy(
    () => import("./modules/Dashboard/modules/ManageUsers/ManageUsersDelete")
);
const ManageUsersEdit = lazy(
    () => import("./modules/Dashboard/modules/ManageUsers/ManageUsersEdit")
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
const UserRoleVerificationDelete = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/UserRoleVerification/UserRoleVerificationDelete"
        )
);
const UserRoleVerificationEdit = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/UserRoleVerification/UserRoleVerificationEdit"
        )
);
const EditOrgnaization = lazy(
    () => import("./modules/Dashboard/modules/Organizations/EditOrganization")
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
const FindCircle = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/LearningCircle/pages/LearningCircleFind"
        )
);
const LearningCircleLandingPage = lazy(() =>
    import(
        "./modules/Dashboard/modules/LearningCircle/pages/LearningCircleLandingPage"
    ).then(module => ({ default: module.LearningCircleLandingPage }))
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
const InterestGroupCreate = lazy(
    () =>
        import("./modules/Dashboard/modules/InterestGroup/InterestGroupCreate")
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
const LandingPage = lazy(
    () => import("./modules/Public/LearningCircles/pages/LandingPage")
);

const HackathonParticipants = lazy(
    () =>
        import(
            "./modules/Dashboard/modules/Hackathon/pages/HackathonParticipants"
        )
);

import { roles } from "./services/types";
import SecureAuthRoutes from "./services/authCheck";

import Settings from "./modules/Dashboard/modules/Settings/Settings";
import { CampusStudentList, ConnectDiscord } from "./modules/Dashboard/modules";
import Refer from "./modules/Dashboard/modules/Refer/Refer";
import Thread from "./modules/Public/ThreadsCard/modules/Thread";
import KarmaVoucherBulkImport from "./modules/Dashboard/modules/KarmaVoucher/KarmaVoucherBulkImport";
import { KarmaVoucher } from "./modules/Dashboard/modules/KarmaVoucher/KarmaVoucher";
import KarmaVoucherCreate from "./modules/Dashboard/modules/KarmaVoucher/KarmaVoucherCreate";
import KarmaVoucherEdit from "./modules/Dashboard/modules/KarmaVoucher/KarmaVoucherEdit";
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
                { path: "register", element: <Onboarding /> },
                { path: "login", element: <Login /> },
                { path: "forgot-password", element: <ForgotPassword /> },
                { path: "reset-password", element: <ResetPassword /> }
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
                        { path: "profile", element: <Profile /> },
                        {
                            path: "connect-discord",
                            element: <ConnectDiscord />
                        },
                        {
                            path: "refer",
                            element: <Refer/>
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
                            path: "interest-groups/create",
                            element: <InterestGroupCreate />
                        },
                        {
                            path: "interest-groups/edit/:id",
                            element: <InterestGroupCreate />
                        },
                        {
                            path: "organizations/create",
                            element: <CreateOrganization />
                        },
                        {
                            path: "organizations/edit",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<EditOrgnaization />}
                                />
                            )
                        },
                        {
                            path: "organizations/delete/:id",
                            element: <DeleteOrganizations />
                        },
                        {
                            path: "campus-details",
                            element: (
                                <RoleChecker
                                    roles={[roles.CAMPUS_LEAD]}
                                    children={<CampusStudentList />}
                                />
                            )
                        },
                        {
                            path: "manage-users",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<ManageUsers />}
                                />
                            )
                        },
                        {
                            path: "manage-users/create",
                            element: <ManageUsersCreate />
                        },
                        {
                            path: "manage-users/delete/:id",
                            element: <ManageUsersDelete />
                        },
                        {
                            path: "manage-users/edit/:id",
                            element: <ManageUsersEdit />
                        },
                        {
                            path: "manage-roles",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<ManageRoles />}
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
                            path: "user-role-verification/delete/:id",
                            element: <UserRoleVerificationDelete />
                        },
                        {
                            path: "user-role-verification/edit/:id",
                            element: <UserRoleVerificationEdit />
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
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<Organizations />}
                                />
                            )
                        },
                        {
                            path: "tasks",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
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
                            path: "karmavoucher",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<KarmaVoucher />}
                                />
                            )
                        },
                        {
                            path: "karmavoucher/create",
                            element: <KarmaVoucherCreate />
                        },
                        {
                            path: "karmavoucher/edit/:id",
                            element: <KarmaVoucherEdit />
                        },
                        {
                            path: "karmavoucher/bulk-import",
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
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<Hackathon />}
                                />
                            )
                        },
                        {
                            path: "hackathon/create",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<HackathonCreate />}
                                />
                            )
                        },
                        {
                            path: "hackathon/edit/:id",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<HackathonCreate />}
                                />
                            )
                        },
                        {
                            path: "hackathon/details/:id",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<HackathonDetails />}
                                />
                            )
                        },
                        {
                            path: "hackathon/apply/:id",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<HackathonRegistration />}
                                />
                            )
                        },
                        {
                            path: "hackathon/applicants/:id",
                            element: (
                                <RoleChecker
                                    roles={[roles.ADMIN, roles.FELLOW]}
                                    children={<HackathonParticipants />}
                                />
                            )
                        },
                        {
                            path: "manage-locations",
                            element: <ManageLocation />
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
                                    roles={[
                                        roles.STUDENT,
                                        roles.ADMIN,
                                        roles.FELLOW
                                    ]}
                                    children={<HackathonOrganizers />}
                                />
                            )
                        },
                        {
                            path: "learning-circle",
                            element: (
                                <RoleChecker
                                    roles={[
                                        roles.STUDENT,
                                        roles.ADMIN,
                                        roles.FELLOW
                                    ]}
                                    children={<LearningCircleLandingPage />}
                                />
                            )
                        },
                        {
                            path: "learning-circle/details/:id",
                            element: (
                                <RoleChecker
                                    roles={[
                                        roles.STUDENT,
                                        roles.ADMIN,
                                        roles.FELLOW
                                    ]}
                                    children={<LearningCircle />}
                                />
                            )
                        },
                        {
                            path: "learning-circle/find-circle",
                            element: (
                                <RoleChecker
                                    roles={[
                                        roles.STUDENT,
                                        roles.ADMIN,
                                        roles.FELLOW
                                    ]}
                                    children={<FindCircle />}
                                />
                            )
                        },
                        {
                            path: "learning-circle/create-circle",
                            element: (
                                <RoleChecker
                                    roles={[
                                        roles.STUDENT,
                                        roles.ADMIN,
                                        roles.FELLOW
                                    ]}
                                    children={<LearningCircleCreate />}
                                />
                            )
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
        }
    ]);

    return <RouterProvider router={router} />;
}

export default App;
