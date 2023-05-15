import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const AuthRoutes: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  let refreshToken = localStorage.getItem("refreshToken");

  let onboardingStatus = null;

  if (localStorage.getItem("userInfo") !== null) {
    onboardingStatus = JSON.parse(
      localStorage.getItem("userInfo")!
    ).exist_in_guild;
  }

  return refreshToken &&
    refreshToken.length > 0 &&
    onboardingStatus !== null ? (
    <>
      onboardingStatus ? <Navigate to="/profile" /> :{" "}
      <Navigate to="/connect-discord" />
    </>
  ) : (
    <Outlet />
  );
};

export default AuthRoutes;
