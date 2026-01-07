// BulkIssuePage.tsx - Issue achievements to multiple users
import { useEffect, useState } from "react";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import { manualIssue } from "./services/achievementApi";
import { getAchievements } from "./services/api";
import styles from "./AchievementPages.module.css";
import toast from "react-hot-toast";

interface AchievementOption {
    value: string;
    label: string;
}

const BulkIssuePage = () => {
    const [achievements, setAchievements] = useState<AchievementOption[]>([]);
    const [selectedAchievement, setSelectedAchievement] = useState<AchievementOption | null>(null);
    const [muids, setMuids] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [results, setResults] = useState<any[]>([]);

    const columnOrder = [
        { column: "muid", Label: "MuID", isSortable: false },
        { column: "status", Label: "Status", isSortable: false },
        { column: "message", Label: "Message", isSortable: false }
    ];

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const data = await getAchievements();
                if (data) {
                    setAchievements(data.map((a: any) => ({
                        value: a.id,
                        label: a.title || a.name
                    })));
                }
            } catch (error) {
                console.error("Error fetching achievements:", error);
            }
        };
        fetchAchievements();
    }, []);

    const handleBulkIssue = async () => {
        if (!selectedAchievement) {
            toast.error("Please select an achievement");
            return;
        }

        const muidList = muids
            .split(/[\n,]/)
            .map(m => m.trim())
            .filter(m => m.length > 0);

        if (muidList.length === 0) {
            toast.error("Please enter at least one MuID");
            return;
        }

        setIsLoading(true);
        setResults([]);

        const issueResults: any[] = [];

        for (const muid of muidList) {
            try {
                const success = await manualIssue({
                    user_id: muid,
                    achievement_id: selectedAchievement.value
                });
                issueResults.push({
                    muid,
                    success,
                    status: success ? "Success" : "Failed",
                    message: success ? "Achievement issued" : "Failed to issue"
                });
            } catch (error: any) {
                issueResults.push({
                    muid,
                    success: false,
                    status: "Failed",
                    message: error.message || "Error occurred"
                });
            }
        }

        setResults(issueResults);
        setIsLoading(false);

        const successCount = issueResults.filter(r => r.success).length;
        if (successCount > 0) {
            toast.success(`Issued to ${successCount}/${muidList.length} users`);
        }
    };

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
                    Bulk Issue Achievements
                </h2>
                <p style={{
                    fontSize: "14px",
                    color: "#6b7280",
                    marginTop: "4px"
                }}>
                    Issue achievements to multiple users at once
                </p>
            </div>

            {/* Form Card */}
            <div style={{
                background: "white",
                borderRadius: "12px",
                padding: "24px",
                marginBottom: "24px",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
            }}>
                {/* Achievement Selection */}
                <div style={{ marginBottom: "20px" }}>
                    <label className={styles.inputLabel}>Select Achievement</label>
                    <Select
                        styles={customReactSelectStyles}
                        options={achievements}
                        value={selectedAchievement}
                        onChange={(option) => setSelectedAchievement(option)}
                        placeholder="Choose an achievement..."
                        isClearable
                    />
                </div>

                {/* MuIDs Input */}
                <div style={{ marginBottom: "20px" }}>
                    <label className={styles.inputLabel}>
                        MuIDs
                        <span style={{
                            fontWeight: 400,
                            color: "#9ca3af",
                            marginLeft: "8px"
                        }}>
                            (one per line or comma-separated)
                        </span>
                    </label>
                    <textarea
                        className={styles.textareaInput}
                        value={muids}
                        onChange={(e) => setMuids(e.target.value)}
                        placeholder="john@mulearn
jane@mulearn
alex@mulearn"
                        rows={6}
                    />
                </div>

                {/* Submit Button */}
                <button
                    className={styles.primaryButton}
                    onClick={handleBulkIssue}
                    disabled={isLoading || !selectedAchievement}
                    style={{ width: "100%" }}
                >
                    {isLoading ? "Issuing..." : "Issue to All Users"}
                </button>
            </div>

            {/* Results Section */}
            {results.length > 0 && (
                <div style={{
                    background: "white",
                    borderRadius: "12px",
                    padding: "24px",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)"
                }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "16px"
                    }}>
                        <h3 style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            color: "#374151",
                            margin: 0
                        }}>
                            Results
                        </h3>
                        <span style={{
                            padding: "4px 12px",
                            background: "#f3f4f6",
                            borderRadius: "20px",
                            fontSize: "13px",
                            color: "#374151"
                        }}>
                            {results.filter(r => r.success).length}/{results.length} successful
                        </span>
                    </div>

                    <Table
                        rows={results}
                        isloading={false}
                        page={1}
                        perPage={100}
                        columnOrder={columnOrder}
                        id={["muid"]}
                        customCellRender={(column: any, row: any) => {
                            if (column === "status") {
                                return (
                                    <span className={`${styles.badge} ${row.success ? styles.badgeSuccess : styles.badgeError}`}>
                                        {row.success ? "✓ Success" : "✗ Failed"}
                                    </span>
                                );
                            }
                            if (column === "muid") {
                                return <span className={styles.monoText}>{row.muid}</span>;
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
            )}

            {/* Empty State */}
            {results.length === 0 && (
                <div className={styles.emptyState}>
                    <span className={styles.emptyStateIcon}>🎁</span>
                    <p className={styles.emptyStateTitle}>Ready to Issue</p>
                    <p className={styles.emptyStateSubtitle}>
                        Select an achievement and enter MuIDs above, then click "Issue to All Users"
                    </p>
                </div>
            )}
        </div>
    );
};

export default BulkIssuePage;
