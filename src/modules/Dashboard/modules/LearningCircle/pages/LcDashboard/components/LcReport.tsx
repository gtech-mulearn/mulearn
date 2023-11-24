import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../LcDashboard.module.css";
import UploadImage from "../../../assets/images/uploadIcon.svg";
import { LcAttendees } from "./LcAttendees";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    temp: LcDashboardTempData;
};

const LcReport = (props: Props) => {
	const [currentTime, setCurrentTime] = useState<string>("");
	const [currentDate, setCurrentDate] = useState<string>("");

	useEffect(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
		const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
        const day = now.getDate().toString().padStart(2, "0");
        setCurrentTime(`${hours}:${minutes}`);
		setCurrentDate(`${year}-${month}-${day}`);
    }, []);

    return (
        <div className={styles.ReportWrapper}>
            <div className={styles.DetailSection}>
                <div className={styles.Sectionone}>
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            className={styles.datePicker}
                            value={currentDate}
                            onChange={e => setCurrentDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Time:</label>
                        <input
                            type="time"
                            value={currentTime}
                            onChange={e => setCurrentTime(e.target.value)}
                        />
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
                            <LcAttendees />
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
                            Drag and drop or <br></br>browse to choose a file
                        </p>
                    </div>
                </div>
                <button>Submit</button>
            </div>
        </div>
    );
};

export default LcReport;