import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
    let refreshToken = localStorage.getItem("refreshToken");
    let redirection = window.location.pathname.slice(1);
    return refreshToken ? (
        <Outlet />
    ) : (
        <Navigate to={`/signin?ruri=${redirection}`} />
    );
};

export default PrivateRoutes;
