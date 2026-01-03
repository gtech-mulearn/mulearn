// SimulateDebug.tsx - Simulate & Debug Achievement Rules
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiPlay, FiTerminal, FiSearch } from "react-icons/fi";
import toast from "react-hot-toast";
import styles from "./AchievementAdmin.module.css";
import {
    simulateRulesForUser,
    debugAchievementForUser,
} from "../Profile/services/achievementApi";
import { AchievementProgress, DebugResult } from "../Profile/services/achievementTypes";
import { getAchievements } from "./services/api";

function SimulateDebug() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<"simulate" | "debug">("simulate");
    const [muid, setMuid] = useState("");
    const [selectedAchievement, setSelectedAchievement] = useState("");
    const [achievements, setAchievements] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [simulationResults, setSimulationResults] = useState<AchievementProgress[]>([]);
    const [debugResult, setDebugResult] = useState<DebugResult | null>(null);

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

    const handleSimulate = async () => {
        if (!muid.trim()) {
            toast.error("Please enter a MUID");
            return;
        }

        setIsLoading(true);
        try {
            const results = await simulateRulesForUser(muid);
            setSimulationResults(results);
            toast.success(`Simulation complete: ${results.length} rules evaluated`);
        } catch (error) {
            console.error("Simulation error:", error);
            toast.error("Simulation failed");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDebug = async () => {
        if (!muid.trim() || !selectedAchievement) {
            toast.error("Please enter MUID and select an achievement");
            return;
        }

        setIsLoading(true);
        try {
            const result = await debugAchievementForUser(muid, selectedAchievement);
            setDebugResult(result);
            toast.success("Debug complete");
        } catch (error) {
            console.error("Debug error:", error);
            toast.error("Debug failed");
        } finally {
            setIsLoading(false);
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

            <h1 className={styles.title}>Simulate & Debug</h1>
            <p className={styles.subtitle} style={{ marginBottom: "24px" }}>
                Test rule evaluations and debug user eligibility
            </p>

            <div className={styles.tabs}>
                <button
                    className={`${styles.tab} ${activeTab === "simulate" ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab("simulate")}
                >
                    <FiPlay size={16} /> Simulate Rules
                </button>
                <button
                    className={`${styles.tab} ${activeTab === "debug" ? styles.tabActive : ""}`}
                    onClick={() => setActiveTab("debug")}
                >
                    <FiTerminal size={16} /> Debug Achievement
                </button>
            </div>

            {activeTab === "simulate" && (
                <>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter MUID to simulate..."
                            value={muid}
                            onChange={(e) => setMuid(e.target.value)}
                        />
                        <button
                            className={`${styles.button} ${styles.primaryButton}`}
                            onClick={handleSimulate}
                            disabled={isLoading}
                        >
                            <FiPlay size={16} /> {isLoading ? "Simulating..." : "Simulate"}
                        </button>
                    </div>

                    {simulationResults.length === 0 ? (
                        <div className={styles.infoBox}>
                            <FiSearch size={20} />
                            Enter a MUID and click Simulate to evaluate all rules
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            {simulationResults.map((result, index) => (
                                <div key={index} className={styles.resultCard}>
                                    <div className={styles.resultTitle}>
                                        {result.achievement_name || `Achievement ${index + 1}`}
                                    </div>
                                    <div style={{ marginBottom: "12px" }}>
                                        <span className={`${styles.badge} ${result.is_eligible ? styles.badgeActive : styles.badgeWarning}`}>
                                            {result.is_eligible ? "ELIGIBLE" : "IN PROGRESS"}
                                        </span>
                                    </div>
                                    <div style={{ fontSize: "14px", color: "#64748b" }}>
                                        Progress: {result.current_value} / {result.threshold}
                                    </div>
                                    <div className={styles.progressBar}>
                                        <div
                                            className={styles.progressFill}
                                            style={{ width: `${Math.min((result.current_value / result.threshold) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}

            {activeTab === "debug" && (
                <>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter MUID..."
                            value={muid}
                            onChange={(e) => setMuid(e.target.value)}
                        />
                        <select
                            className={styles.select}
                            value={selectedAchievement}
                            onChange={(e) => setSelectedAchievement(e.target.value)}
                        >
                            <option value="">Select achievement</option>
                            {achievements.map((a) => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                        <button
                            className={`${styles.button} ${styles.primaryButton}`}
                            onClick={handleDebug}
                            disabled={isLoading}
                        >
                            <FiTerminal size={16} /> {isLoading ? "Debugging..." : "Debug"}
                        </button>
                    </div>

                    {!debugResult ? (
                        <div className={styles.infoBox}>
                            <FiTerminal size={20} />
                            Enter a MUID and select an achievement to debug eligibility
                        </div>
                    ) : (
                        <div className={styles.resultCard}>
                            <div className={styles.resultTitle}>Debug Results</div>
                            <pre className={styles.codeBlock}>
                                {JSON.stringify(debugResult, null, 2)}
                            </pre>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default SimulateDebug;
