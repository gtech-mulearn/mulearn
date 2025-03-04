import { useEffect, useState } from "react";
import styles from "./LCReport.module.css";
import {
    getLcReportInfo,
    submitLcReport
} from "../../services/LearningCircleAPIs";
import { useNavigate, useParams } from "react-router-dom";
import placeholder from "../../../../assets/images/dpm.webp";
import { BiCheck, BiLink, BiRefresh, BiX } from "react-icons/bi";
import { BsEye } from "react-icons/bs";
import { FiChevronLeft } from "react-icons/fi";
import toast from "react-hot-toast";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { LCReportInfo } from "../../services/LearningCircleInterface";

export default function LCReport() {

    interface attendee{
        user_id: string;
        full_name: string;
        muid: string;
        is_lc_approved: boolean;
        report: string | null;
        report_link: string | null;
    }

    const [reportInfo, setReportInfo] = useState<LCReportInfo | null>(null);
    const [report, setReport] = useState("");
    const [acceptedList, setAcceptedList] = useState<string[]>([]);
    const [rejectedList, setRejectedList] = useState<string[]>([]);
    const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);
    const [selectedAttendee, setSelectedAttendee] = useState<attendee | null>(null);
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getLcReportInfo(params.meet_id ?? "").then(res => {
            setReportInfo(res);
            if (res?.is_report_submitted) {
                setReportSubmitted(true);
                setReport(res.report ?? "");
                setAcceptedList(
                    res.attendees
                        .filter(attendee => attendee.is_lc_approved)
                        .map(attendee => attendee.user_id)
                );
                setRejectedList(
                    res.attendees
                        .filter(attendee => !attendee.is_lc_approved)
                        .map(attendee => attendee.user_id)
                );
            }
        });
    }, []);

    const handleAccept = (attendee: any) => {
        if (acceptedList.includes(attendee.user_id)) {
            return;
        }
        if (rejectedList.includes(attendee.user_id)) {
            setRejectedList(
                rejectedList.filter(rej => rej != attendee.user_id)
            );
        }
        setAcceptedList([...acceptedList, attendee.user_id]);
    };

    const handleReject = (attendee: any) => {
        if (rejectedList.includes(attendee.user_id)) {
            return;
        }
        if (acceptedList.includes(attendee.user_id)) {
            setAcceptedList(
                acceptedList.filter(acc => acc != attendee.user_id)
            );
        }
        setRejectedList([...rejectedList, attendee.user_id]);
    };

    const handleView = (attendee: any) => {
        if (attendee.report == null || attendee.report == "") {
            toast.error(`${attendee.full_name} didn't submited his report.`);
            return;
        }
        setSelectedAttendee(attendee);
    };

    const handleReset = (attendee: any) => {
        if (reportSubmitted) {
            return;
        }
        setAcceptedList(acceptedList.filter(acc => acc != attendee.user_id));
        setRejectedList(rejectedList.filter(rej => rej != attendee.user_id));
    };

    const handleSubmit = () => {
        if (reportSubmitted) {
            return;
        }
        if ((reportInfo?.attendees ?? []).length <= 1) {
            toast.error(
                "You need minumum of 2 participants to submit a report."
            );
            return;
        }
        if (report == null || report == "") {
            toast.error("Report empty");
            return;
        }
        if (
            acceptedList.length + rejectedList.length !=
            (reportInfo?.attendees ?? []).length
        ) {
            toast.error("You must review all attendees.");
            return;
        }
        var map: Record<string, boolean> = {};
        acceptedList.forEach(user_id => {
            map[user_id] = true;
        });
        rejectedList.forEach(user_id => (map[user_id] = false));
        // console.log(map);
        submitLcReport(params.meet_id ?? "", report, map).then(res => {
            if (res) {
                navigate(-1);
            }
        });
    };

    return (
        <>
            {selectedAttendee && (
                <div className={styles.popup}>
                    <div className={styles.container}>
                        <h1>
                            {selectedAttendee.full_name.split(" ")[0]}'s Report
                        </h1>
                        <span>Report</span>
                        <p>{selectedAttendee.report}</p>
                        <span>Links</span>
                        <a href={selectedAttendee.report_link ?? ""}>
                            <BiLink />
                            {selectedAttendee.report_link}
                        </a>
                        <div className={styles.buttons}>
                            <PowerfulButton
                                onClick={e => {
                                    setSelectedAttendee(null);
                                }}
                            >
                                Close
                            </PowerfulButton>
                        </div>
                    </div>
                </div>
            )}
            <div className={styles.lcReport}>
                <div
                    className={styles.backLink}
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    <FiChevronLeft />
                    <span>Learning Circles</span>
                </div>
                <div className={styles.container}>
                    <h1>Report Submission</h1>
                    <textarea
                        disabled={reportSubmitted}
                        placeholder="Enter your report here."
                        onChange={e => {
                            setReport(e.target.value);
                        }}
                        value={report}
                    ></textarea>
                    <h2>Attendees</h2>
                    <span className={styles.info}>
                        From the listed attendees of your learning circle,
                        review the report submitted by them and approve/reject
                        it to submit report.
                    </span>
                    <div className={styles.attendees}>
                        {reportInfo
                            ? reportInfo.attendees.map((attendee:attendee, index: number) => {
                                return (
                                    <div
                                        className={styles.attendee}
                                        key={attendee.user_id}
                                    >
                                        <div className={styles.content}>
                                            <span className={styles.counter}>
                                                {index + 1}.
                                            </span>
                                            <img
                                                className={styles.profile}
                                                alt=""
                                                src={placeholder}
                                            />
                                            <span className={styles.name}>
                                                {attendee.full_name}
                                            </span>
                                            {/* <span className={styles.muid}>
                                      {attendee.muid}
                                  </span> */}
                                        </div>
                                        {attendee.report != null &&
                                            attendee.report != "" ? (
                                            <div className={styles.buttons}>
                                                {acceptedList.includes(
                                                    attendee.user_id
                                                ) ? (
                                                    <span
                                                        className={
                                                            styles.accepted
                                                        }
                                                    >
                                                        Accepted
                                                    </span>
                                                ) : rejectedList.includes(
                                                    attendee.user_id
                                                ) ? (
                                                    <span
                                                        className={
                                                            styles.rejected
                                                        }
                                                    >
                                                        Rejected
                                                    </span>
                                                ) : null}

                                                {!reportSubmitted &&
                                                    (acceptedList.includes(
                                                        attendee.user_id
                                                    ) ||
                                                        rejectedList.includes(
                                                            attendee.user_id
                                                        )) && (
                                                        <span
                                                            className={
                                                                styles.view
                                                            }
                                                            onClick={() => {
                                                                handleReset(
                                                                    attendee
                                                                );
                                                            }}
                                                        >
                                                            <BiRefresh />
                                                        </span>
                                                    )}

                                                {reportSubmitted ||
                                                    (!acceptedList.includes(
                                                        attendee.user_id
                                                    ) &&
                                                        !rejectedList.includes(
                                                            attendee.user_id
                                                        )) ? (
                                                    <span
                                                        className={
                                                            styles.view
                                                        }
                                                        onClick={() => {
                                                            handleView(
                                                                attendee
                                                            );
                                                        }}
                                                    >
                                                        <BsEye />
                                                    </span>
                                                ) : null}
                                                {!acceptedList.includes(
                                                    attendee.user_id
                                                ) &&
                                                    !rejectedList.includes(
                                                        attendee.user_id
                                                    ) ? (
                                                    <>
                                                        <span
                                                            className={
                                                                styles.reject
                                                            }
                                                            onClick={() => {
                                                                handleReject(
                                                                    attendee
                                                                );
                                                            }}
                                                        >
                                                            <BiX />
                                                        </span>

                                                        <span
                                                            className={
                                                                styles.accept
                                                            }
                                                            onClick={() => {
                                                                handleAccept(
                                                                    attendee
                                                                );
                                                            }}
                                                        >
                                                            <BiCheck />
                                                        </span>
                                                    </>
                                                ) : null}
                                            </div>
                                        ) : (
                                            <span className={styles.noreport}>
                                                Attendee report not submitted
                                            </span>
                                        )}
                                    </div>
                                );
                            })
                            : null}
                    </div>
                    <div className={styles.bottom}>
                        <PowerfulButton
                            disabled={reportSubmitted}
                            className={styles.button}
                            onClick={handleSubmit}
                        >
                            {reportSubmitted
                                ? "Report Already Submitted"
                                : "Submit Report"}
                        </PowerfulButton>
                    </div>
                </div>
            </div>
        </>
    );
}
