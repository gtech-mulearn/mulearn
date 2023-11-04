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
}

type LcDetail = {
    name: string;
    circle_code: string;
    note: string | null;
    meet_time: string;
    meet_place: string | null;
    day: number[];
    college: string;
    members: LcMembers[];
    pending_members: LcMembers[]; 
    rank: number;
    total_karma: number;
    is_lead: boolean;
    is_member: boolean;
    ig_code: string;
};

interface LcDashboardTempData {
    loading: boolean;
    isReport: boolean;
    isHistory: boolean;
    isTeam: boolean;
    isSchedule: boolean;
}