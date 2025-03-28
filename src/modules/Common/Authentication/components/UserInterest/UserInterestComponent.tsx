import { useEffect, useState, useCallback } from "react";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router-dom";
// import { TagsInput } from "react-tag-input-component";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { publicGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";
import styles from "./UserInterestComponent.module.css";
import muBrand from "/src/modules/Common/Authentication/assets/µLearn.webp";
import OnboardingTemplate from "../OnboardingTeamplate/OnboardingTemplate";
import software from "/assets/landing/coder2.webp";
import maker from "/assets/landing/maker.webp";
import management from "/assets/landing/manager.webp";
import creative from "/assets/landing/creative.webp";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
// import others from "/src/modules/Common/Authentication/assets/interests/others.svg";
const CheckMark = () => (
    <svg className={styles.checkmark} viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
);
type InterestGroup = {
    id: string;
    name: string;
    category: string;
};

type EndGoal = {
    title: string;
    value: string;
    checked: boolean;
};
type InterestGroups = {
    [key: string]: InterestGroup[];
};

type Interest = {
    title: string;
    value: string;
    img: string;
    checked: boolean;
};
// const INITIAL_INTERESTS = [
//     { title: "Coder", value: "coder", img: software, checked: false },
//     { title: "Hardware", value: "hardware", img: maker, checked: false },
//     { title: "Manager", value: "manager", img: management, checked: false },
//     { title: "Creative", value: "creative", img: creative, checked: false },
//     // { title: "Others", value: "others", img: others, checked: false }
// ];
const INITIAL_INTERESTS = [
    { title: "Coder", value: "coder", img: software, checked: false },
    { title: "Maker", value: "maker", img: maker, checked: false },
    { title: "Manager", value: "manager", img: management, checked: false },
    { title: "Creative", value: "creative", img: creative, checked: false },
];

const INTEREST_DESCRIPTIONS = {
    coder: [
        "Web Development",
        "Mobile Apps",
        "Data Science",
        "Machine Learning",
        "Cloud Computing",
        "DevOps"
    ],
    maker: [
        "Hardware Development",
        "IoT Projects",
        "Robotics",
        "3D Printing",
        "Electronics",
        "DIY Projects"
    ],
    manager: [
        "Project Management",
        "Product Management",
        "Business Strategy",
        "Team Leadership",
        "Operations",
        "HR Management"
    ],
    creative: [
        "UI/UX Design",
        "Graphic Design",
        "Animation",
        "Video Editing",
        "Content Creation",
        "Digital Marketing"
    ]
};

// const INITIAL_ENDGOALS = [
//     { title: "Job", value: "job", checked: false },
//     { title: "Research & Development", value: "r&d", checked: false },
//     { title: "Entrepreneurship", value: "entrepreneurship", checked: false },
//     { title: "Gig Works", value: "gig_work", checked: false },
//     { title: "Higher Education", value: "higher_education", checked: false },
//     // { title: "Others", value: "others", checked: false }
// ];
const INITIAL_ENDGOALS = [
    { title: "Job", value: "job", checked: false },
    { title: "Research & Development", value: "r&d", checked: false },
    { title: "Entrepreneurship", value: "entrepreneurship", checked: false },
    { title: "Gig Works", value: "gig_work", checked: false },
    { title: "Higher Education", value: "higher_education", checked: false },
    { title: "Social Impact", value: "social_impact", checked: false },
];
export default function UserInterestSelectionComponent({
    onContinue
}: {
    onContinue: (data: RegisterInterestData) => void;
}) {
    const [stepTwo, setStepTwo] = useState(false);
    const [interestGroups, setInterestGroups] = useState<InterestGroups>({});
    const [interests, setInterests] = useState<Interest[]>(INITIAL_INTERESTS);
    const [endgoals, setEndgoals] = useState<EndGoal[]>(INITIAL_ENDGOALS);
    const [openInfoPanel, setOpenInfoPanel] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const defaultInterests = searchParams.get("interests")?.split(",") ?? [];
    const defaultEndgoals = searchParams.get("endgoals")?.split(",") ?? [];
    useEffect(() => {
        const fetchInterestGroups = async () => {
            try {
                const res = await publicGateway.get(onboardingRoutes.interestGroups);
                const data: InterestGroup[] = res.data?.response?.interestGroup ?? [];
                const interestGroupsData = interests.reduce(
                    (acc, interest) => ({
                        ...acc,
                        [interest.value]: data.filter(group => group.category === interest.value)
                    }),
                    {}
                );
                setInterestGroups(interestGroupsData);
            } catch (err) {
                console.error("Failed to fetch interest groups:", err);
            }
        };
        fetchInterestGroups();
    }, []);
    useEffect(() => {
        setInterests(interests.map(i => ({
            ...i,
            checked: defaultInterests.includes(i.value)
        })));
        setEndgoals(endgoals.map(e => ({
            ...e,
            checked: defaultEndgoals.includes(e.value)
        })));
    }, []);
    const handleChange = useCallback((value: string, isInterest: boolean) => {
        const setter = isInterest ? setInterests : setEndgoals;
        // const otherSetter = isInterest ? setOtherInterest : setOtherEndgoal;
        setter((prev: any) => {
            const newItems = prev.map((item: any) =>
                item.value === value ? { ...item, checked: !item.checked } : item
            );
            // if (value === "others" && newItems.find((item: any) => item.value === "others")?.checked === false) {
            //     otherSetter([]);
            // }
            return newItems;
        });
    }, []);
    const handleContinue = useCallback(() => {
        const selectedInterests = interests.filter(interest => interest.checked);
        // if (selectedInterests.some(i => i.value === "others") && otherInterest.length === 0) {
        //     return;
        // }
        if (selectedInterests.length > 0) {
            setStepTwo(true);
        }
    }, [interests]);
    const handleSubmit = useCallback(() => {
        const selectedInterests = interests.filter(i => i.checked).map(i => i.value);
        const selectedEndgoals = endgoals.filter(e => e.checked).map(e => e.value);
        const data = {
            choosen_interests: selectedInterests,
            choosen_endgoals: selectedEndgoals,
            other_interests: [], // Send empty array to keep API working
            other_endgoals: []  // Send empty array to keep API working
        };
        onContinue(data); // Pass data to parent
    }, [interests, endgoals]);
    const isInterestSelected = interests.some(interest => interest.checked);
    const isEndgoalSelected = endgoals.some(endgoal => endgoal.checked);

    const handleInfoClick = (e: React.MouseEvent, value: string) => {
        e.stopPropagation();
        setOpenInfoPanel(openInfoPanel === value ? null : value);
    };

    const renderInterestItems = useCallback(() => (
        <div className={styles.itemsContainer}>
            {interests.map(item => {
                const isChecked = item.checked;
                const isInfoOpen = openInfoPanel === item.value;

                return (
                    <div
                        key={item.value}
                        className={`${styles.itemsCard} ${isChecked ? styles.checked : ""} ${isInfoOpen ? styles.infoOpen : ""}`}
                        onClick={() => handleChange(item.value, true)}
                    >
                        <div className={styles.content}>
                            <img className={styles.itemImage} src={item.img} alt="" />
                            <p className={styles.title}>{item.title}</p>
                        </div>

                        {isChecked && (
                            <IoCheckmarkCircleSharp className={styles.checkmark} />
                        )}

                        <div 
                            className={`${styles.infoButton} ${isInfoOpen ? styles.active : ''}`} 
                            onClick={(e) => handleInfoClick(e, item.value)}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                            </svg>
                        </div>

                        {isInfoOpen && (
                            <div className={styles.interestInfo}>
                                <h4>This category includes:</h4>
                                <ul>
                                    {INTEREST_DESCRIPTIONS[item.value as keyof typeof INTEREST_DESCRIPTIONS]?.map((desc, index) => (
                                        <li key={index}>{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    ), [interests, handleChange, openInfoPanel]);

    const renderEndgoalItems = useCallback(
        (items: typeof interests | typeof endgoals, isInterest: boolean) => (
            <div className={styles.itemsContainer}>
                {items.map(item => {
                    // const isOthers = item.value === "others";
                    const isChecked = item.checked;
                    // const otherItems = isInterest ? otherInterest : otherEndgoal;
                    // const setOtherItems = isInterest ? setOtherInterest : setOtherEndgoal;
                    return (
                        <div
                            key={item.value}
                            className={`${styles.itemsCard} ${isChecked ? styles.checked : ""}`}
                            onClick={() => handleChange(item.value, isInterest)}
                        >
                            {isInterest ? (
                                <div className={styles.content}>
                                    <img className={styles.itemImage} src={(item as any).img} alt="" />
                                    <p className={styles.title}>{item.title}</p>
                                </div>
                            ) : (
                                <div className={styles.content}> 
                                    <p className={styles.title}>{item.title}</p>
                                </div>
                            )}
                            {isChecked && (
                                <IoCheckmarkCircleSharp className={styles.checkmark} />
                            )}
                            {isInterest && (
                                <div className={styles.infoButton} onClick={(e) => e.stopPropagation()}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                    >
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                    </svg>
                                    <div className={styles.interestInfo}>
                                        <h4>This category includes:</h4>
                                        <ul>
                                            {interestGroups[item.value]?.map((group: InterestGroup) => (
                                                <li key={group.id}>{group.name}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                            {/* {isOthers && isChecked && !isInterest && (
                                <div onClick={(e) => e.stopPropagation()}>
                                    <TagsInput
                                        value={otherItems}
                                        onBlur={(e: any) => {
                                            if (e.target.value.length > 0) {
                                                setOtherItems([...otherItems, e.target.value]);
                                                e.target.value = "";
                                            }
                                        }}
                                        onChange={setOtherItems}
                                        name={`other_${isInterest ? "interests" : "endgoals"}`}
                                        placeHolder={`Specify your ${isInterest ? "interest" : "endgoal"}`}
                                        separators={[","]}
                                    />
                                </div>
                            )} */}
                        </div>
                    );
                })}
            </div>
        ),
        [handleChange, interestGroups]
    );
    return (
        <OnboardingTemplate>
            <div className={styles.popUp}>
                <div className={styles.box}>
                    <img src={muBrand} alt="mulearn" />
                    <h1>{stepTwo ? "What do you expect by MuLearning" : "What describes you the most!"}</h1>
                    <p className={styles.subText}>
                        {stepTwo ? "Pick your goal." : "Please select your interested area"}
                    </p>
                    {stepTwo ? renderEndgoalItems(endgoals, false) : renderInterestItems()}
                    {(stepTwo ? isEndgoalSelected : isInterestSelected) && (
                        <PowerfulButton
                            type="submit"
                            className={styles.continueButton}
                            style={{ marginTop: "10px" }}
                            isLoading={false}
                            onClick={stepTwo ? handleSubmit : handleContinue}
                        >
                            Continue
                        </PowerfulButton>
                    )}
                </div>
            </div>
        </OnboardingTemplate>
    );
}