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
    CampusStudentList
} from "./modules/Dashboard/modules";
import { roles } from "./services/types";

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
                    {
                        path: "interest-groups",
                        element:
                            localStorage.getItem("userInfo") &&
                                JSON.parse(
                                    localStorage.getItem("userInfo")!
                                ).roles?.includes(roles.ADMIN || roles.FELLOW) ? (
                                <InterestGroup />
                            ) : null
                    },
                    {
                        path: "campus-details",
                        element:
                            localStorage.getItem("userInfo") &&
                                JSON.parse(
                                    localStorage.getItem("userInfo")!
                                ).roles?.includes(roles.CAMPUS_AMBASSADOR) ? (
                                <CampusStudentList />
                            ) : null
                    },
                    {
                        path: "manage-users",
                        element:
                            localStorage.getItem("userInfo") &&
                                JSON.parse(
                                    localStorage.getItem("userInfo")!
                                ).roles?.includes(roles.ADMIN || roles.FELLOW) ? (
                                <ManageUsers />
                            ) : null
                    }
                ]
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
