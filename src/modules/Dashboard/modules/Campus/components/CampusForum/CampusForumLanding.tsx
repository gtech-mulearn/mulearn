import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Bell, MoreHorizontal } from "lucide-react";
import { FaCode } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
import { BsAndroid } from "react-icons/bs";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { RiFlutterFill } from "react-icons/ri";
import styles from "./CommunityForumLandingPage.module.css";
import CampusForumPage from "./CampusForumPage";
import SidebarBannerSlider from "./SideBannerSlider";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

// Define Campus type
interface Campus {
    id: string;
    college_name: string;
    campus_code: string;
    campus_zone: string;
    total_karma: string;
    grade: "A" | "B" | "C" | "N/A";
    lead: { campus_lead: string; enabler: string };
}

// Mock API data
const mockCampusData: Campus[] = [
    {
        id: "CAMP001",
        college_name: "St. Xavier's College",
        campus_code: "C001",
        campus_zone: "North",
        total_karma: "12000",
        grade: "A",
        lead: { campus_lead: "Alice Johnson", enabler: "Bob Smith" },
    },
    {
        id: "CAMP002",
        college_name: "Greenwood Institute",
        campus_code: "C002",
        campus_zone: "South",
        total_karma: "8500",
        grade: "B",
        lead: { campus_lead: "Charlie Brown", enabler: "" },
    },
    {
        id: "CAMP003",
        college_name: "Riverdale University",
        campus_code: "C003",
        campus_zone: "East",
        total_karma: "6000",
        grade: "C",
        lead: { campus_lead: "Diana Prince", enabler: "Eve Carter" },
    },
    {
        id: "CAMP004",
        college_name: "Brighton Academy",
        campus_code: "C004",
        campus_zone: "West",
        total_karma: "9500",
        grade: "N/A",
        lead: { campus_lead: "Frank Miller", enabler: "" },
    },
    {
        id: "CAMP005",
        college_name: "Maple Grove College",
        campus_code: "C005",
        campus_zone: "North",
        total_karma: "15000",
        grade: "A",
        lead: { campus_lead: "Grace Lee", enabler: "Henry Davis" },
    },
    {
        id: "CAMP006",
        college_name: "Sunnydale Tech",
        campus_code: "C006",
        campus_zone: "South",
        total_karma: "7200",
        grade: "B",
        lead: { campus_lead: "Irene Taylor", enabler: "" },
    },
    {
        id: "CAMP007",
        college_name: "Oakwood University",
        campus_code: "C007",
        campus_zone: "East",
        total_karma: "4800",
        grade: "C",
        lead: { campus_lead: "James Wilson", enabler: "Kelly Adams" },
    },
    {
        id: "CAMP008",
        college_name: "Lakeside Institute",
        campus_code: "C008",
        campus_zone: "West",
        total_karma: "11000",
        grade: "N/A",
        lead: { campus_lead: "Laura White", enabler: "" },
    },
    {
        id: "CAMP009",
        college_name: "Pine Hill College",
        campus_code: "C009",
        campus_zone: "North",
        total_karma: "13500",
        grade: "A",
        lead: { campus_lead: "Michael Green", enabler: "Nancy Brown" },
    },
    {
        id: "CAMP010",
        college_name: "Willow Creek Academy",
        campus_code: "C010",
        campus_zone: "South",
        total_karma: "9200",
        grade: "B",
        lead: { campus_lead: "Oliver Clark", enabler: "" },
    },
    {
        id: "CAMP011",
        college_name: "Cedar Valley University",
        campus_code: "C011",
        campus_zone: "East",
        total_karma: "6500",
        grade: "C",
        lead: { campus_lead: "Patricia Moore", enabler: "Quincy Evans" },
    },
    {
        id: "CAMP012",
        college_name: "Hillside College",
        campus_code: "C012",
        campus_zone: "West",
        total_karma: "8800",
        grade: "N/A",
        lead: { campus_lead: "Rachel King", enabler: "" },
    },
    {
        id: "CAMP013",
        college_name: "Blue Ridge Institute",
        campus_code: "C013",
        campus_zone: "North",
        total_karma: "14200",
        grade: "A",
        lead: { campus_lead: "Samuel Hill", enabler: "Tara Scott" },
    },
    {
        id: "CAMP014",
        college_name: "Golden Plains Tech",
        campus_code: "C014",
        campus_zone: "South",
        total_karma: "7900",
        grade: "B",
        lead: { campus_lead: "Uma Patel", enabler: "" },
    },
    {
        id: "CAMP015",
        college_name: "Silver Lake University",
        campus_code: "C015",
        campus_zone: "East",
        total_karma: "5100",
        grade: "C",
        lead: { campus_lead: "Victor Nguyen", enabler: "Wendy Foster" },
    },
    {
        id: "CAMP016",
        college_name: "Redwood Academy",
        campus_code: "C016",
        campus_zone: "West",
        total_karma: "9700",
        grade: "N/A",
        lead: { campus_lead: "Xavier Brooks", enabler: "" },
    },
    {
        id: "CAMP017",
        college_name: "Evergreen College",
        campus_code: "C017",
        campus_zone: "North",
        total_karma: "12800",
        grade: "A",
        lead: { campus_lead: "Yvonne Carter", enabler: "Zachary Reed" },
    },
    {
        id: "CAMP018",
        college_name: "Stonebridge Institute",
        campus_code: "C018",
        campus_zone: "South",
        total_karma: "8300",
        grade: "B",
        lead: { campus_lead: "Amelia Stone", enabler: "" },
    },
    {
        id: "CAMP019",
        college_name: "Crystal Heights University",
        campus_code: "C019",
        campus_zone: "East",
        total_karma: "6900",
        grade: "C",
        lead: { campus_lead: "Benjamin Fox", enabler: "Clara Hayes" },
    },
    {
        id: "CAMP020",
        college_name: "Twilight Academy",
        campus_code: "C020",
        campus_zone: "West",
        total_karma: "10500",
        grade: "N/A",
        lead: { campus_lead: "Dylan Gray", enabler: "" },
    },
];

// Mock API function
const mockFetchCampusDetails = async (id: string): Promise<Campus> => {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate delay
    const campus = mockCampusData.find((c) => c.id === id);
    if (!campus) {
        throw new Error(`Campus with ID ${id} not found`);
    }
    return campus;
};

const CampusForumLandingPage = () => {
    const { id } = useParams<{ id: string }>(); // Get campus ID from URL
    const [campusData, setCampusData] = useState<Campus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const memberAvatars = [
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
        "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&q=80",
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80",
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&q=80",
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80",
    ];

    const friends = [
        {
            name: "Lily Ackerman",
            username: "@JissoSoft",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=40&h=40&q=80",
            verified: true,
        },
        {
            name: "Mikasa Rasmi",
            username: "@JissoSoft",
            avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&q=80",
            verified: true,
        },
        {
            name: "Anee Brown",
            username: "@JissoSoft",
            avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&q=80",
            verified: true,
        },
        {
            name: "Historia wall",
            username: "@JissoSoft",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&q=80",
            verified: true,
        },
    ];

    const partners = [
        {
            name: "UI/UX Community...",
            icon: <FaCode className={styles.communityIcon} />,
            notifications: 4,
        },
        {
            name: "Sambat coding",
            icon: <FaCode className={styles.communityIcon} />,
        },
        {
            name: "AndroidDev Indo",
            icon: <BsAndroid className={styles.communityIconAndroid} />,
        },
        {
            name: "Semarang computer...",
            icon: <HiOutlineDesktopComputer className={styles.communityIconDesktop} />,
        },
    ];

    const communities = [
        {
            name: "UI Designer Semarang",
            icon: <RiFlutterFill className={styles.communityIconRi} />,
            notifications: 4,
        },
        {
            name: "Interaction design...",
            icon: <RiFlutterFill className={styles.communityIconRi} />,
        },
        {
            name: "UI/UX University",
            icon: <IoSchool className={styles.communityIconSchool} />,
        },
    ];

    // Fetch campus details based on ID
    useEffect(() => {
        const fetchCampus = async () => {
            if (!id) {
                setError("No campus ID provided");
                setLoading(false);
                return;
            }
            try {
                const data = await mockFetchCampusDetails(id);
                setCampusData(data);
                setLoading(false);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Failed to fetch campus details");
                setLoading(false);
            }
        };
        fetchCampus();
    }, [id]);

    if (loading) {
        return <div><MuLoader /></div>;
    }

    if (error || !campusData) {
        return <div className={styles.error}>{error || "Campus not found"}</div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.mainGrid}>
                {/* Main Content */}
                <div className={styles.mainContent}>
                    <div className={styles.forumCard}>
                        {/* Header Banner */}
                        <div className={styles.bannerWrapper}>
                            <img
                                src="https://images.unsplash.com/photo-1495539406979-bf61750d38ad?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt={`${campusData.college_name} Banner`}
                                className={styles.bannerImage}
                            />
                            <div className={styles.bannerOverlay}>
                                <div className={styles.bannerLogo}>{campusData.campus_code}</div>
                                <div className={styles.bannerMemberInfo}>Member since July 2022</div>
                            </div>
                            <button className={styles.bellButton}>
                                <Bell className={styles.bellIcon} />
                            </button>
                        </div>

                        {/* Community Info */}
                        <div className={styles.communityInfo}>
                            <h1 className={styles.forumTitle}>{campusData.college_name} Forum</h1>
                            <div className={styles.forumSubInfo}>
                                <span>Public Campus</span>
                                <span>•</span>
                                <span>1.4K members</span>
                            </div>
                        </div>

                        {/* Member Avatars */}
                        <div className={styles.memberSection}>
                            <div className={styles.avatarGroup}>
                                <div className={styles.avatarStack}>
                                    {memberAvatars.map((avatar, index) => (
                                        <img
                                            key={index}
                                            src={avatar}
                                            alt={`Member ${index + 1}`}
                                            className={styles.avatarImage}
                                        />
                                    ))}
                                </div>
                                <span className={styles.memberText}>
                                    Jiso and 5 other friends are members
                                </span>
                            </div>
                            <button className={styles.moreButton}>
                                <MoreHorizontal className={styles.moreIcon} />
                            </button>
                        </div>
                        <CampusForumPage campusData={campusData} />
                    </div>
                </div>

                {/* Sidebar */}
                <div className={styles.sidebar}>
                    <div className={styles.sidebarSection}>
                        <h2 className={styles.sidebarTitle}>Happening Now</h2>
                        <div className={styles.sidebarBanner}>
                            <SidebarBannerSlider />
                        </div>
                    </div>
                    <div className={styles.sidebarSection}>
                        <h2 className={styles.sidebarTitle}>Partner Companies</h2>
                        <div className={styles.sidebarList}>
                            {partners.map((community, index) => (
                                <div key={index} className={styles.sidebarItem}>
                                    <div className={styles.sidebarItemLeft}>
                                        {community.icon}
                                        <span className={styles.sidebarItemText}>{community.name}</span>
                                    </div>
                                    {community.notifications && (
                                        <span className={styles.notificationBadge}>
                                            {community.notifications}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.sidebarSection}>
                        <h2 className={styles.sidebarTitle}>Communities</h2>
                        <div className={styles.sidebarList}>
                            {communities.map((community, index) => (
                                <div key={index} className={styles.sidebarItem}>
                                    <div className={styles.sidebarItemLeft}>
                                        {community.icon}
                                        <span className={styles.sidebarItemText}>{community.name}</span>
                                    </div>
                                    {community.notifications && (
                                        <span className={styles.notificationBadge}>
                                            {community.notifications}
                                        </span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampusForumLandingPage;