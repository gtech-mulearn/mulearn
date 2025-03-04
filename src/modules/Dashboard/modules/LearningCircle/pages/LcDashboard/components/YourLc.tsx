import styles from "../../LearningCircle.module.css";
import imageBottom from "../../../assets/images/LC3.webp";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { getUserLearningCircles } from "../../../services/LearningCircleAPIs";

const YourLc = ({ userCircleList }: { userCircleList: LcType[] }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.ContentWrapper}>
            <div className={styles.learningCircleLandingPageMiddle}>
                <ul className={styles.learningCircleLandingPageAccordion}>
                    {userCircleList && userCircleList.length > 0 ? (
                        <>
                            <b>Your learning circles</b>
                            {userCircleList?.map((circle, pos) => (
                                <div key={pos}>
                                    <li
                                        className={
                                            styles.learningCircleLandingPageMainList
                                        }
                                        onClick={() => {
                                            navigate(
                                                `/dashboard/learning-circle/dashboard/${circle.id}`
                                            );
                                        }}
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
                                                >
                                                    {`${pos + 1}.`}
                                                </p>
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
                                                    {circle.ig}
                                                </p>
                                                <PowerfulButton
                                                    style={{
                                                        height: "2rem",
                                                        width: "fit-content",
                                                        padding: "10px"
                                                    }}
                                                    onClick={() => {
                                                        navigate(
                                                            `/dashboard/learning-circle/dashboard/${circle.id}`
                                                        );
                                                    }}
                                                >
                                                    <BsChevronRight />
                                                </PowerfulButton>
                                            </div>
                                        </label>
                                    </li>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className={styles.learningCircleLandingPageMiddle}>
                            <img
                                src={imageBottom}
                                alt="You haven't joined any circles yet"
                                loading="eager"
                                className={styles.desaturate}
                            />
                            <b>Nothing yet!</b>
                            <p>You haven't joined any learning circles yet.</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default YourLc;
