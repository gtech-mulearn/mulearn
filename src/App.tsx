import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthRoutes from "./components/AuthRoutes";
import Onboarding from "./modules/Portal/Onboarding/pages/Onboarding";
import Login from "./modules/Portal/Authentication/pages/Login";
import ForgotPassword from "./modules/Portal/Authentication/pages/ForgotPassword";
import ResetPassword from "./modules/Portal/Authentication/pages/ResetPassword";
import PrivateRoutes from "./components/PrivateRoutes";
import UserDashboardLayout from "./components/Dashboard/UserDashboardLayout";
import Profile from "./modules/Portal/Profile/pages/Profile";
import ConnectDiscord from "./modules/Portal/ConnectDiscord/pages/ConnectDiscord";
import InterestGroup from "./modules/Portal/InterestGroup/pages/InterestGroup";

function App() {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="*" element={<p>404 Page not found</p>} />

            <Route element={<AuthRoutes />}>
                <Route path="/register" element={<Onboarding />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
            </Route>

            {/* Private Routes */}
            <Route element={<PrivateRoutes />}>
                {/* user dashboard */}
                <Route path="/" element={<UserDashboardLayout />}>
                    <Route index path="profile" element={<Profile />} />
                    <Route
                        path="connect-discord"
                        element={<ConnectDiscord />}
                    />
                    <Route path="interest-groups" element={<InterestGroup />} />
                </Route>
                {/* Dashboard */}
            </Route>
        </Routes>
    );
}

export default App;
