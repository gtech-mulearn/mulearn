import creative from "/src/modules/Common/Authentication/assets/interests/creative.svg";
import maker from "/src/modules/Common/Authentication/assets/interests/makers.svg";
import software from "/src/modules/Common/Authentication/assets/interests/software.svg";
import management from "/src/modules/Common/Authentication/assets/interests/management.svg";
import others from "/src/modules/Common/Authentication/assets/interests/others.svg";

export const INITIAL_INTERESTS = [
    { title: "Coder", value: "coder", img: software, checked: false },
    { title: "Hardware", value: "hardware", img: maker, checked: false },
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
    { title: "Others", value: "others", checked: false }
];
