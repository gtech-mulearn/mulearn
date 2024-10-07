import { useEffect, useState } from "react";
import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import styles from "./UserInterest.module.css";
import muBrand from "/src/modules/Common/Authentication/assets/µLearn.png";
import { TagsInput } from "react-tag-input-component";
import { privateGateway, publicGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import creative from "/src/modules/Common/Authentication/assets/interests/creative.svg";
import maker from "/src/modules/Common/Authentication/assets/interests/makers.svg";
import management from "/src/modules/Common/Authentication/assets/interests/management.svg";
import software from "/src/modules/Common/Authentication/assets/interests/software.svg";
import others from "/src/modules/Common/Authentication/assets/interests/others.svg";

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
        { title: "Software", value: "software", img: software, checked: false },
        { title: "Maker", value: "maker", img: maker, checked: false },
        {
            title: "Management",
            value: "management",
            img: management,
            checked: false
        },
        { title: "Creative", value: "creative", img: creative, checked: false },
        { title: "Others", value: "others", img: others, checked: false }
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
            value: "entrepreneurship",
            checked: false
        },
        { title: "Gig Works", value: "gig_work", checked: false },
        { title: "Others", value: "others", checked: false }
    ]);
    const [otherInterest, setOtherInterest] = useState<string[]>([]);
    const [otherEndgoal, setOtherEndgoal] = useState<string[]>([]);
    const [stepTwo, setStepTwo] = useState(false);
    const [interestGroups, setInterestGroups] = useState<{}>({});
    const navigate = useNavigate();

    useEffect(() => {
        publicGateway
            .get(onboardingRoutes.interestGroups)
            .then(res => {
                var data: [] = res.data?.response?.interestGroup ?? [];
                var interestGroupsData = {};
                for (let interest of interests) {
                    (interestGroupsData as any)[interest.value] = data.filter(
                        (group: any) => group?.category == interest.value
                    );
                }
                setInterestGroups(interestGroupsData);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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
            choosen_interests: selectedInterests.map(
                interest => interest.value
            ),
            choosen_endgoals: selectedEndgoals.map(endgoal => endgoal.value),
            other_interests: otherInterest,
            other_endgoals: otherEndgoal
        };
        try {
            privateGateway
                .post(onboardingRoutes.interests, data)
                .then(res => {
                    toast.success(res.data?.message.general[0]);
                    navigate("/dashboard/connect-discord");
                })
                .catch(err => {
                    toast.error(err.response?.data.message.general[0]);
                });
        } catch (err) {
            toast.error("Unexpected Error occured");
        }
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
                                                    onBlur={(e: any) => {
                                                        if (
                                                            e.target.value
                                                                .length > 0
                                                        ) {
                                                            setOtherEndgoal([
                                                                ...otherEndgoal,
                                                                e.target.value
                                                            ]);
                                                            e.target.value = "";
                                                        }
                                                    }}
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
                    <h1>Your dynamic area of interest! </h1>
                    <p className={styles.subText}>
                        Please select your interested area
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
                                    <div className={styles.content}>
                                        <img
                                            className={styles.itemImage}
                                            src={interest.img}
                                            alt=""
                                        />
                                        <p className={styles.title}>
                                            {interest.title}
                                        </p>
                                    </div>
                                    <div
                                        className={styles.infoButton}
                                        onClick={e => {
                                            e.stopPropagation();
                                        }}
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
                                    <div className={styles.interestInfo}>
                                        <h4>This category includes:</h4>
                                        <ul>
                                            {(interestGroups as any)[
                                                interest.value
                                            ]?.map((group: any) => (
                                                <li key={group.id}>
                                                    {group.name}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
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
                                                        onBlur={(e: any) => {
                                                            if (
                                                                e.target.value
                                                                    .length > 0
                                                            ) {
                                                                setOtherInterest(
                                                                    [
                                                                        ...otherInterest,
                                                                        e.target
                                                                            .value
                                                                    ]
                                                                );
                                                                e.target.value =
                                                                    "";
                                                            }
                                                        }}
                                                        separators={[","]}
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
