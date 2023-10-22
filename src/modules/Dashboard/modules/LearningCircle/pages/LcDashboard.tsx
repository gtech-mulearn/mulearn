import { style } from "d3";
import { EditLogo, RightArrow, ThreeDotssvg } from "../assets/svg";
import styles from "./LcDashboard.module.css";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {};

const LcDashboard = (props: Props) => {
    const [showReport, setShowReport] = useState("");

    return (
        <div className={styles.LCDashboardWrapper}>
            <div className={styles.TitleContainerWrapper}>
                <div className={styles.Title}>
                    <h1>UX world</h1>
                    <h3>LBS Institute of Technology for Women</h3>{" "}
                    <h3>Code: LBT</h3>
                </div>
                <div className={styles.RankSession}>
                    <div>
                        <h3>RANK</h3>
                        <h1>3</h1>
                        <h3>4.68K Karma</h3>
                    </div>
                    <button>
                        <ThreeDotssvg />
                    </button>
                </div>
            </div>
            <div className={styles.NavLink}>
                <button className={styles.active}>Dashboard</button>
                <button>IG Progress</button>
                <button>BeWeb.dev</button>
            </div>
            <div className={styles.ContainerWrapper}>
                <div className={styles.SwitchNav}>
                    <button className={styles.items + " " + styles.active}>
                        Meet
                    </button>
                    <button className={styles.items}>Team</button>
                    <button className={styles.plusItem}>+</button>
                </div>
                {showReport === "1" ? (
                    <div className={styles.ReportWrapper}>
                        <div>
                            <div>
                                <div>
                                    <p>Date</p>
                                    <input type="text" />
                                </div>
                                <div>
                                    <p>Time</p>
                                    <input type="text" />
                                </div>
                            </div>
                            <div>
                                <p>Agenda</p>
                                <input type="text" />
                            </div>
                            <div>
                                <p>Attendees</p>
                                <div>
                                    <div>
                                        <Attendees />
                                        <Attendees />
                                        <Attendees />
                                        <Attendees />
                                        <Attendees />
                                    </div>
                                    <button>+</button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <p>Upload Meeting Images</p>
                                <input type="text" />
                            </div>
                            <button>Submit</button>
                        </div>
                    </div>
                ) : showReport === "2" ? (
                    <div>
                        <div>
                            <div>
                                <div>
                                    <h1>22 June 2023</h1>
                                    <p>Sunday</p>
                                </div>
                                <div>
                                    <p>Venue: Multipurpose Hall</p>
                                    <p>Time: 12:45 PM</p>
                                </div>
                            </div>
                            <div>
                                <h1>Agenda</h1>
                                <p>
                                    Lorem Ipsum is simply dummy text of the
                                    printing and typesetting industry. Lorem
                                    Ipsum has been the industry's standard dummy
                                    text ever since the 1500 Lorem Ipsum is
                                    simply dummy text of the printing and
                                    typesetting industry. Lorem Ipsum has been
                                    the industry's standard dummy text ever
                                    since the 1500
                                </p>
                            </div>
                        </div>
                        <div>
                            <div>
                                <h1>Attendees</h1>
                                <div>
                                    <Attendees />
                                </div>
                            </div>
                            <div>
                                <img src="" alt="" />
                                <img src="" alt="" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className={styles.ContentWrapper}>
                        <div className={styles.TopContainer}>
                            <div className={styles.sectionOne}>
                                <div className={styles.divOne}>
                                    <div>
                                        <p>Next meeting on</p>
                                        <h1>22 June 2023</h1>
                                        <p>Sunday</p>
                                    </div>
                                    <button>
                                        <EditLogo />
                                    </button>
                                </div>
                                <div className={styles.secondDiv}>
                                    <div>
                                        <p>Venue: Multipurpose Hall</p>
                                        <p>Time: 12:45 PM</p>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setShowReport("1");
                                        }}
                                    >
                                        Report
                                    </button>
                                </div>
                            </div>
                            <div className={styles.sectionTwo}>
                                <div>
                                    <CheckBoxContainer />
                                </div>
                                <button>+</button>
                            </div>
                        </div>
                        <div className={styles.BottomContainer}>
                            <p>Your past meetings</p>
                            <div>
                                <HistoryDiv setdata={setShowReport} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LcDashboard;

export const HistoryDiv = ({
    setdata
}: {
    setdata: Dispatch<SetStateAction<string>>;
}) => {
    return (
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
                        setdata("2");
                    }}
                >
                    <RightArrow />
                </button>
            </div>
        </div>
    );
};

export const CheckBoxContainer = () => {
    return (
        <div className={styles.CheckBoxContainerWrapper}>
            <input
                type="checkbox"
                id="textInput"
                value="Text that gets selected"
            />
            <label htmlFor="textInput">1. Study IA</label>
        </div>
    );
};

export const Attendees = () => {
    return (
        <div className={styles.AttendeesWrapperIndividual}>
            <img src="" alt="" />
            <p>Enric S Neelamkavil</p>
        </div>
    );
};
