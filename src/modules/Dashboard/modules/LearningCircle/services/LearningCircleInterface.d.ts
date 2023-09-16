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
    circle_code: string;
    college: string;
    members: LcMembers[];
    is_lead: boolean;
    name: string;
    pending_members: LcMembers[];
    rank: number;
    total_karma: number;
    meet_place: string;
    meet_time: string;
    day: number[] | null;
	is_member: boolean;
    note?: string;
    ig_code?: string;
};
