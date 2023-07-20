import "./App.css";
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
import {
    ManageUsers,
    InterestGroup,
    Profile,
    ConnectDiscord,
    CampusStudentList,
    Organizations
} from "./modules/Dashboard/modules";
import { InterestGroupCreate } from "./modules/Dashboard/modules/InterestGroup/InterestGroupCreate";
import { Tasks } from "./modules/Dashboard/modules/Tasks/Tasks";
import CreateOrganization from "./modules/Dashboard/modules/Organizations/CreateOrganization";
import DeleteOrganizations from "./modules/Dashboard/modules/Organizations/DeleteOrganizations";
import ManageUsersCreate from "./modules/Dashboard/modules/ManageUsers/ManageUsersCreate";
import ManageUsersDelete from "./modules/Dashboard/modules/ManageUsers/ManageUsersDelete";
import ManageUsersEdit from "./modules/Dashboard/modules/ManageUsers/ManageUsersEdit";
import ManageRoles from "./modules/Dashboard/modules/ManageRoles/ManageRoles";
import ManageRolesEdit from "./modules/Dashboard/modules/ManageRoles/ManageRolesEdit";
import ManageRolesDelete from "./modules/Dashboard/modules/ManageRoles/ManageRolesDelete";
import ManageRolesCreate from "./modules/Dashboard/modules/ManageRoles/ManageRolesCreate";
import UserRoleVerification from "./modules/Dashboard/modules/UserRoleVerification/UserRoleVerification";
import UserRoleVerificationDelete from "./modules/Dashboard/modules/UserRoleVerification/UserRoleVerificationDelete";
import UserRoleVerificationEdit from "./modules/Dashboard/modules/UserRoleVerification/UserRoleVerificationEdit";
import InterestGroupEdit from "./modules/Dashboard/modules/InterestGroup/InterestGroupEdit";
import EditOrgnaization from "./modules/Dashboard/modules/Organizations/EditOrganization";
import UrlShortener from "./modules/Dashboard/modules/UrlShortener/Pages/UrlShortener";
import TaskEdit from "./modules/Dashboard/modules/Tasks/TaskEdit";
import TaskCreate from "./modules/Dashboard/modules/Tasks/TaskCreate";
import TaskDelete from "./modules/Dashboard/modules/Tasks/TaskDelete";
import TaskBulkImport from "./modules/Dashboard/modules/Tasks/TaskBulkImport";
import Hackathon from "./modules/Dashboard/modules/Hackathon/User/Hackathon";
import HackathonCreate from "./modules/Dashboard/modules/Hackathon/pages/HackathonCreate";
import KKEMLanding from "./modules/KKEM/modules/KKEMLanding";
import KKEMAuth from "./modules/KKEM/modules/KKEMAuth";
import RankCard from "./modules/Embeds/modules/RankCard/pages/RankCard";
import LearningCircle from "./modules/Dashboard/modules/LearningCircle/pages/LearningCircle";
import CreateCircle from "./modules/Dashboard/modules/LearningCircle/pages/LearningCircleCreate";
import ManageLocation from "./modules/Dashboard/modules/ManageLocation/ManageLocation";
import AddLocation from "./modules/Dashboard/modules/ManageLocation/AddLocation";
import EditLocation from "./modules/Dashboard/modules/ManageLocation/EditLocation";
import { HackathonOrganizers } from "./modules/Dashboard/modules/Hackathon/pages/HackathonOrganizers";
import FindCircle from "./modules/Dashboard/modules/LearningCircle/pages/LearningCircleFind";
import { LearningCircleLandingPage } from "./modules/Dashboard/modules/LearningCircle/pages/LearningCircleLandingPage";
import HackathonDetails from "./modules/Dashboard/modules/Hackathon/pages/HackathonDetails";
import ZonalDashboard from "./modules/Dashboard/modules/ZonalDashboard/ZonalDashboard";
import DistrictDashboard from "./modules/Dashboard/modules/DistrictDashboard/DistrictDashboard";

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
        path: "embed/rankcard",
        element: <RankCard />
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
                path: "/",
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
                        path: "organizations/create",
                        element: <CreateOrganization />
                    },
                    {
                        path: "interest-groups/edit/:id",
                        element: <InterestGroupEdit />
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
                        path: "manage-roles/edit/:id",
                        element: <ManageRolesEdit />
                    },
                    {
                        path: "manage-roles/delete/:id",
                        element: <ManageRolesDelete />
                    },
                    {
                        path: "manage-roles/create",
                        element: <ManageRolesCreate />
                    },
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
                        path: "tasks/delete/:id",
                        element: <TaskDelete />
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
                        path: "hackathon/details/:id",
                        element: <HackathonDetails />
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
                        path: "learning-circle/details",
                        element: <LearningCircle />
                    },
                    {
                        path: "learning-circle/find-circle",
                        element: <FindCircle />
                    },
                    {
                        path: "learning-circle/create-circle",
                        element: <CreateCircle />
                    }
                ]
            }
        ]
    },
    {
        path: "profile/:id",
        element: <Profile />
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
