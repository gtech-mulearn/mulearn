import React, { useState, useRef, useEffect } from "react";
import AboutSection from "./AboutSection";
import ForumSection from "./ForumSection";
import MembersSection from "./MembersSection";
import EventsSection from "./EventsSection";
import styles from "./CampusForum.module.css";

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

interface CampusForumPageProps {
    campusData: Campus;
}

const CampusForumPage: React.FC<CampusForumPageProps> = ({ campusData }) => {
    const [activeTab, setActiveTab] = useState("Forum");
    const [contentHeight, setContentHeight] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    // Update height when tab changes
    useEffect(() => {
        if (contentRef.current) {
            const newHeight = contentRef.current.scrollHeight;
            setContentHeight(newHeight);
        }
    }, [activeTab]);

    return (
        <div className={styles.container}>
            {/* Navigation */}
            <div className={styles.navMenu}>
                <button
                    onClick={() => setActiveTab("About")}
                    className={activeTab === "About" ? styles.navButtonActive : styles.navButton}
                >
                    About
                </button>
                <button
                    onClick={() => setActiveTab("Forum")}
                    className={activeTab === "Forum" ? styles.navButtonActive : styles.navButton}
                >
                    Forum
                </button>
                <button
                    onClick={() => setActiveTab("Members")}
                    className={activeTab === "Members" ? styles.navButtonActive : styles.navButton}
                >
                    Members
                </button>
                <button
                    onClick={() => setActiveTab("Events")}
                    className={activeTab === "Events" ? styles.navButtonActive : styles.navButton}
                >
                    Events
                </button>
            </div>

            {/* Content Area with Transition */}
            <div className={styles.contentArea}>
                <div
                    className={styles.transitionWrapper}
                    style={{ maxHeight: contentHeight ? `${contentHeight}px` : "auto" }}
                    ref={contentRef}
                >
                    {activeTab === "About" && <AboutSection campusData={campusData} />}
                    {activeTab === "Forum" && <ForumSection />}
                    {activeTab === "Members" && <MembersSection campusId={campusData.id} />}
                    {activeTab === "Events" && <EventsSection campusId={campusData.id} />}
                </div>
            </div>
        </div>
    );
};

export default CampusForumPage;