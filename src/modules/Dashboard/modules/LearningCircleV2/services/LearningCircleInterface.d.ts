interface MapResult {
    name: string;
    display_name: string;
    lat: number;
    lon: number;
}

interface LearningCircleCreate {
    ig: string;
    is_recurring: boolean;
    recurrence_type: string;
    recurrence: number;
}

interface LCMeetCreate {
    circle_id: string;
    description: string;
    coord_x: number;
    coord_y: number;
    meet_time: string;
    duration: number;
    title: string;
    is_report_needed: boolean;
    report_description: string;
    meet_place: string;
    meet_link: string;
    mode: string
}

interface LCMeetup {
    id: string;
    is_scheduled: boolean;
    circle: string;
    meet_code: string;
    title: string;
    is_report_needed: boolean;
    report_description: string;
    coord_x: number;
    coord_y: number;
    meet_place: string;
    meet_time: string;
    duration: number;
    is_started: boolean;
    is_ended: boolean;
    is_report_submitted: boolean;
}
interface LearningCircleInfo {
    id: string;
    ig: string;
    org: string;
    is_recurring: boolean;
    recurrence_type: string;
    recurrence: number;
    next_meetup: LCMeetup;
    past_meetups: LCMeetup[];
}
interface LearningCircleInfoBasic {
    id: string;
    ig: string;
    org: string;
    is_recurring: boolean;
    recurrence_type: string;
    recurrence: number;
    next_meetup: LCMeetup;
}

export interface CircleMeetupInfo {
    id: string;
    title: string;
    is_report_needed: boolean;
    report_description: string;
    coord_x: number;
    coord_y: number;
    meet_place: string;
    meet_time: string; // Using string type to represent DateTime (ISO format)
    duration: number;
    is_approved: boolean;
    is_started: boolean;
    is_ended: boolean;
    attendee: CircleMeetingAttendee | null; 
    meet_link: string | null
​​}

interface CircleMeetingAttendee {
    is_joined: boolean;
    is_report_submitted: boolean;
    is_lc_approved: boolean;
}

interface LCReportInfo {
    is_report_submitted: boolean;
    report: string | null;
    attendees: {
        user_id: string;
        full_name: string;
        muid: string;
        is_lc_approved: boolean;
        report: string | null;
        report_link: string | null;
    }[];
}
