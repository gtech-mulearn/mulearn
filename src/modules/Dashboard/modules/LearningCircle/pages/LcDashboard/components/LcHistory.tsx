import styles from "../LcDashboard.module.css";
import {
    fetchURLQRCode,
    interestedMeetup,
    joinMeetup
} from "../../../services/LearningCircleAPIs";
import { convertToFormatedDate } from "../../../../../utils/common";
import {
    convert24to12,
    extract24hTimeFromDateTime,
    getDayOfWeek
} from "../../../services/utils";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

type Props = {
    id: string | undefined;
    lc: LcMeetupDetailInfo | undefined;
    setLc: UseStateFunc<LcMeetupDetailInfo | undefined>;
};

const LcHistory = (props: Props) => {
    const navigate = useNavigate();
    const [blob, setBlob] = useState<any>(null);
    const [meetupCode, setMeetupCode] = useState<string>("");
    const [query, setQuery] = useSearchParams();
    useEffect(() => {
        fetchURLQRCode(
            setBlob,
            (window.location.href ?? "unknown") +
                "/?code=" +
                props.lc?.meet_code
        );
    }, [props.id]);

    useEffect(() => {
        if (query.get("code")) {
            const code = query.get("code");
            if (code) {
                setMeetupCode(code);
            }
        }
    }, [query]);
    const handleInterested = (e: any) => {
        e.preventDefault();
        if (
            (props.lc?.is_lc_member || (props.lc?.is_started && meetupCode)) &&
            !props.lc?.joined_at
        ) {
            joinMeetup(props.lc?.id ?? "").then(res => {
                props.setLc({
                    ...props.lc,
                    joined_at: new Date().toISOString()
                } as any);
            });
            return;
        }
        interestedMeetup(props.lc?.id ?? "", props.lc?.is_interested).then(
            res => {
                props.setLc({
                    ...props.lc,
                    is_interested: !props.lc?.is_interested
                } as any);
            }
        );
    };
    return (
        <div className={styles.HistoryDataWrapper}>
            <h1 className={styles.title}>Learning Circle Meetup</h1>
            {props.lc ? (
                <>
                    <div className={styles.SectionTop}>
                        <div className={styles.Headings}>
                            <div>
                                <h1>{props.lc?.title}</h1>
                                <p>{getDayOfWeek(props.lc?.meet_time)}</p>
                            </div>
                            <div style={{ width: "100%" }}>
                                {props.lc.is_lc_member && (
                                    <div className={styles.meetupTags}>
                                        <p
                                            className={styles.meetupInfoTag}
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    props.lc?.meet_code ??
                                                        "NOTCOPIED"
                                                );
                                                toast.success("Code Copied");
                                            }}
                                        >
                                            {" "}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                            </svg>
                                            {props.lc.meet_code}
                                        </p>
                                        <p
                                            className={styles.meetupInfoTag}
                                            onClick={() => {
                                                navigator.clipboard.writeText(
                                                    (window.location.href ??
                                                        "NOTCOPIED") +
                                                        "/?code=" +
                                                        props.lc?.meet_code
                                                );
                                                toast.success("Link Copied");
                                            }}
                                        >
                                            {" "}
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z" />
                                                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z" />
                                            </svg>
                                            Copy Link
                                        </p>
                                        <p className={styles.meetupInfoTag}>
                                            {props.lc.total_interested}{" "}
                                            Interests Submitted
                                        </p>
                                        <p className={styles.meetupInfoTag}>
                                            {props.lc.total_joined} Joined
                                        </p>
                                    </div>
                                )}
                                {props.lc.is_started &&
                                props.lc.is_lc_member ? (
                                    <div className={styles.qrcode}>
                                        <img src={blob} alt="" />
                                        <h4>
                                            Share this QR Code for joining the
                                            meet.
                                        </h4>
                                    </div>
                                ) : (
                                    <></>
                                )}
                                {
                                    <p className={styles.info}>
                                        Venue:{" "}
                                        {props.lc.meet_place ||
                                            props.lc?.meet_place}
                                    </p>
                                }
                                <p className={styles.info}>
                                    Time:{" "}
                                    {convertToFormatedDate(props.lc.meet_time) +
                                        " " +
                                        convert24to12(
                                            extract24hTimeFromDateTime(
                                                props.lc.meet_time
                                            )
                                        )}
                                </p>
                            </div>
                        </div>
                        <div className={styles.detailedSection}>
                            <h2>Agenda</h2>
                            <p>{props.lc.agenda}</p>
                            {props.lc.pre_requirements ? (
                                <>
                                    <h2>Prerequisites</h2>
                                    <p>{props.lc.pre_requirements}</p>
                                </>
                            ) : (
                                <></>
                            )}
                            <h2>Tasks</h2>
                            <div className={styles.tasks}>
                                {props.lc.tasks.map((task, index) => (
                                    <div className={styles.task}>
                                        <span>{index + 1}</span>
                                        {task.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.SectionBottom}>
                        {props.lc.image ? (
                            <div className={styles.detailedSection}>
                                <img src={props.lc.image ?? ""} alt="" />
                            </div>
                        ) : null}
                    </div>
                    {props.lc.joined_at ? (
                        <PowerfulButton
                            disabled={props.lc.is_attendee_report_submitted}
                            onClick={e => {
                                e.preventDefault();
                                navigate(
                                    "/dashboard/learning-circle/meetup/" +
                                        props.lc?.id +
                                        "/attendee-report"
                                );
                            }}
                        >
                            {props.lc.is_attendee_report_submitted
                                ? "Report Submitted"
                                : "Submit Report"}
                        </PowerfulButton>
                    ) : null}
                    <PowerfulButton
                        onClick={handleInterested}
                        variant={
                            props.lc.joined_at || props.lc.is_interested
                                ? "outline"
                                : "primary"
                        }
                        disabled={props.lc.joined_at != null}
                    >
                        {props.lc.joined_at
                            ? "Joined"
                            : props.lc.is_started
                            ? props.lc.is_lc_member || meetupCode
                                ? "Join"
                                : "I'm Interested to Join"
                            : props.lc.is_lc_member
                            ? "Join & Start Meetup"
                            : props.lc.is_interested
                            ? "Undo Interested"
                            : "I'm Interested Join"}
                    </PowerfulButton>
                </>
            ) : (
                <div
                    className={`${styles.HistoryDataWrapper} ${styles.loading}`}
                >
                    <MuLoader />
                </div>
            )}
        </div>
    );
};

export default LcHistory;
