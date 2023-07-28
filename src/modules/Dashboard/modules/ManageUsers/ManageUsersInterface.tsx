export interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    discord_id: string;
    mu_id: string;
    college?: string;
    role: string;
    company?: string;
    department?: string | any;
    graduation_year?: string | any;
    organizations?: string | undefined;
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
