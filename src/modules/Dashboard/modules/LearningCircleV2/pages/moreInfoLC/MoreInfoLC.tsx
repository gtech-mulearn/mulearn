import styles from "./MoreInfoLC.module.css";
import { FiChevronLeft } from "react-icons/fi";
import { CiLocationOn, CiClock2 } from "react-icons/ci";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getMeetupInfo,
    joinMeetup,
    unsaveMeetup
} from "../../services/LearningCircleAPIs";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import { FaBookmark } from "react-icons/fa";
import {
    getLocalDateTimeFormatted,
    getLocalDateTimeObject
} from "../../../../utils/common";
import { m } from "framer-motion";
import { CircleMeetupInfo } from "../../services/LearningCircleInterface";

export default function MoreInfoLC() {
    const navigate = useNavigate();
    const [meetup, setMeetup] = useState<CircleMeetupInfo | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meetCode, setMeetCode] = useState("");
    const params = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        var code = searchParams.get("code");
        if (code) {
            setMeetCode(code);
        }
        getMeetupInfo(params.id ?? "").then(res => {
            setMeetup(res as any);
        });
    }, []);
    const handleMainButton = () => {
        if (meetup?.attendee?.is_report_submitted) {
            navigate(`/dashboard/learningcircle/report/${meetup.id}`);
        }
        if (meetup?.is_started) {
            if (meetup.attendee && meetup.attendee.is_joined) {
                if (!meetup.attendee.is_report_submitted) {
                    navigate(
                        `/dashboard/learningcircle/attendee-report/${meetup.id}`
                    );
                }
            } else {
                if (meetCode) {
                    handleJoin();
                    setMeetup({
                        ...meetup,
                        attendee: {
                            ...(meetup.attendee as any),
                            is_joined: 1
                        }
                    });
                    return;
                }
                setIsModalOpen(true);
            }
        } else {
            navigate(`/dashboard/learningcircle/meetup/${meetup?.id}`);
        }
    };
    const saveMeetup = (meetId: string) => {
        if (meetup?.attendee) {
            unsaveMeetup(meetId).then(res => {
                if (res) {
                    setMeetup({
                        ...meetup,
                        attendee: null
                    });
                }
            });
            return;
        }
        joinMeetup(meetId).then(res => {
            setIsModalOpen(false);
            if (res && meetup) {
                setMeetup({
                    ...meetup,
                    attendee: {
                        is_joined: true,
                        is_lc_approved: false,
                        is_report_submitted: false
                    }
                });
            }
        });
    };

    const handleJoin = () => {
        joinMeetup(meetup?.id ?? "", meetCode).then(res => {
            setIsModalOpen(false);
        });
    };

    return (
        <>
            <MuModal
                type="success"
                onDone={() => {
                    handleJoin();
                }}
                onClose={() => {
                    setIsModalOpen(false);
                }}
                title="Enter Join Code"
                isOpen={isModalOpen}
            >
                <span className={styles.joinInfo}>
                    Enter the 6 digit join code provided by the organizers to
                    join the meetup.
                </span>
                <input
                    className={styles.joinCodeInput}
                    placeholder="Enter Join Code"
                    maxLength={6}
                    value={meetCode}
                    onChange={e => {
                        e.preventDefault();
                        setMeetCode(e.target.value.toLocaleUpperCase());
                    }}
                />
            </MuModal>
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
                <div>
                    <div className={styles.card}>
                        <div className={styles.cardHeaderContent}>
                            <div className={styles.headerSection}>
                                <div>
                                    <h1 className={styles.title}>
                                        {meetup?.title}
                                    </h1>
                                    <div className={styles.locationWrapper}>
                                        <div className={styles.iconWrapper}>
                                            <CiLocationOn />
                                            <span>{meetup?.meet_place}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className={styles.moreButton}>
                                    <i className="bi bi-three-dots-vertical"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.dateTime}>
                                <h2 className={styles.date}>22 June 2023</h2>
                                <div className={styles.time}>
                                    <CiClock2 />
                                    <span>
                                        {getLocalDateTimeObject(
                                            meetup?.meet_time ?? ""
                                        ).getHours()}
                                        {":"}
                                        {getLocalDateTimeObject(
                                            meetup?.meet_time ?? ""
                                        ).getMinutes()}{" "}
                                        {getLocalDateTimeObject(
                                            meetup?.meet_time ?? ""
                                        ).getHours() > 12
                                            ? "PM"
                                            : "AM"}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.descriptionSection}>
                                {meetup?.is_report_needed ? (
                                    <>
                                        <h3 className={styles.sectionTitle}>
                                            What we are planning to do?
                                        </h3>
                                        <p className={styles.description}>
                                            {meetup?.report_description}
                                        </p>
                                    </>
                                ) : null}
                            </div>
                            <div className={styles.buttonWrapper}>
                                <PowerfulButton
                                    variant={
                                        meetup?.attendee ? "primary" : "outline"
                                    }
                                    onClick={() => {
                                        saveMeetup(meetup?.id ?? "");
                                    }}
                                >
                                    <FaBookmark
                                        style={{
                                            color: meetup?.attendee
                                                ? "white"
                                                : "blue"
                                        }}
                                        className={styles.bookmarkIcon}
                                    />
                                </PowerfulButton>
                            </div>
                            <div className={styles.buttonWrapper}>
                                {meetup?.is_started && (
                                    <PowerfulButton
                                        onClick={() => {
                                            handleMainButton();
                                        }}
                                    >
                                        {meetup?.attendee &&
                                        meetup?.attendee.is_joined
                                            ? meetup?.attendee
                                                  .is_report_submitted
                                                ? "Report Submitted"
                                                : "Submit Report"
                                            : "Join Now"}
                                    </PowerfulButton>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
