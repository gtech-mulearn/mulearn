export interface SkillData {
    id: string;
    name: string;
    code: string;
    description?: string;
    icon?: string;
    is_active: boolean;
    task_count?: number;
    created_at?: string;
    updated_at?: string;
}

export interface SkillsResponse {
    skills: SkillData[];
    pagination: {
        totalRecords: number;
        currentPage: number;
        perPage: number;
        totalPages: number;
    };
}
