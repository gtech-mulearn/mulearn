import styles from "../../LearningCircle.module.css";
import imageBottom from "../../../assets/images/LC3.webp";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BsChevronRight } from "react-icons/bs";
import { getMeetups } from "../../../services/LearningCircleAPIs";
import toast from "react-hot-toast";
import { convertToFormatedDate } from "../../../../../utils/common";
import {
    convert24to12,
    extract24hTimeFromDateTime
} from "../../../services/utils";
import Select from "react-select";

const LcMeetups = ({ user_id }: { user_id: string | null }) => {
    const navigate = useNavigate();
    const [meetups, setMeetups] = useState<LcMeetupInfo[]>();
    const [selectedCategory, setSelectedCategories] = useState<{
        label: string;
        value: string;
    }>();
    useEffect(() => {
        getMeetups(
            setMeetups,
            undefined,
            user_id ? user_id : undefined,
            selectedCategory?.value == "all"
                ? undefined
                : selectedCategory?.value
        )
            .then(() => {})
            .catch(error => {
                console.log(error);
                toast.error("Failed to fetch meetups");
            });
    }, [user_id, selectedCategory]);
    const categories = [
        { label: "All Categories", value: "all" },
        { label: "Coder", value: "coder" },
        { label: "Hardware", value: "hardware" },
        { label: "Manager", value: "manager" },
        { label: "Creative", value: "creative" }
    ];

    return (
        <div className={styles.ContentWrapper}>
            <div className={styles.learningCircleLandingPageMiddle}>
                <ul className={styles.learningCircleLandingPageAccordion}>
                    {meetups && meetups.length > 0 ? (
                        <>
                            <b>Meetups</b>
                            <Select
                                placeholder="Category"
                                options={categories}
                                value={
                                    categories.filter(
                                        cate =>
                                            cate.value ===
                                            selectedCategory?.value
                                    )[0]
                                }
                                onChange={val => {
                                    setSelectedCategories(val as any);
                                }}
                                isLoading={false}
                            />
                            <div className={styles.meetupGrid}>
                                {meetups.map((meetup, pos) => (
                                    <div
                                        key={pos}
                                        className={styles.meetupCard}
                                    >
                                        <h2 className={styles.meetupTitle}>
                                            {meetup.title}
                                        </h2>
                                        <div className={styles.tags}>
                                            <p className={styles.tag}>
                                                {convertToFormatedDate(
                                                    meetup.meet_time
                                                ) +
                                                    " " +
                                                    convert24to12(
                                                        extract24hTimeFromDateTime(
                                                            meetup.meet_time
                                                        )
                                                    )}
                                            </p>
                                            <p className={styles.tag}>
                                                {meetup.is_online
                                                    ? "Online"
                                                    : "Offline"}
                                            </p>
                                            <p className={styles.tag}>
                                                {meetup.meet_place}
                                            </p>
                                        </div>
                                        <p className={styles.meetupAgenda}>
                                            {meetup.agenda.slice(0, 150) +
                                                "..."}
                                        </p>
                                        <div className={styles.buttons}>
                                            {/* <a href={meetup.location}>
                                                Meetup Link
                                            </a> */}
                                            <PowerfulButton
                                                style={{
                                                    paddingLeft: "1rem",
                                                    paddingRight: "1rem",
                                                    fontSize: "12px",
                                                    width: "100%"
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
