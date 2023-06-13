import { Navigate, Outlet, useNavigate } from "react-router-dom";

//To prevent a user from accessing the login page if they are already logged in.
const AuthRoutes: React.FC = () => {
    let refreshToken = localStorage.getItem("refreshToken");

    let onboardingStatus = null;

    if (localStorage.getItem("userInfo") !== null) {
        onboardingStatus = JSON.parse(
            localStorage.getItem("userInfo")!
        ).existInGuild;
    }

    return refreshToken &&
        refreshToken.length > 0 &&
        onboardingStatus !== null ? (
        <>
            onboardingStatus ? <Navigate to="/profile" /> :
            <Navigate to="/connect-discord" />
        </>
    ) : (
        <Outlet />
    );
};

export default AuthRoutes;
