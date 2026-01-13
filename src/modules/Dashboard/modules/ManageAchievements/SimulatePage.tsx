// SimulatePage.tsx - Test achievement eligibility for users
import { useState } from "react";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import { simulateForUser, SimulationResult } from "./services/achievementApi";
import styles from "./AchievementPages.module.css";
import toast from "react-hot-toast";

const SimulatePage = () => {
    const [muid, setMuid] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);

    const columnOrder = [
        { column: "achievement_name", Label: "Achievement", isSortable: true },
        { column: "status", Label: "Eligibility", isSortable: true },
        { column: "progress_display", Label: "Progress", isSortable: false },
        { column: "reason", Label: "Details", isSortable: false }
    ];

    const handleSimulate = async () => {
        if (!muid.trim()) {
            toast.error("Please enter a MuID");
            return;
        }

        setIsLoading(true);
        setHasSearched(true);
        try {
            const results = await simulateForUser(muid.trim());
            const transformedData = results.map((result: SimulationResult) => ({
                ...result,
                status: result.eligible ? "Eligible" : "Not Eligible",
                progress_display: result.progress
                    ? `${result.progress.current}/${result.progress.required} (${result.progress.percentage}%)`
                    : "-"
            }));
            setData(transformedData);
        } catch (error) {
            console.error("Simulation failed:", error);
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.searchSection}>
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>User MuID</label>
                    <input
                        type="text"
                        className={styles.textInput}
                        placeholder="Enter MuID (e.g., john@mulearn)"
                        value={muid}
                        onChange={(e) => setMuid(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSimulate()}
                    />
                </div>
                <button
                    className={styles.primaryButton}
                    onClick={handleSimulate}
                    disabled={isLoading}
                >
                    {isLoading ? "Simulating..." : "Simulate"}
                </button>
            </div>

            {hasSearched && (
                <>
                    <p className={styles.resultsSummary}>
                        Results for <strong>{muid}</strong> ({data.length} achievements)
                    </p>

                    <Table
                        rows={data}
                        isloading={isLoading}
                        page={1}
                        perPage={100}
                        columnOrder={columnOrder}
                        id={["achievement_id"]}
                        customCellRender={(column: any, row: any) => {
                            if (column === "status") {
                                return (
                                    <span className={`${styles.badge} ${row.eligible ? styles.badgeSuccess : styles.badgeError}`}>
                                        {row.eligible ? "✓ Eligible" : "✗ Not Eligible"}
                                    </span>
                                );
                            }
                            if (column === "progress_display" && row.progress) {
                                return (
                                    <div className={styles.progressContainer}>
                                        <div className={styles.progressBar}>
                                            <div
                                                className={`${styles.progressFill} ${row.eligible ? styles.progressFillSuccess : styles.progressFillWarning}`}
                                                style={{ width: `${row.progress.percentage}%` }}
                                            />
                                        </div>
                                        <span className={styles.progressText}>
                                            {row.progress.percentage}%
                                        </span>
                                    </div>
                                );
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
                </>
            )}

            {!hasSearched && (
                <div className={styles.emptyState}>
                    <span className={styles.emptyStateIcon}>🧪</span>
                    <p className={styles.emptyStateTitle}>Simulate Achievement Eligibility</p>
                    <p className={styles.emptyStateSubtitle}>Enter a MuID above to check which achievements a user is eligible for</p>
                </div>
            )}
        </div>
    );
};

export default SimulatePage;
