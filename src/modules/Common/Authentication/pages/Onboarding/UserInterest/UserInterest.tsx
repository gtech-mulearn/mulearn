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
    const [otherInterest, setOtherInterest] = useState<string[]>([]);
    const [stepTwo, setStepTwo] = useState(false);

    const handleInterestChange = (value: any) => {
        setInterests(
            interests.map(interest =>
                interest.value === value
                    ? { ...interest, checked: !interest.checked }
                    : interest
            )
        );
    };
    const [communityAPI, setCommunityAPI] = useState([
        { id: "aswanth", title: "oteha" }
    ]);

    const communityProps = {
        name: "communities.id",
        // onChange: (OnChangeValue: any) => {
        //     formik.setFieldValue(
        //         "communities",
        //         OnChangeValue.map(
        //             (
        //                 value: any = {
        //                     value: "",
        //                     label: ""
        //                 }
        //             ) => value.value
        //         )
        //     );
        // },
        closeMenuOnSelect: false,
        isMulti: true,
        value: [],
        options: toReactOptions(communityAPI)
    };

    const handleContinue = () => {
        const selectedInterests = interests
            .filter(interest => interest.checked)
            .map(interest => interest.value);
        console.log("Selected interests:", selectedInterests);
        console.log("Other interest:", otherInterest);
    };

    const isAnythingSelected = interests.some(interest => interest.checked);

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
                        Choose the role that best fits your profile.
                    </p>
                    <div className={styles.endGoalPageCards}>
                        {interests.map(interest => {
                            let classname = `${styles.rolePageCard} ${
                                interest.checked && styles.active
                            }`;
                            return (
                                <div
                                    key={interest.value}
                                    className={classname}
                                    onClick={() =>
                                        handleInterestChange(interest.value)
                                    }
                                >
                                    {interest.checked && <CheckMark />}
                                    <p>{interest.title}</p>
                                </div>
                            );
                        })}
                    </div>
                    <div className={styles.buttons}>
                        <PowerfulButton
                            type="submit"
                            style={{ marginTop: "10px" }}
                            isLoading={false}
                            variant="secondary"
                            onClick={() => setStepTwo(true)}
                        >
                            Skip
                        </PowerfulButton>
                        <PowerfulButton
                            type="submit"
                            style={{ marginTop: "10px" }}
                            isLoading={false}
                            onClick={() => setStepTwo(true)}
                        >
                            Continue
                        </PowerfulButton>
                    </div>
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
                    <div className={styles.interestSelectCards}>
                        {interests.map(interest => {
                            let classname = `${styles.interestSelectCard} ${
                                interest.checked && styles.active
                            }`;
                            return (
                                <div
                                    key={interest.value}
                                    className={
                                        classname +
                                        " " +
                                        (interest.value == "others"
                                            ? styles.interestOther
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

                    {isAnythingSelected && (
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
