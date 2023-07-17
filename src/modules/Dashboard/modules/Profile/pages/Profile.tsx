import { useEffect, useRef, useState } from "react";
import { MuButton } from "../../../../../components/MuComponents/MuButtons/MuButton";
import styles from "./Profile.module.css";
import moment from "moment";
import {
    getUserLog,
    getUserProfile,
    getPublicUserProfile,
    getPublicUserLog,
    putIsPublic,
    getUserLevels,
    getPublicUserLevels,
    fetchQRCode
} from "../services/api";
import { PieChart } from "../components/Piechart/PieChart";
import MulearnBrand from "../assets/svg/MulearnBrand";
import dpm from "../assets/images/dpm.jpg";
import Rank from "../assets/svg/Rank";
import Karma, { KarmaWhite } from "../assets/svg/Karma";
import BasicDetails from "../components/BasicDetails";
import KarmaHistory from "../components/KarmaHistory/KarmaHistory";
import { useNavigate, useParams } from "react-router-dom";
import { useToast, Switch } from "@chakra-ui/react";
import MuVoyage from "../components/MuVoyage/pages/MuVoyage";
import { Helmet } from "react-helmet";
import { saveAs } from "file-saver";
import MuLoader from "@Mulearn/MuLoader/MuLoader";

//TODO: Verify the relevance of profile page image
const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [copy, setCopy] = useState(false);
    const toast = useToast();
    const [APILoadStatus, setAPILoadStatus] = useState(0);
    const [profileList, setProfileList] = useState("basic-details");
    const [blob, setBlob] = useState<any>();
    const [popUP, setPopUP] = useState(false);
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
            name: "",
            tasks: [{ task_name: "", completed: false, hashtag: "", karma: 0 }]
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
    const data = [["Task", "0"], ...convertedData2, ...convertedData1];

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
    const firstFetch = useRef(true);
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
        fetchQRCode(setBlob);
    }, []);

    const downloadQR = () => {
        saveAs(blob, `${userProfile.muid}.png`);
    };
    return (
        <>
            <Helmet>
                {/* <!-- Primary Meta Tags --> */}
                <title>
                    {userProfile.first_name +
                        " " +
                        userProfile.last_name +
                        " | Mulearn"}
                </title>
                <link
                    rel="icon"
                    type="image/svg+xml"
                    href={
                        userProfile.profile_pic ? userProfile.profile_pic : dpm
                    }
                />
                <meta
                    name="title"
                    content={
                        userProfile.first_name +
                        " " +
                        userProfile.last_name +
                        "|" +
                        userProfile.karma +
                        " Karma"
                    }
                />
                <meta name="description" content="you bio is here" />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="Mulearn" />
                <meta
                    property={`og:${
                        (import.meta.env.VITE_FRONTEND_URL as string) +
                        /profile/ +
                        userProfile.muid
                    }`}
                    content={
                        (import.meta.env.VITE_FRONTEND_URL as string) +
                        /profile/ +
                        userProfile.muid
                    }
                />
                <meta
                    property="og:title"
                    content={
                        userProfile.first_name +
                        " " +
                        userProfile.last_name +
                        "|" +
                        userProfile.karma +
                        " Karma"
                    }
                />
                <meta property="og:description" content="you bio is here" />
                <meta
                    property="og:image"
                    itemProp="image"
                    content={
                        userProfile.profile_pic ? userProfile.profile_pic : dpm
                    }
                />
                <meta
                    property="og:image:secure_url"
                    content={
                        userProfile.profile_pic ? userProfile.profile_pic : dpm
                    }
                />
                <meta
                    property="og:image:alt"
                    content={`${userProfile.first_name}'s Profile Picture`}
                />
                <meta property="og:type" content="profile" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property={`twitter:${
                        (import.meta.env.VITE_FRONTEND_URL as string) +
                        /profile/ +
                        userProfile.muid
                    }`}
                    content={
                        (import.meta.env.VITE_FRONTEND_URL as string) +
                        /profile/ +
                        userProfile.muid
                    }
                />
                <meta
                    property="twitter:title"
                    content={
                        userProfile.first_name +
                        " " +
                        userProfile.last_name +
                        "|" +
                        userProfile.karma +
                        " Karma"
                    }
                />
                <meta
                    property="twitter:description"
                    content="you bio is here"
                />
                <meta
                    property="twitter:image"
                    content={
                        userProfile.profile_pic ? userProfile.profile_pic : dpm
                    }
                />
            </Helmet>
            <div
                style={
                    id
                        ? window.innerWidth < 500
                            ? { width: "100%", padding: "20px 10px" }
                            : { width: "100%", padding: "50px" }
                        : {}
                }
                className={styles.rightDash}
            >
                {APILoadStatus !== 200 ? (
                    <div className={styles.loader_container}>
                        <MuLoader />
                    </div>
                ) : (id && userProfile.is_public) || !id ? (
                    <>
                        <div
                            style={
                                popUP
                                    ? { transform: "scale(1)" }
                                    : {
                                          transform: "scale(0)"
                                          // opacity: "0",
                                      }
                            }
                            className={styles.share_pop_up_container}
                            onKeyDown={e => {
                                if (e.key === "Escape") {
                                    setPopUP(false);
                                }
                            }}
                            tabIndex={0}
                        >
                            <div className={styles.share_pop_up}>
                                <div className={styles.share_pop_up_contents}>
                                    <h1>Share your profile</h1>
                                    <div className={styles.profile_state}>
                                        <p>Switch to public profile</p>
                                        <div className={styles.option}>
                                            <Switch
                                                size="sm"
                                                isChecked={profileStatus}
                                                onChange={e => {
                                                    setProfileStatus(
                                                        e.target.checked
                                                    );
                                                    putIsPublic(
                                                        e.target.checked,
                                                        toast
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                    {profileStatus && (
                                        <div
                                            className={
                                                styles.share_profile_container
                                            }
                                        >
                                            <div className={styles.qr_code}>
                                                {/* <QRCode
                                                    size={256}
                                                    style={{
                                                        height: "173px",
                                                        maxWidth: "100%",
                                                        width: "100%"
                                                    }}
                                                    value={
                                                        (import.meta.env
                                                            .VITE_FRONTEND_URL as string) +
                                                        /profile/ +
                                                        userProfile.muid
                                                    }
                                                    viewBox={`0 0 256 256`}
                                                    id="qr_code"
                                                /> */}
                                                <img src={blob} alt="" />
                                            </div>
                                            <div className={styles.link}>
                                                <p>
                                                    {
                                                        import.meta.env
                                                            .VITE_FRONTEND_URL as string
                                                    }
                                                    /profile/
                                                    {userProfile.muid}
                                                </p>

                                                <i
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(
                                                            `${
                                                                import.meta.env
                                                                    .VITE_FRONTEND_URL as string
                                                            }/profile/${
                                                                userProfile.muid
                                                            }`
                                                        );
                                                        setCopy(true);
                                                        setTimeout(() => {
                                                            setCopy(false);
                                                        }, 3000);
                                                    }}
                                                    className="fi fi-sr-link"
                                                >
                                                    <div
                                                        className={styles.toast}
                                                    >
                                                        <p>
                                                            {!copy
                                                                ? "Copy"
                                                                : "Copied!"}
                                                        </p>
                                                    </div>
                                                </i>
                                            </div>
                                        </div>
                                    )}
                                    <hr />
                                    {profileStatus && (
                                        <MuButton
                                            style={{
                                                background: "#456FF6",
                                                color: "#fff",
                                                margin: "0px 0px -8px 0px",
                                                display: "flex",
                                                justifyContent: "center",
                                                padding: "16px"
                                            }}
                                            text={"Download QR code"}
                                            onClick={() => {
                                                downloadQR();
                                            }}
                                        />
                                    )}
                                    <button onClick={() => setPopUP(false)}>
                                        {!profileStatus ? "Cancel" : "Close"}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={styles.profileDash}>
                            <div className={styles.profile}>
                                <div className={styles.profile_div}>
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
                                                    alt={userProfile.first_name}
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
                                                        ? userProfile.level.slice(
                                                              3,
                                                              4
                                                          )
                                                        : 0}
                                                </p>
                                            </div>
                                        </div>
                                        {!id ? (
                                            <p
                                                onClick={() => setPopUP(true)}
                                                className={styles.share_btn}
                                                onKeyDown={e => {
                                                    if (e.key === "Escape") {
                                                        setPopUP(false);
                                                    }
                                                }}
                                                tabIndex={0}
                                            >
                                                <i className="fi fi-br-share"></i>
                                            </p>
                                        ) : null}
                                        {/* <MuButton
                                                text={"Edit Profile"}
                                                icon={
                                                    <i className="fi fi-sr-pencil"></i>
                                                }
                                                style={{
                                                    width: "unset",
                                                    minWidth: "80px",
                                                    marginTop: "50px",
                                                    height: "40px",
                                                    background: "#456FF6",
                                                    color: "#fff"
                                                }}
                                            /> */}
                                    </div>

                                    <div className={styles.profileList}>
                                        <p
                                            style={
                                                profileList === "basic-details"
                                                    ? {
                                                          marginLeft: "0px",
                                                          width: "6.1rem"
                                                      }
                                                    : profileList ===
                                                      "karma-history"
                                                    ? {
                                                          marginLeft: "125px",
                                                          width: "6.7rem"
                                                      }
                                                    : profileList ===
                                                      "mu-voyage"
                                                    ? {
                                                          marginLeft: "250px",
                                                          width: "5.3rem"
                                                      }
                                                    : {}
                                            }
                                            className={styles.underline}
                                        ></p>
                                        <li
                                            onClick={() =>
                                                setProfileList("basic-details")
                                            }
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
                                            onClick={() =>
                                                setProfileList("karma-history")
                                            }
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
                                        {/* <li>Join Mulearn</li> */}
                                        {/* <li>See More</li> */}
                                        <div>
                                            <i className=".fa-solid fa-chevron-left"></i>
                                            <i className="fi fi-ts-angle-right"></i>
                                        </div>
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
                                                          ).toPrecision(4) + "K"
                                                        : userProfile.karma}
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
                                        <div className={styles.points}>
                                            <Karma />
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
                                                          ).toPrecision(4) + "K"
                                                        : isNaN(
                                                              parseInt(
                                                                  userProfile.karma
                                                              ) /
                                                                  monthDifference
                                                          )
                                                        ? "0"
                                                        : monthDifference === 0
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
                                ) : profileList === "mu-voyage" ? (
                                    <MuVoyage userLevelData={userLevelData} />
                                ) : null}
                            </div>

                            <div className={styles.notification}>
                                <div className={styles.existing_roles}>
                                    <div className={styles.head}>
                                        <h2>Existing Roles</h2>
                                        <p>{userProfile.roles.join(", ")}</p>
                                    </div>
                                    <div className={styles.head}>
                                        <h2>Karma Distribution</h2>
                                        <div className={styles.pie_chart}>
                                            {!data.every(
                                                item =>
                                                    item[1].toString() === "0"
                                            ) ? (
                                                <PieChart data={data} />
                                            ) : (
                                                <p className={styles.msg}>
                                                    Wanna track your Karma
                                                    points? Send in those tasks
                                                    and your stats won't
                                                    disappoint!
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className={styles.recent_activity_container}
                                >
                                    <div className={styles.head}>
                                        <h2>Recent Activity</h2>
                                        <a
                                            onClick={() => {
                                                setProfileList("karma-history");
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
                                                .slice(0, 7)
                                                .map((log, i) => (
                                                    <div
                                                        key={i}
                                                        className={styles.card}
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
                                                                    awarded for{" "}
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
                                                Hey there! We know you're new
                                                here, so grab some Karma and
                                                we'll keep score of it here!
                                            </p>
                                        )}
                                        <a
                                            onClick={() => {
                                                setProfileList("karma-history");
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
                ) : (
                    <div className={styles.private_page_container}>
                        <p>
                            <i className="fi fi-sr-shield-exclamation"></i>
                            This profile is private
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

export default Profile;
