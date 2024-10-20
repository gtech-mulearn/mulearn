import styles from "./LearningCircle.module.css";
import imageTop from "../assets/images/LC2.webp";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    getUserLearningCircles,
    joinMeetup
} from "../services/LearningCircleAPIs";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import YourLc from "./LcDashboard/components/YourLc";
import LcMeetups from "./LcDashboard/components/LcMeetups";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import toast from "react-hot-toast";
import YourMeetups from "./LcDashboard/components/YourMeetups";

const LearningCircleLandingPage = () => {
    const navigate = useNavigate();
    const [userCircleList, setUserCircleList] = useState<LcType[]>();
    const [isLoading, setIsLoading] = useState(true);
    const [curpage, setCurPage] = useState(0);
    const [meetingCodeModalOpen, setMeetingCodeModalOpen] = useState(false);
    useEffect(() => {
        getUserLearningCircles(setUserCircleList).then(() => {
            setIsLoading(false);
        });
    }, []);
    const [meetupCode, setMeetupCode] = useState("");
    const handleJoin = () => {
        navigate("/dashboard/learning-circle/find-circle");
    };

    const handleCreate = () => {
        navigate("/dashboard/learning-circle/create-circle");
    };

    const joinMeet = () => {
        if (meetupCode.length !== 6) {
            toast.error("Invalid meetup code");
            return;
        }
        joinMeetup(meetupCode);
        setMeetingCodeModalOpen(false);
    };

    const handleJoinMeetup = () => {
        setMeetingCodeModalOpen(true);
    };
    return (
        <>
            <MuModal
                isOpen={meetingCodeModalOpen}
                onClose={() => {
                    setMeetingCodeModalOpen(false);
                }}
                title={"Enter Meeting Code"}
                type={"success"}
                onDone={joinMeet}
            >
                <div className={styles.inputBox}>
                    <input
                        name="title"
                        required
                        value={meetupCode}
                        placeholder="Enter meetup code"
                        maxLength={6}
                        onChange={(e: any) => {
                            setMeetupCode(e.target.value.toUpperCase());
                        }}
                    />
                </div>
                <p className={styles.modalinfo}>
                    Enter the 6 digit code provided by the meetup organizer to
                    join the meetup and earn karma points.
                </p>
            </MuModal>
            {isLoading ? (
                <div className={styles.loader_container}>
                    <MuLoader />
                </div>
            ) : (
                <div className={styles.learningCircleLandingPage}>
                    <div className={styles.headContent}>
                        <img src={imageTop} alt="image" loading="eager" />
                        <div className={styles.learningCircleLandingPageDesc}>
                            <h1>Learn, share, together</h1>
                            <b>
                                A fantastic way to spend a small amount of time
                                learning about new things with a group of people
                                with same interests!
                            </b>
                            <div
                                className={
                                    styles.learningCircleLandingPageButton
                                }
                            >
                                <PowerfulButton
                                    children="Create"
                                    variant="outline"
                                    onClick={handleCreate}
                                />
                                <PowerfulButton
                                    children="Join"
                                    style={{
                                        paddingLeft: "2rem",
                                        paddingRight: "2rem"
                                    }}
                                    onClick={handleJoin}
                                />
                                <PowerfulButton
                                    children="Join Meetup"
                                    variant="primary"
                                    onClick={handleJoinMeetup}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.SwitchNav}>
                            <button
                                className={
                                    styles.items +
                                    " " +
                                    (curpage == 0 ? styles.active : "")
                                }
                                onClick={() => setCurPage(0)}
                            >
                                Your Learning Circles
                            </button>
                            <button
                                className={
                                    styles.items +
                                    " " +
                                    (curpage == 1 ? styles.active : "")
                                }
                                onClick={() => setCurPage(1)}
                            >
                                Meetups
                            </button>
                            <button
                                className={
                                    styles.items +
                                    " " +
                                    (curpage == 2 ? styles.active : "")
                                }
                                onClick={() => setCurPage(2)}
                            >
                                Your Meetups
                            </button>
                        </div>
                        {curpage === 0 ? (
                            <YourLc userCircleList={userCircleList ?? []} />
                        ) : curpage === 1 ? (
                            <LcMeetups user_id={null} />
                        ) : (
                            <YourMeetups
                                user_id={localStorage.getItem("userId")}
                            />
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default LearningCircleLandingPage;
