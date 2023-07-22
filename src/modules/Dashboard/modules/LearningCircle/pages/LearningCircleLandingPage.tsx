import styles from "./LearningCircle.module.css";
import imageTop from "../assets/images/LC2.png";
import imageBottom from "../assets/images/LC3.png";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";

export type circleListELement = {
    name: string;
    type: string;
};

export const LearningCircleLandingPage = () => {
    const navigate = useNavigate();
    const [userCircleList, setUserCircleList] = useState<circleListELement[]>();

    useEffect(() => {
        // getUserLearningCircles(setUserCircleList)
    }, []);

    const handleJoin = () => {
        navigate("/learning-circle/find-circle");
    };

    const handleCreate = () => {
        navigate("/learning-circle/create-circle");
    };

    return (
        <>
            <div className={styles.learningCircleLandingPage}>
                <div className={styles.headContent}>
                    <img src={imageTop} alt="image" />
                    <div className={styles.learningCircleLandingPageDesc}>
                        <h1>Learn, share, together</h1>
                        <b style={{ fontWeight: "600" , width:"80%"}}>
                            A fantastic way to spend a small amount of time learning
                            about new things 
                            with a group of people with same interests!
                        </b>
                        <div className={styles.learningCircleLandingPageButton}>
                            <PowerfulButton
                                text={"Join"}
                                padding="0.3rem 2rem"
                                onButtonClick={handleJoin}
                            />
                            <PowerfulButton
                                text={"Create"}
                                backgroundColor="white"
                                color="#456FF6"
                                padding="0.3rem 1.5rem"
                                onHoverBackground="#456FF6"
                                onButtonClick={handleCreate}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.learningCircleLandingPageMiddle}>
                    <ul className={styles.learningCircleLandingPageAccordion}>
                        {userCircleList ? (
                            <>
                            <b>Your learning circles</b>
                                {userCircleList.map((circle, pos) => (
                                    <>
                                        <li className={styles.learningCircleLandingPageMainList}>
                                            <input
                                                className={styles.learningCircleLandingPageExpandBtn}
                                                type="radio"
                                                name="accordion"
                                                id={circle.name}
                                            />
                                            <label htmlFor={circle.name}
                                                className={styles.learningCircleLandingPageLevel}>
                                                <div>
                                                    <p className={styles.learningCircleLandingPagePara}>
                                                        {`${pos}.`}</p>
                                                    <p className={styles.learningCircleLandingPagePara}>
                                                        {circle.name}
                                                    </p>
                                                </div>
                                                <div>
                                                    <p className={styles.learningCircleLandingPagePara}>
                                                        {circle.type}
                                                    </p>
                                                    <button className={styles.learningCircleLandingPageBtn}>
                                                        <BsChevronRight className={[].join(" ")}/>
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
            </div>
        </>
    );
};