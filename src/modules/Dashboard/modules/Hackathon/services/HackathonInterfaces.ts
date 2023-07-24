export interface HackList {
    id: string;
    title: string;
    type: string;
    tagline: string;
    event_logo: any;
    district: string;
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
    organisation: string;
}

export interface HackathonApplication {
    field_name: string;
    field_type: string;
    is_required: boolean;
}