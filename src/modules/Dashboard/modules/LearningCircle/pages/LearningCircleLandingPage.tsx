import styles from "./LearningCircle.module.css";
import imageTop from "../assets/images/LC2.webp";
import imageBottom from "../assets/images/LC3.webp";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { getUserLearningCircles } from "../services/LearningCircleAPIs";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

const LearningCircleLandingPage = () => {
    const navigate = useNavigate();
    const [userCircleList, setUserCircleList] = useState<LcType[]>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getUserLearningCircles(setUserCircleList).then(() => {
            setIsLoading(false);
        });
    }, []);

    const handleJoin = () => {
        navigate("/dashboard/learning-circle/find-circle");
    };

    const handleCreate = () => {
        navigate("/dashboard/learning-circle/create-circle");
    };

    return (
        <>
            {isLoading ? (
                <div className={styles.loader_container}>
                    <MuLoader />
                </div>
            ) : (
                <div className={styles.learningCircleLandingPage}>
                    <div className={styles.headContent}>
                        <img src={imageTop} alt="image" loading="eager" />
                        <div className={styles.learningCircleLandingPageDesc}>
                            <h1>Learn, share, together</h1>
                            <b>
                                A fantastic way to spend a small amount of time
                                learning about new things with a group of people
                                with same interests!
                            </b>
                            <div
                                className={
                                    styles.learningCircleLandingPageButton
                                }
                            >
                                <PowerfulButton
                                    children="Join"
                                    style={{
                                        paddingLeft: "2rem",
                                        paddingRight: "2rem"
                                    }}
                                    onClick={handleJoin}
                                />
                                <PowerfulButton
                                    children="Create"
                                    variant="outline"
                                    onClick={handleCreate}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={styles.learningCircleLandingPageMiddle}>
                        <ul
                            className={
                                styles.learningCircleLandingPageAccordion
                            }
                        >
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
                                                        `/dashboard/learning-circle/details/${circle.id}`
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
                                <div
                                    className={
                                        styles.learningCircleLandingPageMiddle
                                    }
                                >
                                    <img
                                        src={imageBottom}
                                        alt="You haven't joined any circles yet"
                                        loading="eager"
                                        className={styles.desaturate}
                                    />
                                    <b>Nothing yet!</b>
                                    <p>
                                        You haven't joined any learning circles
                                        yet.
                                    </p>
                                </div>
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default LearningCircleLandingPage;