export type ResponseType = {
    lc_count: number;
    total_enrollment: number;
    circle_count_by_ig: InterestGroup[];
};

export type InterestGroup = {
    ig_name: string;
    total_circles: number;
};

export type UserDetail = {
    irst_name: string;
    last_name: string;
    muid: string;
    circle_name: string;
    ig_name: string;
    organization: string;
    karma: number;
};
