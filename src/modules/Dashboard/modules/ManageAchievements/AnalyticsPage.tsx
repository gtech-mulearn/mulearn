// AnalyticsPage.tsx - Achievement analytics and statistics
import { useEffect, useState } from "react";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import { getAchievements } from "./services/api";
import styles from "./AchievementPages.module.css";

const AnalyticsPage = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        totalAchievements: 0,
        totalIssued: 0,
        vcEnabled: 0
    });

    const columnOrder = [
        { column: "name", Label: "Achievement", isSortable: true },
        { column: "type", Label: "Type", isSortable: true },
        { column: "has_vc", Label: "VC Enabled", isSortable: true },
        { column: "created_at", Label: "Created", isSortable: true }
    ];

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const achievements = await getAchievements();
                if (achievements) {
                    setData(achievements);
                    setStats({
                        totalAchievements: achievements.length,
                        totalIssued: 0,
                        vcEnabled: achievements.filter((a: any) => a.has_vc).length
                    });
                }
            } catch (error) {
                console.error("Error fetching analytics:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className={styles.pageContainer}>
            {/* Page Header */}
            <div style={{ marginBottom: "24px" }}>
                <h2 style={{
                    fontSize: "24px",
                    fontWeight: 600,
                    color: "#1f2937",
                    margin: 0
                }}>
                    Achievement Analytics
                </h2>
                <p style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginTop: "4px"
                }}>
                    Overview of all achievements in the system
                </p>
            </div>

            {/* Stats Cards */}
            <div className={styles.statsGrid}>
                <div className={`${styles.statCard} ${styles.statCardPrimary}`}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <div className={styles.statCardLabel}>Total Achievements</div>
                            <div className={styles.statCardValue}>{stats.totalAchievements}</div>
                        </div>
                        <div style={{ fontSize: "40px", opacity: 0.3 }}>🏆</div>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statCardSuccess}`}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <div className={styles.statCardLabel}>VC Enabled</div>
                            <div className={styles.statCardValue}>{stats.vcEnabled}</div>
                        </div>
                        <div style={{ fontSize: "40px", opacity: 0.3 }}>✓</div>
                    </div>
                </div>

                <div className={`${styles.statCard} ${styles.statCardWarning}`}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div>
                            <div className={styles.statCardLabel}>Standard</div>
                            <div className={styles.statCardValue}>
                                {stats.totalAchievements - stats.vcEnabled}
                            </div>
                        </div>
                        <div style={{ fontSize: "40px", opacity: 0.3 }}>📋</div>
                    </div>
                </div>
            </div>

            {/* Section Header */}
            <div style={{
                marginBottom: "16px",
                paddingBottom: "12px",
                borderBottom: "1px solid #e5e7eb"
            }}>
                <h3 style={{
                    fontSize: "16px",
                    fontWeight: 600,
                    color: "#374151",
                    margin: 0
                }}>
                    All Achievements
                </h3>
            </div>

            {/* Achievements Table */}
            <Table
                rows={data}
                isloading={isLoading}
                page={1}
                perPage={100}
                columnOrder={columnOrder}
                id={["id"]}
                customCellRender={(column: any, row: any) => {
                    if (column === "type") {
                        return (
                            <span className={`${styles.badge} ${styles.badgeInfo}`}>
                                {row.type || "General"}
                            </span>
                        );
                    }
                    if (column === "has_vc") {
                        return (
                            <span className={`${styles.badge} ${row.has_vc ? styles.badgeSuccess : styles.badgeNeutral}`}>
                                {row.has_vc ? "Yes" : "No"}
                            </span>
                        );
                    }
                    if (column === "created_at") {
                        return <span>{new Date(row.created_at).toLocaleDateString()}</span>;
                    }
                    return null;
                }}
            >
                <THead
                    columnOrder={columnOrder}
                    onIconClick={() => { }}
                    action={false}
                />
                <Blank />
            </Table>
        </div>
    );
};

export default AnalyticsPage;
