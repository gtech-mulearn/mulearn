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
    const [formData, setFormData] = useState<LcReport>({
        day: "",
        meet_time: "",
        agenda: "",
        attendees: []
    });
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);

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
            meet_time: `${hours}:${minutes}:00`
        }));
    }, []);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];
        if (file) {
            setUploadedImage(file);
        }
    };

    const handleMemberClick = (memberId: string) => {
        setFormData(prevState => {
            // Check if the attendee is already in the list
            const isAlreadySelected = prevState.attendees.includes(memberId);

            // If already selected, remove them; otherwise, add them
            const updatedAttendees = isAlreadySelected
                ? prevState.attendees.filter(id => id !== memberId) // Remove the attendee
                : [...prevState.attendees, memberId]; // Add the attendee

            return {
                ...prevState,
                attendees: updatedAttendees
            };
        });
    };

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
        if (!uploadedImage) {
            errors.image = "Image is required";
        } else {
            const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
            if (!allowedTypes.includes(uploadedImage.type)) {
                errors.image =
                    "Invalid image type. Please upload a JPEG, PNG, or GIF.";
            }
        }
        {
            Object.keys(errors).length > 0
                ? toast.error(Object.values(errors).join("\n"))
                : null;
        }
        return Object.keys(errors).length > 0 ? false : true;
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        if (validateForm(formData)) {
            const data = new FormData();
            data.append("agenda", formData.agenda);
            data.append("attendees", formData.attendees.join(","));
            data.append("time", formData.meet_time);
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

                    return <b>Failed to report meeting!</b>;
                }
            });
        }
    };

    const handleRemoveImage = () => {
        setUploadedImage(null);
    };

    return (
        <div className={styles.ReportWrapper}>
            <div className={styles.DetailSection}>
                <div className={styles.Sectionone}>
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
                        {props.lc?.members.map(member => (
                            <div
                                key={member.id}
                                className={styles.participantsContainer}
                                onClick={() => handleMemberClick(member.id)}
                            >
                                <LcAttendees
                                    name={member.username}
                                    image={member.profile_pic}
                                    isSelected={formData.attendees.includes(
                                        member.id
                                    )}
                                />
                            </div>
                        ))}
                        {/* <button>+</button> */}
                    </div>
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
