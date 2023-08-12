import { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

//To prevent a user from accessing the login page if they are already logged in.
const AuthRoutes: React.FC = () => {
    // let refreshToken = localStorage.getItem("refreshToken");
    const [onboardingStatus, setOnboardingStatus] = useState(false);
    const [refreshToken, setRefreshToken] = useState("");

    useEffect(() => {
        setRefreshToken(localStorage.getItem("refreshToken") || "");
        let userInfo = localStorage.getItem("userInfo");
        //console.log("userInfo", userInfo);

        if (userInfo !== null) {
            setOnboardingStatus(JSON.parse(userInfo!).exist_in_guild);
        }
    }, [onboardingStatus]);

    return refreshToken && refreshToken.length > 0
        ? <Navigate to={onboardingStatus ? "/dashboard/profile" : "/dashboard/connect-discord"} />
        : <Outlet />;
};

export default AuthRoutes;
