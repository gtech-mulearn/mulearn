import React, { useEffect, useState } from "react";
import styles from "./SideNavBar.module.css";
import MulearnBrand from "../assets/MulearnBrand";
import { useNavigate } from "react-router-dom";
import dpm from "../assets/images/dpm.webp";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";


const TopNavBar = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [profilePic, setProfilePic] = useState<string | null>(null);

    useEffect(() => {
        const userInfo = fetchLocalStorage<UserInfo>('userInfo')

        if (userInfo) {
            setName(userInfo?.first_name);
            setProfilePic(userInfo?.profile_pic || null)
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
                            {/* <i className="fi fi-sr-bell"></i> */}
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
