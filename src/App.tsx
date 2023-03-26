import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Validate from "./Pages/Portal/User/Validate/Validate";
import Onboarding from "./Pages/Portal/User/Onboarding/Onboarding";
import Profile from "./Pages/Portal/User/Profile/Profile";
import Success from "./Pages/Portal/User/Onboarding/Success";
import Login from "./Pages/admin/Login";
import ForgetPassword from "./Pages/admin/ForgetPassword";
import ResetPassword from "./Pages/admin/ResetPassword";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Routes>
      <Route path="user/validate/:token" element={<Validate />} />
      <Route path="user/onboarding" element={<Onboarding />} />
      <Route
        path="user/onboarding/success"
        element={<Success roleVerified={false} />}
      />
      <Route path="user/profile" element={<Profile />} />
      <Route path="admin/login" element={<Login />} />
      <Route path="admin/forget" element={<ForgetPassword />} />
      <Route path="admin/reset" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
