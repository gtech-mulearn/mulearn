// ManualOperations.tsx - Manual Achievement Operations
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiGift, FiXCircle, FiAlertTriangle, FiInfo } from "react-icons/fi";
import toast from "react-hot-toast";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import styles from "./AchievementAdmin.module.css";
import {
    manualIssueAchievementAPI,
    revokeAchievementAPI,
} from "../Profile/services/achievementApi";
import { getAchievements } from "./services/api";

function ManualOperations() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"issue" | "revoke">("issue");
    const [achievements, setAchievements] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmModal, setShowConfirmModal] = useState(false);

    // Form states
    const [muid, setMuid] = useState("");
    const [selectedAchievement, setSelectedAchievement] = useState("");
    const [reason, setReason] = useState("");

    useEffect(() => {
        const loadAchievements = async () => {
            try {
                const data = await getAchievements();
                setAchievements(data || []);
            } catch (error) {
                console.error("Error loading achievements:", error);
            }
        };
        loadAchievements();
    }, []);

    const resetForm = () => {
        setMuid("");
        setSelectedAchievement("");
        setReason("");
    };

    const handleIssue = async () => {
        if (!muid.trim() || !selectedAchievement) {
            toast.error("Please fill all required fields");
            return;
        }

        setIsLoading(true);
        try {
            await manualIssueAchievementAPI({
                muid: muid.trim(),
                achievement_id: selectedAchievement,
            });
            toast.success("Achievement issued successfully!");
            resetForm();
        } catch (error: any) {
            console.error("Error issuing achievement:", error);
            toast.error(error?.message || "Failed to issue achievement");
        } finally {
            setIsLoading(false);
        }
    };

    const handleRevoke = async () => {
        if (!muid.trim() || !selectedAchievement || !reason.trim()) {
            toast.error("Please fill all required fields including reason");
            return;
        }

        setShowConfirmModal(true);
    };

    const confirmRevoke = async () => {
        setShowConfirmModal(false);
        setIsLoading(true);
        try {
            await revokeAchievementAPI({
                muid: muid.trim(),
                achievement_id: selectedAchievement,
                reason: reason.trim(),
            });
            toast.success("Achievement revoked successfully");
            resetForm();
        } catch (error: any) {
            console.error("Error revoking achievement:", error);
            toast.error(error?.message || "Failed to revoke achievement");
        } finally {
            setIsLoading(false);
        }
    };

    const getSelectedAchievementName = () => {
        const achievement = achievements.find((a) => a.id === selectedAchievement);
        return achievement?.name || "Unknown";
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.backLink}
                onClick={() => navigate("/dashboard/management/manage-achievements")}
            >
                ← Back to Achievement Hub
            </button>

            <h1 className={styles.title}>Manual Operations</h1>
            <p className={styles.subtitle} style={{ marginBottom: "24px" }}>
                Manually issue or revoke achievements
            </p>

            <div className={styles.warningBox}>
                <FiAlertTriangle size={24} style={{ flexShrink: 0, marginTop: "2px" }} />
                <div>
                    <div className={styles.warningTitle}>Admin Operations</div>
                    <div>
                        These actions bypass the normal claim flow. All operations are logged in the
                        audit trail.
                    </div>
                </div>
            </div>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "issue" ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab("issue")}
                >
                    <FiGift size={16} /> Issue Achievement
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "revoke" ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab("revoke")}
                >
                    <FiXCircle size={16} /> Revoke Achievement
                </button>
            </div>

            <div className={styles.formCard}>
                <div className={styles.infoBox}>
                    <FiInfo size={18} />
                    {activeTab === "issue"
                        ? "Manually issue an achievement to a user. This will trigger VC generation if applicable."
                        : "Revoke an achievement from a user. This action requires a reason and cannot be undone."}
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        User MUID <span className={styles.required}>*</span>
                    </label>
                    <input
                        type="text"
                        className={styles.input}
                        placeholder="Enter user's MUID"
                        value={muid}
                        onChange={(e) => setMuid(e.target.value)}
                    />
                    <div className={styles.helperText}>The unique identifier for the user</div>
                </div>

                <div className={styles.formGroup}>
                    <label className={styles.label}>
                        Achievement <span className={styles.required}>*</span>
                    </label>
                    <select
                        className={styles.select}
                        value={selectedAchievement}
                        onChange={(e) => setSelectedAchievement(e.target.value)}
                    >
                        <option value="">
                            Select achievement to {activeTab === "issue" ? "issue" : "revoke"}
                        </option>
                        {achievements.map((a) => (
                            <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                    </select>
                </div>

                {activeTab === "revoke" && (
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Reason <span className={styles.required}>*</span>
                        </label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Provide a reason for revocation..."
                            value={reason}
                            onChange={(e) => setReason(e.target.value)}
                        />
                        <div className={styles.helperText}>
                            This will be recorded in the audit log
                        </div>
                    </div>
                )}

                {activeTab === "issue" ? (
                    <button
                        className={`${styles.button} ${styles.successButton} ${styles.fullWidthButton}`}
                        onClick={handleIssue}
                        disabled={isLoading}
                    >
                        <FiGift size={18} />
                        {isLoading ? "Issuing..." : "Issue Achievement"}
                    </button>
                ) : (
                    <button
                        className={`${styles.button} ${styles.dangerButton} ${styles.fullWidthButton}`}
                        onClick={handleRevoke}
                        disabled={isLoading}
                    >
                        <FiXCircle size={18} />
                        {isLoading ? "Revoking..." : "Revoke Achievement"}
                    </button>
                )}
            </div>

            <MuModal
                isOpen={showConfirmModal}
                onClose={() => setShowConfirmModal(false)}
                title="Confirm Revocation"
                type="error"
                body={`Are you sure you want to revoke "${getSelectedAchievementName()}" from user ${muid}? This action cannot be undone.`}
                onDone={confirmRevoke}
            >
                <div style={{ padding: "16px 0", fontSize: "14px", color: "#64748b" }}>
                    <strong>Reason:</strong> {reason}
                </div>
            </MuModal>
        </div>
    );
}

export default ManualOperations;
