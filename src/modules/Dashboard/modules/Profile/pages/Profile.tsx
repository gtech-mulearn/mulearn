import { useEffect, useState } from "react";
import { MuButton } from "../../../../../components/MuComponents/MuButtons/MuButton";
import styles from "./Profile.module.css";
import moment from "moment";
import {
    getUserLog,
    getUserProfile,
    getStudentLeaderBoard,
    getUserIg,
    getUserTaskLog
} from "../services/api";
import { PieChart } from "../Piechart/PieChart";

// import { PieChart, Pie, Legend, Tooltip } from "recharts";
// const data = [
//     { name: "Category 1", value: 40 },
//     { name: "Category 2", value: 30 },
//     { name: "Category 3", value: 20 },
//     { name: "Category 4", value: 10 }
// ];
export const data = [
    { name: "Mark", value: 90 },
    { name: "Robert", value: 12 },
    { name: "Emily", value: 34 },
    { name: "Marion", value: 53 }
    // {name:"Nicolas", value: 98},
];

const Profile = () => {
    const [userProfile, setUserProfile] = useState({
        dob: "",
        email: "",
        gender: "",
        mobile: "",
        muid: "",
        name: ""
    });
    const [studentLeaderBoard, setStudentLeaderBoard] = useState([
        {
            fullName: "",
            totalKarma: "",
            institution: "",
            muid: ""
        }
    ]);
    const [userIg, setUserIg] = useState([
        {
            interestGroup: ""
        }
    ]);
    const [userTaskLog, setUserTaskLog] = useState({
        userKarma: "",
        OrgCode: "",
        rank: ""
    });
    const [userLog, setUserLog] = useState([
        {
            taskName: "",
            karmaPoint: "",
            createdDate: ""
        }
    ]);
    useEffect(() => {
        getUserProfile(setUserProfile);
        getUserLog(setUserLog);
        getStudentLeaderBoard(setStudentLeaderBoard);
        getUserIg(setUserIg);
        getUserTaskLog(setUserTaskLog);
        console.log(setUserLog);
    }, []);
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
                            <i className="fi fi-rr-settings"></i>{" "}
                        </div>
                        <div className={styles.profileInfo}>
                            <div className={styles.profilePic}>
                                <img
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9wSW1AgdW3SF4ZJTe0617555_uIDlAL01UQ&usqp=CAU"
                                    alt=""
                                />

                                <div className={styles.name}>
                                    <h1>{userProfile.name}</h1>
                                    <p>{userProfile.muid}</p>
                                </div>
                            </div>

                            {/* <MuButton
                                text={"Edit Profile"}
                                icon={<i className="fi fi-sr-pencil"></i>}
                                style={{
                                    width: "unset",
                                    minWidth: "80px",
                                    marginTop: "30px",
                                    height: "40px",
                                    background: "#014BB2",
                                    color: "#fff"
                                }}
                            /> */}
                        </div>

                        <div className={styles.profileList}>
                            <li>Basic Details</li>
                            {/* <li>Karma History</li>
                            <li>Join Mulearn</li>
                            <li>See More</li> */}
                            <div>
                                <i className=".fa-solid fa-chevron-left"></i>
                                <i className="fi fi-ts-angle-right"></i>
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
                                    <h1>{userTaskLog.userKarma}</h1>
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
                                    <h1>{userTaskLog.rank}</h1>
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
                                    <h1>{userTaskLog.OrgCode}</h1>
                                </div>
                            </div>
                        </div>

                        <div className={styles.interestGrp}>
                            <b>Interest Groups</b>
                            <div>
                                {userIg.map((data, i) => {
                                    return (
                                        <li key={i}>{data.interestGroup}</li>
                                    );
                                })}
                            </div>
                        </div>

                        <div className={styles.heatmap}></div>
                    </div>

                    <div className={styles.notification}>
                        <div className={styles.existing_roles}>
                            <div className={styles.head}>
                                <h2>Existing Roles</h2>
                                <p>
                                    {JSON.parse(
                                        localStorage.getItem("userInfo")!
                                    ).roles.join(", ")}
                                </p>
                            </div>
                            <div className={styles.head}>
                                <h2>Karma Distribution</h2>
                                {/* <PieChart width={400} height={400}>
                                    <Pie
                                        data={data}
                                        dataKey="value"
                                        nameKey="name"
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label
                                    />
                                    <Tooltip />
                                    <Legend />
                                </PieChart> */}
                                <div className={styles.pie_chart}>
                                    <PieChart
                                        data={data}
                                        width={250}
                                        height={250}
                                    />
                                    <div className={styles.data_details}>
                                        <div
                                            className={styles.data_details_list}
                                        >
                                            <span></span>
                                            <p>Bootcamps</p>
                                        </div>
                                        <div
                                            className={styles.data_details_list}
                                        >
                                            {" "}
                                            <span></span>
                                            <p>Tasks</p>
                                        </div>
                                        <div
                                            className={styles.data_details_list}
                                        >
                                            {" "}
                                            <span></span>
                                            <p>IG</p>
                                        </div>
                                        <div
                                            className={styles.data_details_list}
                                        >
                                            {" "}
                                            <span></span>
                                            <p>Roles</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.leadboard}>
                            <div className={styles.head}>
                                <h2>Recent Activity</h2>
                                <span>View More</span>
                            </div>
                            <div className={styles.data_card}>
                                {userLog
                                    .sort((a, b) => {
                                        return (
                                            new Date(b.createdDate).getTime() -
                                            new Date(a.createdDate).getTime()
                                        );
                                    })
                                    .map((log, i) => (
                                        <div key={i} className={styles.card}>
                                            <div className={styles.cardInfo}>
                                                <img
                                                    src="/src/modules/Dashboard/modules/Profile/assets/images/karmaVector.png"
                                                    alt=""
                                                    style={{
                                                        width: "3rem",
                                                        height: "3rem",
                                                        padding: ".5rem",
                                                        backgroundColor:
                                                            "#014BB2"
                                                    }}
                                                />{" "}
                                                <div
                                                    className={styles.cardName}
                                                >
                                                    <p>
                                                        <span
                                                            style={{
                                                                color: "#014BB2"
                                                            }}
                                                        >
                                                            {log.karmaPoint}
                                                        </span>{" "}
                                                        awarded for{" "}
                                                        {log.taskName}.
                                                    </p>
                                                    <p>
                                                        {moment
                                                            .utc(
                                                                log.createdDate
                                                            )
                                                            .local()
                                                            .startOf("seconds")
                                                            .fromNow()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
