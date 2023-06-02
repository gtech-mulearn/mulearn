import styles from "./Profile.module.css";

const Profile = () => {
    return (
        <>
            {/* <div classNameN{styles.me={styles.profile_container}>
                <p classNameN{styles.me={styles.heading}>Coming Soon!</p>
                <p classNameN{styles.me={styles.tagline}>Wait for it</p>
            </div> */}
            <div className={styles.rightDash}>
                <div className={styles.profileDash}>
                    <div className={styles.profile}>
                        <div className={styles.banner}>
                            <i className=".fa-solid fa-gear"></i>
                        </div>
                        <div className={styles.profileInfo}>
                            <div className={styles.profilePic}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wSW1AgdW3SF4ZJTe0617555_uIDlAL01UQ&usqp=CAU"
                                    alt=""
                                />

                                <div className={styles.name}>
                                    <h1>Mark Smith</h1>
                                    <p>marksmith12@mulearn</p>
                                </div>
                            </div>

                            <button>
                                <i
                                    className=".fa-solid fa-pencil"
                                    style={{ color: "#ffffff" }}
                                ></i>
                                Edit profile
                            </button>
                        </div>

                        <div className={styles.profileList}>
                            <li>Basic Details</li>
                            <li>karma History</li>
                            <li>Join Mulearn</li>
                            <li>See More</li>
                            <div>
                                <i className=".fa-solid fa-chevron-left"></i>
                                <i className=".fa-solid fa-chevron-right"></i>
                            </div>
                        </div>

                        <div className={styles.pointsList}>
                            <div className={styles.points}>
                                <img
                                    src="/src/modules/Dashboard/modules/Profile/assets/images/karmaVector.png"
                                    alt=""
                                    style={{ objectFit: "contain" }}
                                />
                                <div>
                                    <span>Karma</span>
                                    <h1>2.37K</h1>
                                </div>
                            </div>
                            <div className={styles.points}>
                                <img
                                    src="/src/modules/Dashboard/modules/Profile/assets/images/rankVector.png"
                                    alt=""
                                    style={{ objectFit: "contain" }}
                                />
                                <div>
                                    <span>Rank</span>
                                    <h1>121</h1>
                                </div>
                            </div>
                            <div className={styles.points}>
                                <img
                                    src="/src/modules/Dashboard/modules/Profile/assets/images/hatVector.png"
                                    alt=""
                                    style={{ objectFit: "contain" }}
                                />
                                <div>
                                    <span>College</span>
                                    <h1>AEC</h1>
                                </div>
                            </div>
                        </div>

                        <div className={styles.interestGrp}>
                            <b>Interest Groups</b>
                            <div>
                                <li>UX/UI Design</li>
                                <li>Blockchain</li>
                                <li>Creative Design</li>
                                <li>Marketing</li>
                            </div>
                        </div>

                        <div className={styles.heatmap}>
                            <img src="/src/modules/Dashboard/modules/Profile/assets/images/heatmap.png" alt="" />
                        </div>
                    </div>

                    <div className={styles.notification}>
                        <div className={styles.leadboard}>
                            <div className={styles.head}>
                                <h2>LeaderBoard</h2>
                                <div>
                                    <img
                                        className={styles.btns}
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wSW1AgdW3SF4ZJTe0617555_uIDlAL01UQ&usqp=CAU"
                                        alt=""
                                    />
                                    <img
                                        className={styles.btns}
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wSW1AgdW3SF4ZJTe0617555_uIDlAL01UQ&usqp=CAU"
                                        alt=""
                                    />
                                    <img
                                        className={styles.btns}
                                        src=""
                                        alt=""
                                    />
                                </div>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardInfo}>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wSW1AgdW3SF4ZJTe0617555_uIDlAL01UQ&usqp=CAU"
                                        alt=""
                                    />
                                    <div className={styles.cardName}>
                                        <p>Mark Smith</p>
                                        <p>marksmith12@mulearn</p>
                                    </div>
                                </div>
                                <i className=".fa-solid fa-chevron-right"></i>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardInfo}>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wSW1AgdW3SF4ZJTe0617555_uIDlAL01UQ&usqp=CAU"
                                        alt=""
                                    />
                                    <div className={styles.cardName}>
                                        <p>Mark Smith</p>
                                        <p>marksmith12@mulearn</p>
                                    </div>
                                </div>
                                <i className=".fa-solid fa-chevron-right"></i>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardInfo}>
                                    <img
                                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wSW1AgdW3SF4ZJTe0617555_uIDlAL01UQ&usqp=CAU"
                                        alt=""
                                    />
                                    <div className={styles.cardName}>
                                        <p>Mark Smith</p>
                                        <p>marksmith12@mulearn</p>
                                    </div>
                                </div>
                                <i className=".fa-solid fa-chevron-right"></i>
                            </div>
                        </div>

                        <div className={styles.leadboard}>
                            <div className={styles.head}>
                                <h2>Recent Activity</h2>
                                <span>View More</span>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardInfo}>
                                    <img
                                        src="/karmaVector.png"
                                        alt=""
                                        style={{
                                            width: "3rem",
                                            height: "3rem",
                                            padding: ".5rem",
                                            backgroundColor: "#014BB2"
                                        }}
                                    />
                                    <div className={styles.cardName}>
                                        <p>
                                            <span style={{ color: "#014BB2" }}>
                                                50 Karma
                                            </span>{" "}
                                            awarded for mini task.
                                        </p>
                                        <p>5 seconds ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.cardInfo}>
                                    <img
                                        src="/karmaVector.png"
                                        alt=""
                                        style={{
                                            width: "3rem",
                                            height: "3rem",
                                            padding: ".5rem",
                                            backgroundColor: "#014BB2"
                                        }}
                                    />{" "}
                                    <div className={styles.cardName}>
                                        <p>
                                            <span style={{ color: "#014BB2" }}>
                                                50 Karma
                                            </span>{" "}
                                            awarded for mini task.
                                        </p>
                                        <p>5 seconds ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.cardInfo}>
                                    <img
                                        src="/karmaVector.png"
                                        alt=""
                                        style={{
                                            width: "3rem",
                                            height: "3rem",
                                            padding: ".5rem",
                                            backgroundColor: "#014BB2"
                                        }}
                                    />
                                    <div className={styles.cardName}>
                                        <p>
                                            <span style={{ color: "#014BB2" }}>
                                                50 Karma
                                            </span>{" "}
                                            awarded for mini task.
                                        </p>
                                        <p>5 seconds ago</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.card}>
                                <div className={styles.cardInfo}>
                                    <img
                                        src="/karmaVector.png"
                                        alt=""
                                        style={{
                                            width: "3rem",
                                            height: "3rem",
                                            padding: ".5rem",
                                            backgroundColor: "#014BB2"
                                        }}
                                    />
                                    <div className={styles.cardName}>
                                        <p>
                                            <span style={{ color: "#014BB2" }}>
                                                50 Karma
                                            </span>{" "}
                                            awarded for mini task.
                                        </p>
                                        <p>5 seconds ago</p>
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

export default Profile;
