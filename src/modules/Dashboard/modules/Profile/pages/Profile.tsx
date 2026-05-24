import moment from "moment";
import { useEffect, useRef, useState, useCallback } from "react";
import dpm from "../assets/images/dpm.webp";
import Karma, { KarmaWhite } from "../assets/svg/Karma";
import MulearnBrand from "../assets/svg/MulearnBrand";
import Rank from "../assets/svg/Rank";
import emptyAchievements from "../assets/images/empty achievements.webp"
import { PieChart } from "../components/Piechart/PieChart";
import {

    getAllConnectedUsers,
    getConnectedUsers,
    getPublicUserLevels,
    getPublicUserLog,
    getPublicUserProfile,
    getQSCredentials,
    getUserAchievements,
    getUserLevels,
    getUserLog,
    getUserPreferences,
    getUserProfile,
    putIsPublic,
    updateUserPreferences
} from "../services/api";
import styles from "./Profile.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import KarmaHistory from "../components/KarmaHistory/KarmaHistory";
import MuVoyage from "../components/MuVoyage/pages/MuVoyage";
import AvgKarma from "../assets/svg/AvgKarma";
import EditProfilePopUp from "../components/EditProfilePopUp/pages/EditProfilePopUp";
import BasicDetails from "../components/BasicDetails/pages/BasicDetails";
import Socials from "../components/Socials/pages/Socials";
import ShareProfilePopUp from "../components/ShareProfilePopUp/pages/ShareProfilePopUp";
import HelmetMetaTags from "../components/HelmetMetaTags/HelmetMetaTags";
import { isDev } from "@/MuLearnServices/common_functions";
import { Img, SimpleGrid, Switch, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, VStack, Text, useDisclosure } from "@chakra-ui/react";
import AchievementCard from "../components/Achievements/AchievementCard";
import { useUserStore, useQseverseStore } from "/src/ZustandProvider";
import { getAchievements } from "../../ManageAchievements/services/api";
import { AchievementData } from "../../ManageAchievements/ManageAchievementsInterface";
import AchievementCardOne from "../components/Achievements/AchievementCardOne";
import toast from "react-hot-toast";
import { userInfo } from "os";
import EditCollegePopUp from "../components/EditProfilePopUp/pages/EditCollegePopUp";
import { useMuShepherdTour } from "../../../../../components/MuComponents/MuTour/MuShepherdTour";
import MuShepherdTourButton from "../../../../../components/MuComponents/MuTour/MuShepherdTourButton";
import { profileShepherdTourSteps } from "../../../../../components/MuComponents/MuTour/profileShepherdTourSteps";
import { FiRefreshCw } from "react-icons/fi";
import { BsDiscord } from "react-icons/bs";
import { AlertBanner } from "../../../components/AlertBanner";
import { qseverseRoutes } from "@/MuLearnServices/urls";
import { publicGateway } from "@/MuLearnServices/apiGateways";





const Profile = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const key = 'muid';
    const [value, setValue] = useState<string>();
    const [userDID, setUserDID] = useState<string>();
    const [isLoading, setIsLoading] = useState(false);
    const [achievements, setAchievements] = useState<AchievementData[]>([]);
    const [APILoadStatus, setAPILoadStatus] = useState(0);
    const [profileList, setProfileList] = useState("basic-details");
    const [popUP, setPopUP] = useState(false);
    const [editPopUp, setEditPopUp] = useState(false);
    const [fromUserSearch, setFromUserSearch] = useState(false);
    const [achievementModalOpen, setAchievementModalOpen] = useState(false);
    const [openCollegeEdit, setOpenCollegeEdit] = useState(false);
    const [userProfile, setUserProfile] = useState({
        full_name: "",
        college_code: "",
        college_id: "",
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
        percentile: "",
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

    const handleDIDUpdate = (newDID: string) => {
        setUserDID(newDID);
    };
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

    const [userPreferences, setUserPreferences] = useState<any>(null);
    const [preferencesLoading, setPreferencesLoading] = useState(false);

    // QWallet Modal state and handlers
    const {
        connectionStatus: qseverseStatus,
        hasCheckedConnection: hasCheckedQseverse,
        setConnectionStatus: setQseverseStatus,
        setHasCheckedConnection: setHasCheckedQseverse
    } = useQseverseStore();
    const { isOpen: isConnectModalOpen, onClose: onConnectModalClose } = useDisclosure();
    const [isRefreshingConnection, setIsRefreshingConnection] = useState(false);
    const { userInfo } = useUserStore();


    // Handler for refreshing connection status
    const handleRefreshConnection = useCallback(async () => {
        if (!userInfo.muid) {
            toast.error("Unable to check connection - user info not available");
            return;
        }

        setIsRefreshingConnection(true);
        try {
            const response = await publicGateway.get(qseverseRoutes.getConnectedUsers, {
                params: { key: 'muid', value: userInfo.muid }
            });
            const dids = response?.data?.response?.dids;
            if (dids && Array.isArray(dids) && dids.length > 0) {
                setQseverseStatus('connected');
                toast.success("Wallet connected successfully!");
                onConnectModalClose();
            } else {
                toast.error("No connected wallet found. Please link your wallet in the QSeverse app first.");
            }
        } catch (error) {
            console.error("Error refreshing connection:", error);
            toast.error("Failed to check connection status.");
        } finally {
            setIsRefreshingConnection(false);
        }
    }, [userInfo.muid, setQseverseStatus, onConnectModalClose]);

    const refreshToken = localStorage.getItem("refreshToken");
    const showDiscordBanner = refreshToken && !userInfo.exist_in_guild && !id;

    // Initialize Profile Tour - using Shepherd.js for better scroll handling
    const tour = useMuShepherdTour({
        steps: profileShepherdTourSteps,
        onComplete: () => {
            localStorage.setItem('hasSeenProfileTour', 'true');
        },
        onSkip: () => {
            localStorage.setItem('hasSeenProfileTour', 'true');
        },
        onNextClick: (element: Element | undefined, step: any, options: { config: any; state: any }) => {
            const stepIndex = options.state.activeIndex;

            // Step 8: Switch to karma history tab
            if (stepIndex === 8) {
                setProfileList("karma-history");
            }
            // Step 10: Switch to mu voyage tab  
            else if (stepIndex === 10) {
                setProfileList("mu-voyage");
            }
            // Step 12: Switch to achievements tab
            else if (stepIndex === 12) {
                setProfileList("achievements");
            }
        },
        onPrevClick: (element: Element | undefined, step: any, options: { config: any; state: any }) => {
            const stepIndex = options.state.activeIndex;

            // Going back from step 9 (karma history content) to step 8 (karma history tab)
            // Need to ensure we're still on karma history tab
            if (stepIndex === 9) {
                setProfileList("karma-history");
            }
            // Going back from step 11 (mu voyage content) to step 10 (mu voyage tab)
            // Need to switch back to mu voyage tab
            else if (stepIndex === 11) {
                setProfileList("mu-voyage");
            }
            // Going back from step 13 (achievements content) to step 12 (achievements tab) 
            // Need to switch back to achievements tab
            else if (stepIndex === 13) {
                setProfileList("achievements");
            }
            // Going back from step 10 (mu voyage tab) to step 9 (karma history content)
            // Need to switch back to karma history tab
            else if (stepIndex === 10) {
                setProfileList("karma-history");
            }
            // Going back from step 12 (achievements tab) to step 11 (mu voyage content)
            // Need to switch back to mu voyage tab
            else if (stepIndex === 12) {
                setProfileList("mu-voyage");
            }
            // Going back from step 8 (karma history tab) to basic profile
            // Switch back to basic details tab
            else if (stepIndex === 8) {
                setProfileList("basic-details");
            }
        },
        className: 'profile-tour'
    });

    // Add a new useEffect to fetch user preferences
    useEffect(() => {
        const fetchUserPreferences = async () => {
            if (!id) { // Only fetch preferences for the current user, not when viewing other profiles
                setPreferencesLoading(true);
                try {
                    const preferences = await getUserPreferences();
                    setUserPreferences(preferences);
                } catch (error) {
                    console.error("Error fetching user preferences:", error);
                    toast.error("Failed to load user preferences");
                } finally {
                    setPreferencesLoading(false);
                }
            }
        };

        fetchUserPreferences();
    }, [id]);





    useEffect(() => {
        const initializeProfileData = async () => {
            setAchievements([])

            let newValue = "";
            if (id) {
                newValue = id;
                setFromUserSearch(true);
            } else {
                newValue = useUserStore.getState().userInfo.muid;
            }
            setValue(newValue);

            // Fetch connected users/DIDs - this is needed for achievement cards
            // DID selection is handled by each achievement card when user clicks "Issue VC"
            if (newValue) {
                try {
                    const connectedUsersResponse = await getConnectedUsers(key, newValue);
                    if (connectedUsersResponse && connectedUsersResponse.length > 0) {
                        setUserDID(connectedUsersResponse[0]); // Use first DID as default
                    }
                } catch (error) {
                    console.error("Error fetching connected users:", error);
                    // Silent fail - user hasn't connected wallet
                }
            }

            // Fetch achievements
            if (newValue) {
                setIsLoading(true);
                try {
                    const achievements = await getUserAchievements(newValue);
                    setAchievements(achievements);
                } catch (error) {
                    console.error("Error fetching achievements:", error);
                } finally {
                    setIsLoading(false);
                }
            } else {
                toast.error("Error fetching muid for achievements.");
            }
        };

        initializeProfileData();
    }, [id, key]);

    const refreshAchievements = async () => {
        if (value) {
            setIsLoading(true);
            try {
                const updatedAchievements = await getUserAchievements(value);
                setAchievements(updatedAchievements);
            } catch (error) {
                console.error("Error refreshing achievements:", error);
                toast.error("Failed to refresh achievements.");
            } finally {
                setIsLoading(false);
            }
        }
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
    }, [id, userProfile.is_public]);

    // Start tour when profile data is loaded - only on profile page for first-time users
    const tourStartedRef = useRef(false);

    useEffect(() => {
        // Only run on the profile page
        const isProfilePage = location.pathname.includes('/profile');

        // Check if user has already seen the profile tour
        const hasSeenProfileTour = localStorage.getItem('hasSeenProfileTour');

        if (userProfile.full_name && APILoadStatus === 200 && !tourStartedRef.current && isProfilePage && !hasSeenProfileTour) {
            tourStartedRef.current = true;

            // Mark that the user has seen the profile tour
            localStorage.setItem('hasSeenProfileTour', 'true');
            // Wait for DOM to be fully ready and elements to be positioned
            setTimeout(() => {
                // Double-check that all required elements exist before starting
                const elementsToCheck = [
                    '.mu-tour-muid',
                    '.mu-tour-avatar',
                    '.mu-tour-level',
                    '.mu-tour-basic-details'
                ];

                const allElementsReady = elementsToCheck.every(selector => {
                    const element = document.querySelector(selector);
                    return !!element;
                });

                if (allElementsReady && tour.startTour) {
                    tour.startTour();
                } else {
                    tourStartedRef.current = false; // Reset to allow retry
                }
            }, 1200);
        }
    }, [userProfile.full_name, APILoadStatus, location.pathname]);

    // Reset tour started flag when navigating to different profiles
    useEffect(() => {
        tourStartedRef.current = false;
    }, [id]);

    const handleAchievementModal = () => {
        setAchievementModalOpen(!achievementModalOpen);
    }


    return (
        <>
            <HelmetMetaTags userProfile={userProfile} dpm={dpm} />
            <div
                style={
                    id
                        ? window.innerWidth < 500
                            ? { width: "100%", padding: "20px 10px 50px" }
                            : { width: "100%", padding: "10px" }
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
                                id={userProfile.id}
                                triggerUpdateProfile={triggerUpdateProfile}
                                setOpenCollegeEdit={setOpenCollegeEdit}
                            />
                            <EditCollegePopUp
                                openCollegeEdit={openCollegeEdit}
                                setOpenCollegeEdit={setOpenCollegeEdit}
                                id={userProfile.id}
                                triggerUpdateProfile={triggerUpdateProfile}
                            />
                            <ShareProfilePopUp
                                popUP={popUP}
                                setPopUP={setPopUP}
                                profileStatus={profileStatus}
                                setProfileStatus={setProfileStatus}
                                userProfile={userProfile}
                                putIsPublic={putIsPublic}
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
                                                        className="mu-tour-avatar"
                                                        src={
                                                            userProfile.profile_pic
                                                                ? userProfile.profile_pic +
                                                                `?${Math.random() *
                                                                1000
                                                                }`
                                                                : dpm
                                                        }
                                                        alt={
                                                            userProfile.full_name
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
                                                                className={`${!profileStatus
                                                                    ? "fi fi-sr-shield-exclamation"
                                                                    : "fi fi-sr-shield-check"
                                                                    }  ${!profileStatus
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
                                                        {userProfile.full_name}
                                                        {userProfile.college_code
                                                            ? " (" +
                                                            userProfile.college_code +
                                                            ")"
                                                            : null}
                                                    </h1>
                                                    <p
                                                        className="mu-tour-muid"
                                                        style={{
                                                            marginTop: "-5px"
                                                        }}
                                                    >
                                                        {userProfile.muid}
                                                    </p>
                                                    <p
                                                        className="mu-tour-level"
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
                                                    className={styles.edit_profile_btn}
                                                    onKeyDown={e => {
                                                        if (
                                                            e.key === "Escape"
                                                        ) {
                                                            setPopUP(false);
                                                        }
                                                    }}
                                                    tabIndex={0}
                                                >
                                                    <i className="fi fi-rr-pencil mu-tour-edit-icon"></i>
                                                </p>
                                            )}
                                        </div>

                                        <div className="mu-tour-basic-details">
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
                                                                    : profileList == 'achievements' ? {
                                                                        marginLeft: "375px",
                                                                        width: "6.8rem"
                                                                    } : {}
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
                                                    className="mu-tour-karma-history-tab"
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
                                                    className="mu-tour-mu-voyage-tab"
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
                                                <li
                                                    onClick={() =>
                                                        setProfileList("achievements")
                                                    }
                                                    className="mu-tour-achievements-tab"
                                                    style={
                                                        profileList === "achievements"
                                                            ? {
                                                                fontSize: "600",
                                                                color: "#000"
                                                            }
                                                            : {}
                                                    }
                                                >
                                                    Achievements
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
                                                                        ).toPrecision(
                                                                            3
                                                                        )}
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
                                                    <Rank />
                                                    <div>
                                                        <span>Percentile</span>
                                                        <h1>
                                                            {parseFloat(
                                                                userProfile.percentile
                                                            ).toFixed(2)}
                                                        </h1>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {profileList === "basic-details" ? (
                                        <BasicDetails userProfile={userProfile} userLog={userLog} />
                                    ) : profileList === "karma-history" ? (
                                        <div className="mu-tour-karma-history-content">
                                            <KarmaHistory userProfile={userProfile} userLog={userLog} />
                                        </div>
                                    ) : profileList === "mu-voyage" ? (
                                        <div className="mu-tour-mu-voyage-content">
                                            <MuVoyage
                                                userLevelData={userLevelData}
                                                userLevel={
                                                    userProfile.level !== null
                                                        ? parseInt(userProfile.level?.slice(3, 4))
                                                        : 1
                                                }
                                            />
                                        </div>
                                    ) : profileList === "achievements" ? (
                                        <div className="mu-tour-achievements-content bg-white rounded-xl w-full !p-4 ">
                                            <h2 className="!mb-8">Eligible Achievements</h2>

                                            {achievements.length === 0 && (
                                                <div className="text-center flex flex-col items-center justify-center text-gray-500">
                                                    <Img src={emptyAchievements} alt="No achievements" w={400} h={400} />
                                                    <p>No achievements available for you at the moment. Keep learning.</p>
                                                </div>
                                            )}

                                            <SimpleGrid
                                                columns={[1, 2, 3]}
                                                spacing={6}
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                {achievements.map((achievement) => (
                                                    <AchievementCardOne
                                                        key={achievement.id}
                                                        achievement={achievement}
                                                        userDID={userDID}
                                                        muid={value}
                                                        usersName={userProfile.full_name}
                                                        fromUserSearch={fromUserSearch}
                                                        onAchievementUpdate={refreshAchievements}
                                                        onDIDUpdate={handleDIDUpdate} // Add this new prop
                                                    />
                                                ))}
                                            </SimpleGrid>
                                        </div>
                                    ) : null}

                                </div>

                                <div className={styles.notification}>
                                    <div className={styles.existing_roles}>
                                        {!id && (
                                            <div className={`${styles.head} ${styles.profileSettingsContainer} mu-tour-profile-settings`}>
                                                <h2>Profile Settings</h2>
                                                <div className={styles.head + " " + styles.profileStatus}>
                                                    <h4>Switch to public profile</h4>
                                                    <div className={styles.option}>
                                                        <Switch
                                                            isChecked={profileStatus}
                                                            onChange={e => {
                                                                setProfileStatus(e.target.checked);
                                                                putIsPublic(e.target.checked);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={styles.head + " " + styles.profileStatus}>
                                                    <h4>Open to work</h4>
                                                    <div className={styles.option}>
                                                        <Switch
                                                            isChecked={userPreferences?.interested_in_work || false}
                                                            onChange={async (e) => {
                                                                try {
                                                                    // Create new preferences object with updated value
                                                                    const updatedPreferences = {
                                                                        ...userPreferences,
                                                                        interested_in_work: e.target.checked
                                                                    };

                                                                    // Update locally first for immediate UI feedback
                                                                    setUserPreferences(updatedPreferences);

                                                                    // Call API to update on server
                                                                    await updateUserPreferences(updatedPreferences);
                                                                    toast.success("Work preference updated");
                                                                } catch (error) {
                                                                    console.error("Error updating work preference:", error);
                                                                    // Revert to previous state if API call fails
                                                                    setUserPreferences(userPreferences);
                                                                    toast.error("Failed to update work preference");
                                                                }
                                                            }}
                                                            isDisabled={preferencesLoading}
                                                        />
                                                    </div>
                                                </div>
                                                <div className={styles.head + " " + styles.profileStatus}>
                                                    <h4>Open to gigs</h4>
                                                    <div className={styles.option}>
                                                        <Switch
                                                            isChecked={userPreferences?.interested_in_gig_work || false}
                                                            onChange={async (e) => {
                                                                try {
                                                                    // Create new preferences object with updated value
                                                                    const updatedPreferences = {
                                                                        ...userPreferences,
                                                                        interested_in_gig_work: e.target.checked
                                                                    };

                                                                    // Update locally first for immediate UI feedback
                                                                    setUserPreferences(updatedPreferences);

                                                                    // Call API to update on server
                                                                    await updateUserPreferences(updatedPreferences);
                                                                    toast.success("Gig preference updated successfully");
                                                                } catch (error) {
                                                                    console.error("Error updating gig preference:", error);
                                                                    // Revert to previous state if API call fails
                                                                    setUserPreferences(userPreferences);
                                                                    toast.error("Failed to update gig preference");
                                                                }
                                                            }}
                                                            isDisabled={preferencesLoading}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className={styles.head}>
                                            <Socials />
                                        </div>
                                        <div className={`${styles.head} mu-tour-existing-roles`}>
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
            
            {showDiscordBanner && (
                <div style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    maxWidth: '90vw',
                }}>
                    <AlertBanner
                        variant="info"
                        title="Connect Discord"
                        description="Join our Discord community to unlock all features."
                        actionLabel="Connect Now"
                        onAction={() => { window.location.href = import.meta.env.VITE_DISCORD_AUTH_URL; }}
                        dismissible={false}
                        icon={<BsDiscord />}
                        className="floating-pill"
                    />
                </div>
            )}

{/* Connect Wallet Modal */}
            <Modal isOpen={isConnectModalOpen} onClose={onConnectModalClose} isCentered>
                <ModalOverlay />
                <ModalContent mx={4}>
                    <ModalHeader>Connect your QSeverse Wallet</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <Text fontSize="sm" color="gray.600">
                                To claim verifiable credentials for your achievements, you need to link your QSeverse wallet.
                            </Text>
                            <Text fontSize="sm" fontWeight="medium">
                                Steps to connect:
                            </Text>
                            <VStack as="ol" spacing={2} align="stretch" pl={4} fontSize="sm">
                                <Text as="li">Download the QSeverse app from your app store and sign up</Text>
                                <Text as="li">Connect your MuLearn account</Text>
                                <Text as="li">Your wallet will be automatically linked</Text>
                                <Text as="li">Click "Refresh Status" below to verify</Text>
                            </VStack>
                        </VStack>
                    </ModalBody>
                    <ModalFooter flexWrap="wrap" gap={2} justifyContent="center">
                        <Button
                            as="a"
                            href="https://apps.apple.com/us/app/qs-passport/id6477819506"
                            target="_blank"
                            colorScheme="blue"
                            size="sm"
                        >
                            App Store
                        </Button>
                        <Button
                            as="a"
                            href="https://play.google.com/store/apps/details?id=com.qseverse.passport"
                            target="_blank"
                            colorScheme="blue"
                            size="sm"
                        >
                            Play Store
                        </Button>
                        <Button
                            colorScheme="green"
                            size="sm"
                            leftIcon={<FiRefreshCw />}
                            onClick={handleRefreshConnection}
                            isLoading={isRefreshingConnection}
                            loadingText="Checking..."
                        >
                            Refresh Status
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Profile;
