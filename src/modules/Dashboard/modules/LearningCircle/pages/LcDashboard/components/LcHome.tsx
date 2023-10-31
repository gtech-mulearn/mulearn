import { Dispatch, SetStateAction, useState } from "react";
import styles from "../LcDashboard.module.css";
import { EditLogo, RightArrow } from "../../../assets/svg";
import { CheckBoxContainer } from "../LcDashboard";
import LcReport from "./LcReport";
import LcHistory from "./LcHistory";
import LcSchedule from "./LcSchedule";
import { comingSoon } from "../../../../../utils/common";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    temp: LcDashboardTempData;
    lc: LcDetail | undefined;
};

const LcHome = (props: Props) => {
    const [schedule, setSchedule] = useState();
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
                <LcReport setTemp={props.setTemp} temp={props.temp} />
            ) : props.temp.isHistory ? (
                <LcHistory setTemp={props.setTemp} temp={props.temp} />
            ) : (
                <div className={styles.ContentWrapper}>
                    <div className={styles.TopContainer}>
                        <div className={styles.sectionOne}>
                            {props.temp.isSchedule ? (
                                <LcSchedule setTemp={props.setTemp} lc={props.lc} />
                            ) : (
                                <>
                                    <div className={styles.divOne}>
                                        <div>
                                            <p>Next meeting on</p>
                                            <h1>22 June 2023</h1>
                                            <p>Sunday</p>
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
                                            <p>Venue: Multipurpose Hall</p>
                                            <p>
                                                Time: {props.lc?.meet_time} PM
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
                                <CheckBoxContainer />
                            </div>
                            <button onClick={comingSoon}>+</button>
                        </div>
                    </div>
                    <div className={styles.BottomContainer}>
                        <p>Your past meetings</p>
                        <div>
                            <div className={styles.HistoryDivWrapper}>
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
                                    <button
                                        onClick={() => {
                                            props.setTemp({
                                                ...props.temp,
                                                isReport: false,
                                                isHistory: true
                                            });
                                        }}
                                    >
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