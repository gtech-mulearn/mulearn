import React, { useEffect, useState } from "react";
import styles from "./SideNavBar.module.css";
import { VscBellDot,VscBell } from 'react-icons/vsc'
import MulearnBrand from "../assets/MulearnBrand";
import { useNavigate } from "react-router-dom";
import dpm from "../assets/images/dpm.webp";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { Popover, PopoverTrigger, Button, PopoverContent, PopoverHeader, PopoverCloseButton, PopoverBody, PopoverArrow, PopoverFooter } from "@chakra-ui/react";
import { Notification as NotificationProps, getNotifications } from "./api";
import NotificationTab from "./Notification";
const TopNavBar = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState<string | null>(null);
    const [notificationList, setNotificationList] = useState<NotificationProps[]>([]);

    useEffect(() => {
        if(notificationList.length===0)
            getNotifications(setNotificationList);
    }, []);
    const notificationStyle = {
        backgroundColor: '#ffffff00',
        _hover: {
            backgroundColor: '#ffffff00'
        },
        _active: {
            backgroundColor: '#eee'
        },
        aspectRatio: '1/1', borderRadius: '15px',
        fontSize: '30px',
        padding: '10px',
    }
    useEffect(() => {
        const userInfo = fetchLocalStorage<UserInfo>("userInfo");

        if (userInfo) {
            setName(userInfo?.first_name);
            setProfilePic(userInfo?.profile_pic || null);
        }
    }, []);
    return (
        <>
            <div id="top_nav" className={styles.top_nav}>
                <div className={styles.nav}>
                    <div className={styles.nav_items}>
                        <b className={styles.greetings}>Hello, {name} 👋</b>
                        <div className={styles.mulearn_brand2}></div>
                        <div className={styles.menu}>

                            {/* <i className="fi fi-sr-settings"></i> */}
                            {/* <Popover placement="bottom-end">
                                <PopoverTrigger >
                                    <Button {...notificationStyle}>{notificationList.length===0?<VscBell />:<VscBellDot />}</Button>
                                </PopoverTrigger>
                                <PopoverContent >
                                    <NotificationTab notificationList={notificationList} setNotificationList={setNotificationList} />
                                </PopoverContent>
                            </Popover> */}
                            <div className={styles.profile}>
                                <img
                                    onClick={() => {
                                        navigate("/dashboard/profile");
                                    }}
                                    src={profilePic ? profilePic : dpm}
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <hr />
                </div>
            </div>
        </>
    );
};



export default TopNavBar;
