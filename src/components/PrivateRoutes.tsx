import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
  let accessToken = localStorage.getItem("accessToken");
  let refreshToken = localStorage.getItem("refreshToken");

  return refreshToken ? <Outlet /> : <Navigate to="login" />;
};

export default PrivateRoutes;
