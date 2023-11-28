import React, { useEffect, useRef, useState } from "react";
import styles from "./Profile.module.css";
import Karma from "../assets/svg/Karma";
import Rank from "../assets/svg/Rank";
import AvgKarma from "../assets/svg/AvgKarma";
// import KarmaDist from "../assets/svg/KarmaDist";
import LinkedIn from "../assets/svg/LinkedIn";
import Twitter from "../assets/svg/Twitter";
import Instagram from "../assets/svg/Instagram";
import Behance from "../assets/svg/Behance";
import Github from "../assets/svg/Github";
import Facebook from "../assets/svg/Facebook";
import Dribble from "../assets/svg/Dribble";
import StackOverflow from "../assets/svg/StackOverflow";
import Medium from "../assets/svg/Medium";

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
import { PieChart } from "../components/Piechart/PieChart";
import Rocket from "../assets/svg/Rocket";
import Planet from "../assets/svg/Planets/Planet";
import Planet2 from "../assets/svg/Planets/Planet2";
import Planet3 from "../assets/svg/Planets/Planet3";
import KarmaDist from "../assets/svg/KarmaDist";
import { calc } from "@chakra-ui/react";

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
    const socialMediaUrlMappings: { [key: string]: string } = {
        github: "https://github.com/",
        facebook: "https://www.facebook.com/",
        instagram: "https://www.instagram.com/",
        linkedin: "https://www.linkedin.com/in/",
        dribble: "https://dribbble.com/",
        behance: "https://www.behance.net/",
        stackoverflow: "https://stackoverflow.com/users/",
        medium: "https://medium.com/@"
    };
    const socialMediaSvgComponents: { [key: string]: JSX.Element | null } = {
        github: <Github />,
        linkedin: <LinkedIn />,
        twitter: <Twitter />,
        instagram: <Instagram />,
        behance: <Behance />,
        facebook: <Facebook />,
        dribble: <Dribble />,
        stackoverflow: <StackOverflow />,
        medium: <Medium />
    };
    // console.log(socials);

    return (
        <>
            <div className={styles.basic_details}>
                <div className={styles.profile_details_container}>
                    {/* <p
                        className={styles.profile_pic}
                        style={{
                            backgroundImage: `url(${userProfile.profile_pic})`
                        }}
                    >
                        {" "}
                    </p> */}
                    <img
                        className={styles.profile_pic}
                        src={userProfile.profile_pic}
                        alt="hello"
                    />
                    <div className={styles.profile_details}>
                        <h1>
                            {userProfile.first_name} {userProfile.last_name}{" "}
                            {userProfile.college_code
                                ? "(" + userProfile.college_code + ")"
                                : null}
                        </h1>
                        <p> {userProfile.muid}</p>
                        <div className={styles.socials}>
                            {Object.entries(socials).map(([key, value]) => {
                                return (
                                    <a
                                        href={
                                            socialMediaUrlMappings[key] + value
                                        }
                                        target="_blank"
                                        rel="noreferrer"
                                        key={key}
                                    >
                                        {socialMediaSvgComponents[key]}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                    <div className={styles.Levels}>
                        <p>Level</p>
                        <p>
                            {" "}
                            {userProfile.level
                                ? userProfile?.level?.slice(3, 4)
                                : 1}
                        </p>
                    </div>
                </div>

                <div className={styles.basic_details_detail}>
                    <div className={styles.status_container}>
                        <div className={styles.status + " " + styles.Levels}>
                            <div className={styles.status_box}>
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
                            <div className={styles.status_box}>
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
                        <div className={styles.status}>
                            <Rank />
                            <div className={styles.status_box}>
                                <p>Rank</p>
                                <p>{userProfile.rank}</p>
                            </div>
                        </div>
                        <div className={styles.status}>
                            <AvgKarma />
                            <div className={styles.status_box}>
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
                        <div className={styles.container}>
                            {/* <div className={styles.ui_widgets}>
                            <div className={styles.ui_value}>85%</div>
                            <div className={styles.ui_labels}>Java</div>
                        </div> <KarmaDist sections={circleSections} /> */}
                            <PieChart data={data} />
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
                <li
                    onClick={() => setProfileList("projects")}
                    className={
                        profileList === "projects"
                            ? styles.activeBar
                            : styles.notActiveBar
                    }
                >
                    Projects
                </li>
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
