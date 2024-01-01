import styles from "../LcDashboard.module.css";
import { LcAttendees } from "./LcAttendees";
import { useEffect, useState } from "react";
import { getLCMeetingReport } from "../../../services/LearningCircleAPIs";
import { convertDateToDayAndMonthAndYear } from "../../../../../utils/common";
import {
    convert24to12,
    extract24hTimeFromDateTime,
    getDayOfWeek
} from "../../../services/utils";
import { useParams } from "react-router-dom";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

type Props = {
    id: string | undefined;
    lc: LcDetail | undefined;
};

const LcHistory = (props: Props) => {
    const [data, setData] = useState<LcHistory>();
    const { id } = useParams();

    useEffect(() => {
        getLCMeetingReport(props.id, id).then(res => {
            setData(res);
        });
    }, []);

    return (
        <div className={styles.HistoryDataWrapper}>
            {data ? (
                <>
                    <div className={styles.SectionTop}>
                        <div className={styles.Headings}>
                            <div>
                                <h1>
                                    {convertDateToDayAndMonthAndYear(
                                        data?.meet_time
                                    )}
                                </h1>
                                <p>{getDayOfWeek(data?.meet_time)}</p>
                            </div>
                            <div>
                                {
                                    <p>
                                        Venuesdf:{" "}
                                        {data.meet_place ||
                                            props.lc?.meet_place}
                                    </p>
                                }
                                <p>
                                    Time:{" "}
                                    {convert24to12(
                                        extract24hTimeFromDateTime(
                                            data.meet_time
                                        )
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className={styles.detailedSection}>
                            <h2>Agenda</h2>
                            <p>{data.agenda}</p>
                        </div>
                    </div>
                    <div className={styles.SectionBottom}>
                        <div className={styles.Headings}>
                            <h2>Attendees</h2>
                            {Array.isArray(data.attendees_details) &&
                                data.attendees_details.map(attendee => (
                                    <div>
                                        <LcAttendees
                                            name={attendee.fullname}
                                            image={attendee.profile_pic}
                                            isSelected={false}
                                        />
                                    </div>
                                ))}
                        </div>
                        <div className={styles.detailedSection}>
                            <img src={data.image} alt="" />
                        </div>
                    </div>
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
