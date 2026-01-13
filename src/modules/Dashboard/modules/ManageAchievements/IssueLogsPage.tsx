// IssueLogsPage.tsx - View achievement issuance audit logs
import { useState } from "react";
import Table from "@/MuLearnComponents/Table/Table";
import THead from "@/MuLearnComponents/Table/THead";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import { getAuditLogs, AuditLogEntry } from "./services/achievementApi";
import styles from "./AchievementPages.module.css";
import toast from "react-hot-toast";

const IssueLogsPage = () => {
    const [muid, setMuid] = useState("");
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasSearched, setHasSearched] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(20);

    const columnOrder = [
        { column: "created_at", Label: "Date", isSortable: true },
        { column: "action", Label: "Action", isSortable: true },
        { column: "achievement_id", Label: "Achievement ID", isSortable: false },
        { column: "details", Label: "Details", isSortable: false }
    ];

    const handleSearch = async () => {
        if (!muid.trim()) {
            toast.error("Please enter a MuID");
            return;
        }

        setIsLoading(true);
        setHasSearched(true);
        try {
            const logs = await getAuditLogs(muid.trim());
            const transformedData = logs.map((log: AuditLogEntry) => ({
                ...log,
                created_at_display: new Date(log.created_at).toLocaleString(),
                details: log.metadata
                    ? Object.entries(log.metadata)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(", ")
                    : "-"
            }));
            setData(transformedData);
            setTotalPages(Math.ceil(transformedData.length / perPage));
        } catch (error) {
            console.error("Error fetching logs:", error);
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const getActionBadgeClass = (action: string) => {
        const classes: Record<string, string> = {
            issued: styles.badgeSuccess,
            revoked: styles.badgeError,
            vc_issued: styles.badgeInfo,
            vc_failed: styles.badgeWarning
        };
        return classes[action] || styles.badgeNeutral;
    };

    const getActionLabel = (action: string) => {
        const labels: Record<string, string> = {
            issued: "Issued",
            revoked: "Revoked",
            vc_issued: "VC Issued",
            vc_failed: "VC Failed"
        };
        return labels[action] || action;
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePreviousClick = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setPerPage(selectedValue);
        setCurrentPage(1);
        setTotalPages(Math.ceil(data.length / selectedValue));
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
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    />
                </div>
                <button
                    className={styles.primaryButton}
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Search"}
                </button>
            </div>

            {hasSearched && (
                <>
                    <p className={styles.resultsSummary}>
                        Logs for <strong>{muid}</strong> ({data.length} entries)
                    </p>

                    <Table
                        rows={data}
                        isloading={isLoading}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        customCellRender={(column: any, row: any) => {
                            if (column === "created_at") {
                                return <span>{new Date(row.created_at).toLocaleString()}</span>;
                            }
                            if (column === "action") {
                                return (
                                    <span className={`${styles.badge} ${getActionBadgeClass(row.action)}`}>
                                        {getActionLabel(row.action)}
                                    </span>
                                );
                            }
                            if (column === "achievement_id") {
                                return (
                                    <span className={styles.monoText}>
                                        {row.achievement_id?.substring(0, 8)}...
                                    </span>
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
                        <div>
                            {!isLoading && data.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    margin="10px 0"
                                    handleNextClick={handleNextClick}
                                    handlePreviousClick={handlePreviousClick}
                                    onSearchText={() => { }}
                                    onPerPageNumber={handlePerPageNumber}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                />
                            )}
                        </div>
                        <Blank />
                    </Table>
                </>
            )}

            {!hasSearched && (
                <div className={styles.emptyState}>
                    <span className={styles.emptyStateIcon}>📊</span>
                    <p className={styles.emptyStateTitle}>Achievement Issue Logs</p>
                    <p className={styles.emptyStateSubtitle}>Enter a MuID above to view achievement issuance history</p>
                </div>
            )}
        </div>
    );
};

export default IssueLogsPage;
