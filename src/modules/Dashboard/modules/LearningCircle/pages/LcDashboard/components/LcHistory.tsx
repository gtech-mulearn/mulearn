import { Dispatch, SetStateAction } from "react";
import styles from "../LcDashboard.module.css";
import { Attendees } from "../LcDashboard";
import meeting from "../../../assets/images/meedingDemo.png";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    temp: LcDashboardTempData;
};

const LcHistory = (props: Props) => {
    return (
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
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500 Lorem
                        Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500
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
    );
};

export default LcHistory;
