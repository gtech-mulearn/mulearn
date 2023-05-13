import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Validate from "./Pages/Portal/User/Validate/Validate";
import Onboarding from "./Pages/Portal/User/Onboarding/Onboarding";
import Profile from "./Pages/Portal/User/Profile/Profile";
// import Success from "./Pages/Portal/User/Onboarding/Success";
import Login from "./Pages/Portal/User/Authentication/Login";
import ForgotPassword from "./Pages/Portal/User/Authentication/ForgotPassword";
import ResetPassword from "./Pages/Portal/User/Authentication/ResetPassword";
import PrivateRoutes from "./Components/PrivateRoutes";
import {
  Dashboard,
  DashboardRootLayout,
  LearningCircles,
  MuLearnAdmin,
} from "./views/DashboardView/exports";
import ConnectDiscord from "./Pages/Portal/User/ConnectDiscord/ConnectDiscord";
import AuthRoutes from "./Components/AuthRoutes";
import UserDashboardLayout from "./Components/Dashboard/UserDashboardLayout";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="*" element={<p>404 Page not found</p>} />
      <Route path="user/validate/:token" element={<Validate />} />

      <Route element={<AuthRoutes />}>
        <Route path="user/register" element={<Onboarding />} />
        <Route path="user/login" element={<Login />} />
        <Route path="user/forgot-password" element={<ForgotPassword />} />
        <Route path="user/reset-password" element={<ResetPassword />} />
      </Route>

      {/* Private Routes */}
      <Route element={<PrivateRoutes />}>
        {/* user dashboard */}
        <Route path="user" element={<UserDashboardLayout />}>
          <Route index path="profile" element={<Profile />} />
          <Route path="connect-discord" element={<ConnectDiscord />} />
        </Route>
        {/* Dashboard */}
        <Route path="dashboard" element={<DashboardRootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="learning-circles" element={<LearningCircles />} />
          <Route path="admin" element={<MuLearnAdmin />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
