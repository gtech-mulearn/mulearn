import { ReactNode } from "react";

export type ResponseType = {
    lc_count: number;
    total_enrollment: number;
    circle_count_by_ig: InterestGroup[];
    unique_users: number;
};

export type InterestGroup = {
    total_users: ReactNode;
    name: string;
    total_circles: number;
};

export type UserDetail = {
    first_name: string;
    last_name: string;
    muid: string;
    circle_name: string;
    name: string;
    organisation: string;
    karma: number;
};

export type OrgData = {
    org_title: string;
    learning_circle_count: number;
    user_count: number;
};

export type OrgCircle = {
    orgName: string;
    circleCount: number;
};
export type HackData = {
    CandidateName: string;
    ContactDetails: number;
    DWMSID: string;
    Email: string;
    HackathonName: string;
};
export type HackDashboard = {
    "Hackathon Name": string;
    Domains: string;
    "Total Applicants": string;
    "Shortlisted Candidates": string;
    "Shortlisted Team Count": string;
    "Attended People": string;
    "Offerings Count": string;
    "Placement Count": string;
};
export type TableToggleProps = {
    active: string;
    tabClick: (tab: string) => void;
    toggleOptions: string[];
};
