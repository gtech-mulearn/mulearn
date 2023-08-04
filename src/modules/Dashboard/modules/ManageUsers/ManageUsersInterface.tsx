export interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    gender:string;
    // discord_id: string;
    // mu_id: string;
    // college?: string;
    role: string[];
    // company?: string;
    department?: string;
    graduation_year?: string;
    organization?: {
        College?:string[];
        Community?:string[];
        Company?:string[];
        
    };
}

export interface OrgData {
    title: string;
    org_type: string;
    department: string;
    graduation_year: number;
    country: string;
    state: string;
    district: string;
}
