import styles from "../components/SideNavBar.module.css";

import { Outlet } from "react-router-dom";
import SideNavBar from "../components/SideNavBar";
import TopNavBar from "../components/TopNavBar";
import { Suspense, useEffect, useState } from "react";
import adminButtons from "../utils/userwiseButtonsData/adminButtons";
// import companyButtons from "../utils/userwiseButtonsData/companyButtons";
// import userButtons from "../utils/userwiseButtonsData/userButtons";
import { roles } from "@/MuLearnServices/types";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
//TODO: Remove flaticons and use react-icons or vice-versa
const DashboardRootLayout = (props: { component?: any }) => {
    const [connected, setConnected] = useState(false);
    const [campusLead, setCampusLead] = useState(false);
    const [zonalcampusLead, setZonalCampusLead] = useState(false);
    const [userType, setUserType] = useState("");

    useEffect(() => {
        const userInfo = fetchLocalStorage<UserInfo>('userInfo')
        if (userInfo) {
            const existInGuild = userInfo.exist_in_guild;
            setConnected(existInGuild);
        }
    }, []);

    const buttons = [
        {
            url: "/dashboard/profile",
            title: "Profile",
            hasView: true,
            icon: <i className="fi fi-sr-clipboard-user"></i>
        },
        {
            url: "/dashboard/connect-discord",
            title: "Connect Discord",
            hasView: !connected,
            icon: <i className="fi fi-sr-data-transfer"></i>
        },

        {
            url: "/dashboard/campus-details",
            title: "Campus Details",
            hasView: true,
            roles: [roles.CAMPUS_LEAD],
            icon: <i className="fi fi-sr-book-arrow-right"></i>
        },
        {
            url: "/dashboard/hackathon",
            title: "Hackathon",
            hasView: true,
            roles: [roles.ADMIN],
            icon: <i className="fi fi-sr-head-side-thinking"></i>
        },
        {
            url: "/dashboard/learning-circle",
            title: "Learning Circle",
            hasView: true,
            roles: [roles.STUDENT],
            icon: <i className="fi fi-sr-books"></i>
        },
        {
            url: "",
            title: "Management",
            hasView: true,
            roles: [roles.ADMIN, roles.FELLOW, roles.ASSOCIATE],
            icon: <i className="fi fi-sr-layout-fluid"></i>,
            children: [
                {
                    url: "/dashboard/interest-groups",
                    title: "Interest Groups",
                    hasView: true,
                    roles: [roles.ADMIN],
                    // icon: <i className="fi fi-sr-books"></i>
                },
                {
                    url: "/dashboard/organizations",
                    title: "Organizations",
                    hasView: true,
                    roles: [roles.ADMIN],
                    // icon: <i className="fi fi-sr-building"></i>
                },
                {
                    url: "/dashboard/tasks",
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
                            url: "/dashboard/manage-users",
                            title: "Manage Users",
                            hasView: true,
                            roles: [roles.ADMIN],
                        },
                        {
                            url: "/dashboard/user-role-verification",
                            title: "User Role Verification",
                            hasView: true,
                            roles: [roles.ADMIN]
                        }
                    ]
                },
                {
                    url: "/dashboard/manage-roles",
                    title: "Manage Roles",
                    hasView: true,
                    roles: [roles.ADMIN],
                    // icon: <i className="fi fi-sr-users-gear"></i>
                },
                {
                    url: "/dashboard/url-shortener",
                    title: "URL Shortener",
                    hasView: true,
                    roles: [roles.ADMIN, roles.FELLOW, roles.ASSOCIATE],
                    // icon: <i className="fi fi-sr-globe"></i>
                },
            ],
        },

        {
            url: "/dashboard/manage-locations",
            title: "Manage Locations",
            hasView: true,
            roles: [roles.ADMIN],
            icon: <i className="fi fi-ss-map-marker"></i>
        },
        {
            url: "/dashboard/zonal-dashboard",
            title: "Zonal Dashboard",
            hasView: true,
            roles: [roles.ZONAL_CAMPUS_LEAD],
            icon: <i className="fi fi-sr-marker"></i>
        },
        {
            url: "/dashboard/district-dashboard",
            title: "District Dashbaord",
            hasView: true,
            roles: [roles.DISTRICT_CAMPUS_LEAD],
            icon: <i className="fi fi-sr-map-marker"></i>
        },
        {
            url: "/dashboard/refer",
            title: "Refer",
            hasView: true,
            roles: [roles.STUDENT],
            icon: <i className="fi fi-sr-map-marker"></i>
        }
    ];

    return (
        <div className={styles.full_page}>
            <SideNavBar sidebarButtons={buttons} />
            <div className={styles.right_side} id="right">
                <TopNavBar />
                <div className={styles.main_content}>
                    <Suspense fallback={<MuLoader />}>

                        <Outlet />
                    </Suspense>
                </div>
            </div>
        </div >
    );
};

export default DashboardRootLayout;
