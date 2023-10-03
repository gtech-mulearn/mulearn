export type ResponseType = {
    lc_count: number;
    total_enrollment: number;
    circle_count_by_ig: InterestGroup[];
};

export type InterestGroup = {
    ig__name: string;
    total_circles: number;
};

export type UserDetail = {
    user__first_name: string;
    user__last_name: string;
    user__mu_id: string;
    circle__name: string;
    circle__ig__name: string;
    user__user_organization_link_user__org__title: string;
    karma_earned: number;
};
