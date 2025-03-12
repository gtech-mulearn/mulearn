import React, { useEffect, useState } from "react";
import styles from "./SideNavBar.module.css";
import { MdNotifications, MdNotificationAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import dpm from "../assets/images/dpm.webp";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import {
    Popover,
    PopoverTrigger,
    Button,
    PopoverContent
} from "@chakra-ui/react";
import { Notification as NotificationProps, getNotifications } from "./api";
import NotificationTab from "./Notification";
import { SiDiscord } from "react-icons/si";
import { MuButtonLight } from "@/MuLearnComponents/MuButtons/MuButton";
import MuLogOut from "../assets/svg/MuLogOut";
import toast from "react-hot-toast";

const TopNavBar = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [userSettings, setUserSettings] = useState(false);
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [notificationList, setNotificationList] = useState<
        NotificationProps[]
    >([]);
    const notificationStyle = {
        backgroundColor: "#ffffff00",
        _hover: {
            backgroundColor: "#ffffff00"
        },
        _active: {
            backgroundColor: "#eee"
        },
        aspectRatio: "1/1",
        borderRadius: "15px",
        fontSize: "30px",
        width: "50px",
        padding: "10px"
    };
    useEffect(() => {
        const userInfo = fetchLocalStorage<UserInfo>("userInfo");

        if (userInfo) {
            setName(userInfo?.full_name.split(" ")[0]);
            setProfilePic(userInfo?.profile_pic || null);
        }
    }, []);

    useEffect(() => {
        const div = document.getElementById("user_settings");
        const profile = document.getElementById("profile");
        if (userSettings) {
            window.onclick = function (event) {
                const isUserSettingsClick =
                    event.target === div || div?.contains(event.target as Node);
                const isProfileClick =
                    event.target === profile ||
                    profile?.contains(event.target as Node);

                if (!isUserSettingsClick && !isProfileClick) {
                    setUserSettings(false);
                }
            };
        }
    }, [userSettings]);

    return (
        <>
            <div id="top_nav" className={styles.top_nav}>
                <div className={styles.nav}>
                    <div className={styles.nav_items}>
                        <b className={styles.greetings}>Hello, {name} 👋</b>
                        <div className={styles.mulearn_brand2}></div>
                        <div className={styles.menu}>
                            <a
                                href="http://discord.mulearn.org"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <SiDiscord size={30} />
                            </a>
                            {/* <i className="fi fi-sr-settings"></i> */}
                            <Popover placement="bottom-end">
                                <PopoverTrigger>
                                    <Button
                                        onClick={() =>
                                            getNotifications(
                                                setNotificationList
                                            )
                                        }
                                        {...notificationStyle}
                                    >
                                        {notificationList.length === 0 ? (
                                            <MdNotifications size={50} />
                                        ) : (
                                            <MdNotificationAdd />
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent
                                    style={{
                                        background: "transparent",
                                        border: "none"
                                    }}
                                >
                                    <NotificationTab
                                        notificationList={notificationList}
                                        setNotificationList={
                                            setNotificationList
                                        }
                                    />
                                </PopoverContent>
                            </Popover>

                            <div id="profile" className={styles.profile}>
                                <img
                                    onClick={event => {
                                        event.stopPropagation(); // Stop the event from propagating
                                        setUserSettings(!userSettings);
                                    }}
                                    src={profilePic ? profilePic : dpm}
                                    alt=""
                                />
                            </div>

                            {userSettings && (
                                <div
                                    id="user_settings"
                                    className={styles.user_settings}
                                >
                                    <MuButtonLight
                                        text="Log Out"
                                        icon={<MuLogOut />}
                                        style={{
                                            backgroundColor: "#fff",
                                            color: "#FF7676",
                                            marginBottom: "0px",
                                            minWidth: "0px",
                                            padding: "0px"
                                        }}
                                        onClick={() => {
                                            localStorage.clear();

                                            toast.error(
                                                "Logged Out, Redirecting to login page."
                                            );

                                            setTimeout(
                                                () => window.location.reload(),
                                                900
                                            );
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};

export default TopNavBar;
