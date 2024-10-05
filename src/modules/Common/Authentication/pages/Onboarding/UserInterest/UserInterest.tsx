import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import styles from "./UserInterest.module.css";
import muBrand from "/src/modules/Common/Authentication/assets/µLearn.png";
import Select from "react-select";
import { toReactOptions } from "../../../../../Dashboard/utils/common";
import { Tab } from "@chakra-ui/react";
import { TagsInput } from "react-tag-input-component";

const CheckMark = () => (
    <svg
        className={styles.checkmark}
        viewBox="0 0 24 24"
        width="24"
        height="24"
    >
        <path
            fill="currentColor"
            d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"
        />
    </svg>
);

export default function UserInterest() {
    const [interests, setInterests] = useState([
        { title: "Software", value: "software", checked: false },
        { title: "Makers", value: "makers", checked: false },
        { title: "Management", value: "management", checked: false },
        { title: "Creative", value: "creative", checked: false },
        { title: "Others", value: "others", checked: false }
    ]);
    const [endgoals, setEndgoals] = useState([
        { title: "Job", value: "job", checked: false },
        {
            title: "Higher Education",
            value: "higher_education",
            checked: false
        },
        {
            title: "Entrepreneurship",
            value: "enterpreneurship",
            checked: false
        },
        { title: "Gig Works", value: "gig", checked: false },
        { title: "Others", value: "others", checked: false }
    ]);
    const [otherInterest, setOtherInterest] = useState<string[]>([]);
    const [otherEndgoal, setOtherEndgoal] = useState<string[]>([]);
    const [stepTwo, setStepTwo] = useState(false);

    const handleInterestChange = (value: any) => {
        if (value === "others") {
            if (
                interests.filter(interest => interest.value === value)[0]
                    .checked
            ) {
                setOtherInterest([]);
            }
        }
        setInterests(
            interests.map(interest =>
                interest.value === value
                    ? { ...interest, checked: !interest.checked }
                    : interest
            )
        );
    };

    const handleEndgoalChange = (value: any) => {
        if (value === "others") {
            if (
                endgoals.filter(endgoal => endgoal.value === value)[0].checked
            ) {
                setOtherEndgoal([]);
            }
        }
        setEndgoals(
            endgoals.map(endgoal =>
                endgoal.value === value
                    ? { ...endgoal, checked: !endgoal.checked }
                    : endgoal
            )
        );
    };

    const handleContinue = () => {
        const selectedInterests = interests
            .filter(interest => interest.checked)
            .map(interest => interest);
        if (selectedInterests.find(interest => interest.value === "others")) {
            if (otherInterest.length === 0) {
                return;
            }
        }
        if (selectedInterests.length > 0 || otherInterest.length > 0) {
            setStepTwo(true);
        }
    };

    const handleSubmit = () => {
        const selectedInterests = interests
            .filter(interest => interest.checked)
            .map(interest => interest);
        const selectedEndgoals = endgoals
            .filter(endgoal => endgoal.checked)
            .map(endgoal => endgoal);
        const data = {
            choosen_interests: selectedInterests,
            choosen_endgoals: selectedEndgoals,
            other_interests: otherInterest,
            other_endgoals: otherEndgoal
        };
        console.log("data", data);
    };

    const isInterestSelected = interests.some(interest => interest.checked);
    const isEndgoalSelected = endgoals.some(endgoal => endgoal.checked);

    return stepTwo ? (
        <>
            <OnboardingHeader
                title={"Create an Account"}
                desc={"Please Enter Your Information"}
            />
            <div className={styles.popUp}>
                <div className={styles.box}>
                    <img src={muBrand} alt="mulearn" />
                    <h1>What describes you the most!</h1>
                    <p className={styles.subText}>
                        Choose one or goals you expect from µLearn.
                    </p>
                    <div className={styles.itemsContainer}>
                        {endgoals.map(endgoal => {
                            let classname = `${styles.itemsCard} ${
                                endgoal.checked && styles.checked
                            }`;
                            return (
                                <div
                                    key={endgoal.value}
                                    className={
                                        classname +
                                        " " +
                                        (endgoal.value == "others"
                                            ? styles.others
                                            : "")
                                    }
                                    onClick={() =>
                                        handleEndgoalChange(endgoal.value)
                                    }
                                >
                                    {endgoal.checked && <CheckMark />}
                                    <p>{endgoal.title}</p>

                                    {endgoal.value == "others" ? (
                                        endgoals.find(
                                            endgoal =>
                                                endgoal.value === "others"
                                        )?.checked && (
                                            <div
                                                onClick={e => {
                                                    e.stopPropagation();
                                                }}
                                            >
                                                <TagsInput
                                                    value={otherEndgoal}
                                                    onChange={setOtherEndgoal}
                                                    name="other_endgoals"
                                                    placeHolder="Specify your endgoals"
                                                />
                                            </div>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {isEndgoalSelected && (
                        <PowerfulButton
                            type="submit"
                            className={styles.continueButton}
                            style={{ marginTop: "10px" }}
                            isLoading={false}
                            onClick={handleSubmit}
                        >
                            Submit
                        </PowerfulButton>
                    )}
                </div>
            </div>
        </>
    ) : (
        <>
            <OnboardingHeader
                title={"Create an Account"}
                desc={"Please Enter Your Information"}
            />
            <div className={styles.popUp}>
                <div className={styles.box}>
                    <img src={muBrand} alt="mulearn" />
                    <h1>What describes you the most!</h1>
                    <p className={styles.subText}>
                        Choose one or more roles that best fit your profile.
                    </p>
                    <div className={styles.itemsContainer}>
                        {interests.map(interest => {
                            let classname = `${styles.itemsCard} ${
                                interest.checked && styles.active
                            }`;
                            return (
                                <div
                                    key={interest.value}
                                    className={
                                        classname +
                                        " " +
                                        (interest.value == "others"
                                            ? styles.others
                                            : "") +
                                        " " +
                                        (interest.checked ? styles.checked : "")
                                    }
                                    onClick={() =>
                                        handleInterestChange(interest.value)
                                    }
                                >
                                    {interest.checked && <CheckMark />}
                                    <p>{interest.title}</p>

                                    {interest.value == "others" ? (
                                        interests.find(
                                            interest =>
                                                interest.value === "others"
                                        )?.checked && (
                                            <>
                                                <div
                                                    onClick={e => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    <TagsInput
                                                        value={otherInterest}
                                                        onChange={
                                                            setOtherInterest
                                                        }
                                                        name="other_interests"
                                                        placeHolder="Specify your interest"
                                                    />
                                                </div>
                                            </>
                                        )
                                    ) : (
                                        <></>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {isInterestSelected && (
                        <PowerfulButton
                            type="submit"
                            className={styles.continueButton}
                            style={{ marginTop: "10px" }}
                            isLoading={false}
                            onClick={handleContinue}
                        >
                            Continue
                        </PowerfulButton>
                    )}
                </div>
            </div>
        </>
    );
}
