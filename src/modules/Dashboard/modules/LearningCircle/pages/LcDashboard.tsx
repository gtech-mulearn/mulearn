import {
    EditLogo,
    RightArrow,
    ThreeDotssvg,
    CalenderIcon
} from "../assets/svg";
import styles from "./LcDashboard.module.css";
import { Dispatch, SetStateAction, useState } from "react";
import image from "../assets/images/profileIcon.svg";
import UploadImage from "../assets/images/uploadIcon.svg";
import meeting from "../assets/images/meedingDemo.png";

type Props = {};

const formatTime = (date: {
    getHours: () => number;
    getMinutes: () => any;
}) => {
    const hours = date.getHours() % 12 || 12;
    const minutes = date.getMinutes();
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${ampm}`;
};

const LcDashboard = (props: Props) => {
    const [showReport, setShowReport] = useState("");
    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDate(e.target.value);
    };
    const [time, setTime] = useState(formatTime(new Date()));

    const incrementTime = () => {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() + 15);
        setTime(formatTime(currentTime));
    };

    const decrementTime = () => {
        const currentTime = new Date();
        currentTime.setMinutes(currentTime.getMinutes() - 15);
        setTime(formatTime(currentTime));
    };

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
                        <div className={styles.DetailSection}>
                            <div className={styles.Sectionone}>
                                <div>
                                    <label>Date:</label>

                                    <input
                                        type="date"
                                        className={styles.datePicker}
                                        onChange={handleDateChange}
                                    />
                                    <div>
                                        <CalenderIcon />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="">Time:</label>
                                    <input type="text" value={time} />
                                    <div>
                                        <button onClick={incrementTime}>
                                            ▲
                                        </button>
                                        <button onClick={decrementTime}>
                                            ▼
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.SectionTwo}>
                                <p>Agenda</p>
                                <textarea placeholder="Type your agenda here..."></textarea>
                            </div>
                            <div className={styles.SectionThree}>
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
                        <div className={styles.UploadSection}>
                            <div id="uploadContainer">
                                <p>Upload Meeting Images</p>
                                <div>
                                    <img src={UploadImage} alt="" />
                                    <p>
                                        Drag and drop or <br></br>browse to
                                        choose a file
                                    </p>
                                </div>
                            </div>
                            <button>Submit</button>
                        </div>
                    </div>
                ) : showReport === "2" ? (
                    <div className={styles.HistoryDataWrapper}>
                        <div className={styles.SectionTop}>
                            <div className={styles.Headings}>
                                <div>
                                    <h1>22 June 2023</h1>
                                    <p>Sunday</p>
                                </div>
                                <div>
                                    <p>Venue: Multipurpose Hall</p>
                                    <p>Time: 12:45 PM</p>
                                </div>
                            </div>
                            <div className={styles.detailedSection}>
                                <h2>Agenda</h2>
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
                        <div className={styles.SectionBottom}>
                            <div className={styles.Headings}>
                                <h2>Attendees</h2>
                                <div>
                                    <Attendees />
                                    <Attendees />
                                    <Attendees />
                                    <Attendees />
                                    <Attendees />
                                </div>
                            </div>
                            <div className={styles.detailedSection}>
                                <img src={meeting} alt="" />
                                <img src={meeting} alt="" />
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
            <img src={image} alt="" />
            <p>Enric S Neelamkavil</p>
        </div>
    );
};
