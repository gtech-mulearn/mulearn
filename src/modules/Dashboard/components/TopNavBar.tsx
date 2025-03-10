import React, { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./SideNavBar.module.css";
import { MdNotifications, MdNotificationAdd } from "react-icons/md";
import { useNavigate, useParams } from "react-router-dom";
import dpm from "../assets/images/dpm.webp";
import { IoMdLogIn } from "react-icons/io";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { MuButtonLight } from "@/MuLearnComponents/MuButtons/MuButton";
import MuLogOut from "../assets/svg/MuLogOut";
import toast from "react-hot-toast";
import GameProgressBar from "../modules/ProgressBar/components/GameProgressBar";
import { getPublicUserLevels, getUserLevels } from "../modules/Profile/services/api";
import ModeSwitchModal from "../modules/Dashboard/Components/ModeSwitchModal";
import { selectDomainCategory } from "../modules/Dashboard/Api/ModeSwitchApi";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { useUserStore } from "/src/ZustandProvider";


interface TopNavBarProps {
    setUserInfo: (userInfo: UserInfo) => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ setUserInfo }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [userSettings, setUserSettings] = useState(false);
    const [userLevelData, setUserLevelData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const [switchDomainModal, setSwitchDomainModal] = useState(false);
    const [userInfo, setLocalUserInfo] = useState<UserInfo | null>(null); 
    const userLevel = useUserStore((state) => state.userProfile.level);

    let userName = useUserStore((state) => state.userProfile.full_name.split(" ")[0]);
    if(!userName){
        const storedUserInfo = localStorage.getItem("userInfo");
        userName = storedUserInfo ? JSON.parse(storedUserInfo)?.full_name.split(" ")?.[0] : null;
      }
    const profilePic = userInfo?.profile_pic || null;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await privateGateway.get(dashboardRoutes.getInfo);
                const fetchedUserInfo = response.data.response;
                setLocalUserInfo(fetchedUserInfo);
                setUserInfo(fetchedUserInfo);
                localStorage.setItem("userInfo", JSON.stringify(fetchedUserInfo));
            } catch (err) {
                console.error("Failed to fetch user info:", err);
                const storedUserInfo = fetchLocalStorage<UserInfo>("userInfo");
                if (storedUserInfo) {
                    setLocalUserInfo(storedUserInfo);
                    setUserInfo(storedUserInfo); 
                }
            }
        };

        const storedUserInfo = fetchLocalStorage<UserInfo>("userInfo");
        if (storedUserInfo) {
            setLocalUserInfo(storedUserInfo);
            setUserInfo(storedUserInfo);
        } else {
            fetchUserInfo();
        }
    }, [setUserInfo]);

    useEffect(() => {
        const fetchLevelData = async () => {
            try {
                setIsLoading(true);
                if (userInfo?.muid) {
                    await getPublicUserLevels(setUserLevelData, userInfo.muid);
                } else {
                    await getUserLevels(setUserLevelData);
                }
            } catch (err) {
                console.error("Error fetching level data:", err);
                setError("Failed to load level data");
            } finally {
                setIsLoading(false);
            }
        };
        fetchLevelData();
    }, [id]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        const div = document.getElementById("user_settings");
        const profile = document.getElementById("profile");
        if (div && profile && !div.contains(event.target as Node) && !profile.contains(event.target as Node)) {
            setUserSettings(false);
        }
    }, []);

    useEffect(() => {
        if (userSettings) {
            window.addEventListener("click", handleClickOutside);
        } else {
            window.removeEventListener("click", handleClickOutside);
        }
        return () => window.removeEventListener("click", handleClickOutside);
    }, [userSettings, handleClickOutside]);

    const refreshToken = localStorage.getItem("refreshToken");

    const handleOnSubmit = async (data: string): Promise<void> => {
        try {
            await privateGateway.post(
                `${onboardingRoutes.register}select-domains/`,
                { domains: [data] }
            );
    
            selectDomainCategory({ domains: [data] });
    
            const response = await privateGateway.get(dashboardRoutes.getInfo);
            const updatedUserInfo = response.data.response;
    
            localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
            setLocalUserInfo(updatedUserInfo);
            setUserInfo(updatedUserInfo); // Update store with new user info
    
            toast.success("Domain updated successfully!");
        } catch (error) {
            console.error("Failed to update domain on server:", error);
            toast.error("Failed to update domain. Please try again.");
        } finally {
            window.location.reload();
        }
    };

    return (
        <>
            <div id="top_nav" className={styles.top_nav}>
                <div className={styles.nav}>
                    <div className={styles.nav_items}>
                        <b className={styles.greetings}><i>Hello</i>, <b>{userName}</b> 👋</b>
                        <div className={styles.mulearn_brand2}></div>
                        <div className={styles.menu}>
                            {refreshToken && (
                            <div className={styles.modeContainer}>
                                <span className={styles.modeText}>Mode</span>
                                <span
                                    className={styles.userDomain}
                                    onClick={() => setSwitchDomainModal(true)}
                                >
                                    {userInfo?.user_domains?.[0]?.toUpperCase() || ""}
                                </span>
                            </div>)}
                            <div className="cursor-pointer" onClick={() => navigate("/dashboard/leaderboard")}>
                    {refreshToken &&(

                                <GameProgressBar levelData={userLevelData} userLevel={userLevel} />
                    )}
                            </div>
                            {refreshToken && (
                                <div id="profile" className={styles.profile}>
                                    <img
                                        onClick={() => setUserSettings(!userSettings)}
                                        src={profilePic || dpm}
                                        alt=""
                                        style={{marginBottom: '0'}}
                                    />
                                </div>
                            )}
                            {userSettings && (
                                <div id="user_settings" className={styles.user_settings}>
                                    <MuButtonLight
                                        text="Profile"
                                        icon={<i className="fi fi-sr-clipboard-user"></i>}
                                        style={{ backgroundColor: "#fff", color: "gray", marginBottom: "0px", minWidth: "0px", padding: "0px" }}
                                        onClick={() => {
                                            navigate('/dashboard/profile');
                                            setUserSettings(!userSettings)
                                        }}
                                    />
                                    <MuButtonLight
                                        text="Log Out"
                                        icon={<MuLogOut />}
                                        style={{ backgroundColor: "#fff", color: "#FF7676", marginBottom: "0px", minWidth: "0px", padding: "0px" }}
                                        onClick={() => {
                                            localStorage.clear();
                                            toast.error("Logged Out, Redirecting to login page.");
                                            setTimeout(() => window.location.reload(), 900);
                                        }}
                                    />
                                </div>
                            )}
                            {!refreshToken && (
                                <MuButtonLight
                                    text="LogIn"
                                    style={{ backgroundColor: "#2563EB", color: "white", minWidth: "0", width: "90px", marginRight: "2rem" }}
                                    onClick={() => navigate("/login")}
                                />
                            )}
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
            {switchDomainModal && (
                <ModeSwitchModal
                    isOpen={switchDomainModal}
                    onClose={() => setSwitchDomainModal(false)}
                    onSubmit={handleOnSubmit}
                />
            )}
        </>
    );
};

export default TopNavBar;