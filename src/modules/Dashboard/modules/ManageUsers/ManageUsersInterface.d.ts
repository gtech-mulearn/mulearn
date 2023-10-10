interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    gender: string;
    roles: string[];
    department?: string;
    graduation_year?: string;
    organizations?: string[];
    interest_groups: string[];
    country: string;
    state: string;
    district: string;
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
