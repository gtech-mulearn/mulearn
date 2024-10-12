import styles from "../LcDashboard.module.css";
import {
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

type Props = {
    id: string | undefined;
    lc: LcMeetupDetailInfo | undefined;
};

const LcHistory = (props: Props) => {
    console.log(props.lc);
    const handleInterested = (e: any) => {
        e.preventDefault();
        if (props.lc?.is_lc_member) {
            joinMeetup(props.lc?.id ?? "");
            return;
        }
        interestedMeetup(props.lc?.id ?? "", props.lc?.is_interested);
    };
    return (
        <div className={styles.HistoryDataWrapper}>
            {props.lc ? (
                <>
                    <div className={styles.SectionTop}>
                        <div className={styles.Headings}>
                            <div>
                                <h1>{props.lc?.title}</h1>
                                <p>{getDayOfWeek(props.lc?.meet_time)}</p>
                            </div>
                            <div>
                                {
                                    <p>
                                        Venue:{" "}
                                        {props.lc.meet_place ||
                                            props.lc?.meet_place}
                                    </p>
                                }
                                <p>
                                    Time:{" "}
                                    {convertToFormatedDate(props.lc.meet_time) +
                                        " " +
                                        convert24to12(
                                            extract24hTimeFromDateTime(
                                                props.lc.meet_time
                                            )
                                        )}
                                </p>
                                {props.lc.is_lc_member && (
                                    <>
                                        <p>Meet Code: {props.lc.meet_code}</p>
                                        <p>
                                            Total interests:
                                            {" " + props.lc.total_interested}
                                        </p>
                                        <p>
                                            Total joinees:
                                            {" " + props.lc.total_joined}
                                        </p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className={styles.detailedSection}>
                            <h2>Agenda</h2>
                            <p>{props.lc.agenda}</p>
                        </div>
                    </div>
                    <div className={styles.SectionBottom}>
                        {props.lc.image ? (
                            <div className={styles.detailedSection}>
                                <img src={props.lc.image ?? ""} alt="" />
                            </div>
                        ) : null}
                    </div>
                    <PowerfulButton
                        onClick={handleInterested}
                        variant={
                            props.lc.joined_at || props.lc.is_interested
                                ? "outline"
                                : "primary"
                        }
                        disabled={props.lc.joined_at != null}
                    >
                        {props.lc.is_lc_member
                            ? props.lc.is_started
                                ? "Join"
                                : "Join & Start meetup"
                            : props.lc.joined_at
                            ? "Joined"
                            : props.lc.is_interested
                            ? "Undo Interest"
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
