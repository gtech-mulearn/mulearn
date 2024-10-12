import styles from "../../LearningCircle.module.css";
import imageBottom from "../../../assets/images/LC3.webp";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { getMeetups } from "../../../services/LearningCircleAPIs";
import toast from "react-hot-toast";

const LcMeetups = () => {
    const navigate = useNavigate();
    const [meetups, setMeetups] = useState<LcMeetupInfo[]>();
    useEffect(() => {
        getMeetups(setMeetups)
            .then(() => {})
            .catch(error => {
                console.log(error);
                toast.error("Failed to fetch meetups");
            });
    }, []);

    return (
        <div className={styles.ContentWrapper}>
            <div className={styles.learningCircleLandingPageMiddle}>
                <ul className={styles.learningCircleLandingPageAccordion}>
                    {meetups && meetups.length > 0 ? (
                        <>
                            <b>Meetups</b>
                            <div className={styles.meetupGrid}>
                                {meetups.map((meetup, pos) => (
                                    <div
                                        key={pos}
                                        className={styles.meetupCard}
                                    >
                                        <h2 className={styles.meetupTitle}>
                                            {meetup.title}
                                        </h2>
                                        <p className={styles.meetupLocation}>
                                            Location: {meetup.location}
                                        </p>
                                        <p className={styles.meetupTime}>
                                            Time: {meetup.meet_time}
                                        </p>
                                        <p className={styles.meetupPlace}>
                                            Place: {meetup.meet_place}
                                        </p>
                                        <p className={styles.meetupAgenda}>
                                            Agenda: {meetup.agenda}
                                        </p>
                                        <p className={styles.meetupPreReq}>
                                            Pre-requirements:{" "}
                                            {meetup.pre_requirements || "None"}
                                        </p>
                                        <p className={styles.meetupLocation}>
                                            <a href={meetup.location}>
                                                {meetup.location}
                                            </a>
                                        </p>
                                        <PowerfulButton
                                            style={{
                                                paddingLeft: "2rem",
                                                paddingRight: "2rem"
                                            }}
                                            onClick={() => {
                                                navigate(
                                                    `/dashboard/learning-circle/meetup/${meetup.id}`
                                                );
                                            }}
                                        >
                                            More info <BsChevronRight />
                                        </PowerfulButton>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className={styles.learningCircleLandingPageMiddle}>
                            <img
                                src={imageBottom}
                                alt="No meetups"
                                loading="eager"
                                className={styles.desaturate}
                            />
                            <b>No Meetups!</b>
                            <p>No meetups are currently running now</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default LcMeetups;
