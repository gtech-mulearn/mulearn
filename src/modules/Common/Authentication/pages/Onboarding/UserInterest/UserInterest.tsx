import UserInterestSelectionComponent from "../../../components/UserInterest/UserInterestComponent";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useUserStore } from "/src/ZustandProvider";

export default function UserInterest() {
    const { setUserInfo } = useUserStore();
    const [searchParams] = useSearchParams();
    const ruri = searchParams.get("ruri");
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState<boolean>(true);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            setNewUser(false);
        }
    }, []);

    const handleSubmit = async (interests: RegisterInterestData) => {
        const { choosen_interests, choosen_endgoals, other_interests, other_endgoals } = interests;
        const allInterests = [...choosen_interests, ...(other_interests || [])];
        const allEndgoals = [...choosen_endgoals, ...(other_endgoals || [])];

        if (newUser) {
            const params = new URLSearchParams();
            if (allInterests.length) params.append("interests", allInterests.join(","));
            if (allEndgoals.length) params.append("endgoals", allEndgoals.join(","));
            if (ruri) params.append("ruri", ruri);
            navigate(`/register?${params.toString()}`);
        } else {
            try {
                if (allInterests.length > 0) {
                    await privateGateway.post(`${onboardingRoutes.register}select-domains/`, { domains: allInterests });
                }
                if (allEndgoals.length > 0) {
                    await privateGateway.post(`${onboardingRoutes.register}select-endgoals/`, { endgoals: allEndgoals });
                }
                privateGateway
                    .get(dashboardRoutes.getInfo)
                    .then(async (response: any) => {
                        localStorage.setItem(
                            "userInfo",
                            JSON.stringify(response.data.response)
                        );
                        setUserInfo(response.data.response);
                        toast.success("Interests and goals saved successfully");
                        navigate("/dashboard/home");
                    }).catch((error) => {
                        toast.error("Something went wrong, please try again.");
                    });
                // navigate(
                //     ruri
                //         ? ruri === "/dashboard/home"
                //             ? "/dashboard/home"
                //             : ruri === "noredirect"
                //                 ? "/register/organization"
                //                 : `/register/organization/?ruri=${ruri}`
                //         : "/register/organization"
                // );
            } catch (err: AxiosError | any) {
                console.error("Failed to submit interests and endgoals:", err);
                toast.error(err.response?.data?.message?.general[0] || "Unexpected Error occurred");
            }
        }
    };

    return <UserInterestSelectionComponent onContinue={handleSubmit} />;
}