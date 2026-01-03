// ManageRules.tsx - Achievement Rules Management
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiRefreshCw, FiEye, FiTrash2, FiInfo } from "react-icons/fi";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import toast from "react-hot-toast";
import styles from "./AchievementAdmin.module.css";
import {
    getAchievementRules,
    createAchievementRule,
    deactivateAchievementRule,
} from "../Profile/services/achievementApi";
import { AchievementRule, RuleType, CreateRulePayload, RuleConditions } from "../Profile/services/achievementTypes";
import { getAchievements } from "./services/api";

// Rule type descriptions for better UX
const ruleTypeInfo: Record<RuleType, { label: string; description: string }> = {
    ig_karma: {
        label: "Interest Group Karma",
        description: "User must earn a certain amount of karma in a specific Interest Group",
    },
    skill: {
        label: "Skill Completion",
        description: "User must complete a certain number of tasks for a specific skill",
    },
    streak: {
        label: "Activity Streak",
        description: "User must maintain a streak of consecutive activity days",
    },
    milestone: {
        label: "Milestone",
        description: "User must reach a specific milestone value (e.g., total karma, tasks)",
    },
    event: {
        label: "Event Participation",
        description: "User must attend a certain number of events",
    },
};

function ManageRules() {
    const navigate = useNavigate();
    const [rules, setRules] = useState<AchievementRule[]>([]);
    const [achievements, setAchievements] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [selectedRule, setSelectedRule] = useState<AchievementRule | null>(null);

    // Form state
    const [selectedAchievement, setSelectedAchievement] = useState("");
    const [ruleType, setRuleType] = useState<RuleType>("ig_karma");

    // Condition fields based on rule type
    const [igId, setIgId] = useState("");
    const [requiredKarma, setRequiredKarma] = useState("");
    const [skillId, setSkillId] = useState("");
    const [requiredTasks, setRequiredTasks] = useState("");
    const [streakType, setStreakType] = useState("daily");
    const [requiredStreak, setRequiredStreak] = useState("");
    const [milestoneType, setMilestoneType] = useState("total_karma");
    const [requiredValue, setRequiredValue] = useState("");
    const [eventName, setEventName] = useState("");
    const [requiredAttendance, setRequiredAttendance] = useState("");

    const loadData = async () => {
        setIsLoading(true);
        try {
            const [rulesData, achievementsData] = await Promise.all([
                getAchievementRules(),
                getAchievements(),
            ]);
            setRules(rulesData || []);
            setAchievements(achievementsData || []);
        } catch (error) {
            console.error("Error loading data:", error);
            toast.error("Failed to load data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const buildConditions = (): RuleConditions => {
        switch (ruleType) {
            case "ig_karma":
                return {
                    ig_id: igId,
                    required_karma: parseInt(requiredKarma) || 0,
                };
            case "skill":
                return {
                    skill_id: skillId,
                    required_tasks: parseInt(requiredTasks) || 0,
                };
            case "streak":
                return {
                    streak_type: streakType,
                    required_streak: parseInt(requiredStreak) || 0,
                };
            case "milestone":
                return {
                    milestone_type: milestoneType,
                    required_value: parseInt(requiredValue) || 0,
                };
            case "event":
                return {
                    event_name: eventName,
                    required_attendance: parseInt(requiredAttendance) || 0,
                };
            default:
                return {};
        }
    };

    const validateForm = (): boolean => {
        if (!selectedAchievement) {
            toast.error("Please select an achievement");
            return false;
        }

        switch (ruleType) {
            case "ig_karma":
                if (!igId || !requiredKarma) {
                    toast.error("Please fill Interest Group ID and Required Karma");
                    return false;
                }
                break;
            case "skill":
                if (!skillId || !requiredTasks) {
                    toast.error("Please fill Skill ID and Required Tasks");
                    return false;
                }
                break;
            case "streak":
                if (!requiredStreak) {
                    toast.error("Please fill Required Streak Days");
                    return false;
                }
                break;
            case "milestone":
                if (!requiredValue) {
                    toast.error("Please fill Required Value");
                    return false;
                }
                break;
            case "event":
                if (!eventName || !requiredAttendance) {
                    toast.error("Please fill Event Name and Required Attendance");
                    return false;
                }
                break;
        }
        return true;
    };

    const handleCreateRule = async () => {
        if (!validateForm()) return;

        const payload: CreateRulePayload = {
            achievement_id: selectedAchievement,
            rule_type: ruleType,
            conditions: buildConditions(),
        };

        try {
            await createAchievementRule(payload);
            toast.success("Rule created successfully");
            setIsCreateModalOpen(false);
            resetForm();
            loadData();
        } catch (error) {
            console.error("Error creating rule:", error);
            toast.error("Failed to create rule");
        }
    };

    const resetForm = () => {
        setSelectedAchievement("");
        setRuleType("ig_karma");
        setIgId("");
        setRequiredKarma("");
        setSkillId("");
        setRequiredTasks("");
        setStreakType("daily");
        setRequiredStreak("");
        setMilestoneType("total_karma");
        setRequiredValue("");
        setEventName("");
        setRequiredAttendance("");
    };

    const getAchievementName = (id: string) => {
        const achievement = achievements.find((a) => a.id === id);
        return achievement?.name || id;
    };

    const viewRuleDetails = (rule: AchievementRule) => {
        setSelectedRule(rule);
        setIsViewModalOpen(true);
    };

    const renderConditionFields = () => {
        switch (ruleType) {
            case "ig_karma":
                return (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Interest Group ID <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Enter Interest Group ID (e.g., web-development)"
                                value={igId}
                                onChange={(e) => setIgId(e.target.value)}
                            />
                            <div className={styles.helperText}>
                                The unique identifier for the Interest Group
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Required Karma <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 1000"
                                value={requiredKarma}
                                onChange={(e) => setRequiredKarma(e.target.value)}
                            />
                            <div className={styles.helperText}>
                                Minimum karma user must earn in this IG to qualify
                            </div>
                        </div>
                    </>
                );

            case "skill":
                return (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Skill ID <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="Enter Skill ID"
                                value={skillId}
                                onChange={(e) => setSkillId(e.target.value)}
                            />
                            <div className={styles.helperText}>
                                The unique identifier for the skill
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Required Tasks <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 10"
                                value={requiredTasks}
                                onChange={(e) => setRequiredTasks(e.target.value)}
                            />
                            <div className={styles.helperText}>
                                Number of tasks user must complete for this skill
                            </div>
                        </div>
                    </>
                );

            case "streak":
                return (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Streak Type</label>
                            <select
                                className={styles.select}
                                value={streakType}
                                onChange={(e) => setStreakType(e.target.value)}
                            >
                                <option value="daily">Daily Activity</option>
                                <option value="weekly">Weekly Activity</option>
                                <option value="task_submission">Task Submission</option>
                            </select>
                            <div className={styles.helperText}>
                                Type of activity to track for the streak
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Required Streak Days <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 7"
                                value={requiredStreak}
                                onChange={(e) => setRequiredStreak(e.target.value)}
                            />
                            <div className={styles.helperText}>
                                Consecutive days the user must maintain the streak
                            </div>
                        </div>
                    </>
                );

            case "milestone":
                return (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Milestone Type</label>
                            <select
                                className={styles.select}
                                value={milestoneType}
                                onChange={(e) => setMilestoneType(e.target.value)}
                            >
                                <option value="total_karma">Total Karma Earned</option>
                                <option value="total_tasks">Total Tasks Completed</option>
                                <option value="total_events">Total Events Attended</option>
                                <option value="total_referrals">Total Referrals</option>
                            </select>
                            <div className={styles.helperText}>
                                What milestone to track
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Target Value <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 5000"
                                value={requiredValue}
                                onChange={(e) => setRequiredValue(e.target.value)}
                            />
                            <div className={styles.helperText}>
                                The milestone value user must reach
                            </div>
                        </div>
                    </>
                );

            case "event":
                return (
                    <>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Event Name/Type <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="text"
                                className={styles.input}
                                placeholder="e.g., hackathon, workshop"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                            <div className={styles.helperText}>
                                Name or type of event (leave empty for any event)
                            </div>
                        </div>
                        <div className={styles.formGroup}>
                            <label className={styles.label}>
                                Required Attendance <span className={styles.required}>*</span>
                            </label>
                            <input
                                type="number"
                                className={styles.input}
                                placeholder="e.g., 3"
                                value={requiredAttendance}
                                onChange={(e) => setRequiredAttendance(e.target.value)}
                            />
                            <div className={styles.helperText}>
                                Number of events user must attend
                            </div>
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <button
                className={styles.backLink}
                onClick={() => navigate("/dashboard/management/manage-achievements")}
            >
                ← Back to Achievement Hub
            </button>

            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Achievement Rules</h1>
                    <p className={styles.subtitle}>Manage eligibility rules for achievements</p>
                </div>
                <div className={styles.buttonGroup}>
                    <button
                        className={`${styles.button} ${styles.secondaryButton}`}
                        onClick={loadData}
                    >
                        <FiRefreshCw size={16} /> Refresh
                    </button>
                    <button
                        className={`${styles.button} ${styles.primaryButton}`}
                        onClick={() => setIsCreateModalOpen(true)}
                    >
                        <FiPlus size={16} /> Create Rule
                    </button>
                </div>
            </div>

            {isLoading ? (
                <div className={styles.emptyState}>Loading...</div>
            ) : rules.length === 0 ? (
                <div className={styles.emptyState}>
                    <p className={styles.emptyStateTitle}>No rules configured</p>
                    <p>Click "Create Rule" to add your first achievement rule</p>
                </div>
            ) : (
                <div className={styles.tableWrapper}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th className={styles.th}>Achievement</th>
                                <th className={styles.th}>Rule Type</th>
                                <th className={styles.th}>Version</th>
                                <th className={styles.th}>Status</th>
                                <th className={styles.th}>Created</th>
                                <th className={styles.th}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rules.map((rule) => (
                                <tr key={rule.id}>
                                    <td className={`${styles.td} ${styles.tdLink}`}>
                                        {rule.achievement_name || getAchievementName(rule.achievement_id)}
                                    </td>
                                    <td className={styles.td}>
                                        <span className={`${styles.badge} ${styles.badgeType}`}>
                                            {ruleTypeInfo[rule.rule_type]?.label || rule.rule_type}
                                        </span>
                                    </td>
                                    <td className={styles.td}>v{rule.version}</td>
                                    <td className={styles.td}>
                                        <span className={`${styles.badge} ${rule.is_active ? styles.badgeActive : styles.badgeInactive}`}>
                                            {rule.is_active ? "ACTIVE" : "INACTIVE"}
                                        </span>
                                    </td>
                                    <td className={styles.td}>
                                        {new Date(rule.created_at).toLocaleDateString()}
                                    </td>
                                    <td className={styles.td}>
                                        <button
                                            className={styles.actionBtn}
                                            title="View Details"
                                            onClick={() => viewRuleDetails(rule)}
                                        >
                                            <FiEye size={18} />
                                        </button>
                                        {rule.is_active && (
                                            <button
                                                className={`${styles.actionBtn} ${styles.actionBtnDanger}`}
                                                title="Deactivate"
                                                onClick={async () => {
                                                    if (confirm(`Are you sure you want to deactivate the rule for "${rule.achievement_name}"?`)) {
                                                        const success = await deactivateAchievementRule(rule.id);
                                                        if (success) loadData();
                                                    }
                                                }}
                                            >
                                                <FiTrash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Create Rule Modal */}
            <MuModal
                isOpen={isCreateModalOpen}
                onClose={() => {
                    setIsCreateModalOpen(false);
                    resetForm();
                }}
                title="Create Achievement Rule"
                type="success"
                body=""
                onDone={handleCreateRule}
            >
                <div style={{ padding: "16px 0" }}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Achievement <span className={styles.required}>*</span>
                        </label>
                        <select
                            className={styles.select}
                            value={selectedAchievement}
                            onChange={(e) => setSelectedAchievement(e.target.value)}
                        >
                            <option value="">Select achievement to configure</option>
                            {achievements.map((a) => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                        <div className={styles.helperText}>
                            Which achievement should this rule apply to
                        </div>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Rule Type <span className={styles.required}>*</span>
                        </label>
                        <select
                            className={styles.select}
                            value={ruleType}
                            onChange={(e) => setRuleType(e.target.value as RuleType)}
                        >
                            {Object.entries(ruleTypeInfo).map(([type, info]) => (
                                <option key={type} value={type}>{info.label}</option>
                            ))}
                        </select>
                        <div className={styles.helperText}>
                            {ruleTypeInfo[ruleType].description}
                        </div>
                    </div>

                    <div className={styles.infoBox} style={{ marginBottom: "20px" }}>
                        <FiInfo size={18} />
                        Configure the conditions for "{ruleTypeInfo[ruleType].label}" rule
                    </div>

                    {renderConditionFields()}
                </div>
            </MuModal>

            {/* View Rule Details Modal */}
            <MuModal
                isOpen={isViewModalOpen}
                onClose={() => setIsViewModalOpen(false)}
                title="Rule Details"
                type="success"
                body=""
                onDone={() => setIsViewModalOpen(false)}
            >
                {selectedRule && (
                    <div style={{ padding: "16px 0" }}>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Achievement</span>
                            <span className={styles.detailValue}>{selectedRule.achievement_name}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Rule Type</span>
                            <span className={styles.detailValue}>
                                {ruleTypeInfo[selectedRule.rule_type]?.label || selectedRule.rule_type}
                            </span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Version</span>
                            <span className={styles.detailValue}>v{selectedRule.version}</span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Status</span>
                            <span className={styles.detailValue}>
                                {selectedRule.is_active ? "Active" : "Inactive"}
                            </span>
                        </div>
                        <div className={styles.detailRow}>
                            <span className={styles.detailLabel}>Created</span>
                            <span className={styles.detailValue}>
                                {new Date(selectedRule.created_at).toLocaleString()}
                            </span>
                        </div>
                        <div style={{ marginTop: "16px" }}>
                            <span className={styles.detailLabel}>Conditions</span>
                            <pre className={styles.codeBlock} style={{ marginTop: "8px", backgroundColor: "#f8fafc", color: "#1e293b" }}>
                                {JSON.stringify(selectedRule.conditions, null, 2)}
                            </pre>
                        </div>
                    </div>
                )}
            </MuModal>
        </div>
    );
}

export default ManageRules;
