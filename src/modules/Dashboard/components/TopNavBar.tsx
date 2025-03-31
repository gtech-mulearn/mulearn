import React, { useEffect, useState, useCallback } from "react";
import styles from "./SideNavBar.module.css";
import { useNavigate, useParams } from "react-router-dom";
import dpm from "../assets/images/dpm.webp";
import { MuButtonLight } from "@/MuLearnComponents/MuButtons/MuButton";
import MuLogOut from "../assets/svg/MuLogOut";
import toast from "react-hot-toast";
import GameProgressBar from "../modules/ProgressBar/components/GameProgressBar";
import ModeSwitchModal from "../modules/Dashboard/Components/ModeSwitchModal";
import { selectDomainCategory } from "../modules/Dashboard/Api/ModeSwitchApi";
import { dashboardRoutes, onboardingRoutes } from "@/MuLearnServices/urls";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { UserProfile, useUserStore } from "/src/ZustandProvider";

interface TopNavBarProps {
    setUserInfo: (userInfo: UserInfo) => void;
    userInfo: UserInfo;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ setUserInfo, userInfo }) => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [userSettings, setUserSettings] = useState(false);
    const [switchDomainModal, setSwitchDomainModal] = useState(false);

    let userName = useUserStore((state) => state.userProfile.full_name.split(" ")[0]);
    if (!userName) {
        const storedUserInfo = localStorage.getItem("userInfo");
        userName = storedUserInfo ? JSON.parse(storedUserInfo)?.full_name.split(" ")?.[0] : null;
    }
    const profilePic = userInfo?.profile_pic || null;

    // useEffect(() => {
    //     const fetchLevelData = async () => {
    //         try {
    //             setIsLoading(true);
    //             if (userInfo?.muid) {
    //                 await getPublicUserLevels(setUserLevelData, userInfo.muid);
    //             } else {
    //                 await getUserLevels(setUserLevelData);
    //             }
    //         } catch (err) {
    //             console.error("Error fetching level data:", err);
    //             setError("Failed to load level data");
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchLevelData();
    // }, [id]);

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
        const update = new Promise(async (resolve, reject) => {
            try {
                await privateGateway.post(
                    `${onboardingRoutes.register}select-domains/`,
                    { domains: [data] }
                );
                selectDomainCategory({ domains: [data] });
                const response_userinfo = await privateGateway.get(dashboardRoutes.getInfo);
                // const response_userprofile = await privateGateway.get(dashboardRoutes.getUserProfile);

                const updatedUserInfo = response_userinfo.data.response;
                // const updatedUserProfile = response_userprofile.data.response;
                localStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));
                setUserInfo(updatedUserInfo);
                // setUserProfile(updatedUserProfile);
                resolve(true);
            } catch (error) {
                console.error("Failed to update domain on server:", error);
                reject(error);
            } finally {
                setTimeout(() => {
                    setSwitchDomainModal(false)
                }, 500);
            }
        });
        toast.promise(update, {
            loading: "Updating domain...",
            success: "Domain updated successfully!",
            error: "Failed to update domain. Please try again.",
        })
    };

    return (
        <>
            <div id="top_nav" className={styles.top_nav}>
                <div className={styles.nav}>
                    <div className={styles.nav_items}>
                        <b className={styles.greetings}><i>Hello</i>, <b>{userName}</b> 👋</b>
                        <div className={styles.mulearn_brand2}></div>
                        <div className={styles.menu}>
                            {refreshToken && userInfo?.user_domains && (
                                <div className={styles.modeContainer}>
                                    {/* <span className={styles.modeText}>Mode</span> */}
                                    <span
                                        className={styles.userDomain}
                                        onClick={() => setSwitchDomainModal(true)}
                                    >
                                        {userInfo?.user_domains?.[0]?.toUpperCase() || ""}
                                    </span>
                                </div>)}
                            <div >
                                {refreshToken && (
                                    <div className={styles.hideOnMobile}>
                                        <GameProgressBar />
                                    </div>
                                )}
                            </div>
                            {refreshToken && (
                                <div id="profile" className={styles.profile}>
                                    <img
                                        onClick={() => setUserSettings(!userSettings)}
                                        src={profilePic || dpm}
                                        alt=""
                                        style={{ marginBottom: '0' }}
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
                                        onClick={async () => {
                                            const logout = new Promise(async (resolve, reject) => {
                                                try {
                                                    localStorage.clear();
                                                    useUserStore.getState().resetUserInfo();
                                                    useUserStore.getState().resetUserProfile();
                                                    await new Promise(() => setTimeout(() => window.location.reload(), 1000));
                                                    resolve(true);
                                                } catch (err) {
                                                    reject(err);
                                                }
                                            });
                                            await toast.promise(logout, {
                                                loading: "Logging out...",
                                                success: "Logged out successfully",
                                                error: "Failed to logout"
                                            });
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
                    onClose={() => {
                        setTimeout(() => {
                            setSwitchDomainModal(false)
                        }, 300);
                    }}
                    onSubmit={handleOnSubmit}
                />
            )}
        </>
    );
};

export default TopNavBar;