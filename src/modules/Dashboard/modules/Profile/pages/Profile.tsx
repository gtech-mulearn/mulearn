import { useEffect, useState } from "react";
import { MuButton } from "../../../../../components/MuComponents/MuButtons/MuButton";
import styles from "./Profile.module.css";
import moment from "moment";
import { getUserLog, getUserProfile } from "../services/api";
import { PieChart } from "../Piechart/PieChart";
import HeatmapComponent from "../Heatmap/HeatmapComponent";
import MulearnBrand from "../assets/svg/MulearnBrand";

const Profile = () => {
    const [userProfile, setUserProfile] = useState({
        firstName: "",
        lastName: "",
        college_code: "",
        interest_groups: [{ name: "", karma: 0 }],
        karma_distribution: [{ task_type: "", karma: 0 }],
        gender: "",
        id: "",
        joined: "",
        karma: "",
        rank: "",
        muid: "",
        level: ""
    });
    const [userLog, setUserLog] = useState([
        {
            taskName: "",
            karmaPoint: "",
            createdDate: ""
        }
    ]);

    const convertedData1 = userProfile.interest_groups.map(item => [
        item.name,
        item.karma
    ]);
    const convertedData2 = userProfile.karma_distribution.map(item => [
        item.task_type,
        item.karma
    ]);
    const data = [
        ["Task", "Hours per Day"],
        ...convertedData2,
        ...convertedData1
    ];

    function getMonthDifference(startDate: Date, endDate: Date): number {
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();
        return (endYear - startYear) * 12 + (endMonth - startMonth);
    }
    const startDate = new Date(userProfile.joined.slice(0, 10));
    const endDate = new Date(moment().format("YYYY-MM-DD"));
    const monthDifference = getMonthDifference(startDate, endDate);

    useEffect(() => {
        getUserProfile(setUserProfile);
        getUserLog(setUserLog);
        // console.log(setUserLog);
    }, []);

    return (
        <>
            <div className={styles.rightDash}>
                <div className={styles.profileDash}>
                    <div className={styles.profile}>
                        <div className={styles.banner}>
                            {/* <i className="fi fi-sr-settings"></i> */}

                            <div className={styles.member_since}>
                                <div>
                                    <MulearnBrand />
                                </div>
                                <p>
                                    Member since{" "}
                                    {userProfile.joined.slice(0, 4)}
                                </p>
                            </div>
                        </div>
                        <div className={styles.profileInfo}>
                            <div className={styles.profilePic}>
                                <img
                                    src={
                                        userProfile.gender === "female"
                                            ? "/src/modules/Dashboard/modules/Profile/assets/images/dpfm.jpeg"
                                            : "/src/modules/Dashboard/modules/Profile/assets/images/dpm.jpg"
                                    }
                                    alt=""
                                />

                                <div className={styles.name}>
                                    <h1>
                                        {userProfile.firstName}{" "}
                                        {userProfile.lastName}{" "}
                                        {userProfile.college_code
                                            ? userProfile.college_code
                                            : null}
                                    </h1>
                                    <p style={{ marginTop: "-5px" }}>
                                        {userProfile.muid}
                                    </p>
                                    <p style={{ color: "#014BB2" }}>
                                        LEVEL{"     "}
                                        {userProfile.level
                                            ? userProfile.level.slice(3, 4)
                                            : 0}
                                    </p>
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
                                    <h1>
                                        {parseInt(userProfile.karma) > 1000
                                            ? (
                                                  parseInt(userProfile.karma) /
                                                  1000
                                              ).toPrecision(4) + "K"
                                            : userProfile.karma}
                                    </h1>
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
                                    <h1>{userProfile.rank}</h1>
                                </div>
                            </div>
                            <div className={styles.points}>
                                <img
                                    src="/src/modules/Dashboard/modules/Profile/assets/images/karmaVector.png"
                                    alt=""
                                    style={{ objectFit: "contain" }}
                                />
                                <div>
                                    <span>Avg.Karma/Month</span>
                                    <h1>
                                        {parseInt(userProfile.karma) /
                                            monthDifference >
                                        1000
                                            ? (
                                                  parseInt(userProfile.karma) /
                                                  monthDifference /
                                                  1000
                                              ).toPrecision(4) + "K"
                                            : (
                                                  parseInt(userProfile.karma) /
                                                  monthDifference
                                              ).toPrecision(3)}
                                    </h1>
                                </div>
                            </div>
                        </div>

                        <div className={styles.interestGrp}>
                            <b>Interest Groups</b>
                            <div className={styles.igs_container}>
                                {userProfile.interest_groups.length != 0 ? (
                                    userProfile.interest_groups.map(
                                        (data, i) => {
                                            return (
                                                <div
                                                    className={styles.igs}
                                                    key={i}
                                                >
                                                    {data.name}
                                                    <p>
                                                        {data.karma > 1000
                                                            ? (
                                                                  data.karma /
                                                                  1000
                                                              ).toPrecision(2) +
                                                              "K"
                                                            : data.karma}
                                                    </p>
                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <p>No Interest Groups</p>
                                )}
                            </div>
                        </div>

                        <div className={styles.heatmap}>
                            <HeatmapComponent data={userLog} />
                        </div>
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
                                <div className={styles.pie_chart}>
                                    <PieChart data={data} />
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
