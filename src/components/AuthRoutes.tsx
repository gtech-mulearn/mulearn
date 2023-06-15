import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

//To prevent a user from accessing the login page if they are already logged in.
const AuthRoutes: React.FC = () => {
    // let refreshToken = localStorage.getItem("refreshToken");
    const [onboardingStatus, setOnboardingStatus] = useState(null);
    const [refreshToken, setRefreshToken] = useState("");

    useEffect(() => {
        setRefreshToken(localStorage.getItem("refreshToken") || "");
        if (localStorage.getItem("userInfo") !== null) {
            setOnboardingStatus(
                JSON.parse(localStorage.getItem("userInfo")!).existInGuild
            );
            console.log(onboardingStatus);
        }
    }, [onboardingStatus]);

    return refreshToken &&
        refreshToken.length > 0 &&
        onboardingStatus !== null ? (
        <>
            (!onboardingStatus ? <Navigate to="/connect-discord" /> :{" "}
            <Navigate to="/profile" />)
        </>
    ) : (
        <Outlet />
    );
};

export default AuthRoutes;
