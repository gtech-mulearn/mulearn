import styles from "../LcDashboard.module.css";
import meeting from "../../../assets/images/meedingDemo.png";
import { LcAttendees } from "./LcAttendees";
import { useEffect, useState } from "react";
import { getLCMeetingReport } from "../../../services/LearningCircleAPIs";
import { convertDateToDayAndMonthAndYear } from "../../../../../utils/common";
import { convert24to12, extract24hTimeFromDateTime, getDayOfWeek } from "../../../services/utils";

type Props = {
    id: string | undefined;
    lc: LcDetail | undefined;
};

const LcHistory = (props: Props) => {
    const [data, setData] = useState<LcHistory>();

    useEffect(() => {
        getLCMeetingReport(props.id).then(res => {
            setData(res);
        });
    }, []);

    return (
        <div className={styles.HistoryDataWrapper}>
            {data && (
                <>
                    <div className={styles.SectionTop}>
                        <div className={styles.Headings}>
                            <div>
                                <h1>
                                    {convertDateToDayAndMonthAndYear(data?.day)}
                                </h1>
                                <p>{getDayOfWeek(data?.day)}</p>
                            </div>
                            <div>
                                <p>
                                    Venue:{" "}
                                    {data.meet_place || props.lc?.meet_place}
                                </p>
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
                            <p>
                                {data.agenda}
                            </p>
                        </div>
                    </div>
                    <div className={styles.SectionBottom}>
                        <div className={styles.Headings}>
                            {/* <h2>Attendees</h2>
                            <div>
                                <LcAttendees
                                    name={"Test Name"}
                                    image={""}
                                    isSelected={false}
                                />
                            </div> */}
                        </div>
                        {/* <div className={styles.detailedSection}>
                            <img src={meeting} alt="" />
                            <img src={meeting} alt="" />
                        </div> */}
                    </div>
                </>
            )}
        </div>
    );
};

export default LcHistory;
