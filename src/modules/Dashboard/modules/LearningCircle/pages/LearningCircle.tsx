import styles from './LearningCircle.module.css'

type Props = {};

const LearningCircle = (props: Props) => {
    return (
        <>
            <div className={styles.content}>
                <div className={styles.CircleName}>
                    <div>
                        <h1>UX world</h1>
                        <p>
                            LBS Institute of Technology for Women <br /> Code:
                            LBT{" "}
                        </p>
                    </div>
                    <div className={styles.CircleRank}>
                        <div>
                            <h3>Rank</h3>
                            <h1>3</h1>
                            <h5>4.68K Karma</h5>
                        </div>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>

                <div className={styles.BoxContent}>
                    <div className={styles.LeftBox}>
                        <div className={styles.EventOn}>
                            <div className={styles.MeetingOn}>
                                <div>
                                    <p>Next Meeting on</p>
                                    <div>
                                        <h1>22 June 2023</h1>
                                        <p>Sunday</p>
                                    </div>
                                </div>
                                <i className="fa-solid fa-pencil"></i>
                            </div>
                            <div className={styles.MeetingBtn}>
                                <p>
                                    venue: multiplication hall <br /> time:
                                    10:00 am
                                </p>
                                <button className={styles.BtnBtn}>Done</button>
                            </div>
                        </div>

                        <div className={styles.PendingApp}>
                            <h2>Pending approvals</h2>
                            <div className={styles.PendingList}>
                                <div className={styles.PendingMembers}>
                                    <span>
                                        <img
                                            src="https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png"
                                            alt=""
                                        />
                                        <p>Sarah Philip</p>
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
                                        <p>Sarah Philip</p>
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
                                <h1>87</h1>
                                <p>STREAK</p>
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
