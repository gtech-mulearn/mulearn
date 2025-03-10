import React from "react";
import styles from "./CampusCard.module.css";
import * as Dialog from "@radix-ui/react-dialog";
import { Trophy, Info, X } from "lucide-react";
import { FaUserGroup } from "react-icons/fa6";

interface CampusCardData {
    name: string;
    code: string;
    grade?: "A" | "B" | "C" | "N/A";
    lead?: string;
    enabler?: string;
    userCount: string;
    district: string,
    zone: string,
    state: string,
    country: string,
}

interface CampusCardProps {
    data: CampusCardData;
    onSelect: (data: CampusCardData) => void;
}

interface GradeRequirement {
    grade: "A" | "B" | "C";
    requirements: string[];
}

const gradeRequirements: GradeRequirement[] = [
    {
        grade: "A",
        requirements: [
            "Maintain 90% student engagement",
            "Complete 10 major projects",
            "Achieve 1000+ karma points",
        ],
    },
    {
        grade: "B",
        requirements: [
            "Maintain 75% student engagement",
            "Complete 7 major projects",
            "Achieve 750+ karma points",
        ],
    },
    {
        grade: "C",
        requirements: [
            "Maintain 60% student engagement",
            "Complete 5 major projects",
            "Achieve 500+ karma points",
        ],
    },
];

const CampusCard: React.FC<CampusCardProps> = ({ data, onSelect }) => {
    const formatKarma = (karma: string) => {
        const karmaNum = parseInt(karma, 10);
        return isNaN(karmaNum) ? "0" : karmaNum > 1000 ? (karmaNum / 1000).toPrecision(4) + "K" : karmaNum.toLocaleString();
    };

    const getGradeIcon = (grade: "A" | "B" | "C" | "N/A" = "N/A"): JSX.Element => {
        switch (grade) {
            case "A":
                return <Trophy className="h-6 w-6" style={{ color: "#0066FF" }} />;
            case "B":
                return <Trophy className="h-6 w-6" style={{ color: "#94A3B8" }} />;
            case "C":
                return <Trophy className="h-6 w-6" style={{ color: "#B45309" }} />;
            default:
                return <Trophy className="h-6 w-6" style={{ color: "#64748B" }} />;
        }
    };

    return (
        <div className={styles.userCard} onClick={() => onSelect(data)}>
            <div className={styles.userDetails}>
                <div className={styles.userHeader}>
                    <h2 className={styles.userName}>
                        {data.name.trim() || "Unknown Campus"} ({data.code})
                    </h2>
                    {data.grade && (
                    <div className={styles.gradeSection}>
                        {getGradeIcon(data.grade)}
                        <span className={styles.userRole}>Grade {data.grade || "N/A"}</span>
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
                    </div>)}
                   <div className="flex gap-3 flex-wrap !mb-3" >
                    <p className={styles.badges}><span>{data.district}</span> </p>
                    <p className={styles.badges}><span>{data.state}</span> </p>
                   </div>
                    <p className={styles.userKarma}><span><FaUserGroup/></span><span>{formatKarma(data.userCount)} Students</span> </p>
                    {data.lead && (
                        <div className={styles.leadership}>
                            <span className={styles.leaderLabel}>Lead:</span>
                            <span className={styles.leaderName}>{data.lead || "N/A"}</span>
                        </div>
                    )}
                 
                    {data.enabler && (
                        <div className={styles.leadership}>
                            <span className={styles.leaderLabel}>Enabler:</span>
                            <span className={styles.leaderName}>{data.enabler}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CampusCard;