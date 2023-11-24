import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../LcDashboard.module.css";
import UploadImage from "../../../assets/images/uploadIcon.svg";
import { LcAttendees } from "./LcAttendees";
import { reportMeeting } from "../../../services/LearningCircleAPIs";
import toast from "react-hot-toast";
import { comingSoon } from "../../../../../utils/common";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    id: string | undefined;
};

const LcReport = (props: Props) => {
    const [formData, setFormData] = useState<LcReport>({
        day: "",
        meet_time: "",
        agenda: "",
        attendees: [],
    });

    useEffect(() => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, "0");
        const minutes = now.getMinutes().toString().padStart(2, "0");
        const year = now.getFullYear().toString();
        const month = (now.getMonth() + 1).toString().padStart(2, "0");
        const day = now.getDate().toString().padStart(2, "0");
        setFormData(prevState => ({
            ...prevState,
            day: `${year}-${month}-${day}`,
            meet_time: `${hours}:${minutes}`
        }));
    }, []);

    const validateForm = (state: LcReport) => {
        let errors: { [key: string]: string } = {};
        if (!state.day) {
            errors.day = "Date is required";
        }
        if (!state.meet_time) {
            errors.time = "Time is required";
        }
        if (!state.agenda.trim()) {
            errors.agenda = "Agenda is required";
        }
        if (state.attendees.length === 0) {
            errors.attendees = "At least one attendee is required";
        }
        toast.error(Object.values(errors).join("\n"));
		return Object.keys(errors).length > 0 ? false : true
    };

    const handleSubmit = () => {
        if (validateForm(formData)) {
			toast.promise(reportMeeting(props.id, formData), {
                loading: "Reporting...",
                success: response => {
                    console.log("Meeting successfully reported:", response);
					props.setTemp(prevState => ({
						...prevState,
						isReport: false
					}))
                    return <b>Meeting successfully reported!</b>;
                },
                error: error => {
                    console.error("Failed to login:", error);
                    return <b>Failed to report meeting!</b>;
                }
            });
        }
    };

    return (
        <div className={styles.ReportWrapper}>
            <div className={styles.DetailSection}>
                <div className={styles.Sectionone}>
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            className={styles.datePicker}
                            value={formData.day}
                            onChange={e =>
                                setFormData(prevState => ({
                                    ...prevState,
                                    day: e.target.value
                                }))
                            }
                        />
                    </div>
                    <div>
                        <label>Time:</label>
                        <input
                            type="time"
                            value={formData.meet_time}
                            onChange={e =>
                                setFormData(prevState => ({
                                    ...prevState,
                                    meet_time: e.target.value
                                }))
                            }
                        />
                    </div>
                </div>
                <div className={styles.SectionTwo}>
                    <p>Agenda</p>
                    <textarea
                        placeholder="Type your agenda here..."
                        value={formData.agenda}
                        onChange={e =>
                            setFormData(prevState => ({
                                ...prevState,
                                agenda: e.target.value
                            }))
                        }
                    ></textarea>
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
                <div id="uploadContainer" onClick={comingSoon}>
                    <p>Upload Meeting Images</p>
                    <div>
                        <img src={UploadImage} alt="" />
                        <p>
                            Drag and drop or <br></br>browse to choose a file
                        </p>
                    </div>
                </div>
                <button onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    );
};

export default LcReport;