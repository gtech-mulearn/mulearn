import { Dispatch, SetStateAction, useState } from "react";
import styles from "../LcDashboard.module.css";
import { EditLogo, RightArrow } from "../../../assets/svg";
import LcReport from "./LcReport";
import LcHistory from "./LcHistory";
import LcSchedule from "./LcSchedule";
import { comingSoon } from "../../../../../utils/common";
import { getNextMeetingDate } from "../utils/LcNextMeet";
import LcCheckList from "./LcCheckList";

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
                <LcHistory setTemp={props.setTemp} temp={props.temp} />
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
                                        <div>
                                            <p>Next meeting on</p>
                                            <h1>{nextMeet?.formattedDate}</h1>
                                            <p>
                                                {nextMeet?.nextMeetingDayName}
                                            </p>
                                        </div>
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
                                            <p>Venue: {props.lc?.meet_place}</p>
                                            <p>
                                                Time: {nextMeet?.formattedTime}
                                            </p>
                                        </div>
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
                        <p>Your past meetings</p>
                        <div>
                            <div
                                className={styles.HistoryDivWrapper}
                                onClick={() => {
                                    props.setTemp({
                                        ...props.temp,
                                        isReport: false,
                                        isHistory: true
                                    });
                                }}
                            >
                                <div>
                                    <p>1.</p>
                                    <p>22 Sunday 2023</p>
                                </div>
                                <div>
                                    <p
                                        style={{
                                            color: "rgba(69, 111, 246, 1)",
                                            fontWeight: 400,
                                            fontSize: "14px"
                                        }}
                                    >
                                        12.03pm
                                    </p>
                                    <button>
                                        <RightArrow />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LcHome;