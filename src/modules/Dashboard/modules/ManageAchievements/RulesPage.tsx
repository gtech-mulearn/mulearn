// RulesPage.tsx - Manage achievement eligibility rules using table format
import { useEffect, useRef, useState } from "react";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { getRules, deactivateRule, createRule, AchievementRule } from "./services/achievementApi";
import { getAchievements } from "./services/api";
import RuleBuilder from "./RuleBuilder";

interface RuleData {
    rule_type: string;
    conditions: Record<string, any>;
    is_active: boolean;
}

const RulesPage = () => {
    const [data, setData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState("");

    // Modals
    const [showDeactivateModal, setShowDeactivateModal] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedRule, setSelectedRule] = useState<AchievementRule | null>(null);

    // Create rule state
    const [achievements, setAchievements] = useState<{ value: string; label: string }[]>([]);
    const [selectedAchievement, setSelectedAchievement] = useState<{ value: string; label: string } | null>(null);
    const [ruleData, setRuleData] = useState<RuleData>({ rule_type: "", conditions: {}, is_active: true });
    const [isCreating, setIsCreating] = useState(false);
    const ruleBuilderRef = useRef<any>(null);

    const columnOrder = [
        { column: "achievement_name", Label: "Achievement", isSortable: true },
        { column: "rule_type", Label: "Rule Type", isSortable: true },
        { column: "conditions_display", Label: "Conditions", isSortable: false },
        { column: "version", Label: "Version", isSortable: true },
        { column: "status", Label: "Status", isSortable: true },
        { column: "created_at", Label: "Created", isSortable: true }
    ];

    const getRuleTypeLabel = (type: string) => {
        const labels: Record<string, string> = {
            ig_karma: "IG Karma",
            skill: "Skill-Based",
            streak: "Streak",
            milestone: "Milestone",
            event: "Event"
        };
        return labels[type] || type;
    };

    const formatConditions = (type: string, conditions: Record<string, any>) => {
        const parts: string[] = [];

        switch (type) {
            case "milestone":
                if (conditions.milestone_type) {
                    const labels: Record<string, string> = {
                        total_karma: "Total Karma",
                        tasks_completed: "Tasks Completed",
                        events_attended: "Events"
                    };
                    parts.push(labels[conditions.milestone_type] || conditions.milestone_type);
                }
                if (conditions.required_value) {
                    parts.push(`≥ ${conditions.required_value.toLocaleString()}`);
                }
                break;
            case "skill":
                if (conditions.required_tasks) parts.push(`${conditions.required_tasks} tasks`);
                if (conditions.required_karma) parts.push(`${conditions.required_karma} karma`);
                break;
            case "ig_karma":
                if (conditions.required_karma) parts.push(`${conditions.required_karma} karma`);
                break;
            case "streak":
                if (conditions.required_streak) parts.push(`${conditions.required_streak} days`);
                break;
            case "event":
                if (conditions.required_attendance) parts.push(`${conditions.required_attendance} events`);
                break;
            default:
                Object.entries(conditions).forEach(([key, value]) => {
                    parts.push(`${key}: ${value}`);
                });
        }

        return parts.join(", ") || "-";
    };

    const fetchRules = async () => {
        setIsLoading(true);
        try {
            const rules = await getRules();
            const transformedData = rules.map((rule: AchievementRule) => ({
                ...rule,
                conditions_display: formatConditions(rule.rule_type, rule.conditions),
                status: rule.is_active ? "Active" : "Inactive"
            }));
            setData(transformedData);
            setTotalPages(Math.ceil(transformedData.length / perPage));
        } catch (error) {
            console.error("Error fetching rules:", error);
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchAchievements = async () => {
        try {
            const data = await getAchievements();
            if (data) {
                setAchievements(data.map((a: any) => ({
                    value: a.id,
                    label: a.name || a.title
                })));
            }
        } catch (error) {
            console.error("Error fetching achievements:", error);
        }
    };

    useEffect(() => {
        fetchRules();
        fetchAchievements();
    }, []);

    const handleDeactivate = async () => {
        if (!selectedRule) return;
        const success = await deactivateRule(selectedRule.id);
        if (success) {
            fetchRules();
        }
        setShowDeactivateModal(false);
        setSelectedRule(null);
    };

    const handleCreateRule = async () => {
        if (!selectedAchievement) return;
        if (!ruleData.rule_type) return;

        setIsCreating(true);
        const result = await createRule({
            achievement_id: selectedAchievement.value,
            rule_type: ruleData.rule_type,
            conditions: ruleData.conditions
        });
        setIsCreating(false);

        if (result) {
            setShowCreateModal(false);
            setSelectedAchievement(null);
            setRuleData({ rule_type: "", conditions: {}, is_active: true });
            fetchRules();
        }
    };

    const handleSearch = (search: string) => {
        // Client-side filtering
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setPerPage(selectedValue);
        setCurrentPage(1);
        setTotalPages(Math.ceil(data.length / selectedValue));
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
    };

    const handlePreviousClick = () => {
        if (currentPage > 1) setCurrentPage(prev => prev - 1);
    };

    const handleIconClick = (column: string) => {
        const newSort = sort === column ? `-${column}` : column;
        setSort(newSort);
        const sortedData = [...data].sort((a, b) => {
            const key = newSort.startsWith("-") ? newSort.slice(1) : newSort;
            const aValue = a[key];
            const bValue = b[key];
            if (newSort.startsWith("-")) {
                return bValue > aValue ? 1 : -1;
            }
            return aValue > bValue ? 1 : -1;
        });
        setData(sortedData);
    };

    const handleEdit = (id: string | Number | Boolean) => {
        const rule = data.find(item => item.id === id);
        if (rule) {
            setSelectedRule(rule);
            setShowDeactivateModal(true);
        }
    };

    return (
        <>
            <TableTop
                onSearchText={handleSearch}
                onPerPageNumber={handlePerPageNumber}
                extraButtons={[
                    {
                        text: "Create Rule",
                        onClick: () => setShowCreateModal(true),
                        style: {
                            marginRight: "5px",
                            padding: "5px 10px",
                            background: '#556ff1',
                            borderRadius: 10,
                            color: '#FFFFFF'
                        }
                    }
                ]}
            />

            {/* Deactivate Rule Modal */}
            <MuModal
                isOpen={showDeactivateModal}
                onClose={() => setShowDeactivateModal(false)}
                title="Deactivate Rule"
                type="error"
                body={`Are you sure you want to deactivate the rule for "${selectedRule?.achievement_name}"?`}
                onDone={handleDeactivate}
            >
                <div />
            </MuModal>

            {/* Create Rule Modal */}
            <MuModal
                isOpen={showCreateModal}
                onClose={() => {
                    setShowCreateModal(false);
                    setSelectedAchievement(null);
                    setRuleData({ rule_type: "", conditions: {}, is_active: true });
                }}
                title="Create Achievement Rule"
                type="success"
                body="Select an achievement and configure the eligibility rule."
                onDone={handleCreateRule}
            >
                <div style={{ padding: "16px 0" }}>
                    <div style={{ marginBottom: "16px" }}>
                        <label style={{ display: "block", marginBottom: "8px", fontWeight: 500 }}>
                            Select Achievement
                        </label>
                        <Select
                            styles={customReactSelectStyles}
                            options={achievements}
                            value={selectedAchievement}
                            onChange={(option) => setSelectedAchievement(option)}
                            placeholder="Choose an achievement..."
                            isClearable
                        />
                    </div>

                    {selectedAchievement && (
                        <RuleBuilder
                            ref={ruleBuilderRef}
                            onRuleChange={(rule) => setRuleData(rule)}
                        />
                    )}
                </div>
            </MuModal>

            <Table
                rows={data}
                isloading={isLoading}
                page={currentPage}
                perPage={perPage}
                columnOrder={columnOrder}
                id={["id"]}
                onEditClick={handleEdit}
                customCellRender={(column: any, row: any) => {
                    if (column === "rule_type") {
                        const colors: Record<string, string> = {
                            ig_karma: "#3b82f6",
                            skill: "#8b5cf6",
                            streak: "#f59e0b",
                            milestone: "#10b981",
                            event: "#ef4444"
                        };
                        return (
                            <span style={{
                                padding: "4px 10px",
                                background: colors[row.rule_type] || "#6b7280",
                                color: "white",
                                borderRadius: "12px",
                                fontSize: "12px",
                                fontWeight: 500
                            }}>
                                {getRuleTypeLabel(row.rule_type)}
                            </span>
                        );
                    }
                    if (column === "status") {
                        return (
                            <span style={{
                                padding: "4px 10px",
                                background: row.is_active ? "#dcfce7" : "#fee2e2",
                                color: row.is_active ? "#166534" : "#991b1b",
                                borderRadius: "6px",
                                fontSize: "12px",
                                fontWeight: 500
                            }}>
                                {row.is_active ? "Active" : "Inactive"}
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
                    onIconClick={handleIconClick}
                    action={true}
                />
                <div>
                    {!isLoading && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            margin="10px 0"
                            handleNextClick={handleNextClick}
                            handlePreviousClick={handlePreviousClick}
                            onSearchText={handleSearch}
                            onPerPageNumber={handlePerPageNumber}
                            perPage={perPage}
                            setPerPage={setPerPage}
                        />
                    )}
                </div>
                <Blank />
            </Table>
        </>
    );
};

export default RulesPage;
