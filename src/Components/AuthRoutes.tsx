import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";

const AuthRoutes: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  let refreshToken = localStorage.getItem("refreshToken");
  console.log(refreshToken);

  return refreshToken && refreshToken.length > 0 ? (
    <>
      <Navigate to="user/connect-discord" />
    </>
  ) : (
    <Outlet />
  );
};

export default AuthRoutes;
