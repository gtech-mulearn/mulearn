import { useEffect, useState } from "react";
import styles from "./AttendeeReport.module.css";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate, useParams } from "react-router-dom";
import {
    getMeetupInfo,
    submitAttendeeReport
} from "../../services/LearningCircleAPIs";
import toast from "react-hot-toast";
import { FiChevronLeft } from "react-icons/fi";

export default function AttendeeReport() {
    const [report, setReport] = useState<string>("");
    const [reportLink, setReportLink] = useState<string>("");
    const [meetInfo, setMeetInfo] = useState<LcMeetup>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getMeetupInfo(params.meet_id ?? "").then(res => {
            setMeetInfo(res as any);
        });
    }, []);
    const onSubmit = () => {
        if (report === "") {
            toast.error("Please enter a report.");
            return;
        }
        if (reportLink === "") {
            toast.error("Please enter a link to your proof of work.");
            return;
        }
        setIsLoading(true);
        submitAttendeeReport({
            meetId: params.meet_id ?? "",
            data: {
                report,
                report_link: reportLink
            }
        }).then(res => {
            setIsLoading(false);
            if (res) {
                toast.success("Report submitted successfully.");
                navigate(-1);
            }
        });
    };
    return (
        <div className={styles.attendeeReport}>
            <div
                className={styles.backLink}
                onClick={() => {
                    navigate(-1);
                }}
            >
                <FiChevronLeft />
                <span>Learning Circles</span>
            </div>
            <div className={styles.header}>
                <h1>{meetInfo?.title}</h1>
            </div>
            <div className={styles.report}>
                <label>Enter Report</label>
                <textarea
                    onChange={e => {
                        setReport(e.target.value);
                    }}
                    placeholder="Enter you personal report about the learning circle."
                ></textarea>
                <label>Submit a link for your proof of work</label>
                <input
                    onChange={e => {
                        setReportLink(e.target.value);
                    }}
                    placeholder="Enter a link to your proof of work."
                />
                <PowerfulButton onClick={onSubmit}>
                    Submit Report
                </PowerfulButton>
            </div>
        </div>
    );
}
