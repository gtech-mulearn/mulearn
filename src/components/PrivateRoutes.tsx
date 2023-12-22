import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes: React.FC = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const redirection = window.location.pathname.slice(1);
    const userInfoString = localStorage.getItem("userInfo");

    if (!refreshToken) {
        return <Navigate to={`/login?ruri=${redirection}`} />;
    }

    if (!userInfoString) {
        console.error("userInfo is not present in localStorage");
        return <Outlet />;
    }

    const userInfo = JSON.parse(userInfoString);
    if (userInfo && (userInfo.first_name || userInfo.last_name)) {
        localStorage.clear();
        return (
            <>
                <Navigate to={`/login?ruri=${redirection}`} />;
            </>
        );
    }

    return <Outlet />;
};

export default PrivateRoutes;
