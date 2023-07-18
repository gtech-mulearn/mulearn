import styles from "./LearningCircle.module.css";
import imageTop from "../assets/images/LC2.png";
import imageBottom from "../assets/images/LC3.png";
import { PowerfulButton } from "@Mulearn/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserLearningCircles } from "../services/LearningCircleAPIs";

type circleListELement = {
    name: string;
    type: string;
};

export const LearningCircleLandingPage = () => {
    const navigate = useNavigate();
    const [userCircleList, setUserCircleList] = useState("");
    const learningCircles: [circleListELement] | null = [
        { name: "UX World", type: "UI/UX" }
    ];

    useEffect(() => {
		getUserLearningCircles(setUserCircleList)
	}, []);

    const handleJoin = () => {
        navigate("/learning-circle/find-circle");
    };

    const handleCreate = () => {
        navigate("/learning-circle/create-circle");
    };

    return (
        <>
            <div className={styles.learningCircleLandingPageContent}>
                <img src={imageTop} alt="image" />
                <div className={styles.learningCircleLandingPageDesc}>
                    <h3>Learn,share,together</h3>
                    <p>
                        {" "}
                        A fantastic way to spend a small amount of time learning
                        about new things
                        <br /> with a group of people with same interests!
                    </p>
                    <div className={styles.learningCircleLandingPageButton}>
                        <PowerfulButton
                            text={"Join"}
                            padding="0.3rem 1.6rem"
                            onButtonClick={handleJoin}
                        />
                        <PowerfulButton
                            text={"Create"}
                            backgroundColor="white"
                            color="#456FF6"
                            padding="0.3rem 0.7rem"
                            onHoverBackground="#456FF6"
                            onButtonClick={handleCreate}
                        />
                    </div>
                </div>
            </div>
            <div className={styles.learningCircleLandingPageMiddle}>
                <ul className={styles.learningCircleLandingPageAccordion}>
                    <h2>Your learning circles</h2>

                    {learningCircles ? (
                        <>
                            {learningCircles.map((circle, pos) => (
                                <>
                                    <li
                                        className={
                                            styles.learningCircleLandingPageMainList
                                        }
                                    >
                                        <input
                                            className={
                                                styles.learningCircleLandingPageExpandBtn
                                            }
                                            type="radio"
                                            name="accordion"
                                            id={circle.name}
                                        />
                                        <label
                                            htmlFor={circle.name}
                                            className={
                                                styles.learningCircleLandingPageLevel
                                            }
                                        >
                                            <div>
                                                <p
                                                    className={
                                                        styles.learningCircleLandingPagePara
                                                    }
                                                >{`${pos}.`}</p>
                                                <p
                                                    className={
                                                        styles.learningCircleLandingPagePara
                                                    }
                                                >
                                                    {circle.name}
                                                </p>
                                            </div>
                                            <div>
                                                <p
                                                    className={
                                                        styles.learningCircleLandingPagePara
                                                    }
                                                >
                                                    {circle.type}
                                                </p>
                                                <button
                                                    className={
                                                        styles.learningCircleLandingPageBtn
                                                    }
                                                >
                                                    <i
                                                        className={[
                                                            styles["fa-solid"],
                                                            styles[
                                                                "fa-chevron-right"
                                                            ]
                                                        ].join(" ")}
                                                    ></i>
                                                </button>
                                            </div>
                                        </label>
                                    </li>
                                </>
                            ))}
                        </>
                    ) : (
                        <div className={styles.learningCircleLandingPageMiddle}>
                            <img
                                src={imageBottom}
                                alt="You haven't joined any circles yet"
                            />
                        </div>
                    )}
                </ul>
            </div>
        </>
    );
};