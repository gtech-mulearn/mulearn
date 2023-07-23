import styles from "../components/SideNavBar.module.css";

import { Outlet } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import { useEffect, useState } from "react";
import adminButtons from "../utils/userwiseButtonsData/adminButtons";
// import companyButtons from "../utils/userwiseButtonsData/companyButtons";
// import userButtons from "../utils/userwiseButtonsData/userButtons";
import { roles } from "../../../services/types";

//TODO: Remove flaticons and use react-icons or vice-versa
const DashboardRootLayout = (props: { component?: any }) => {
    const [connected, setConnected] = useState(false);
    const [campusLead, setCampusLead] = useState(false);
    const [zonalcampusLead, setZonalCampusLead] = useState(false);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
        const existInGuild = userInfo.exist_in_guild;
        const isCampusAmbassador = userInfo.roles?.includes(roles.CAMPUS_LEAD);
        const isAdmin = userInfo.roles?.includes(roles.ADMIN);
        const isZonalCampusLead = userInfo.roles?.includes(roles.ZONAL_CAMPUS_LEAD);

        setConnected(existInGuild);
        setCampusLead(isCampusAmbassador);
        setZonalCampusLead(isZonalCampusLead);
        setUserType(isAdmin ? "admin" : "user");
    }, []);

    const buttons = [
        {
            url: "profile",
            title: "Profile",
            hasView: true,
            icon: <i className="fi fi-sr-clipboard-user"></i>
        },
        {
            url: "connect-discord",
            title: "Connect Discord",
            hasView: !connected,
            icon: <i className="fi fi-sr-data-transfer"></i>
        },

        {
            url: "campus-details",
            title: "Campus Details",
            hasView: true,
            roles: [roles.CAMPUS_LEAD],
            icon: <i className="fi fi-sr-book-arrow-right"></i>
        },
        {
            url: "hackathon",
            title: "Hackathon",
            hasView: true,
            roles: [roles.ADMIN],
            icon: <i className="fi fi-sr-head-side-thinking"></i>
        },
        {
            url: "learning-circle",
            title: "Learning Circle",
            hasView: true,
            roles: [roles.ADMIN],
            icon: <i className="fi fi-sr-books"></i>
        },
        {
            url: "",
            title: "Management",
            hasView: true,
            roles: [roles.ADMIN],
            icon: <i className="fi fi-sr-layout-fluid"></i>,
            children: [
                {
                    url: "interest-groups",
                    title: "Interest Groups",
                    hasView: true,
                    roles: [roles.ADMIN],
                    // icon: <i className="fi fi-sr-books"></i>
                },
                {
                    url: "organizations",
                    title: "Organizations",
                    hasView: true,
                    roles: [roles.ADMIN],
                    // icon: <i className="fi fi-sr-building"></i>
                },
                {
                    url: "tasks",
                    title: "Tasks",
                    hasView: true,
                    roles: [roles.ADMIN],
                    // icon: <i className="fi fi-sr-note"></i>
                },
                {
                    url: "",
                    title: "User Management",
                    hasView: true,
                    roles: [roles.ADMIN],
                    // icon: <i className="fi fi-sr-users"></i>,
                    children: [
                        {
                            url: "manage-users",
                            title: "Manage Users",
                            hasView: true,
                            roles: [roles.ADMIN],
                        },
                        {
                            url: "user-role-verification",
                            title: "User Role Verification",
                            hasView: true,
                            roles: [roles.ADMIN]
                        }
                    ]
                },
                {
                    url: "manage-roles",
                    title: "Manage Roles",
                    hasView: true,
                    roles: [roles.ADMIN],
                    // icon: <i className="fi fi-sr-users-gear"></i>
                },
                {
                    url: "url-shortener",
                    title: "URL Shortener",
                    hasView: true,
                    roles: [roles.ADMIN],
                    // icon: <i className="fi fi-sr-globe"></i>
                },
            ],
        },

        {
            url: "manage-locations",
            title: "Manage Locations",
            hasView: true,
            roles: [roles.ADMIN],
            icon: <i className="fi fi-rr-map-marker"></i>
        },
        {
            url: "zonal-dashboard",
            title: "Zonal Dashboard",
            hasView: true,
            roles: [roles.ZONAL_CAMPUS_LEAD],
            icon: <i className="fi fi-sr-marker"></i>
        },
        {
            url: "district-dashboard",
            title: "District Dashbaord",
            hasView: true,
            roles: [roles.DISTRICT_CAMPUS_LEAD],
            icon: <i className="fi fi-sr-map-marker"></i>
        }
    ];

    // //Swtich Case not recommended
    // switch (userType) {
    //     case "admin":
    //         buttons.push(...adminButtons);
    //         break;
    // }

    // if (!connected) {
    //     buttons.splice(1, 0, {
    //         url: "connect-discord",
    //         title: "Connect Discord",
    //         icon: <i className="fi fi-sr-data-transfer"></i>
    //     });
    // }
    // if (campusLead) {
    //     buttons.splice(2, 0, {
    //         url: "campus-details",
    //         title: "Campus Details",
    //         icon: <i className="fi fi-sr-book-arrow-right"></i>
    //     });
    // }

    return (
        <div className={styles.full_page}>
            <SideNavBar sidebarButtons={buttons} />
            <div className={styles.right_side} id="right">
                <TopNavBar />
                <div className={styles.main_content}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default DashboardRootLayout;
