import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../LcDashboard.module.css";
import UploadImage from "../../../assets/images/uploadIcon.svg";
import { LcAttendees } from "./LcAttendees";
import { reportMeeting } from "../../../services/LearningCircleAPIs";
import toast from "react-hot-toast";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    id: string | undefined;
    lc: LcDetail | undefined;
};

const LcReport = (props: Props) => {
    const [reportText, setReportText] = useState<string>("");
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setUploadedImage(file);
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (!uploadedImage) {
            toast.error("Please upload an image");
            return;
        }
        if (reportText.length > 0) {
            const data = new FormData();
            data.append("report_text", reportText);
            if (uploadedImage) {
                data.append("images", uploadedImage);
            }

            toast.promise(reportMeeting(props.id, data), {
                loading: "Reporting...",
                success: response => {
                    console.log("Meeting successfully reported:", response);
                    props.setTemp(prevState => ({
                        ...prevState,
                        isReport: false,
                        reRender: !prevState.reRender
                    }));
                    return <b>Meeting successfully reported!</b>;
                },
                error: error => {
                    console.error("Failed to login:", error);
                    if (error?.response?.data?.message.non_field_errors)
                        return (
                            <b>
                                {
                                    error?.response?.data?.message
                                        ?.non_field_errors[0]
                                }
                            </b>
                        );
                    return error?.response?.data?.message ? (
                        <b>
                            {
                                (error?.response?.data?.message?.general ?? [
                                    "Failed to report meeting"
                                ])[0]
                            }
                        </b>
                    ) : (
                        <b>Failed to report meeting!</b>
                    );
                }
            });
        } else {
            toast.error("Please fill the notes");
        }
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
    };

    return (
        <div className={styles.ReportWrapper}>
            <div className={styles.DetailSection}>
                {/* <div className={styles.Sectionone}>
                    <div>
                        <label>Date:</label>
                        <input
                            type="date"
                            disabled
                            className={styles.datePicker}
                            value={formData.day}
                            onChange={e =>
                                setFormData(prevState => ({
                                    ...prevState,
                                    day: e.target.value
                                }))
                            }
                            style={{
                                backgroundColor: "#f0f0f0",
                                color: "lightgrey"
                            }}
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
                                    meet_time: e.target.value + ":00"
                                }))
                            }
                        />
                    </div>
                </div> */}
                <div className={styles.SectionTwo}>
                    <p>What happened on the meet? *</p>
                    <textarea
                        placeholder="Type here..."
                        value={reportText}
                        onChange={e => setReportText(e.target.value)}
                    ></textarea>
                </div>
            </div>
            <div className={styles.UploadSection}>
                <div id="uploadContainer">
                    <p>Upload Meeting Images</p>
                    {uploadedImage ? (
                        <div>
                            <p>{uploadedImage.name}</p>
                            <button onClick={handleRemoveImage}>Remove</button>
                        </div>
                    ) : (
                        <label htmlFor="fileInput">
                            <div>
                                <img src={UploadImage} alt="" />
                                Drag and drop or <br />
                                click to choose a file
                            </div>
                        </label>
                    )}
                    <input
                        type="file"
                        accept=".png,.jpeg,.jpg"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        id="fileInput"
                    />
                </div>
                <button
                    className={styles.submitButton}
                    onClick={event => handleSubmit(event)}
                    type="submit"
                >
                    Submit Report
                </button>
            </div>
        </div>
    );
};

export default LcReport;
