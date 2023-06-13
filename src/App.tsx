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
import InterestGroupDelete from "./modules/Dashboard/modules/InterestGroup/InterestGroupDelete";
import TaskEdit from "./modules/Dashboard/modules/Tasks/TaskEdit";
import TaskCreate from "./modules/Dashboard/modules/Tasks/TaskCreate";
import TaskDelete from "./modules/Dashboard/modules/Tasks/TaskDelete";
import TaskBulkImport from "./modules/Dashboard/modules/Tasks/TaskBulkImport";
import ZonalDashboard from "./modules/Dashboard/modules/zonalDashboard/zonaldashboard";
import DistrictDashboard from "./modules/Dashboard/modules/districtDashboard/districtdashboard";
import Hackathon from "./modules/Dashboard/modules/Hackathon/User/Hackathon";
import HackathonCreate from "./modules/Dashboard/modules/Hackathon/Admin/HackathonCreate";

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
                        path: "interest-groups/delete/:id",
                        element: <InterestGroupDelete />
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
                    { path: "url-shortener", element: <UrlShortener /> },
                    {
                        path: "tasks/delete/:id",
                        element: <TaskDelete />
                    },
                    { path: "url-shortener", element: <UrlShortener /> },
                    { path: "hackathon", element: <Hackathon /> },
                    { path: "hackathon-management", element: <HackathonCreate /> }
                ]
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
