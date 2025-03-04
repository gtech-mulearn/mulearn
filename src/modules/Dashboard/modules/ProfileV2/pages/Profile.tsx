import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import {
    getPublicUserLevels,
    getPublicUserLog,
    getPublicUserProfile,
    getSocials,
    getUserLevels,
    getUserLog,
    getUserProfile
} from "../services/api";
import { useParams } from "react-router-dom";
import moment from "moment";
import BasicDetails from "../components/BasicDetails/pages/BasicDetails";
import KarmaHistory from "../components/KarmaHistory/KarmaHistory";
import MuVoyage from "../components/MuVoyage/pages/MuVoyage";
import { Projects } from "../components/Projects/Projects";
// import { PieChart } from "../components/Piechart/PieChart";
import Rocket from "../assets/svg/Rocket";
import ProfileHeader from "../components/ProfileHeader/ProfileHeader";
import Example from "../components/CircularProgressChart/CircularProgressChart";

type Props = {};
interface CircleSection {
    label: string;
    percentage: number;
    color?: string;
}
const ProfileV2 = (props: Props) => {
    // const circleSections: CircleSection[] = [
    //     { label: "hod", percentage: 40, color: "#456FF6" },
    //     { label: "hod", percentage: 0, color: "#4566F6" },
    //     { label: "hod", percentage: 0, color: "#456FF6" },
    //     { label: "hod", percentage: 0, color: "#456FF6" },
    //     { label: "hod", percentage: 0, color: "#456FF6" }
    // ];

    const { id } = useParams<{ id: string }>();
    const [APILoadStatus, setAPILoadStatus] = useState(0);
    const [socials, setSocials] = useState([]);
    const [profileList, setProfileList] = useState("basic-details");
    const [userProfile, setUserProfile] = useState({
        first_name: "",
        last_name: "",
        college_code: "",
        interest_groups: [{ name: "", karma: 0 }],
        karma_distribution: [{ task_type: "", karma: 0 }],
        gender: "",
        id: "",
        joined: "",
        karma: "",
        rank: "",
        muid: "",
        level: "",
        profile_pic: "",
        is_public: false,
        roles: []
    });
    const [profileStatus, setProfileStatus] = useState<boolean>();
    const [userLog, setUserLog] = useState([
        {
            task_name: "",
            karma: "",
            created_date: ""
        }
    ]);
    const [userLevelData, setUserLevelData] = useState([
        {
            karma: 0,
            name: "",
            tasks: [
                {
                    task_name: "",
                    discord_link: "",
                    completed: false,
                    hashtag: "",
                    karma: 0
                }
            ]
        }
    ]);
    const convertedData1 = userProfile.interest_groups?.map(item => [
        item.name,
        item.karma
    ]);
    const convertedData2 = userProfile.karma_distribution?.map(item => [
        item.task_type,
        item.karma
    ]);
    const data = [["Task", "0"], ...convertedData2, ...convertedData1];

    function getMonthDifference(startDate: Date, endDate: Date): number {
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const endYear = endDate.getFullYear();
        const endMonth = endDate.getMonth();
        return (endYear - startYear) * 12 + (endMonth - startMonth);
    }
    const startDate = new Date(userProfile?.joined?.slice(0, 10));
    const endDate = new Date(moment().format("YYYY-MM-DD"));
    const monthDifference = getMonthDifference(startDate, endDate);
    const firstFetch = useRef(true);

    // const triggerUpdateProfile = () => {
    //     setTimeout(() => {
    //         getUserProfile(setUserProfile, setAPILoadStatus, setProfileStatus);
    //     }, 1000);
    // };
    useEffect(() => {
        if (firstFetch.current) {
            if (!id) {
                getUserProfile(
                    setUserProfile,
                    setAPILoadStatus,
                    setProfileStatus
                );
                getUserLog(setUserLog);
                getUserLevels(setUserLevelData);
                getSocials(setSocials);
            } else {
                getPublicUserProfile(setUserProfile, setAPILoadStatus, id);
                getPublicUserLog(setUserLog, id);
                getPublicUserLevels(setUserLevelData, id);
                getSocials(setSocials, id);
            }
        }
        firstFetch.current = false;
    }, []);

    const formattedData = data.map(item => ({
        name: item[0] as string,
        value: item[1] as number
    }));

    const RolesPositionArrayX = [
        "85px",
        "50px",
        "150px",
        "235px",
        "260px",
        "290px",
        "390px",
        "355px",
        "400px",
        "450px",
        "500px",
        "550px",
        "600px",
        "650px",
        "700px",
        "750px",
        "800px",
        "850px"
    ];
    const RolesPositionArrayY = [
        "220px",
        "110px",
        "90px",
        "190px",
        "110px",
        "150px",
        "220px",
        "110px",
        "150px",
        "220px",
        "110px",
        "150px",
        "220px",
        "110px",
        "150px",
        "220px",
        "110px",
        "150px",
        "220px",
        "110px",
        "150px",
        "220px",
        "110px",
        "150px",
        "220px",
        "110px",
        "150px",
        "220px",
        "110px",
        "150px"
    ];

    return (
        <>
            <ProfileHeader
                userProfile={userProfile}
                monthDifference={monthDifference}
                socials={socials}
            />

            <div className={styles.roles_and_karma_container}>
                <div className={styles.roles_karma_dist_container}>
                    <div className={styles.role_distribution_container}>
                        <h1>Roles and contributions</h1>
                        <div className={styles.ElipseWrapper}>
                            {userProfile.roles?.map((item, index) => {
                                return (
                                    <div
                                        className={styles.ellipseBasic}
                                        style={{
                                            width: `calc(250px + ${
                                                140 * index
                                            }px)`,
                                            height: `calc(200px + ${
                                                140 * index
                                            }px)`
                                        }}
                                    ></div>
                                );
                            })}
                            <div className={styles.planet}></div>
                        </div>
                        <div className={styles.roles_container}>
                            {userProfile.roles?.map((item, index) => {
                                return (
                                    <div
                                        className={styles.RoleWrapperContainer}
                                        style={{
                                            top: RolesPositionArrayY[index],
                                            left: RolesPositionArrayX[index]
                                        }}
                                    >
                                        <div className={styles.StyleCommonRole}>
                                            <div
                                                className={
                                                    styles.innerStyleCommonRole
                                                }
                                            ></div>
                                        </div>

                                        <h2> {item}</h2>
                                        <p>(2021)</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.karma_distribution_container}>
                        {" "}
                        <h1>Karma distribution</h1>
                        <div className={styles.container}>
                            {/* <PieChart data={data} /> */}
                            <Example data={formattedData} />
                        </div>
                    </div>
                </div>

                {window.innerWidth > 1290 ? <Rocket /> : <></>}
            </div>

            <div className={styles.profileList}>
                <li
                    onClick={() => setProfileList("basic-details")}
                    className={
                        profileList === "basic-details"
                            ? styles.activeBar
                            : styles.notActiveBar
                    }
                >
                    Basic Details
                </li>
                <li
                    onClick={() => setProfileList("karma-history")}
                    className={
                        profileList === "karma-history"
                            ? styles.activeBar
                            : styles.notActiveBar
                    }
                >
                    Karma History
                </li>
                <li
                    onClick={() => setProfileList("mu-voyage")}
                    className={
                        profileList === "mu-voyage"
                            ? styles.activeBar
                            : styles.notActiveBar
                    }
                >
                    Mu Voyage
                </li>{" "}
                {/* <li
                    onClick={() => setProfileList("projects")}
                    className={
                        profileList === "projects"
                            ? styles.activeBar
                            : styles.notActiveBar
                    }
                >
                    Projects
                </li> */}
            </div>

            {profileList === "basic-details" ? (
                <BasicDetails userProfile={userProfile} userLog={userLog} />
            ) : profileList === "karma-history" ? (
                <KarmaHistory userProfile={userProfile} userLog={userLog} />
            ) : profileList === "projects" ? (
                <Projects />
            ) : (
                profileList === "mu-voyage" && (
                    <MuVoyage
                        userLevelData={userLevelData}
                        userLevel={
                            userProfile.level !== null
                                ? parseInt(userProfile.level.slice(3, 4))
                                : 1
                        }
                    />
                )
            )}
        </>
    );
};

export default ProfileV2;
