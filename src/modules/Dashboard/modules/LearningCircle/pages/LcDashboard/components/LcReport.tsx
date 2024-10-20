import { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "../LcDashboard.module.css";
import UploadImage from "../../../assets/images/uploadIcon.svg";
import {
    getMeetupAttendees,
    reportMeeting
} from "../../../services/LearningCircleAPIs";
import toast from "react-hot-toast";
import StarRatings from "react-star-ratings";
import { BiDownArrow } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    id: string | undefined;
    lc: LcDetail | undefined;
};

const LcReport = (props: Props) => {
    const [reportText, setReportText] = useState<string>("");
    const [uploadedImage, setUploadedImage] = useState<File | null>(null);
    const [attendees, setAttendees] = useState<LcAttendees[]>([]);
    const [attendeeRating, setAttendeeRating] = useState<{
        [user_id: string]: number;
    }>({});
    const [attendeeDetailsExpanded, setAttendeeDetailsExpanded] = useState<{
        [user_id: string]: boolean;
    }>({});
    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files && event.target.files[0];

        if (file) {
            setUploadedImage(file);
        }
    };
    useEffect(() => {
        getMeetupAttendees(props.id ?? "")
            .then(res => {
                setAttendees(res);
            })
            .catch(err => {
                toast.error("Failed to fetch attendees");
            });
    }, []);

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
            var ratings = {};
            for (var attendee of attendees) {
                if (!attendeeRating[attendee.attendee_id]) {
                    toast.error("Please rate all attendees");
                    return;
                } else {
                    ratings = {
                        ...ratings,
                        [attendee.attendee_id]:
                            attendeeRating[attendee.attendee_id]
                    };
                }
            }
            data.append("ratings", JSON.stringify(ratings));
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
    const changeRating = (attendee_id: string, newRating: number): void => {
        setAttendeeRating(prevState => ({
            ...prevState,
            [attendee_id]: newRating
        }));
    };
    const handleRemoveImage = () => {
        setUploadedImage(null);
    };

    return (
        <div className={styles.ReportWrapper}>
            <div className={styles.DetailSection}>
                <div className={styles.SectionTwo}>
                    <p>Brief description *</p>
                    <textarea
                        placeholder="Type here..."
                        value={reportText}
                        onChange={e => setReportText(e.target.value)}
                    ></textarea>
                </div>
                <div className={styles.SectionThree}>
                    <p>Attendees List</p>
                    <div className={styles.attendees}>
                        {attendees.map(attendee => (
                            <div
                                className={styles.attendee}
                                key={attendee.attendee_id}
                                onClick={() => {
                                    setAttendeeDetailsExpanded(prevState => ({
                                        ...prevState,
                                        [attendee.attendee_id]:
                                            !prevState?.[attendee.attendee_id]
                                    }));
                                }}
                            >
                                <div className={styles.ratingHeading}>
                                    <span className={styles.fullname}>
                                        <BiDownArrow /> {attendee.fullname}
                                    </span>
                                    <div className={styles.rating}>
                                        <StarRatings
                                            rating={
                                                attendeeRating[
                                                    attendee.attendee_id
                                                ]
                                            }
                                            starRatedColor="gold"
                                            changeRating={rating => {
                                                changeRating(
                                                    attendee.attendee_id,
                                                    rating
                                                );
                                            }}
                                            numberOfStars={5}
                                            name="rating"
                                            starDimension="15px"
                                            starSpacing="1px"
                                        />
                                    </div>
                                </div>
                                <div
                                    className={
                                        styles.proof +
                                        " " +
                                        (attendeeDetailsExpanded[
                                            attendee.attendee_id ?? ""
                                        ]
                                            ? styles.active
                                            : "")
                                    }
                                >
                                    <h4>Report</h4>
                                    <p className={styles.reportText}>
                                        {attendee.report}
                                    </p>
                                    <h4>Tasks Completed</h4>
                                    {attendee.proof_of_work.map(
                                        (task, index) => (
                                            <div
                                                key={index}
                                                className={styles.task}
                                            >
                                                <div
                                                    className={styles.taskTitle}
                                                >
                                                    <span>{index + 1} | </span>
                                                    {task.title}
                                                </div>
                                                <div className={styles.action}>
                                                    <PowerfulButton
                                                        style={{
                                                            fontSize: "15px",
                                                            padding: "0.4rem"
                                                        }}
                                                        onClick={() => {
                                                            if (task.is_image) {
                                                                window.open(
                                                                    import.meta
                                                                        .env
                                                                        .VITE_BACKEND_URL +
                                                                        (task.image_url ??
                                                                            "404"),
                                                                    "_blank"
                                                                );
                                                            } else {
                                                                window.open(
                                                                    task.proof_url ??
                                                                        "",
                                                                    "_blank"
                                                                );
                                                            }
                                                        }}
                                                    >
                                                        <BsEye />
                                                    </PowerfulButton>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        ))}
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
