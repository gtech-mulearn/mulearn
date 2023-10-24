import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import LinkedIn from "../assets/svg/LinkedIn";
import Twitter from "../assets/svg/Twitter";
import Instagram from "../assets/svg/Instagram";
import Behance from "../assets/svg/Behance";
import Karma from "../assets/svg/Karma";
import Rank from "../assets/svg/Rank";
import AvgKarma from "../assets/svg/AvgKarma";
import KarmaDist from "../assets/svg/KarmaDist";

import {
    getPublicUserLevels,
    getPublicUserLog,
    getPublicUserProfile,
    getUserLevels,
    getUserLog,
    getUserProfile
} from "../services/api";
import { useParams } from "react-router-dom";
import moment from "moment";
import BasicDetails from "../components/BasicDetails/pages/BasicDetails";
import KarmaHistory from "../components/KarmaHistory/KarmaHistory";
import MuVoyage from "../components/MuVoyage/pages/MuVoyage";
import { PieChart } from "../components/Piechart/PieChart";
import Rocket from "../assets/svg/Rocket";

type Props = {};
interface CircleSection {
    label: string;
    percentage: number;
    color?: string;
}
const ProfileV2 = (props: Props) => {
    const circleSections: CircleSection[] = [
        { label: "hod", percentage: 40, color: "#456FF6" },
        { label: "hod", percentage: 0, color: "#4566F6" },
        { label: "hod", percentage: 0, color: "#456FF6" },
        { label: "hod", percentage: 0, color: "#456FF6" },
        { label: "hod", percentage: 0, color: "#456FF6" }
        // { label: "karma", percentage: 60, color: "#8FBCFA" },
        // { label: "general", percentage: 20, color: "#E0EDFF" }
    ];

    const { id } = useParams<{ id: string }>();
    const [APILoadStatus, setAPILoadStatus] = useState(0);
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
            tasks: [{ task_name: "", completed: false, hashtag: "", karma: 0 }]
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

    const triggerUpdateProfile = () => {
        setTimeout(() => {
            getUserProfile(setUserProfile, setAPILoadStatus, setProfileStatus);
        }, 1000);
    };
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
            } else {
                getPublicUserProfile(setUserProfile, setAPILoadStatus, id);
                getPublicUserLog(setUserLog, id);
                getPublicUserLevels(setUserLevelData, id);
            }
        }
        firstFetch.current = false;
    }, []);
    return (
        <>
            <div className={styles.basic_details}>
                <div className={styles.profile_details_container}>
                    <p
                        className={styles.profile_pic}
                        style={{
                            backgroundImage: `url(${userProfile.profile_pic})`
                        }}
                    >
                        {" "}
                    </p>
                    <div className={styles.profile_details}>
                        <h1>
                            {userProfile.first_name} {userProfile.last_name}{" "}
                            {userProfile.college_code
                                ? "(" + userProfile.college_code + ")"
                                : null}
                        </h1>
                        <p> {userProfile.muid}</p>
                        <div className={styles.socials}>
                            <LinkedIn />
                            <Twitter />
                            <Instagram />
                            <Behance />
                        </div>
                    </div>
                </div>

                <div className={styles.basic_details_detail}>
                    <div className={styles.status_container}>
                        <div className={styles.status}>
                            <div>
                                <p>Level</p>
                                <p>
                                    {" "}
                                    {userProfile.level
                                        ? userProfile?.level?.slice(3, 4)
                                        : 1}
                                </p>
                            </div>
                        </div>
                        <div className={styles.status}>
                            <Karma />
                            <div>
                                <p>Karma</p>
                                <p>
                                    {parseInt(userProfile.karma) > 1000
                                        ? (
                                              parseInt(userProfile.karma) / 1000
                                          ).toPrecision(3) + "K"
                                        : userProfile.karma}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.status_container}>
                        <div className={styles.status}>
                            <Rank />
                            <div>
                                <p>Rank</p>
                                <p>{userProfile.rank}</p>
                            </div>
                        </div>
                        <div className={styles.status}>
                            <AvgKarma />
                            <div>
                                <p>Avg.Karma</p>
                                <p>
                                    {" "}
                                    {parseInt(userProfile.karma) /
                                        monthDifference >
                                        1000 && monthDifference !== 0
                                        ? (
                                              parseInt(userProfile.karma) /
                                              monthDifference /
                                              1000
                                          ).toPrecision(4) + "K"
                                        : isNaN(
                                              parseInt(userProfile.karma) /
                                                  monthDifference
                                          )
                                        ? "0"
                                        : monthDifference === 0
                                        ? "0"
                                        : (
                                              parseInt(userProfile.karma) /
                                              monthDifference
                                          ).toPrecision(3)}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.roles_and_karma_container}>
                <div className={styles.roles_karma_dist_container}>
                    <div className={styles.role_distribution_container}>
                        <h1>Roles and contributions</h1>
                        <div className={styles.ellipse}></div>
                        <div className={styles.ellipse1}></div>
                        <div className={styles.ellipse2}></div>
                        <div className={styles.ellipse3}></div>
                        <div className={styles.planet}></div>
                    </div>
                    <div className={styles.karma_distribution_container}>
                        <div className={styles.container}>
                            {/* <div className={styles.ui_widgets}>
                            <div className={styles.ui_value}>85%</div>
                            <div className={styles.ui_labels}>Java</div>
                        </div> */}
                            {/* <KarmaDist sections={circleSections} /> */}
                            <PieChart data={data} />
                        </div>
                    </div>
                </div>
                {window.innerWidth > 1200 ? <Rocket /> : <></>}
            </div>

            <div className={styles.profileList}>
                <p
                    style={
                        profileList === "basic-details"
                            ? {
                                  marginLeft: "0px",
                                  width: "6.1rem"
                              }
                            : profileList === "karma-history"
                            ? {
                                  marginLeft: "165px",
                                  width: "6.7rem"
                              }
                            : profileList === "mu-voyage"
                            ? {
                                  marginLeft: "340px",
                                  width: "5.3rem"
                              }
                            : {}
                    }
                    className={styles.underline}
                ></p>
                <li
                    onClick={() => setProfileList("basic-details")}
                    style={
                        profileList === "basic-details"
                            ? {
                                  fontSize: "600",
                                  color: "#000"
                              }
                            : {}
                    }
                >
                    Basic Details
                </li>
                <li
                    onClick={() => setProfileList("karma-history")}
                    style={
                        profileList === "karma-history"
                            ? {
                                  fontSize: "600",
                                  color: "#000"
                              }
                            : {}
                    }
                >
                    Karma History
                </li>
                <li
                    onClick={() => setProfileList("mu-voyage")}
                    style={
                        profileList === "mu-voyage"
                            ? {
                                  fontSize: "600",
                                  color: "#000"
                              }
                            : {}
                    }
                >
                    Mu Voyage
                </li>
            </div>

            {profileList === "basic-details" ? (
                <BasicDetails userProfile={userProfile} userLog={userLog} />
            ) : profileList === "karma-history" ? (
                <KarmaHistory userProfile={userProfile} userLog={userLog} />
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
