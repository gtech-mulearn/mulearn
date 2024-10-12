import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../LcDashboard.module.css";
import { CalenderIcon, EditLogo, RightArrow } from "../../../assets/svg";
import LcReport from "./LcReport";
import { convertToFormatedDate } from "../../../../../utils/common";
import LcMeetCreate from "./LcMeetCreate";
import { getLcMeetups } from "../../../services/LearningCircleAPIs";
import toast from "react-hot-toast";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import {
    convert24to12,
    extract24hTimeFromDateTime
} from "../../../services/utils";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    temp: LcDashboardTempData;
    lc: LcDetail | undefined;
    id: string | undefined;
};

const LcHome = (props: Props) => {
    const [meetups, setMeetups] = useState<LcMeetupInfo[]>([]);
    const [pastMeetups, setPastMeetups] = useState<LcMeetupInfo[]>([]);
    const [selectedMeeting, setSelectedMeeting] = useState<string>("");
    useEffect(() => {
        getLcMeetups(props.id ?? "").then(res => {
            if (res) {
                if (res.hasError) {
                    toast.error(res.message.general[0]);
                } else {
                    setMeetups(res.meetups);
                    setPastMeetups(res.past);
                }
            }
        });
    }, [props.lc]);
    const navigate = useNavigate();
    return (
        <div className={styles.ContainerWrapper}>
            <div className={styles.SwitchNav}>
                <button
                    className={styles.items + " " + styles.active}
                    onClick={() =>
                        props.setTemp({
                            ...props.temp,
                            isReport: false,
                            isHistory: false,
                            isTeam: false
                            // isSchedule: false
                        })
                    }
                >
                    Meet
                </button>
                <button
                    className={styles.items}
                    onClick={() =>
                        props.setTemp({
                            ...props.temp,
                            isTeam: true
                        })
                    }
                >
                    Team
                </button>
            </div>
            <div className={styles.ContentWrapper}>
                <div className={styles.TopContainer}>
                    <div className={styles.sectionOne}>
                        {props.temp.isReport ? (
                            <LcReport
                                setTemp={props.setTemp}
                                id={selectedMeeting}
                                lc={props.lc}
                            />
                        ) : props.temp.isCreateMeeting ? (
                            <LcMeetCreate
                                setTemp={props.setTemp}
                                lc={props.lc}
                                id={props.id}
                            />
                        ) : (
                            <>
                                <div className={styles.meetups}>
                                    {meetups.length > 0 ? (
                                        meetups.map(meetup => (
                                            <div className={styles.meetup}>
                                                <div
                                                    className={
                                                        styles.meetupStatusBar
                                                    }
                                                >
                                                    <div
                                                        className={styles.date}
                                                    >
                                                        <span>
                                                            <CalenderIcon />
                                                        </span>
                                                        {convertToFormatedDate(
                                                            meetup.meet_time
                                                        )}
                                                    </div>
                                                    <div
                                                        className={
                                                            styles.status +
                                                            " " +
                                                            (meetup.is_started
                                                                ? styles.ongoing
                                                                : styles.upcoming)
                                                        }
                                                    >
                                                        {meetup.is_started
                                                            ? "Ongoing"
                                                            : "Upcoming"}
                                                    </div>
                                                </div>
                                                <div
                                                    className={
                                                        styles.meetupDetails
                                                    }
                                                >
                                                    <h1
                                                        className={styles.title}
                                                    >
                                                        {meetup.title}
                                                    </h1>
                                                    <p
                                                        className={
                                                            styles.agenda
                                                        }
                                                    >
                                                        {meetup.agenda}
                                                    </p>
                                                    <div
                                                        className={styles.venue}
                                                    >
                                                        <h2
                                                            className={
                                                                styles.venueHead
                                                            }
                                                        >
                                                            Venue Details
                                                        </h2>
                                                        <div
                                                            className={
                                                                styles.meetupVenue
                                                            }
                                                        >
                                                            <div>
                                                                <span>
                                                                    {
                                                                        meetup.meet_place
                                                                    }
                                                                </span>
                                                            </div>
                                                            <a
                                                                className={
                                                                    styles.venueLink
                                                                }
                                                                href={
                                                                    meetup.location
                                                                }
                                                            >
                                                                {
                                                                    meetup.location
                                                                }
                                                            </a>
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.actions
                                                            }
                                                        >
                                                            <PowerfulButton
                                                                variant="outline"
                                                                onClick={() => {
                                                                    props.setTemp(
                                                                        prev => ({
                                                                            ...prev,
                                                                            isReport:
                                                                                true
                                                                        })
                                                                    );
                                                                    setSelectedMeeting(
                                                                        meetup.id
                                                                    );
                                                                }}
                                                            >
                                                                Submit Report
                                                            </PowerfulButton>
                                                            <PowerfulButton
                                                                onClick={() => {
                                                                    navigate(
                                                                        "/dashboard/learning-circle/meetup/" +
                                                                            meetup.id
                                                                    );
                                                                }}
                                                            >
                                                                More Info
                                                            </PowerfulButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <>
                                            <div>
                                                <p className={styles.message}>
                                                    Next meeting not scheduled.
                                                    <br />
                                                    Kindly schedule a meeting.
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    props.setTemp(prev => ({
                                                        ...prev,
                                                        isCreateMeeting: true
                                                    }));
                                                }}
                                            >
                                                <EditLogo />
                                            </button>
                                        </>
                                    )}
                                </div>

                                {/* <div className={styles.secondDiv}>
                                <div>
                                    {props.lc?.meet_place && (
                                        <p>Venue: {props.lc?.meet_place}</p>
                                    )}
                                    {props.lc?.meet_time && (
                                        <p>Time: {nextMeet?.formattedTime}</p>
                                    )}
                                </div>
                                {props.lc?.meet_time && (
                                    <button
                                        onClick={() => {
                                            props.setTemp(prev => ({
                                                ...prev,
                                                isReport: true
                                            }));
                                        }}
                                    >
                                        Report
                                    </button>
                                )}
                            </div> */}
                            </>
                        )}
                    </div>
                    <div className={styles.BottomContainer}>
                        {props.lc?.previous_meetings &&
                            props.lc?.previous_meetings.length > 0 && (
                                <p>Your past meetings</p>
                            )}
                        <div>
                            {pastMeetups.map((report, index) => (
                                <div
                                    className={styles.HistoryDivWrapper}
                                    onClick={() => {
                                        navigate(
                                            "/dashboard/learning-circle/meetup/" +
                                                report.id
                                        );
                                    }}
                                >
                                    <div>
                                        <p>{index + 1}.</p>
                                        <p>
                                            {convertToFormatedDate(
                                                report.meet_time
                                            )}
                                        </p>
                                    </div>
                                    <div>
                                        <p
                                            style={{
                                                color: "rgba(69, 111, 246, 1)",
                                                fontWeight: 400,
                                                fontSize: "14px"
                                            }}
                                        >
                                            {convertToFormatedDate(
                                                report.meet_time
                                            )}{" "}
                                            {convert24to12(
                                                extract24hTimeFromDateTime(
                                                    report.meet_time
                                                )
                                            )}
                                        </p>
                                        <button>
                                            <RightArrow />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* {props.temp.isReport ? (
                <LcReport setTemp={props.setTemp} id={props.id} lc={props.lc} />
            ) : props.temp.isHistory ? (
                <LcHistory id={selectedMeeting} lc={props.lc} />
            ) : (
                <div className={styles.ContentWrapper}>
                    <div className={styles.TopContainer}>
                        <div className={styles.sectionOne}>
                            {props.temp.isCreateMeeting ? (
                                <LcMeetCreate
                                    setTemp={props.setTemp}
                                    lc={props.lc}
                                    id={props.id}
                                />
                            ) : (
                                <>
                                    <div className={styles.divOne}>
                                        {nextMeet &&
                                        props.lc?.meet_place &&
                                        props.lc?.meet_time ? (
                                            <div>
                                                <p>Next meeting on</p>
                                                <h1>
                                                    {nextMeet?.formattedDate}
                                                </h1>
                                                <p>
                                                    {
                                                        nextMeet?.nextMeetingDayName
                                                    }
                                                </p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className={styles.message}>
                                                    Next meeting not scheduled.
                                                    <br />
                                                    Kindly schedule a meeting.
                                                </p>
                                            </div>
                                        )}
                                        <button
                                            onClick={() => {
                                                props.setTemp(prev => ({
                                                    ...prev,
                                                    isCreateMeeting: true
                                                }));
                                            }}
                                        >
                                            <EditLogo />
                                        </button>
                                    </div>
                                    <div className={styles.secondDiv}>
                                        <div>
                                            {props.lc?.meet_place && (
                                                <p>
                                                    Venue:{" "}
                                                    {props.lc?.meet_place}
                                                </p>
                                            )}
                                            {props.lc?.meet_time && (
                                                <p>
                                                    Time:{" "}
                                                    {nextMeet?.formattedTime}
                                                </p>
                                            )}
                                        </div>
                                        {props.lc?.meet_time && (
                                            <button
                                                onClick={() => {
                                                    props.setTemp(prev => ({
                                                        ...prev,
                                                        isReport: true
                                                    }));
                                                }}
                                            >
                                                Report
                                            </button>
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                        <div className={styles.sectionTwo}>
                            <div>
                                <LcCheckList data={props.lc} />
                            </div>
                        </div>
                    </div>
                    <div className={styles.BottomContainer}>
                        {props.lc?.previous_meetings &&
                            props.lc?.previous_meetings.length > 0 && (
                                <p>Your past meetings</p>
                            )}
                        <div>
                            
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
};

export default LcHome;
