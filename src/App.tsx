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
const Profile = lazy(() => import("./modules/Dashboard/modules/Profile/pages/Profile"))
const Tasks = lazy(() => import("./modules/Dashboard/modules/Tasks/Tasks").then(module => ({ default: module.Tasks })));
const CreateOrganization = lazy(() => import("./modules/Dashboard/modules/Organizations/CreateOrganization"));
const DeleteOrganizations = lazy(() => import("./modules/Dashboard/modules/Organizations/DeleteOrganizations"));
const ManageUsersCreate = lazy(() => import("./modules/Dashboard/modules/ManageUsers/ManageUsersCreate"));
const ManageUsersDelete = lazy(() => import("./modules/Dashboard/modules/ManageUsers/ManageUsersDelete"));
const ManageUsersEdit = lazy(() => import("./modules/Dashboard/modules/ManageUsers/ManageUsersEdit"));
const ManageRoles = lazy(() => import("./modules/Dashboard/modules/ManageRoles/ManageRoles"));
const UserRoleVerification = lazy(() => import("./modules/Dashboard/modules/UserRoleVerification/UserRoleVerification"));
const UserRoleVerificationDelete = lazy(() => import("./modules/Dashboard/modules/UserRoleVerification/UserRoleVerificationDelete"));
const UserRoleVerificationEdit = lazy(() => import("./modules/Dashboard/modules/UserRoleVerification/UserRoleVerificationEdit"));
const EditOrgnaization = lazy(() => import("./modules/Dashboard/modules/Organizations/EditOrganization"));
const UrlShortener = lazy(() => import("./modules/Dashboard/modules/UrlShortener/Pages/UrlShortener"));
const TaskEdit = lazy(() => import("./modules/Dashboard/modules/Tasks/TaskEdit"));
const TaskCreate = lazy(() => import("./modules/Dashboard/modules/Tasks/TaskCreate"));
const TaskBulkImport = lazy(() => import("./modules/Dashboard/modules/Tasks/TaskBulkImport"));
const Hackathon = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/Hackathon"));
const HackathonCreate = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonCreate"));
const KKEMLanding = lazy(() => import("./modules/Public/KKEM/modules/KKEMLanding"));
const KKEMAuth = lazy(() => import("./modules/Public/KKEM/modules/KKEMAuth"));
const LearningCircle = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LearningCircle"));
const LearningCircleCreate = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LearningCircleCreate"));
const ManageLocation = lazy(() => import("./modules/Dashboard/modules/ManageLocation/ManageLocation"));
const AddLocation = lazy(() => import("./modules/Dashboard/modules/ManageLocation/AddLocation"));
const EditLocation = lazy(() => import("./modules/Dashboard/modules/ManageLocation/EditLocation"));
const HackathonOrganizers = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonOrganizers").then(module => ({ default: module.HackathonOrganizers })));
const FindCircle = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LearningCircleFind"))
const LearningCircleLandingPage = lazy(() => import("./modules/Dashboard/modules/LearningCircle/pages/LearningCircleLandingPage").then(module => ({ default: module.LearningCircleLandingPage })));
const Organizations = lazy(() => import("./modules/Dashboard/modules/Organizations/Organizations"));
const ManageUsers = lazy(() => import("./modules/Dashboard/modules/ManageUsers/ManageUsers"));
const InterestGroup = lazy(() => import("./modules/Dashboard/modules/InterestGroup/InterestGroup"));
const InterestGroupCreate = lazy(() => import("./modules/Dashboard/modules/InterestGroup/InterestGroupCreate"));
const CampusStudentList = lazy(() => import("./modules/Dashboard/modules/CampusStudentList/pages/CampusStudentList"));
const HackathonDetails = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonDetails"));
const DistrictDashboard = lazy(() => import("./modules/Dashboard/modules/DistrictDashboard/DistrictDashboard"));
const ZonalDashboard = lazy(() => import("./modules/Dashboard/modules/ZonalDashboard/ZonalDashboard"));
const HackathonRegistration = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonRegistration"));
const LandingPage = lazy(() => import("./modules/Public/LearningCircles/modules/LandingPage/LandingPage"));
const ConnectDiscord = lazy(() => import("./modules/Dashboard/modules/ConnectDiscord/pages/ConnectDiscord"));
const HackathonParticipants = lazy(() => import("./modules/Dashboard/modules/Hackathon/pages/HackathonParticipants"));


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
                    { path: "connect-discord", element: <ConnectDiscord /> },
                    { path: "interest-groups", element: <InterestGroup /> },
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
                        element: <EditOrgnaization />
                    },
                    {
                        path: "organizations/delete/:id",
                        element: <DeleteOrganizations />
                    },
                    { path: "campus-details", element: <CampusStudentList /> },
                    { path: "manage-users", element: <ManageUsers /> },
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
                    { path: "manage-roles", element: <ManageRoles /> },
                    {
                        path: "user-role-verification",
                        element: <UserRoleVerification />
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
                        element: <ZonalDashboard />
                    },
                    {
                        path: "district-dashboard",
                        element: <DistrictDashboard />
                    },
                    { path: "organizations", element: <Organizations /> },
                    { path: "tasks", element: <Tasks /> },
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
                        path: "url-shortener",
                        element: <UrlShortener />
                    },
                    {
                        path: "hackathon",
                        element: <Hackathon />
                    },
                    {
                        path: "hackathon/create",
                        element: <HackathonCreate />
                    },
                    {
                        path: "hackathon/edit/:id",
                        element: <HackathonCreate />
                    },
                    {
                        path: "hackathon/details/:id",
                        element: <HackathonDetails />
                    },
                    {
                        path: "hackathon/apply/:id",
                        element: <HackathonRegistration />
                    },
                    {
                        path: "hackathon/applicants/:id",
                        element: <HackathonParticipants />
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
                        element: <HackathonOrganizers />
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
                        path: "learning-circle/find-circle",
                        element: <FindCircle />
                    },
                    {
                        path: "learning-circle/create-circle",
                        element: <LearningCircleCreate />
                    }
                ]
            }
        ]
    },
    {
        path: "/dashboard/profile/:id",
        element: <Profile />
    },
    {
        path: "/learning-circle",
        element: <LandingPage />
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
