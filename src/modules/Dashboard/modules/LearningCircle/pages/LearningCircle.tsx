import { useEffect, useState } from "react";
import styles from "./LearningCircle.module.css";
import { approveLcUser, getLcDetails, setLCMeetTime, updateLcNote } from "../services/LearningCircleAPIs";
import { useNavigate, useParams } from "react-router-dom";
import pic from "../../Profile/assets/images/dpm.jpg";
import { LcDetail } from "../services/LearningCircleInterface";

type Props = {};

const LearningCircle = (props: Props) => {
    const [lc, setLc] = useState<LcDetail>();
    const [note, setNote] = useState('');
    const [meetTime, setMeetTime] = useState('');
    const [meetVenue, setMeetVenue] = useState('');
    const [meetDays, setMeetDays] = useState(['']);
    const { id } = useParams();
	const navigate = useNavigate()
    

    const handlePut = () => {
        updateLcNote(id,note)
    }

    useEffect(() => {
        getLcDetails(setLc, id);
    }, []);

    return (
        <>
            <div className={styles.LearningCircleDetailsContent}>
                <div className={styles.CreatedCircle}>
                    <div className={styles.CircleName}>
                        <h1>{lc?.name}</h1>
                        <b>
                            {lc?.college} <br /> Code:
                            {lc?.circle_code}
                        </b>
                    </div>
                    <div className={styles.CircleRank}>
                        <div>
                            <b>Rank</b>
                            <h1>{lc?.rank}</h1>
                            <b className={styles.points}>
                                {lc?.total_karma} Karma
                            </b>
                        </div>
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>

                <div className={styles.BoxContent}>
                    <div className={styles.LeftBox}>
                        <div className={styles.EventOn}>
                            {lc?.meet_place || lc?.meet_time ? (
                                <>
                                    <div className={styles.MeetingOn}>
                                        <div>
                                            <b>Next Meeting on</b>
                                            <div>{/* <b>{lc?.day}</b> */}</div>
                                        </div>
                                        <i className="fa-solid fa-pencil"></i>
                                    </div>
                                    <div className={styles.MeetingBtn}>
                                        <b>
                                            venue: {lc?.meet_place} <br /> time:
                                            <h1>{lc?.meet_time}</h1>
                                        </b>
                                        <button className={styles.BtnBtn}>
                                            Done
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className={styles.ScheduleOn}>
                                        <b>Schedule meeting</b>
                                        <p>
                                            Enter details to schedule your
                                            weekly meeting
                                        </p>
                                    </div>
                                    <div className={styles.InputSchedule}>
                                        <div>
                                            <input
                                                type="time"
                                                onChange={e => {
                                                    setMeetTime(e.target.value);
                                                }}
                                                placeholder="meeting time"
                                            />
                                            <input
                                                type="text"
                                                onChange={e => {
                                                    setMeetVenue(e.target.value);
                                                }}
                                                placeholder="meeting venue"
                                            />
                                        </div>
                                        <div className={styles.weeks}>
                                            <p>meeting days</p>
                                            <p className={styles.Lcweek}>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="S"
                                                    />
                                                    <label htmlFor="S">S</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="M"
                                                    />
                                                    <label htmlFor="M">M</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="T"
                                                    />
                                                    <label htmlFor="T">T</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="W"
                                                    />
                                                    <label htmlFor="W">W</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="Th"
                                                    />
                                                    <label htmlFor="Th">
                                                        T
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="F"
                                                    />
                                                    <label htmlFor="F">F</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="Sa"
                                                    />
                                                    <label htmlFor="Sa">
                                                        S
                                                    </label>
                                                </div>
                                            </p>
                                        </div>
                                        {/* <input type="text" placeholder="meeting venue" /> */}
                                    </div>

                                    <button className={styles.BtnBtn}>
                                        Schedule
                                    </button>
                                </>
                            )}
                        </div>

                        <div className={styles.EventOn}>
                            {lc?.note ? (
                                <div className={styles.LcNotedEvent}>
                                    <p>{lc.note}</p>
                                    <button className={styles.BtnBtn}>
                                        edit
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.LcNotedEvent}>
                                    <input
                                        onChange={e => {
                                            setNote(e.target.value);
                                        }}
                                        type="text"
                                        placeholder="input"
                                    />
                                    <button
                                        className={styles.BtnBtn}
                                        onClick={handlePut}
                                    >
                                        Submit
                                    </button>
                                </div>
                            )}
                        </div>

                        {lc?.pending_members &&
                        lc.pending_members.length > 0 ? (
                            <div className={styles.PendingApp}>
                                <b className={styles.PendingTitle}>
                                    Pending approvals
                                </b>

                                <div className={styles.PendingList}>
                                    {lc?.pending_members &&
                                        lc.pending_members.map(
                                            (member, index) => (
                                                <div
                                                    className={
                                                        styles.PendingMembers
                                                    }
                                                >
                                                    <span>
                                                        <img
                                                            src={
                                                                member.profile_pic
                                                                    ? `https://dev.mulearn.org/${member?.profile_pic}`
                                                                    : pic
                                                            }
                                                            alt="Profile picture"
                                                        />
                                                        <b>{member.username}</b>
                                                    </span>
                                                    <div
                                                        className={
                                                            styles.buttons
                                                        }
                                                    >
                                                        <button
                                                            className={
                                                                styles.BtnBtn
                                                            }
                                                            onClick={() => {
                                                                approveLcUser(
                                                                    id,
                                                                    member.id,
                                                                    true
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        navigate(
                                                                            `/dashboard/learning-circle/details/${id}`
                                                                        );
                                                                    },
                                                                    2000
                                                                );
                                                            }}
                                                        >
                                                            Approve
                                                        </button>
                                                        <button
                                                            className={
                                                                styles.BtnClr
                                                            }
                                                            onClick={() => {
                                                                approveLcUser(
                                                                    id,
                                                                    member.id,
                                                                    false
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        navigate(
                                                                            `/dashboard/learning-circle/details/${id}`
                                                                        );
                                                                    },
                                                                    2000
                                                                );
                                                            }}
                                                        >
                                                            Reject
                                                        </button>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                </div>
                            </div>
                        ) : (
                            <></>
                        )}
                    </div>

                    <div className={styles.RightBox}>
                        {/* TODO: Will implement in next iteration */}

                        {/* <div className={styles.Streak}>
                            <img
                                src="https://i.ibb.co/BNMSdTH/flame.png"
                                alt=""
                            />
                            <div>
                                <b className={styles.StreakCount}>87</b>
                                <b>STREAK</b>
                            </div>
                        </div> */}

                        <div className={styles.Members}>
                            <span className={styles.MemberTitle}>
                                Members
                                <i className="fa-solid fa-ellipsis-vertical"></i>
                            </span>
                            <div className={styles.MemberList}>
                                {lc?.members &&
                                    lc.members.map((member, index) => (
                                        <div className={styles.MemberName}>
                                            <img
                                                src={
                                                    member.profile_pic
                                                        ? `https://dev.mulearn.org/${member?.profile_pic}`
                                                        : pic
                                                }
                                                alt="Profile Picture"
                                            />
                                            <div>
                                                <p>{member.username}</p>
                                                <span>
                                                    <img
                                                        src="https://i.ibb.co/Dbhv9rS/karma.png"
                                                        alt="karma"
                                                    />
                                                    {member.karma}
                                                </span>
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

export default LearningCircle;