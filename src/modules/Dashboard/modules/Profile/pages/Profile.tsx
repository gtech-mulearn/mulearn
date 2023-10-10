import moment from "moment";
import { useEffect, useRef, useState } from "react";
import dpm from "../assets/images/dpm.webp";
import Karma, { KarmaWhite } from "../assets/svg/Karma";
import MulearnBrand from "../assets/svg/MulearnBrand";
import Rank from "../assets/svg/Rank";
import { PieChart } from "../components/Piechart/PieChart";
import {
    getPublicUserLevels,
    getPublicUserLog,
    getPublicUserProfile,
    getUserLevels,
    getUserLog,
    getUserProfile,
    putIsPublic
} from "../services/api";
import styles from "./Profile.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import KarmaHistory from "../components/KarmaHistory/KarmaHistory";
import MuVoyage from "../components/MuVoyage/pages/MuVoyage";
import AvgKarma from "../assets/svg/AvgKarma";
import EditProfilePopUp from "../components/EditProfilePopUp/pages/EditProfilePopUp";
import BasicDetails from "../components/BasicDetails/pages/BasicDetails";
import Socials from "../components/Socials/pages/Socials";
import ShareProfilePopUp from "../components/ShareProfilePopUp/pages/ShareProfilePopUp";
import HelmetMetaTags from "../components/HelmetMetaTags/HelmetMetaTags";

//TODO: Verify the relevance of profile page image
const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const toast = useToast();
    const [APILoadStatus, setAPILoadStatus] = useState(0);
    const [profileList, setProfileList] = useState("basic-details");
    const [popUP, setPopUP] = useState(false);
    const [editPopUp, setEditPopUp] = useState(false);
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
            } else {
                getPublicUserProfile(setUserProfile, setAPILoadStatus, id);
                getPublicUserLog(setUserLog, id);
                getPublicUserLevels(setUserLevelData, id);
            }
        }
        firstFetch.current = false;
        setProfileStatus(userProfile.is_public);
    }, []);
    return (
        <>
            <HelmetMetaTags userProfile={userProfile} dpm={dpm} />
            <div
                style={
                    id
                        ? window.innerWidth < 500
                            ? { width: "100%", padding: "20px 10px 50px" }
                            : { width: "100%", padding: "50px" }
                        : {}
                }
                className={styles.rightDash}
            >
                {APILoadStatus === 400 ? (
                    <div className={styles.private_page_container}>
                        <p>
                            <i className="fi fi-sr-shield-exclamation"></i>
                            This profile is private
                        </p>
                    </div>
                ) : APILoadStatus !== 200 ? (
                    <div className={styles.loader_container}>
                        <MuLoader />
                    </div>
                ) : (
                    ((id && userProfile.is_public) || !id) && (
                        <>
                            <EditProfilePopUp
                                editPopUp={editPopUp}
                                setEditPopUP={setEditPopUp}
                                triggerUpdateProfile={triggerUpdateProfile}
                            />

                            <ShareProfilePopUp
                                popUP={popUP}
                                setPopUP={setPopUP}
                                profileStatus={profileStatus}
                                setProfileStatus={setProfileStatus}
                                userProfile={userProfile}
                                putIsPublic={putIsPublic}
                                toast={toast}
                            />

                            <div className={styles.profileDash}>
                                <div className={styles.profile}>
                                    <div className={styles.profile_div}>
                                        <div className={styles.banner}>
                                            {/* <i className="fi fi-sr-settings"></i> */}

                                            <div
                                                className={styles.member_since}
                                            >
                                                <div>
                                                    <MulearnBrand />
                                                </div>
                                                <p>
                                                    Member since{" "}
                                                    {userProfile?.joined?.slice(
                                                        0,
                                                        4
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={styles.profileInfo}>
                                            <div className={styles.profilePic}>
                                                <div
                                                    className={
                                                        styles.profile_pic_gard
                                                    }
                                                >
                                                    <img
                                                        src={
                                                            userProfile.profile_pic
                                                                ? userProfile.profile_pic
                                                                : dpm
                                                        }
                                                        alt={
                                                            userProfile.first_name
                                                        }
                                                        style={
                                                            !id
                                                                ? {
                                                                      outlineColor:
                                                                          !profileStatus
                                                                              ? "#456FF6"
                                                                              : "#2dce89"
                                                                  }
                                                                : {}
                                                        }
                                                    />
                                                    {!id && (
                                                        <span>
                                                            <i
                                                                className={`${
                                                                    !profileStatus
                                                                        ? "fi fi-sr-shield-exclamation"
                                                                        : "fi fi-sr-shield-check"
                                                                }  ${
                                                                    !profileStatus
                                                                        ? styles.private
                                                                        : styles.public
                                                                }`}
                                                            ></i>
                                                            <div
                                                                className={
                                                                    styles.gard_tooltip
                                                                }
                                                            >
                                                                {!profileStatus
                                                                    ? "Private profile"
                                                                    : "Public profile"}
                                                            </div>
                                                        </span>
                                                    )}
                                                </div>
                                                <div className={styles.name}>
                                                    <h1>
                                                        {userProfile.first_name}{" "}
                                                        {userProfile.last_name}{" "}
                                                        {userProfile.college_code
                                                            ? "(" +
                                                              userProfile.college_code +
                                                              ")"
                                                            : null}
                                                    </h1>
                                                    <p
                                                        style={{
                                                            marginTop: "-5px"
                                                        }}
                                                    >
                                                        {userProfile.muid}
                                                    </p>
                                                    <p
                                                        style={{
                                                            color: "#456FF6"
                                                        }}
                                                    >
                                                        LEVEL{"     "}
                                                        {userProfile.level
                                                            ? userProfile?.level?.slice(
                                                                  3,
                                                                  4
                                                              )
                                                            : 1}
                                                    </p>
                                                </div>
                                            </div>

                                            {!id && (
                                                <p
                                                    onClick={() =>
                                                        setPopUP(true)
                                                    }
                                                    className={styles.share_btn}
                                                    onKeyDown={e => {
                                                        if (
                                                            e.key === "Escape"
                                                        ) {
                                                            setPopUP(false);
                                                        }
                                                    }}
                                                    tabIndex={0}
                                                >
                                                    <i className="fi fi-br-share"></i>
                                                </p>
                                            )}
                                            {!id && (
                                                <p
                                                    onClick={() =>
                                                        setEditPopUp(true)
                                                    }
                                                    className={
                                                        styles.edit_profile_btn
                                                    }
                                                    onKeyDown={e => {
                                                        if (
                                                            e.key === "Escape"
                                                        ) {
                                                            setPopUP(false);
                                                        }
                                                    }}
                                                    tabIndex={0}
                                                >
                                                    <i className="fi fi-rr-pencil"></i>
                                                </p>
                                            )}
                                        </div>

                                        <div className={styles.profileList}>
                                            <p
                                                style={
                                                    profileList ===
                                                    "basic-details"
                                                        ? {
                                                              marginLeft: "0px",
                                                              width: "6.1rem"
                                                          }
                                                        : profileList ===
                                                          "karma-history"
                                                        ? {
                                                              marginLeft:
                                                                  "125px",
                                                              width: "6.7rem"
                                                          }
                                                        : profileList ===
                                                          "mu-voyage"
                                                        ? {
                                                              marginLeft:
                                                                  "250px",
                                                              width: "5.3rem"
                                                          }
                                                        : {}
                                                }
                                                className={styles.underline}
                                            ></p>
                                            <li
                                                onClick={() =>
                                                    setProfileList(
                                                        "basic-details"
                                                    )
                                                }
                                                style={
                                                    profileList ===
                                                    "basic-details"
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
                                                onClick={() =>
                                                    setProfileList(
                                                        "karma-history"
                                                    )
                                                }
                                                style={
                                                    profileList ===
                                                    "karma-history"
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
                                                onClick={() =>
                                                    setProfileList("mu-voyage")
                                                }
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

                                        <div className={styles.pointsList}>
                                            <div className={styles.points}>
                                                <Karma />
                                                <div>
                                                    <span>Karma</span>
                                                    <h1>
                                                        {parseInt(
                                                            userProfile.karma
                                                        ) > 1000
                                                            ? (
                                                                  parseInt(
                                                                      userProfile.karma
                                                                  ) / 1000
                                                              ).toPrecision(3) +
                                                              "K"
                                                            : userProfile.karma}
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className={styles.points}>
                                                <AvgKarma />
                                                <div>
                                                    <span>Avg.Karma/Month</span>
                                                    <h1>
                                                        {parseInt(
                                                            userProfile.karma
                                                        ) /
                                                            monthDifference >
                                                            1000 &&
                                                        monthDifference !== 0
                                                            ? (
                                                                  parseInt(
                                                                      userProfile.karma
                                                                  ) /
                                                                  monthDifference /
                                                                  1000
                                                              ).toPrecision(4) +
                                                              "K"
                                                            : isNaN(
                                                                  parseInt(
                                                                      userProfile.karma
                                                                  ) /
                                                                      monthDifference
                                                              )
                                                            ? "0"
                                                            : monthDifference ===
                                                              0
                                                            ? "0"
                                                            : (
                                                                  parseInt(
                                                                      userProfile.karma
                                                                  ) /
                                                                  monthDifference
                                                              ).toPrecision(3)}
                                                    </h1>
                                                </div>
                                            </div>
                                            <div className={styles.points}>
                                                <Rank />
                                                <div>
                                                    <span>Rank</span>
                                                    <h1>{userProfile.rank}</h1>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {profileList === "basic-details" ? (
                                        <BasicDetails
                                            userProfile={userProfile}
                                            userLog={userLog}
                                        />
                                    ) : profileList === "karma-history" ? (
                                        <KarmaHistory
                                            userProfile={userProfile}
                                            userLog={userLog}
                                        />
                                    ) : (
                                        profileList === "mu-voyage" && (
                                            <MuVoyage
                                                userLevelData={userLevelData}
                                                userLevel={
                                                    userProfile.level !== null
                                                        ? parseInt(
                                                              userProfile.level.slice(
                                                                  3,
                                                                  4
                                                              )
                                                          )
                                                        : 1
                                                }
                                            />
                                        )
                                    )}
                                </div>

                                <div className={styles.notification}>
                                    <div className={styles.existing_roles}>
                                        <div className={styles.head}>
                                            <Socials />
                                        </div>
                                        <div className={styles.head}>
                                            <h2>Existing Roles</h2>
                                            <p>
                                                {userProfile.roles.join(", ")}
                                            </p>
                                        </div>
                                        <div className={styles.head}>
                                            <h2>Karma Distribution</h2>
                                            <div className={styles.pie_chart}>
                                                {!data.every(
                                                    item =>
                                                        item[1].toString() ===
                                                        "0"
                                                ) ? (
                                                    <PieChart data={data} />
                                                ) : (
                                                    <p className={styles.msg}>
                                                        Wanna track your Karma
                                                        points? Send in those
                                                        tasks and your stats
                                                        won't disappoint!
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div
                                        className={
                                            styles.recent_activity_container
                                        }
                                    >
                                        <div className={styles.head}>
                                            <h2>Recent Activity</h2>
                                            <a
                                                onClick={() => {
                                                    setProfileList(
                                                        "karma-history"
                                                    );
                                                    navigate("#section1");
                                                }}
                                                href="#section1"
                                            >
                                                View More
                                            </a>
                                        </div>
                                        <div className={styles.data_card}>
                                            {userLog.length !== 0 ? (
                                                userLog
                                                    .sort((a, b) => {
                                                        return (
                                                            new Date(
                                                                b.created_date
                                                            ).getTime() -
                                                            new Date(
                                                                a.created_date
                                                            ).getTime()
                                                        );
                                                    })
                                                    ?.slice(0, 7)
                                                    ?.map((log, i) => (
                                                        <div
                                                            key={i}
                                                            className={
                                                                styles.card
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.cardInfo
                                                                }
                                                            >
                                                                <div
                                                                    className={
                                                                        styles.card_icon
                                                                    }
                                                                >
                                                                    <KarmaWhite />
                                                                </div>
                                                                <div
                                                                    className={
                                                                        styles.cardName
                                                                    }
                                                                >
                                                                    <p>
                                                                        <span
                                                                            style={{
                                                                                color: "#456FF6"
                                                                            }}
                                                                        >
                                                                            {
                                                                                log.karma
                                                                            }
                                                                        </span>{" "}
                                                                        awarded
                                                                        for{" "}
                                                                        {
                                                                            log.task_name
                                                                        }
                                                                        .
                                                                    </p>
                                                                    <p>
                                                                        {moment
                                                                            .utc(
                                                                                log.created_date
                                                                            )
                                                                            .local()
                                                                            .startOf(
                                                                                "seconds"
                                                                            )
                                                                            .fromNow()}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))
                                            ) : (
                                                <p className={styles.msg}>
                                                    Hey there! We know you're
                                                    new here, so grab some Karma
                                                    and we'll keep score of it
                                                    here!
                                                </p>
                                            )}
                                            <a
                                                onClick={() => {
                                                    setProfileList(
                                                        "karma-history"
                                                    );
                                                    navigate("#section1");
                                                }}
                                                href="#section1"
                                                className={styles.view_more}
                                            >
                                                View More
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
                )}
            </div>
        </>
    );
};

export default Profile;
