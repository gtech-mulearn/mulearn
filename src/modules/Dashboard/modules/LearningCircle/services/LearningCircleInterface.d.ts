interface LcType {
    circle_code: string;
    created_by: string;
    id: string;
    ig: string;
    meet_place: string;
    meet_time: string;
    member_count: number;
    name: string;
    org: string;
}

interface LcMembers {
    id: string;
    username: string;
    profile_pic: string;
    karma: number;
    is_lead: boolean;
    level: number;
}

type LcDetail = {
    name: string;
    circle_code: string;
    ig_name: string;
    note: string;
    meet_time: string;
    meet_place: string;
    day: number[];
    college: string;
    members: LcMembers[];
    pending_members: LcMembers[];
    rank: number;
    total_karma: number;
    is_lead: boolean;
    is_member: boolean;
    ig_code: string;
    previous_meetings: LcPastReports[];
};

interface LcDashboardTempData {
    loading: boolean;
    isReport: boolean;
    isHistory: boolean;
    isTeam: boolean;
    isSchedule: boolean;
    reRender: boolean;
    isCreateMeeting: boolean;
}

interface LcMeetSchedule {
    meet_time: string;
    meet_place: string;
    day: string;
}
type LcTask = {
    id: string | undefined;
    title: string;
    is_completed: boolean;
    is_image: boolean;
    image_url: string | null;
    proof_url: string | null;
};
interface LcMeetup {
    title: string;
    location: string;
    meet_time: string;
    meet_place: string;
    agenda: string;
    need_pre_requirements: boolean;
    pre_requirements: string | null;
    is_public: boolean;
    limit_attendees: boolean;
    max_attendees: number;
    tasks: LcTask[];
    is_online: boolean;
}

type LcMeetupInfo = LcMeetup & {
    id: string;
    is_started: boolean;
    is_report_submitted: boolean;
    meet_code: string | null;
    image: string | null;
};

type LcMeetupDetailInfo = LcMeetupInfo & {
    tasks: LcTask[];
    is_interested: boolean;
    joined_at: string | null;
    total_interested: number;
    total_joined: number;
    lc_members: number;
    is_lc_member: boolean;
    is_attendee_report_submitted: boolean;
};
interface LcNote {
    note: string;
    id: string | undefined;
}

interface ChecklistItem {
    id: number;
    text: string;
    isChecked: boolean;
}

interface LcPastReports {
    id: string;
    meet_time: string;
    day: string;
}

interface LcHistory {
    meet_id: string;
    meet_time: string;
    meet_place: string;
    attendees: string;
    attendees_details: LcAttendees[];
    agenda: string;
    meet_created_by: string;
    meet_created_at: string;
    images: string;
    image: string;
}

interface LcAttendees {
    attendee_id: string;
    fullname: string;
    profile_pic: string;
    title: string;
    report: string;
    proof_of_work: LcTask[];
}
