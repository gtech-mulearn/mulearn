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
    meetId?: string;
    circle_id?: string;
    description: string;
    coord_x: number;
    coord_y: number;
    meet_time: string;
    duration: number;
    title: string;
    is_report_needed: boolean;
    report_description: string;
    meet_place?: string;
    meet_link?: string;
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
    meet_place?: string;
    meet_time?: string;
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
    description: string;
    circle_id: string;
    id: string;
    ig_name: string;
    ig?: string;
    description?: string;

    created_by: string;
    ig_id: string
    title: string;
    is_report_needed: boolean;
    report_description: string;
    meet_link: string;
    mode: string;
    isActive?: boolean;
    isOver?: boolean;
    isUpcoming?: boolean;
    meet_code: string;
    is_rsvp: boolean;
    attendees_count: number;
    created_by_id: string;
    coord_x: number;
    coord_y: number;
    meet_place: string;
    meet_time: string; // Using string type to represent DateTime (ISO format)
    duration: number;
    is_approved: boolean;
    is_started: boolean;
    is_ended: boolean;
    is_joined?: boolean;
    attendee: CircleMeetingAttendee; 
    attendees: CircleMeetingAttendee[] | null;
    attendees_count: number;
    meet_link: string;
}

interface CircleMeetingAttendee {
    name: string;
    is_joined: boolean;
    is_report_submitted: boolean;
    is_lc_approved: boolean;
    full_name?: string;

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
