/**
 * Achievement System API Service
 * Handles all achievement-related API calls for the claim-based system
 */
import { privateGateway } from "@/MuLearnServices/apiGateways";
import { qseverseRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";
import {
    AchievementProgress,
    EligibleAchievement,
    ClaimResult,
    AchievementRule,
    CreateRulePayload,
    DebugResult,
    AuditLogEntry,
    ManualIssuePayload,
    RevokePayload,
} from "./achievementTypes";

// ============================================================================
// User-Facing APIs
// ============================================================================

/**
 * Get achievements the current user is eligible to claim
 */
export const getEligibleAchievements = async (): Promise<EligibleAchievement[]> => {
    try {
        const response = await privateGateway.get(qseverseRoutes.getEligibleAchievements);
        return response.data.response || [];
    } catch (error) {
        console.error("Error fetching eligible achievements:", error);
        return [];
    }
};

/**
 * Get progress towards all achievements for the current user
 */
export const getAchievementProgress = async (): Promise<AchievementProgress[]> => {
    try {
        const response = await privateGateway.get(qseverseRoutes.getAchievementProgress);
        return response.data.response || [];
    } catch (error) {
        console.error("Error fetching achievement progress:", error);
        return [];
    }
};

/**
 * Claim an achievement
 */
export const claimAchievement = async (achievementId: string): Promise<ClaimResult> => {
    try {
        const response = await privateGateway.post(
            `${qseverseRoutes.claimAchievement}${achievementId}/`
        );
        
        if (response.data.hasError) {
            return {
                success: false,
                message: response.data.message?.general?.[0] || "Failed to claim achievement",
                progress: response.data.response?.progress,
            };
        }
        
        return {
            success: true,
            message: response.data.message?.general?.[0] || "Achievement claimed successfully!",
            achievement_name: response.data.response?.achievement_name,
            vc_pending: response.data.response?.vc_pending,
        };
    } catch (error: any) {
        const errorMessage = error.response?.data?.message?.general?.[0] || "Network error";
        return {
            success: false,
            message: errorMessage,
        };
    }
};

// ============================================================================
// Admin APIs
// ============================================================================

/**
 * Get all achievement rules (admin)
 */
export const getAchievementRules = async (): Promise<AchievementRule[]> => {
    try {
        const response = await privateGateway.get(qseverseRoutes.getAchievementRules);
        return response.data.response || [];
    } catch (error) {
        console.error("Error fetching achievement rules:", error);
        toast.error("Failed to load achievement rules");
        return [];
    }
};

/**
 * Create a new achievement rule (admin)
 */
export const createAchievementRule = async (payload: CreateRulePayload): Promise<boolean> => {
    try {
        const response = await privateGateway.post(
            qseverseRoutes.createAchievementRule,
            payload
        );
        
        if (response.data.hasError) {
            toast.error(response.data.message?.general?.[0] || "Failed to create rule");
            return false;
        }
        
        toast.success(`Rule v${response.data.response?.version} created successfully`);
        return true;
    } catch (error: any) {
        toast.error(error.response?.data?.message?.general?.[0] || "Failed to create rule");
        return false;
    }
};

/**
 * Deactivate an achievement rule (admin)
 */
export const deactivateAchievementRule = async (ruleId: string): Promise<boolean> => {
    try {
        const response = await privateGateway.post(
            `${qseverseRoutes.getAchievementRules}${ruleId}/deactivate/`
        );
        
        if (response.data.hasError) {
            toast.error(response.data.message?.general?.[0] || "Failed to deactivate rule");
            return false;
        }
        
        toast.success("Rule deactivated successfully");
        return true;
    } catch (error: any) {
        toast.error(error.response?.data?.message?.general?.[0] || "Failed to deactivate rule");
        return false;
    }
};

/**
 * Simulate rules for a specific user (admin/debug)
 */
export const simulateRulesForUser = async (muid: string): Promise<AchievementProgress[]> => {
    try {
        const response = await privateGateway.get(
            `${qseverseRoutes.simulateRules}${muid}/`
        );
        return response.data.response || [];
    } catch (error) {
        console.error("Error simulating rules:", error);
        toast.error("Failed to simulate rules");
        return [];
    }
};

/**
 * Debug a specific achievement for a user (admin)
 */
export const debugAchievementForUser = async (
    muid: string,
    achievementId: string
): Promise<DebugResult | null> => {
    try {
        const response = await privateGateway.get(
            `${qseverseRoutes.debugAchievement}${muid}/${achievementId}/`
        );
        return response.data.response || null;
    } catch (error) {
        console.error("Error debugging achievement:", error);
        toast.error("Failed to debug achievement");
        return null;
    }
};

/**
 * Manually issue an achievement (admin)
 */
export const manualIssueAchievementAPI = async (payload: ManualIssuePayload): Promise<boolean> => {
    try {
        const response = await privateGateway.post(
            qseverseRoutes.manualIssue,
            payload
        );
        
        if (response.data.hasError) {
            toast.error(response.data.message?.general?.[0] || "Failed to issue achievement");
            return false;
        }
        
        toast.success(response.data.message?.general?.[0] || "Achievement issued successfully");
        return true;
    } catch (error: any) {
        toast.error(error.response?.data?.message?.general?.[0] || "Failed to issue achievement");
        return false;
    }
};

/**
 * Revoke an achievement (admin)
 */
export const revokeAchievementAPI = async (payload: RevokePayload): Promise<boolean> => {
    try {
        const response = await privateGateway.post(
            qseverseRoutes.revokeAchievement,
            payload
        );
        
        if (response.data.hasError) {
            toast.error(response.data.message?.general?.[0] || "Failed to revoke achievement");
            return false;
        }
        
        toast.success(response.data.message?.general?.[0] || "Achievement revoked successfully");
        return true;
    } catch (error: any) {
        toast.error(error.response?.data?.message?.general?.[0] || "Failed to revoke achievement");
        return false;
    }
};

/**
 * Get audit logs for a user (admin)
 */
export const getAuditLogs = async (muid: string): Promise<AuditLogEntry[]> => {
    try {
        const response = await privateGateway.get(
            `${qseverseRoutes.getAuditLog}${muid}/`
        );
        return response.data.response || [];
    } catch (error) {
        console.error("Error fetching audit logs:", error);
        toast.error("Failed to load audit logs");
        return [];
    }
};
