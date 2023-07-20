import styles from './LearningCircle.module.css'

type Props = {};

const LearningCircle = (props: Props) => {
    return (
        <>
            <div className={styles.LearningCircleDetailsContent}>
                <div className={styles.CreatedCircle}>
                    <div className={styles.CircleName}>
                        <h1>UX world</h1>
                        <b>
                            LBS Institute of Technology for Women <br /> Code:
                            LBT{" "}
                        </b>
                    </div>
                    <div className={styles.CircleRank}>
                        <div>
                            <b>Rank</b>
                            <h1>3</h1>
                            <b className={styles.points}>4.68K Karma</b>
                        </div>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>

                <div className={styles.BoxContent}>
                    <div className={styles.LeftBox}>
                        <div className={styles.EventOn}>
                            <div className={styles.MeetingOn}>
                                <div>
                                    <b>Next Meeting on</b>
                                    <div>
                                        <h1>22 June 2023</h1>
                                        <b>Sunday</b>
                                    </div>
                                </div>
                                <i className="fa-solid fa-pencil"></i>
                            </div>
                            <div className={styles.MeetingBtn}>
                                <b>
                                    venue: multiplication hall <br /> time:
                                    10:00 am
                                </b>
                                <button className={styles.BtnBtn}>Done</button>
                            </div>
                        </div>

                        {/* <div className={styles.EventOn}>
                            <div className={styles.ScheduleOn}>
                                <b>Schedule meeting</b>
                                <p>Enter details to schedule your weekly meeting</p>
                            </div>
                            <div className={styles.InputSchedule}>
                                <div>
                                    <input type="time" placeholder="meeting time" />
                                    <input type="date" placeholder="meeting day" />
                                </div>
                                <input type="text" placeholder="meeting venue" />
                            </div>
                            <button className={styles.BtnBtn}>Schedule</button>
                        </div> */}

                        <div className={styles.PendingApp}>
                            <b className={styles.PendingTitle}>Pending approvals</b>
                            <div className={styles.PendingList}>
                                <div className={styles.PendingMembers}>
                                    <span>
                                        <img
                                            src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
                                            alt=""
                                        />
                                        <b>Sarah Philip</b>
                                    </span>
                                    <div className={styles.buttons}>
                                        <button className={styles.BtnBtn}>
                                            Approve
                                        </button>
                                        <button className={styles.BtnClr}>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.PendingMembers}>
                                    <span>
                                        <img
                                            src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
                                            alt=""
                                        />
                                        <b>Sarah Philip</b>
                                    </span>
                                    <div className={styles.buttons}>
                                        <button className={styles.BtnBtn}>
                                            Approve
                                        </button>
                                        <button className={styles.BtnClr}>
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.RightBox}>
                        <div className={styles.Streak}>
                            <img
                                src="https://i.ibb.co/BNMSdTH/flame.png"
                                alt=""
                            />
                            <div>
                                <b className={styles.StreakCount}>87</b>
                                <b>STREAK</b>
                            </div>
                        </div>

                        <div className={styles.Members}>
                            <span className={styles.MemberTitle}>
                                Members
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </span>
                            <div className={styles.MemberList}>
                                <div className={styles.MemberName}>
                                    <img
                                        src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
                                        alt=""
                                    />
                                    <div>
                                        <p>Sarah philip</p>
                                        <span>
                                            <img
                                                src="https://i.ibb.co/Dbhv9rS/karma.png"
                                                alt=""
                                            />
                                            2k
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.MemberName}>
                                    <img
                                        src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
                                        alt=""
                                    />
                                    <div>
                                        <p>Sarah philip</p>
                                        <span>
                                            <img
                                                src="https://i.ibb.co/Dbhv9rS/karma.png"
                                                alt=""
                                            />
                                            2k
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.MemberName}>
                                    <img
                                        src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
                                        alt=""
                                    />
                                    <div>
                                        <p>Sarah philip</p>
                                        <span>
                                            <img
                                                src="https://i.ibb.co/Dbhv9rS/karma.png"
                                                alt=""
                                            />
                                            2k
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.MemberName}>
                                    <img
                                        src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
                                        alt=""
                                    />
                                    <div>
                                        <p>Sarah philip</p>
                                        <span>
                                            <img
                                                src="https://i.ibb.co/Dbhv9rS/karma.png"
                                                alt=""
                                            />
                                            2k
                                        </span>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LearningCircle;
