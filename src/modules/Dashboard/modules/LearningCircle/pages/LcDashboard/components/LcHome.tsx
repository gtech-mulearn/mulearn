import { Dispatch, SetStateAction, useState } from "react";
import styles from "../LcDashboard.module.css";
import { EditLogo, RightArrow } from "../../../assets/svg";
import LcReport from "./LcReport";
import LcHistory from "./LcHistory";
import LcSchedule from "./LcSchedule";
import {
    convertDateToDayAndMonthAndYear,
    convertToFormatedDate
} from "../../../../../utils/common";
import { getNextMeetingDate } from "../utils/LcNextMeet";
import LcCheckList from "./LcCheckList";
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
    const nextMeet = getNextMeetingDate(
        props.lc?.day || [],
        props.lc?.meet_time === null ? "00:00" : String(props.lc?.meet_time)
    );

    const [selectedMeeting, setSelectedMeeting] = useState("");

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
                            isTeam: false,
                            isSchedule: false
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
            {props.temp.isReport ? (
                <LcReport setTemp={props.setTemp} id={props.id} lc={props.lc} />
            ) : props.temp.isHistory ? (
                <LcHistory id={selectedMeeting} lc={props.lc} />
            ) : (
                <div className={styles.ContentWrapper}>
                    <div className={styles.TopContainer}>
                        <div className={styles.sectionOne}>
                            {props.temp.isSchedule ? (
                                <LcSchedule
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
                                                    isSchedule: true
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
                                        {props.lc?.meet_time && (<button
                                            onClick={() => {
                                                props.setTemp(prev => ({
                                                    ...prev,
                                                    isReport: true
                                                }));
                                            }}
                                        >
                                            Report
                                        </button>)}
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
                            {props.lc?.previous_meetings.map(
                                (report, index) => (
                                    <div
                                        className={styles.HistoryDivWrapper}
                                        onClick={() => {
                                            props.setTemp({
                                                ...props.temp,
                                                isReport: false,
                                                isHistory: true
                                            });
                                            setSelectedMeeting(report.id);
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
                                )
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LcHome;
