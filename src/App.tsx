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
import InterestGroupCreate from "./views/DashboardView/pages/InterestGroupCreate";
import InterestGroup from "./Pages/Portal/User/InterestGroup/InterestGroup";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="*" element={<p>404 Page not found</p>} />
      <Route path="/validate/:token" element={<Validate />} />

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
          <Route path="connect-discord" element={<ConnectDiscord />} />
          <Route path="interest-groups" element={<InterestGroup />} />
        </Route>
        {/* Dashboard */}
        <Route path="dashboard" element={<DashboardRootLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="learning-circles" element={<LearningCircles />} />
          <Route path="admin" element={<MuLearnAdmin />} />
          <Route path="interest-group/create" element={<InterestGroupCreate />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
