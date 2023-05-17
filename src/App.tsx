import "./App.css";
import {
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter
} from "react-router-dom";
import AuthRoutes from "./components/AuthRoutes";
import Onboarding from "./modules/Portal/Onboarding/pages/Onboarding";
import Login from "./modules/Portal/Authentication/pages/Login";
import ForgotPassword from "./modules/Portal/Authentication/pages/ForgotPassword";
import ResetPassword from "./modules/Portal/Authentication/pages/ResetPassword";
import PrivateRoutes from "./components/PrivateRoutes";
import DashboardRootLayout from "./modules/Portal/Dashboard/layouts/DashboardRootLayout";
import Profile from "./modules/Portal/Profile/pages/Profile";
import ConnectDiscord from "./modules/Portal/ConnectDiscord/pages/ConnectDiscord";
import NotFound from "./components/NotFound";
import CampusStudentList from "./modules/Portal/CampusStudentList/CampusStudentList";
import { ManageUsers, InterestGroup } from "./modules/Portal/Dashboard/modules";


const router = createBrowserRouter([
    {
        path: "*",
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
                    { path: "student-list", element: <CampusStudentList /> },
                    { path: "manage-users", element: <ManageUsers /> }
                ]
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
