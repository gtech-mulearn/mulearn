import moment from "moment";
import KarmaSymbol from "../../assets/svg/KarmaSymbol";
import styles from "./KarmaHistory.module.css";
type Props = {
    userProfile: any;
    userLog: any;
};

const KarmaHistory = (props: Props) => {
    // console.log(props.userLog);

    return (
        <>
            <div className={styles.karma_history_container}>
                {props.userLog.map((log: any) => {
                    return (
                        <div className={styles.karma_history}>
                            <p className={styles.karma_history_box_bg}>
                                <KarmaSymbol />
                            </p>
                            <div className={styles.content}>
                                <h1 className={styles.karma}>
                                    {log.karmaPoint} ϰ
                                </h1>
                                <h2>Karma</h2>
                                <div className={styles.karma_div}>
                                    <p style={{ fontSize: "12px" }}>
                                        Awarded for
                                    </p>
                                    <p className={styles.task_name}>
                                        #{log.taskName}
                                    </p>
                                </div>

                                <p className={styles.date}>
                                    {moment
                                        .utc(log.createdDate)
                                        .local()
                                        .startOf("seconds")
                                        .fromNow()}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default KarmaHistory;
