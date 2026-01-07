// Achievement Management API Services
import { AxiosError } from "axios";
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { qseverseRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";

// Types
export interface AchievementRule {
    id: string;
    achievement_id: string;
    achievement_name?: string;
    rule_type: string;
    conditions: Record<string, any>;
    version: number;
    is_active: boolean;
    created_at: string;
}

export interface SimulationResult {
    eligible: boolean;
    achievement_id: string;
    achievement_name: string;
    rule_version: number;
    reason: string;
    progress: {
        current: number;
        required: number;
        percentage: number;
    };
}

export interface AuditLogEntry {
    id: string;
    user_id: string;
    achievement_id: string;
    action: string;
    rule_version?: number;
    metadata?: Record<string, any>;
    performed_by_id?: string;
    created_at: string;
}

// Rules API
export const getRules = async (): Promise<AchievementRule[]> => {
    try {
        const response = await privateGateway.get(qseverseRoutes.getRules);
        return response.data.response || [];
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.error("Error fetching rules:", error);
        return [];
    }
};

export const createRule = async (data: {
    achievement_id: string;
    rule_type: string;
    conditions: Record<string, any>;
}): Promise<AchievementRule | null> => {
    try {
        const response = await privateGateway.post(qseverseRoutes.createRule, data);
        toast.success("Rule created successfully");
        return response.data.response;
    } catch (err: unknown) {
        const error = err as AxiosError;
        const errorMessage = (error.response?.data as any)?.message?.general_message || "Failed to create rule";
        toast.error(errorMessage);
        console.error("Error creating rule:", error);
        return null;
    }
};

export const deactivateRule = async (ruleId: string): Promise<boolean> => {
    try {
        await privateGateway.post(`${qseverseRoutes.deactivateRule}${ruleId}/deactivate/`);
        toast.success("Rule deactivated");
        return true;
    } catch (err: unknown) {
        const error = err as AxiosError;
        toast.error("Failed to deactivate rule");
        console.error("Error deactivating rule:", error);
        return false;
    }
};

// Simulation API
export const simulateForUser = async (muid: string): Promise<SimulationResult[]> => {
    try {
        const response = await privateGateway.get(`${qseverseRoutes.simulate}${muid}/`);
        return response.data.response || [];
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.error("Error simulating:", error);
        toast.error("Failed to simulate achievements");
        return [];
    }
};

export const debugAchievement = async (muid: string, achievementId: string): Promise<any> => {
    try {
        const response = await privateGateway.get(`${qseverseRoutes.debug}${muid}/${achievementId}/`);
        return response.data.response;
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.error("Error debugging:", error);
        return null;
    }
};

// Manual Issue/Revoke API
export const manualIssue = async (data: {
    user_id: string;
    achievement_id: string;
}): Promise<boolean> => {
    try {
        await privateGateway.post(qseverseRoutes.manualIssue, data);
        toast.success("Achievement issued successfully");
        return true;
    } catch (err: unknown) {
        const error = err as AxiosError;
        const errorMessage = (error.response?.data as any)?.message?.general_message || "Failed to issue achievement";
        toast.error(errorMessage);
        console.error("Error issuing:", error);
        return false;
    }
};

export const revokeAchievement = async (data: {
    user_id: string;
    achievement_id: string;
    reason?: string;
}): Promise<boolean> => {
    try {
        await privateGateway.post(qseverseRoutes.revoke, data);
        toast.success("Achievement revoked");
        return true;
    } catch (err: unknown) {
        const error = err as AxiosError;
        toast.error("Failed to revoke achievement");
        console.error("Error revoking:", error);
        return false;
    }
};

// Audit Logs API
export const getAuditLogs = async (muid: string): Promise<AuditLogEntry[]> => {
    try {
        const response = await privateGateway.get(`${qseverseRoutes.getAuditLogs}${muid}/`);
        return response.data.response || [];
    } catch (err: unknown) {
        const error = err as AxiosError;
        console.error("Error fetching audit logs:", error);
        return [];
    }
};
