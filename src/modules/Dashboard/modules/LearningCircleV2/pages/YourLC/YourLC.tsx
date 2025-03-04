import { useEffect, useState } from "react";
import styles from "./YourLC.module.css";
import {
    getCreatedLearningCircles,
    getMeetups
} from "../../services/LearningCircleAPIs";
import { useNavigate } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import { convertDateToDayAndMonthAndYear } from "../../../../utils/common";
import { FiChevronLeft } from "react-icons/fi";
import { CircleMeetupInfo, LearningCircleInfoBasic } from "../../services/LearningCircleInterface";

export default function YourLC() {
    const [createdLearningCirlces, setCreatedLearningCirlces] = useState<
        LearningCircleInfoBasic[]
    >([]);
    const [savedLearningCircles, setSavedLearningCircles] = useState<
        CircleMeetupInfo[]
    >([]);
    const [participatedLearningCircles, setParticipatedLearningCircles] =
        useState<CircleMeetupInfo[]>([]);

    const [curpage, setCurPage] = useState(0);
    const navigate = useNavigate();
    useEffect(() => {
        if (curpage == 0 && createdLearningCirlces.length == 0) {
            getCreatedLearningCircles().then(res => {
                setCreatedLearningCirlces(res);
            });
        } else if (curpage == 1 && savedLearningCircles.length == 0) {
            getMeetups(null, true).then(res => {
                setSavedLearningCircles(res);
            });
        } else if (curpage == 2 && participatedLearningCircles.length == 0) {
            getMeetups(null, false, true).then(res => {
                setParticipatedLearningCircles(res);
            });
        }
    }, [curpage]);

    return (
        <div className={styles.container}>
            <div
                className={styles.backLink}
                onClick={() => {
                    navigate(-1);
                }}
            >
                <FiChevronLeft />
                <span>Learning Circles</span>
            </div>
            <div className={styles.SwitchNav}>
                <button
                    className={
                        styles.items + " " + (curpage == 0 ? styles.active : "")
                    }
                    onClick={() => setCurPage(0)}
                >
                    Created
                </button>
                <button
                    className={
                        styles.items + " " + (curpage == 1 ? styles.active : "")
                    }
                    onClick={() => setCurPage(1)}
                >
                    Saved Meetups
                </button>
                <button
                    className={
                        styles.items + " " + (curpage == 2 ? styles.active : "")
                    }
                    onClick={() => setCurPage(2)}
                >
                    Participated Meetups
                </button>
            </div>
            {curpage == 0 ? (
                <div className={styles.yourLC}>
                    <h1>Learning Circles created by you</h1>
                    <div className={styles.learningCircles}>
                        {createdLearningCirlces
                            .filter(lc => lc.is_recurring)
                            .map(lc => {
                                return (
                                    <div
                                        key={lc.id}
                                        className={styles.learningCircle}
                                        onClick={() => {
                                            navigate(
                                                `/dashboard/learningcircle/dashboard/${lc.id}`
                                            );
                                        }}
                                    >
                                        <div className={styles.content}>
                                            <div className={styles.badge}>
                                                {convertDateToDayAndMonthAndYear(
                                                    new Date(
                                                        lc.next_meetup.meet_time
                                                    )
                                                        .toISOString()
                                                        .split("T")[0]
                                                )}
                                            </div>
                                            <div className={styles.info}>
                                                <h2>{lc.ig}</h2>
                                                <h3>{lc.recurrence_type}</h3>
                                            </div>
                                        </div>
                                        <BiChevronRight
                                            className={styles.rightIcon}
                                        />
                                    </div>
                                );
                            })}
                    </div>
                </div>
            ) : (
                <div className={styles.yourLC}>
                    <h1>
                        {curpage == 1
                            ? "Saved Learning Circles"
                            : "Participated Learning Circle"}
                    </h1>
                    <div className={styles.learningCircles}>
                        {(curpage == 1
                            ? savedLearningCircles
                            : participatedLearningCircles
                        ).map(meetup => {
                            return (
                                <div
                                    key={meetup.id}
                                    className={styles.learningCircle}
                                    onClick={() => {
                                        navigate(
                                            `/dashboard/learningcircle/meetup/${meetup.id}`
                                        );
                                    }}
                                >
                                    <div className={styles.content}>
                                        <div className={styles.badge}>
                                            {convertDateToDayAndMonthAndYear(
                                                new Date(meetup.meet_time)
                                                    .toISOString()
                                                    .split("T")[0]
                                            )}
                                        </div>
                                        <div className={styles.info}>
                                            <h2>{meetup.title}</h2>
                                            <h3>{meetup.meet_place}</h3>
                                        </div>
                                    </div>
                                    <BiChevronRight
                                        className={styles.rightIcon}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
