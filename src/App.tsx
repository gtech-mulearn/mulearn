import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
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
import InterestGroupEdit from "./modules/Dashboard/modules/InterestGroup/InterestGroupEdit";

const router = createBrowserRouter([
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
                    { path: "interest-groups/create", element: <InterestGroupCreate /> },
                    { path: "interest-groups/edit", element: <InterestGroupEdit /> },
                    { path: "organizations/create", element: <CreateOrganization /> },
                    { path: "campus-details", element: <CampusStudentList /> },
                    { path: "manage-users", element: <ManageUsers /> },
                    { path: "organizations", element: <Organizations /> },
                    { path: "tasks", element: <Tasks /> },

                ]
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
