// RuleBuilder.tsx
// Visual rule builder component for creating achievement eligibility rules
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { Switch } from "@chakra-ui/react";
import { getUUID } from "../Tasks/TaskApis";
import { getSkillDropdown } from "../ManageSkills/services/api";

interface RuleConditions {
    ig_id?: string;
    skill_id?: string;
    required_karma?: number;
    required_tasks?: number;
    required_streak?: number;
    milestone_type?: string;
    required_value?: number;
    event_name?: string;
    required_attendance?: number;
    streak_type?: string;
}

interface RuleData {
    rule_type: string;
    conditions: RuleConditions;
    is_active: boolean;
}

interface Props {
    initialRule?: RuleData | null;
    onRuleChange: (rule: RuleData) => void;
}

const ruleTypes = [
    { value: "ig_karma", label: "Interest Group Karma" },
    { value: "skill", label: "Skill-Based Tasks" },
    { value: "streak", label: "Activity Streak" },
    { value: "milestone", label: "Milestone (Total Karma/Tasks)" },
    { value: "event", label: "Event Attendance" }
];

const milestoneTypes = [
    { value: "total_karma", label: "Total Karma" },
    { value: "total_tasks", label: "Total Tasks Completed" }
];

const streakTypes = [
    { value: "daily_task", label: "Daily Task Streak" },
    { value: "daily_login", label: "Daily Login Streak" }
];

const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#f3f3f4",
    fontSize: "14px",
    color: "#333"
};

const labelStyle: React.CSSProperties = {
    fontSize: "14px",
    fontWeight: 500,
    color: "#374151",
    marginBottom: "6px",
    display: "block"
};

const RuleBuilder = forwardRef((props: Props, ref: any) => {
    const [ruleType, setRuleType] = useState<string>(props.initialRule?.rule_type || "");
    const [conditions, setConditions] = useState<RuleConditions>(props.initialRule?.conditions || {});
    const [isActive, setIsActive] = useState<boolean>(props.initialRule?.is_active ?? true);

    const [igOptions, setIgOptions] = useState<any[]>([]);
    const [skillOptions, setSkillOptions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchOptions = async () => {
            setIsLoading(true);
            try {
                const uuidData = await getUUID();
                if (uuidData?.ig) {
                    setIgOptions(uuidData.ig.map((ig: any) => ({
                        value: ig.id,
                        label: ig.name
                    })));
                }

                const skills = await getSkillDropdown();
                if (skills && skills.length > 0) {
                    setSkillOptions(skills.map((skill: any) => ({
                        value: skill.id,
                        label: skill.name
                    })));
                }
            } catch (error) {
                console.error("Error fetching options:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        props.onRuleChange({
            rule_type: ruleType,
            conditions: conditions,
            is_active: isActive
        });
    }, [ruleType, conditions, isActive]);

    const handleRuleTypeChange = (option: any) => {
        setRuleType(option?.value || "");
        setConditions({});
    };

    const handleConditionChange = (key: keyof RuleConditions, value: any) => {
        setConditions(prev => ({ ...prev, [key]: value }));
    };

    const getRuleData = (): RuleData => ({
        rule_type: ruleType,
        conditions: conditions,
        is_active: isActive
    });

    useImperativeHandle(ref, () => ({
        getRuleData
    }));

    const renderConditionInputs = () => {
        switch (ruleType) {
            case "ig_karma":
                return (
                    <>
                        <div style={{ marginBottom: "12px" }}>
                            <label style={labelStyle}>Interest Group</label>
                            <Select
                                styles={customReactSelectStyles}
                                options={igOptions}
                                value={igOptions.find(opt => opt.value === conditions.ig_id) || null}
                                onChange={(option: any) => handleConditionChange("ig_id", option?.value)}
                                placeholder="Select Interest Group"
                                isClearable
                                isLoading={isLoading}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Required Karma</label>
                            <input
                                type="number"
                                style={inputStyle}
                                placeholder="e.g., 1000"
                                value={conditions.required_karma || ""}
                                onChange={(e) => handleConditionChange("required_karma", parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </>
                );

            case "skill":
                return (
                    <>
                        <div style={{ marginBottom: "12px" }}>
                            <label style={labelStyle}>Skill</label>
                            <Select
                                styles={customReactSelectStyles}
                                options={skillOptions}
                                value={skillOptions.find(opt => opt.value === conditions.skill_id) || null}
                                onChange={(option: any) => handleConditionChange("skill_id", option?.value)}
                                placeholder="Select Skill"
                                isClearable
                                isLoading={isLoading}
                            />
                        </div>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            <div>
                                <label style={labelStyle}>Required Tasks</label>
                                <input
                                    type="number"
                                    style={inputStyle}
                                    placeholder="e.g., 5"
                                    value={conditions.required_tasks || ""}
                                    onChange={(e) => handleConditionChange("required_tasks", parseInt(e.target.value) || 0)}
                                />
                            </div>
                            <div>
                                <label style={labelStyle}>Required Karma</label>
                                <input
                                    type="number"
                                    style={inputStyle}
                                    placeholder="e.g., 500"
                                    value={conditions.required_karma || ""}
                                    onChange={(e) => handleConditionChange("required_karma", parseInt(e.target.value) || 0)}
                                />
                            </div>
                        </div>
                    </>
                );

            case "streak":
                return (
                    <>
                        <div style={{ marginBottom: "12px" }}>
                            <label style={labelStyle}>Streak Type</label>
                            <Select
                                styles={customReactSelectStyles}
                                options={streakTypes}
                                value={streakTypes.find(opt => opt.value === conditions.streak_type) || null}
                                onChange={(option: any) => handleConditionChange("streak_type", option?.value)}
                                placeholder="Select Streak Type"
                                isClearable
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Required Days</label>
                            <input
                                type="number"
                                style={inputStyle}
                                placeholder="e.g., 7"
                                value={conditions.required_streak || ""}
                                onChange={(e) => handleConditionChange("required_streak", parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </>
                );

            case "milestone":
                return (
                    <>
                        <div style={{ marginBottom: "12px" }}>
                            <label style={labelStyle}>Milestone Type</label>
                            <Select
                                styles={customReactSelectStyles}
                                options={milestoneTypes}
                                value={milestoneTypes.find(opt => opt.value === conditions.milestone_type) || null}
                                onChange={(option: any) => handleConditionChange("milestone_type", option?.value)}
                                placeholder="Select Milestone Type"
                                isClearable
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Required Value</label>
                            <input
                                type="number"
                                style={inputStyle}
                                placeholder="e.g., 5000"
                                value={conditions.required_value || ""}
                                onChange={(e) => handleConditionChange("required_value", parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </>
                );

            case "event":
                return (
                    <>
                        <div style={{ marginBottom: "12px" }}>
                            <label style={labelStyle}>Event Name</label>
                            <input
                                type="text"
                                style={inputStyle}
                                placeholder="e.g., Hackathon2024"
                                value={conditions.event_name || ""}
                                onChange={(e) => handleConditionChange("event_name", e.target.value)}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Required Attendance</label>
                            <input
                                type="number"
                                style={inputStyle}
                                placeholder="e.g., 1"
                                value={conditions.required_attendance || ""}
                                onChange={(e) => handleConditionChange("required_attendance", parseInt(e.target.value) || 0)}
                            />
                        </div>
                    </>
                );

            default:
                return null;
        }
    };

    return (
        <div style={{ width: "100%" }}>
            {/* Rule Active Toggle */}
            <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
                padding: "12px 16px",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px"
            }}>
                <span style={{ fontSize: "14px", fontWeight: 500 }}>Rule Active</span>
                <Switch
                    isChecked={isActive}
                    onChange={() => setIsActive(!isActive)}
                    colorScheme="blue"
                />
            </div>

            {/* Rule Type Selector */}
            <div style={{ marginBottom: "16px" }}>
                <label style={labelStyle}>Rule Type</label>
                <Select
                    styles={customReactSelectStyles}
                    options={ruleTypes}
                    value={ruleTypes.find(opt => opt.value === ruleType) || null}
                    onChange={handleRuleTypeChange}
                    placeholder="Select Rule Type"
                    isClearable
                />
            </div>

            {/* Condition Inputs */}
            {ruleType && (
                <div style={{
                    padding: "16px",
                    backgroundColor: "#f8f9fa",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb"
                }}>
                    <p style={{
                        fontSize: "13px",
                        color: "#666",
                        marginBottom: "16px",
                        paddingBottom: "12px",
                        borderBottom: "1px solid #e5e7eb"
                    }}>
                        {ruleType === "ig_karma" && "User must earn specified karma in an Interest Group."}
                        {ruleType === "skill" && "User must complete tasks linked to a specific skill."}
                        {ruleType === "streak" && "User must maintain an activity streak."}
                        {ruleType === "milestone" && "User must reach a total karma or task milestone."}
                        {ruleType === "event" && "User must attend a specific event."}
                    </p>
                    {renderConditionInputs()}
                </div>
            )}
        </div>
    );
});

export default RuleBuilder;
