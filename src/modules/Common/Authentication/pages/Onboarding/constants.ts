import { cdnUrl } from "@/modules/utils/cdn";

const creative = cdnUrl("src/modules/Common/Authentication/assets/interests/creative.svg");
const maker = cdnUrl("src/modules/Common/Authentication/assets/interests/makers.svg");
const software = cdnUrl("src/modules/Common/Authentication/assets/interests/software.svg");
const management = cdnUrl("src/modules/Common/Authentication/assets/interests/management.svg");
const others = cdnUrl("src/modules/Common/Authentication/assets/interests/others.svg");

export const INITIAL_INTERESTS = [
    { title: "Coder", value: "coder", img: software, checked: false },
    { title: "Maker", value: "maker", img: maker, checked: false },
    { title: "Manager", value: "manager", img: management, checked: false },
    { title: "Creative", value: "creative", img: creative, checked: false },
    { title: "Others", value: "others", img: others, checked: false }
];

export const INITIAL_ENDGOALS = [
    { title: "Job", value: "job", checked: false },
    { title: "Research & Development", value: "r&d", checked: false },
    { title: "Entrepreneurship", value: "entrepreneurship", checked: false },
    { title: "Gig Works", value: "gig_work", checked: false },
    { title: "Higher Education", value: "higher_education", checked: false },
    { title: "Social Impact", value: "social_impact", checked: false },
    { title: "Others", value: "others", checked: false }
];
