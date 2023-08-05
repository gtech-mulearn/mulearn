interface UserData {
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
    organization?:string[];
    interest_groups:string[];
    role:string[];
    country:string;
    state:string;
    district:string;
}

interface OrgData {
    title: string;
    org_type: string;
    department: string;
    graduation_year: number;
    country: string;
    state: string;
    district: string;
}