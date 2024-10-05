import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import styles from "./UserInterest.module.css";
import muBrand from "/src/modules/Common/Authentication/assets/µLearn.png";

const CheckMark = () => (
  <svg className={styles.checkmark} viewBox="0 0 24 24" width="24" height="24">
    <path fill="currentColor" d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
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
    const [otherInterest, setOtherInterest] = useState("");
    const navigate = useNavigate();

    const handleInterestChange = (value:any) => {
        setInterests(interests.map(interest => 
            interest.value === value ? { ...interest, checked: !interest.checked } : interest
        ));
    };

    const handleContinue = () => {
        const selectedInterests = interests.filter(interest => interest.checked).map(interest => interest.value);
        if (interests.find(interest => interest.value === 'others')?.checked) {
            selectedInterests.push(otherInterest);
        }
        console.log("Selected interests:", selectedInterests);
        // Here you can add logic to navigate or process the form
        // For example: navigate('/next-step');
    };

    const isAnythingSelected = interests.some(interest => interest.checked);

    return (
        <OnboardingTemplate>
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
                    <div className={styles.rolePageCards}>
                        {interests.map((interest) => {
                            let classname = `${styles.rolePageCard} ${
                                interest.checked && styles.active
                            }`;
                            return (
                                <div
                                    key={interest.value}
                                    className={classname}
                                    onClick={() => handleInterestChange(interest.value)}
                                >
                                    {interest.checked && <CheckMark />}
                                    {/* {interest.icon} */}
                                    <p>{interest.title}</p>
                                </div>
                            );
                        })}
                    </div>
                    {interests.find(interest => interest.value === 'others')?.checked && (
                        <input
                            type="text"
                            placeholder="Specify your interest"
                            value={otherInterest}
                            onChange={(e) => setOtherInterest(e.target.value)}
                            className={styles.otherInterestInput}
                        />
                    )}
                      {isAnythingSelected && (
                <PowerfulButton
                    type="submit"
                    style={{ marginTop: "10px" }}
                    isLoading={false}
                    onClick={handleContinue}
                >
                    Continue
                </PowerfulButton>
            )}
                </div>
            </div>
        
        </OnboardingTemplate>
    );
}

