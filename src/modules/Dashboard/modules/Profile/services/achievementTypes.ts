/**
 * Achievement System Types
 * Types for the claim-based achievement system
 */

// ============================================================================
// Core Types
// ============================================================================

export interface AchievementProgress {
    achievement_id: string;
    achievement_name: string;
    eligible: boolean;
    reason: string;
    progress: {
        current: number;
        required: number;
        percentage: number;
        [key: string]: any;
    };
}

export interface EligibleAchievement extends AchievementProgress {
    // Additional fields for display
    description?: string;
    icon?: string;
    has_vc?: boolean;
}

export interface ClaimResult {
    success: boolean;
    message: string;
    achievement_name?: string;
    vc_pending?: boolean;
    progress?: {
        current: number;
        required: number;
        percentage: number;
    };
}

export interface UserAchievement {
    id: string;
    achievement: {
        id: string;
        achievement_name: string;
        description: string;
        icon: string;
        tags: string[];
        template_id?: string;
        has_vc: boolean;
    };
    is_issued: boolean;
    vc_url: string;
    rule_version: number;
    created_at: string;
}

// ============================================================================
// Rule Types
// ============================================================================

export type RuleType = 'ig_karma' | 'skill' | 'streak' | 'milestone' | 'event';

export interface AchievementRule {
    id: string;
    achievement_id: string;
    achievement_name: string;
    version: number;
    rule_type: RuleType;
    conditions: RuleConditions;
    is_active: boolean;
    created_at: string;
}

export interface RuleConditions {
    // IG Karma rule
    ig_id?: string;
    required_karma?: number;
    // Skill rule
    skill_id?: string;
    required_tasks?: number;
    // Streak rule
    streak_type?: string;
    required_streak?: number;
    // Milestone rule
    milestone_type?: string;
    required_value?: number;
    // Event rule
    event_name?: string;
    required_attendance?: number;
}

export interface CreateRulePayload {
    achievement_id: string;
    rule_type: RuleType;
    conditions: RuleConditions;
}

// ============================================================================
// Admin Types
// ============================================================================

export interface DebugResult {
    evaluation: AchievementProgress;
    user_data: {
        ig_karma: Array<{
            ig_id: string;
            total_karma: number;
            task_count: number;
        }>;
        streaks: Array<{
            streak_type: string;
            current_streak: number;
            longest_streak: number;
        }>;
        skill_progress: Array<{
            skill_id: string;
            completed_task_count: number;
            total_karma: number;
        }>;
    };
}

export interface AuditLogEntry {
    id: string;
    achievement_id: string;
    achievement_name: string;
    action: 'issued' | 'revoked' | 'vc_issued' | 'vc_failed';
    rule_version: number | null;
    metadata: Record<string, any> | null;
    performed_by: string | null;
    created_at: string;
}

export interface ManualIssuePayload {
    muid: string;
    achievement_id: string;
}

export interface RevokePayload {
    muid: string;
    achievement_id: string;
    reason?: string;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
    hasError: boolean;
    statusCode: number;
    message: {
        general: string[];
    };
    response: T;
}
