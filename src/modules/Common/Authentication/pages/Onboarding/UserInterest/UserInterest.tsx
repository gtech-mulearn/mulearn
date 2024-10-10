import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { TagsInput } from "react-tag-input-component";

import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";

import styles from "./UserInterest.module.css";
import muBrand from "/src/modules/Common/Authentication/assets/µLearn.png";
import creative from "/src/modules/Common/Authentication/assets/interests/creative.svg";
import maker from "/src/modules/Common/Authentication/assets/interests/makers.svg";
import management from "/src/modules/Common/Authentication/assets/interests/management.svg";
import software from "/src/modules/Common/Authentication/assets/interests/software.svg";
import others from "/src/modules/Common/Authentication/assets/interests/others.svg";

const CheckMark = () => (
    <svg className={styles.checkmark} viewBox="0 0 24 24" width="24" height="24">
        <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
    </svg>
);

const INITIAL_INTERESTS = [
    { title: "Software", value: "software", img: software, checked: false },
    { title: "Maker", value: "maker", img: maker, checked: false },
    { title: "Management", value: "management", img: management, checked: false },
    { title: "Creative", value: "creative", img: creative, checked: false },
    { title: "Others", value: "others", img: others, checked: false }
];

const INITIAL_ENDGOALS = [
    { title: "Job", value: "job", checked: false },
    { title: "Higher Education", value: "higher_education", checked: false },
    { title: "Entrepreneurship", value: "entrepreneurship", checked: false },
    { title: "Gig Works", value: "gig_work", checked: false },
    { title: "Others", value: "others", checked: false }
];

type InterestGroup = {
    id: string;
    name: string;
    category: string;
};

type InterestGroups = {
    [key: string]: InterestGroup[];
};

export default function UserInterest() {
    const [interests, setInterests] = useState(INITIAL_INTERESTS);
    const [endgoals, setEndgoals] = useState(INITIAL_ENDGOALS);
    const [otherInterest, setOtherInterest] = useState<string[]>([]);
    const [otherEndgoal, setOtherEndgoal] = useState<string[]>([]);
    const [stepTwo, setStepTwo] = useState(false);
    const [interestGroups, setInterestGroups] = useState<InterestGroups>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInterestGroups = async () => {
            try {
                const res = await publicGateway.get(onboardingRoutes.interestGroups);
                const data: InterestGroup[] = res.data?.response?.interestGroup ?? [];
                
                const interestGroupsData = interests.reduce((acc, interest) => ({
                    ...acc,
                    [interest.value]: data.filter(group => group.category === interest.value)
                }), {});
                
                setInterestGroups(interestGroupsData);
            } catch (err) {
                console.error('Failed to fetch interest groups:', err);
            }
        };

        fetchInterestGroups();
    }, []);

    const handleChange = useCallback((value: string, isInterest: boolean) => {
        const setter = isInterest ? setInterests : setEndgoals;
        const otherSetter = isInterest ? setOtherInterest : setOtherEndgoal;
        
        
        setter((prev:any) => {
            const newItems = prev.map((item:any) =>
                item.value === value ? { ...item, checked: !item.checked } : item
            );
            
            if (value === "others" && newItems.find((item:any) => item.value === "others")?.checked === false) {
                otherSetter([]);
            }
            
            return newItems;
        });
    }, []);

    const handleContinue = useCallback(() => {
        const selectedInterests = interests.filter(interest => interest.checked);
        if (selectedInterests.some(i => i.value === "others") && otherInterest.length === 0) {
            return;
        }
        if (selectedInterests.length > 0 || otherInterest.length > 0) {
            setStepTwo(true);
        }
    }, [interests, otherInterest]);

    const handleSubmit = useCallback(async () => {
        const selectedInterests = interests.filter(i => i.checked).map(i => i.value);
        const selectedEndgoals = endgoals.filter(e => e.checked).map(e => e.value);
        
        const data = {
            choosen_interests: selectedInterests,
            choosen_endgoals: selectedEndgoals,
            other_interests: otherInterest,
            other_endgoals: otherEndgoal
        };

        try {
            const res = await privateGateway.post(onboardingRoutes.interests, data);
            toast.success(res.data?.message.general[0]);
            navigate("/dashboard/connect-discord");
        } catch (err: any) {
            toast.error(err.response?.data.message.general[0] || "Unexpected Error occurred");
        }
    }, [interests, endgoals, otherInterest, otherEndgoal, navigate]);

    const isInterestSelected = interests.some(interest => interest.checked);
    const isEndgoalSelected = endgoals.some(endgoal => endgoal.checked);

    const renderItems = useCallback((items: typeof interests | typeof endgoals, isInterest: boolean) => (
        <div className={styles.itemsContainer}>
            {items.map(item => {
                const isOthers = item.value === "others";
                const isChecked = item.checked;
                const otherItems = isInterest ? otherInterest : otherEndgoal;
                const setOtherItems = isInterest ? setOtherInterest : setOtherEndgoal;

                return (
                    <div
                        key={item.value}
                        className={`${styles.itemsCard} ${isChecked ? styles.checked : ''} ${isOthers ? styles.others : ''}`}
                        onClick={() => handleChange(item.value, isInterest)}
                    >
                        {isChecked && <CheckMark />}
                        {isInterest ? (
                            <div className={styles.content}>
                                <img className={styles.itemImage} src={(item as any).img} alt="" />
                                <p className={styles.title}>{item.title}</p>
                            </div>
                        ) : (
                            <p>{item.title}</p>
                        )}
                        {isInterest && (
                            <>
                                <div className={styles.infoButton} onClick={e => e.stopPropagation()}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                                    </svg>
                                </div>
                                <div className={styles.interestInfo}>
                                    <h4>This category includes:</h4>
                                    <ul>
                                        {interestGroups[item.value]?.map((group: InterestGroup) => (
                                            <li key={group.id}>{group.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                        {isOthers && isChecked && (
                            <div onClick={e => e.stopPropagation()}>
                                <TagsInput
                                    value={otherItems}
                                    onBlur={(e: any) => {
                                        if (e.target.value.length > 0) {
                                            setOtherItems([...otherItems, e.target.value]);
                                            e.target.value = "";
                                        }
                                    }}
                                    onChange={setOtherItems}
                                    name={`other_${isInterest ? 'interests' : 'endgoals'}`}
                                    placeHolder={`Specify your ${isInterest ? 'interest' : 'endgoal'}`}
                                    separators={isInterest ? [","] : undefined}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    ), [handleChange, interestGroups, otherInterest, otherEndgoal]);

    return (
        <>
            <OnboardingHeader
                title="Create an Account"
                desc="Please Enter Your Information"
            />
            <div className={styles.popUp}>
                <div className={styles.box}>
                    <img src={muBrand} alt="mulearn" />
                    <h1>{stepTwo ? "What describes you the most!" : "Your dynamic area of interest!"}</h1>
                    <p className={styles.subText}>
                        {stepTwo ? "Choose one or goals you expect from µLearn." : "Please select your interested area"}
                    </p>
                    
                    {stepTwo ? renderItems(endgoals, false) : renderItems(interests, true)}

                    {(stepTwo ? isEndgoalSelected : isInterestSelected) && (
                        <PowerfulButton
                            type="submit"
                            className={styles.continueButton}
                            style={{ marginTop: "10px" }}
                            isLoading={false}
                            onClick={stepTwo ? handleSubmit : handleContinue}
                        >
                            {stepTwo ? "Submit" : "Continue"}
                        </PowerfulButton>
                    )}
                </div>
            </div>
        </>
    );
}