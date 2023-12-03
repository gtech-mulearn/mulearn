import styles from "./LearningCircle.module.css";
import imageTop from "../assets/images/LC2.webp";
import imageBottom from "../assets/images/LC3.webp";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { getUserLearningCircles } from "../services/LearningCircleAPIs";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import i18next from "i18next";
import LanguageSwitcher from "../../LanguageSwitcher/LanguageSwitcher";
import { getFontSizeForLanguage } from "../../LanguageSwitcher/LanguageSwitcher";
import { useTranslation } from "react-i18next";

const LearningCircleLandingPage = () => {

    const { t } = useTranslation(["LearningCircle"]);

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
                            <h1>{t("MainHeading")}</h1>
                            <b>
                            {t("MainDescription")}
                            </b>
                            <div
                                className={
                                    styles.learningCircleLandingPageButton
                                }
                            >
                                <PowerfulButton
                                    children={t("Join")}
                                    style={{
                                        paddingLeft: "2rem",
                                        paddingRight: "2rem"
                                    }}
                                    onClick={handleJoin}
                                />
                                <PowerfulButton
                                    children={t("Create")}
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
                                    <b>{t("Yourlearningcircles")}</b>
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
                                    <b>{t("Nothingyet")}</b>
                                    <p>
                                        {t("NotJoined")}
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
