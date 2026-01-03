// AuditLogs.tsx - Achievement Audit Logs
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiInfo, FiEye } from "react-icons/fi";
import toast from "react-hot-toast";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import styles from "./AchievementAdmin.module.css";
import { getAuditLogs } from "../Profile/services/achievementApi";
import { AuditLogEntry } from "../Profile/services/achievementTypes";

function AuditLogs() {
    const navigate = useNavigate();
    const [muid, setMuid] = useState("");
    const [logs, setLogs] = useState<AuditLogEntry[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = async () => {
        if (!muid.trim()) {
            toast.error("Please enter a MUID");
            return;
        }

        setIsLoading(true);
        try {
            const data = await getAuditLogs(muid);
            setLogs(data || []);
            if (data?.length === 0) {
                toast("No logs found for this user", { icon: "ℹ️" });
            }
        } catch (error) {
            console.error("Error fetching logs:", error);
            toast.error("Failed to fetch audit logs");
        } finally {
            setIsLoading(false);
        }
    };

    const getActionBadgeClass = (action: string) => {
        switch (action) {
            case "issue":
            case "issued":
                return styles.badgeActive;
            case "revoke":
            case "revoked":
                return styles.badgeInactive;
            case "claim":
            case "claimed":
                return styles.badgeInfo;
            default:
                return "";
        }
    };

    const viewDetails = (log: AuditLogEntry) => {
        setSelectedLog(log);
        setIsModalOpen(true);
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.backLink}
                onClick={() => navigate("/dashboard/management/manage-achievements")}
            >
                ← Back to Achievement Hub
            </button>

            <h1 className={styles.title}>Audit Logs</h1>
            <p className={styles.subtitle} style={{ marginBottom: "24px" }}>
                View achievement issuance and revocation history
            </p>

            <div className={styles.inputGroup}>
                <input
                    type="text"
                    className={styles.input}
                    style={{ maxWidth: "400px" }}
                    placeholder="Search by MUID..."
                    value={muid}
                    onChange={(e) => setMuid(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                />
                <button
                    className={`${styles.button} ${styles.primaryButton}`}
                    onClick={handleSearch}
                    disabled={isLoading}
                >
                    <FiSearch size={16} /> {isLoading ? "Searching..." : "Search"}
                </button>
            </div>

            {logs.length === 0 ? (
                <div className={styles.infoBox}>
                    <FiInfo size={20} />
                    Enter a MUID to view audit logs
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Timestamp</th>
                                <th className={styles.th}>Achievement</th>
                                <th className={styles.th}>Action</th>
                                <th className={styles.th}>Performed By</th>
                                <th className={styles.th}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            {logs.map((log, index) => (
                                <tr key={index}>
                                    <td className={styles.td}>
                                        {new Date(log.created_at).toLocaleString()}
                                    </td>
                                    <td className={styles.td} style={{ fontWeight: 500 }}>
                                        {log.achievement_name}
                                    </td>
                                    <td className={styles.td}>
                                        <span className={`${styles.badge} ${getActionBadgeClass(log.action)}`}>
                                            {log.action.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className={styles.td}>{log.performed_by || "System"}</td>
                                    <td className={styles.td}>
                                        <button
                                            className={styles.actionBtn}
                                            onClick={() => viewDetails(log)}
                                        >
                                            <FiEye size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            <MuModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Log Details"
                type="success"
                body=""
                onDone={() => setIsModalOpen(false)}
            >
                {selectedLog && (
                    <div style={{ padding: "16px 0" }}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Timestamp</span>
                            <span className={styles.detailValue}>
                                {new Date(selectedLog.created_at).toLocaleString()}
                            </span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Achievement</span>
                            <span className={styles.detailValue}>{selectedLog.achievement_name}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Action</span>
                            <span className={styles.detailValue}>{selectedLog.action}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Rule Version</span>
                            <span className={styles.detailValue}>
                                {selectedLog.rule_version || "N/A"}
                            </span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Performed By</span>
                            <span className={styles.detailValue}>
                                {selectedLog.performed_by || "System"}
                            </span>
                        </div>
                        {selectedLog.metadata && (
                            <div style={{ marginTop: "16px" }}>
                                <span className={styles.detailLabel}>Metadata</span>
                                <pre className={styles.codeBlock} style={{ marginTop: "8px", backgroundColor: "#f8fafc", color: "#1e293b" }}>
                                    {JSON.stringify(selectedLog.metadata, null, 2)}
                                </pre>
                            </div>
                        )}
                    </div>
                )}
            </MuModal>
        </div>
    );
}

export default AuditLogs;
