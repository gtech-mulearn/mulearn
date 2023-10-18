export type ResponseType = {
    lc_count: number;
    total_enrollment: number;
    circle_count_by_ig: InterestGroup[];
    unique_users: number;
};

export type InterestGroup = {
    total_users: ReactNode;
    ig_name: string;
    total_circles: number;
};

export type UserDetail = {
    first_name: string;
    last_name: string;
    muid: string;
    circle_name: string;
    ig_name: string;
    organisation: string;
    karma: number;
};

export type OrgCircle = {
    orgName: string;
    circleCount: number;
};
