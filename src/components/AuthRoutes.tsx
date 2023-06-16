import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

//To prevent a user from accessing the login page if they are already logged in.
const AuthRoutes: React.FC = () => {
    // let refreshToken = localStorage.getItem("refreshToken");
    const [onboardingStatus, setOnboardingStatus] = useState(false);
    const [refreshToken, setRefreshToken] = useState("");

    useEffect(() => {
        setRefreshToken(localStorage.getItem("refreshToken") || "");
        if (localStorage.getItem("userInfo") !== null) {
            setOnboardingStatus(
                JSON.parse(localStorage.getItem("userInfo")!).existInGuild
            );
        }
    }, [onboardingStatus]);

    return refreshToken && refreshToken.length > 0 ? (
        <>
            (onboardingStatus ? <Navigate to="/profile" /> :{" "}
            <Navigate to="/connect-discord" />)
        </>
    ) : (
        <Outlet />
    );
};

export default AuthRoutes;
