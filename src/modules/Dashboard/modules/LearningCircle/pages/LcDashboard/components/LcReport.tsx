import { Dispatch, SetStateAction } from "react";
import styles from "../LcDashboard.module.css";
import { CalenderIcon } from "../../../assets/svg";
import { Attendees } from "../LcDashboard";
import UploadImage from "../../../assets/images/uploadIcon.svg";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    temp: LcDashboardTempData;
};

const LcReport = (props: Props) => {
    return (
        <div className={styles.ReportWrapper}>
            <div className={styles.DetailSection}>
                <div className={styles.Sectionone}>
                    <div>
                        <label>Date:</label>

                        <input type="date" className={styles.datePicker} />
                        <div>
                            <CalenderIcon />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">Time:</label>
                        <input type="text" />
                        <div>
                            <button>▲</button>
                            <button>▼</button>
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
