export interface HackList {
    id: string;
    title: string;
    type: string;
    tagline: string;
    event_logo: any;
    is_open_to_all: boolean;
    banner: any;
    website: string;
    place: string;
    status: string;
    event_start: string | null;
    event_end: string | null;
    application_start: string | null;
    application_ends: string | null;
    description: string;
    participant_count: number;
    district: string;
    organisation: string;
    district_id: string;
    org_id: string;
    editable: boolean;
}

export interface HackathonApplication {
    field_name: string;
    field_type: string;
    is_required: boolean;
}

export interface HackathonOrganizerData {
    email: string;
    full_name: string;
    id: string;
    muid: string;
    profile_pic: string;
}

export interface hackApiData {
    name: string;
    gender: string;
    email: string;
    mobile: number;
    bio: string;
    college: string;
    experience: string;
    github: string;
    linkedin: string;
}