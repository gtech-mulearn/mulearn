export interface AchievementData {
    title: string;
    level_based?: boolean; // Used in form and request
    levelBased: boolean;  // Used in ManageAchievements
    description: string;
    has_vc?: boolean;      // Used in form and request
    vcToken: boolean;     // Used in ManageAchievements
    tags: string[];
    type: string;
    achievement_name?: string;
    templateID?: string;
    vc_url?: string;
    icon: string;
    id?: string;           // Optional, added by API or fallback
    created_at?: string;   // Optional, added by API or fallback
    updated_at?: string;   // Added from API response
    updated_by?: string;   // Added from API response
    created_by?: string;   // Added from API response
    level_id?: string; // Add this field
    [key: string]: any;    // Index signature to satisfy Data type
}