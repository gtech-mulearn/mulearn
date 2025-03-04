import React, { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Trophy, Users, Info, Medal, X } from "lucide-react";
import { useParams } from "react-router-dom";
import styles from "./campusdetails.module.css";
import CLIcon from "../../assets/images/CampusLeadIcon.svg";
import CEIcon from "../../assets/images/CampusEnablerIcon.png";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import toast from "react-hot-toast";
import axios from "axios";
import { convertDateToDayAndMonth } from "/src/modules/Dashboard/utils/common";
import { privateGateway } from "@/MuLearnServices/apiGateways";

interface Campus {
    college_name: string;
    campus_code: string;
    campus_zone: string;
    campus_level: number;
    total_karma: number;
    total_members: number;
    active_members: number;
    rank: number;
    lead: { campus_lead: string; enabler: string };
}

interface GradeRequirement {
    grade: "A" | "B" | "C";
    requirements: string[];
}

const gradeRequirements: GradeRequirement[] = [
    {
        grade: "A",
        requirements: ["Maintain 90% student engagement", "Complete 10 major projects", "Achieve 1000+ karma points"],
    },
    {
        grade: "B",
        requirements: ["Maintain 75% student engagement", "Complete 7 major projects", "Achieve 750+ karma points"],
    },
    {
        grade: "C",
        requirements: ["Maintain 60% student engagement", "Complete 5 major projects", "Achieve 500+ karma points"],
    },
];

const CampusDetails: React.FC = () => {
    const { org_id } = useParams<{ org_id: string }>();
    const [campusData, setCampusData] = useState<Campus | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const getGradeFromLevel = (level: number): "A" | "B" | "C" | "N/A" => {
        if (level >= 4) return "A";
        if (level >= 3) return "B";
        if (level >= 2) return "C";
        return "N/A";
    };

    useEffect(() => {
        const fetchCampusData = async () => {
            try {
                // Fetch campus details
                const campusResponse = await privateGateway.get(`/api/v1/dashboard/campus/${org_id}`);
                const campus = campusResponse.data.response;

                // Fetch weekly karma (not used in UI yet, but fetched for potential future use)
                const weeklyKarmaResponse = await privateGateway.get(`/api/v1/dashboard/campus/weekly-karma/${org_id}`);
                const weeklyKarma = weeklyKarmaResponse.data.response;

                // Fetch student level data (not used in UI yet, but fetched for completeness)
                const studentLevelResponse = await axios.get(`/api/v1/dashboard/campus/student-level/${org_id}`);
                const studentLevel = studentLevelResponse.data.response;

                setCampusData({
                    college_name: campus.college_name || "Unknown College",
                    campus_code: campus.campus_code || "N/A",
                    campus_zone: campus.campus_zone || "N/A",
                    campus_level: campus.campus_level || 0,
                    total_karma: campus.total_karma || 0,
                    total_members: campus.total_members || 0,
                    active_members: campus.active_members || 0,
                    rank: campus.rank || 0,
                    lead: {
                        campus_lead: campus.lead?.campus_lead || "Not Assigned",
                        enabler: campus.lead?.enabler || "",
                    },
                });
            } catch (err) {
                console.error("Failed to fetch campus data:", err);
                toast.error("Failed to load campus details");
                setError("Failed to load campus data");
            } finally {
                setIsLoading(false);
            }
        };

        if (org_id) {
            fetchCampusData();
        }
    }, [org_id]);

    const getGradeIcon = (grade: "A" | "B" | "C" | "N/A"): JSX.Element | null => {
        switch (grade) {
            case "A":
                return <Trophy className="h-8 w-8" style={{ color: "#0066FF" }} />;
            case "B":
                return <Trophy className="h-8 w-8" style={{ color: "#94A3B8" }} />;
            case "C":
                return <Trophy className="h-8 w-8" style={{ color: "#B45309" }} />;
            case "N/A":
                return <Trophy className="h-8 w-8" style={{ color: "#64748B" }} />;
            default:
                return null;
        }
    };

    if (isLoading) {
        return <MuLoader />;
    }

    if (error || !campusData) {
        return (
            <div className={styles.container}>
                <div className={styles.wrapper}>
                    <p>Unable to load campus details. Please try again later.</p>
                </div>
            </div>
        );
    }

    const grade = getGradeFromLevel(campusData.campus_level);

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>
                            {campusData.college_name} ({campusData.campus_code})
                        </h1>
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.cardWithBorder}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Campus Grade</h3>
                            <Dialog.Root>
                                <Dialog.Trigger asChild>
                                    <button className={styles.iconButton}>
                                        <Info size={16} />
                                        <span className="sr-only">Grade requirements</span>
                                    </button>
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className={styles.dialogOverlay} />
                                    <Dialog.Content className={styles.dialogContent}>
                                        <Dialog.Title className={styles.dialogTitle}>
                                            Grade Requirements
                                        </Dialog.Title>
                                        <div className={styles.dialogBody}>
                                            {gradeRequirements.map((req) => (
                                                <div key={req.grade} className={styles.gradeRequirement}>
                                                    <div className={styles.gradeDisplay}>
                                                        {getGradeIcon(req.grade)}
                                                        <h3 className={styles.gradeText}>Grade {req.grade}</h3>
                                                    </div>
                                                    <ul className={styles.requirementsList}>
                                                        {req.requirements.map((requirement, index) => (
                                                            <li key={index}>{requirement}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ))}
                                        </div>
                                        <Dialog.Close asChild>
                                            <button className={styles.dialogCloseButton}>
                                                <X size={16} />
                                                <span className="sr-only">Close</span>
                                            </button>
                                        </Dialog.Close>
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </Dialog.Root>
                        </div>
                        <div className={styles.gradeDisplay}>
                            {getGradeIcon(grade)}
                            <span className={styles.gradeText}>Grade {grade}</span>
                        </div>
                    </div>

                    <div className={styles.cardHover}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Karma Points</h3>
                            <Medal size={16} style={{ color: "#0066FF" }} />
                        </div>
                        <div className={styles.statsValue}>{campusData.total_karma.toLocaleString()}</div>
                        <p className={styles.statsLabel}>Points earned this year</p>
                    </div>

                    <div className={styles.cardHover}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Active Students</h3>
                            <Users size={16} style={{ color: "#0066FF" }} />
                        </div>
                        <div className={styles.statsValue}>{campusData.active_members}</div>
                        <p className={styles.statsLabel}>Currently active</p>
                    </div>

                    <div className={styles.cardHover}>
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>Overall Rank</h3>
                            <Trophy size={16} style={{ color: "#0066FF" }} />
                        </div>
                        <div className={styles.statsValue}>#{campusData.rank}</div>
                        <p className={styles.statsLabel}>Among all campuses</p>
                    </div>
                </div>

                <div className={styles.leadershipSection}>
                    <h3 className={styles.leadershipTitle}>Campus Leadership</h3>
                    <div className={styles.leadershipGrid}>
                        <div className={styles.leaderCard}>
                            <div className="flex items-center flex-col">
                                <img src={CLIcon} alt="Campus Lead" className={styles.leaderIcon} />
                                <div className={styles.leaderName}>{campusData.lead.campus_lead}</div>
                                <span className={styles.leaderRole}>Campus Lead</span>
                            </div>
                        </div>
                        {campusData.lead.enabler && (
                            <div className={styles.leaderCard}>
                                <div className="flex flex-col items-center">
                                    <img src={CEIcon} alt="Campus Enabler" className={styles.leaderIcon} />
                                    <div className={styles.leaderName}>{campusData.lead.enabler}</div>
                                    <span className={styles.leaderRole}>Campus Lead Enabler</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CampusDetails;