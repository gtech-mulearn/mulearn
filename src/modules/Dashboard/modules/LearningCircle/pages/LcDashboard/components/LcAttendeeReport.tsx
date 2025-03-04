import { createRef, useEffect, useRef, useState } from "react";
import styles from "../LcDashboard.module.css";
import {
    getMeetupInfo,
    submitAttendeeReport,
    submitAttendeeTaskImage
} from "../../../services/LearningCircleAPIs";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, Input } from "@chakra-ui/react";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";

const LcReportAttendee = () => {
    const [reportText, setReportText] = useState<string>("");
    const [meetup, setMeetup] = useState<LcMeetupDetailInfo | undefined>();
    const props = useParams<{ id: string }>();
    const filePickerRefs = useRef<Record<string, HTMLInputElement | null>>({}); // Object to store refs by task.id
    const [completedTasks, setCompletedTasks] = useState<string[]>([]);
    const [taskImages, setTaskImages] = useState<{
        [key: string]: File | null;
    }>({});
    const [taskUrls, setTaskUrls] = useState<{ [key: string]: string }>({});
    const [submitedTasks, setSubmittedtasks] = useState<string[]>([]);
    const [isTaskPOWSubmitting, setIsTaskPOWSubmitting] =
        useState<boolean>(false);
    const navigate = useNavigate();
    useEffect(() => {
        getMeetupInfo(setMeetup, props.id ?? "");
    }, [props.id]);
    useEffect(() => {
        if (meetup?.is_attendee_report_submitted) {
            toast.success("Report already submitted");
            navigate("/dashboard/learning-circle");
            return;
        }
        meetup?.tasks.forEach(task => {
            if (task.is_completed) {
                setSubmittedtasks([...submitedTasks, task.id ?? ""]);
            }
        });
    }, [meetup]);
    const handleTaskSubmit = (taskId: string) => {
        const formData = new FormData();
        formData.append("meet_task", taskId);
        if (taskImages[taskId]) {
            console.log(taskImages[taskId]);
            formData.append("is_image", "1");
            formData.append(
                "image_url",
                taskImages[taskId] as any,
                (taskImages[taskId] as any).name
            );
            setIsTaskPOWSubmitting(true);
            submitAttendeeTaskImage(props.id ?? "", taskId, formData).then(
                res => {
                    if (res) {
                        setSubmittedtasks([...submitedTasks, taskId]);
                        setIsTaskPOWSubmitting(false);
                    }
                }
            );
        } else if (taskUrls[taskId]) {
            formData.append("proof_url", taskUrls[taskId]);
            setIsTaskPOWSubmitting(true);
            submitAttendeeTaskImage(props.id ?? "", taskId, formData).then(
                res => {
                    if (res) {
                        setSubmittedtasks([...submitedTasks, taskId]);
                    }
                    setIsTaskPOWSubmitting(false);
                }
            );
        } else {
            toast.error("Please upload an image or provide a url");
        }
    };
    const handleSubmit = (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        if (reportText.length > 0) {
            formData.append("report", reportText);
            if (submitedTasks.length === 0) {
                toast.error(
                    "Please submit proof of work for atleast one task you have done."
                );
                return;
            }
            submitAttendeeReport(props.id ?? "", formData).then(() => {
                navigate("/dashboard/learning-circle");
            });
        } else {
            toast.error("Please provide a brief description");
        }
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
                <div className={styles.tasks}>
                    <h4>Meeting Tasks</h4>
                    <p>
                        Please check which tasks you've done, and upload an
                        image or a link that shows the work you have done.
                    </p>
                    {meetup?.tasks.map((task, index) => (
                        <div className={styles.task}>
                            <div className={styles.taskTitle}>
                                <Checkbox
                                    defaultChecked={task.is_completed}
                                    disabled={
                                        task.is_completed ||
                                        submitedTasks.includes(task.id ?? "")
                                    }
                                    onChange={e => {
                                        e.target.checked
                                            ? setCompletedTasks([
                                                  ...(completedTasks as any),
                                                  task.id
                                              ])
                                            : setCompletedTasks(
                                                  completedTasks.filter(
                                                      id => id !== task.id
                                                  )
                                              );
                                    }}
                                />
                                <span className={styles.title}>
                                    {task.title}
                                </span>
                            </div>
                            <div
                                className={
                                    styles.taskPow +
                                    " " +
                                    (!submitedTasks.includes(task.id ?? "") &&
                                    completedTasks.includes(task.id ?? "")
                                        ? styles.active
                                        : "")
                                }
                            >
                                <div>
                                    <PowerfulButton
                                        variant="outline"
                                        style={{
                                            padding: "0.4rem",
                                            fontSize: "10px"
                                        }}
                                        onClick={e => {
                                            e.preventDefault();
                                            filePickerRefs.current[
                                                task.id ?? ""
                                            ]?.click();
                                        }}
                                        disabled={isTaskPOWSubmitting}
                                    >
                                        Upload Image
                                    </PowerfulButton>
                                    <span
                                        className={
                                            styles.choosenFile +
                                            " " +
                                            (taskImages[task.id ?? ""]
                                                ? styles.active
                                                : "")
                                        }
                                    >
                                        <button
                                            className={styles.delete}
                                            onClick={() => {
                                                setTaskImages({
                                                    ...taskImages,
                                                    [task.id ?? ""]: null
                                                });
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                            </svg>
                                        </button>
                                        {taskImages[task.id ?? ""]?.name ?? ""}
                                    </span>
                                </div>
                                <span>OR</span>
                                <Input
                                    type="text"
                                    onChange={e => {
                                        setTaskUrls({
                                            ...taskUrls,
                                            [task.id ?? ""]: e.target.value
                                        });
                                    }}
                                    className={styles.input}
                                    disabled={isTaskPOWSubmitting}
                                    placeholder="Enter URL"
                                />
                                <input
                                    ref={el =>
                                        (filePickerRefs.current[task.id ?? ""] =
                                            el)
                                    }
                                    type="file"
                                    onChange={e => {
                                        if (e.target.files) {
                                            if (
                                                e.target.files[0].size > 2500000
                                            ) {
                                                toast.error(
                                                    "File size should not exceed 2.5MB"
                                                );
                                                return;
                                            }
                                            if (
                                                e.target.files[0].type !=
                                                    "image/jpeg" &&
                                                e.target.files[0].type !=
                                                    "image/png"
                                            ) {
                                                toast.error(
                                                    "Please upload png or jpeg image"
                                                );
                                                return;
                                            }
                                            setTaskImages({
                                                ...taskImages,
                                                [task.id ?? ""]:
                                                    e.target.files[0]
                                            });
                                        }
                                    }}
                                    style={{ display: "none" }}
                                    className={styles.input}
                                    placeholder="Upload File"
                                    disabled={isTaskPOWSubmitting}
                                />
                                <PowerfulButton
                                    style={{
                                        fontSize: 13,
                                        padding: "8px 15px"
                                    }}
                                    isLoading={isTaskPOWSubmitting}
                                    onClick={() =>
                                        handleTaskSubmit(task.id ?? "")
                                    }
                                >
                                    Submit
                                </PowerfulButton>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <button
                className={styles.submitButton}
                onClick={event => handleSubmit(event)}
                type="submit"
            >
                Submit Report
            </button>
        </div>
    );
};

export default LcReportAttendee;
