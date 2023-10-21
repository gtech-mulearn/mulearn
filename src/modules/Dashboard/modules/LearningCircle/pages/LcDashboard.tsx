import { EditLogo, RightArrow, ThreeDotssvg } from "../assets/svg";
import styles from "./LcDashboard.module.css";

type Props = {};

const LcDashboard = (props: Props) => {
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
                <div className={styles.ContentWrapper}>
                    <div className={styles.TopContainer}>
                        <div className={styles.sectionOne}>
                            <div className={styles.divOne}>
                                <div>
                                    <p>Next meeting on</p>
                                    <h1
                                        style={{
                                            color: "rgba(69, 111, 246, 1)"
                                        }}
                                    >
                                        22 June 2023
                                    </h1>
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
                                <button>Report</button>
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
                            <HistoryDiv />
                            <HistoryDiv />
                            <HistoryDiv />
                            <HistoryDiv />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LcDashboard;

export const HistoryDiv = () => {
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
                <button>
                    <RightArrow />
                </button>
            </div>
        </div>
    );
};

export const CheckBoxContainer = () => {
    return (
        <div>
            <input
                type="checkbox"
                id="textInput"
                value="Text that gets selected"
            />
            <label htmlFor="textInput">1. Study IA</label>
        </div>
    );
};
