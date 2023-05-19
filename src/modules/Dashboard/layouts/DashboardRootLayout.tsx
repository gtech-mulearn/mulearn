import styles from "../components/SideNavBar.module.css";

import { Outlet } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import { useEffect, useState } from "react";
import adminButtons from "../utils/userwiseButtonsData/adminButtons";
import companyButtons from "../utils/userwiseButtonsData/companyButtons";
import userButtons from "../utils/userwiseButtonsData/userButtons";


const DashboardRootLayout = (props: { component?: any }) => {
    // const [opacity, setOpacity] = useState(null);
    const [connected, setConnected] = useState(false);
    const [campusLead, setCampusLead] = useState(false);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        // TODO: check if user is admin or not for real
        setUserType("user");
        if (localStorage.getItem("userInfo")) {
            const userInfo = JSON.parse(localStorage.getItem("userInfo")!);

            if (userInfo.existInGuild) {
                setConnected(userInfo.existInGuild === "False" ? false : true);
            }
            if (userInfo.roles.includes("Campus Ambassador")) {
                setCampusLead(userInfo.roles.includes("Campus Ambassador"));
            }
            if (userInfo.roles.includes("Admins")) {
                setUserType("admin");
            }
        }


    });

    const buttons = [];

    switch (userType) {
        case "admin":
            buttons.push(...adminButtons);
            break;
        case "company":
            buttons.push(...companyButtons);
            break;
        case "user":
            buttons.push(...userButtons);
    }

    if (!connected) {
        buttons.splice(1, 0, {
            url: "connect-discord",
            title: "Connect Discord",
            icon: <i className="fi fi-sr-data-transfer"></i>
        });
    }
    if (campusLead) {
        buttons.splice(2, 0, {
            url: "campus-details",
            title: "Campus Details",
            icon: <i className="fi fi-sr-book-arrow-right"></i>
        });
    }

    return (
        <div className={styles.full_page}>
            <SideNavBar sidebarButtons={buttons} />
            <div className={styles.right_side}>
                <TopNavBar />
                <div className={styles.main_content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardRootLayout;
