interface UserData {
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    discord_id: string | null;
    organizations: string[] | null;
    department: string | null;
    roles: string[] | null;
    interest_groups: string[];
}

interface UserDataFromBackend {
    user_id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile: string;
    gender: string;
    discord_id: string | null;
    dob: string;
    role: string[] | null;
    organizations: string[] | null;
    interest_groups: string[];
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
