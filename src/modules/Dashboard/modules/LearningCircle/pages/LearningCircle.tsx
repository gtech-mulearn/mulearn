import { useEffect, useState } from "react";
import styles from "./LearningCircle.module.css";
import { approveLcUser, getLcDetails, setLCMeetTime, updateLcNote } from "../services/LearningCircleAPIs";
import { useNavigate, useParams } from "react-router-dom";
import pic from "../../Profile/assets/images/dpm.jpg";
import { LcDetail } from "../services/LearningCircleInterface";
import MultiSelectCheckbox from "@/MuLearnComponents/MultiSelectCheckbox/MultiSelectCheckbox";

type Props = {};

const LearningCircle = (props: Props) => {
    const [lc, setLc] = useState<LcDetail>();
    const [note, setNote] = useState('');
    const [meetTime, setMeetTime] = useState('');
    const [meetVenue, setMeetVenue] = useState('');
    const [flag, setFlag] = useState(false);
    const [meetDays, setMeetDays] = useState<string[]>([]);
    const { id } = useParams();
	const navigate = useNavigate()

    useEffect(() => {
        getLcDetails(setLc, id);
		if(lc?.note !== '') {
			setFlag(true)
		}
    }, []);

	const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const { id } = event.target;
        setMeetDays(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(day => day !== id)
                : [...prevSelected, id]
        );
    };

	function handleSchedule(event: any): void {
		console.log(meetDays)
		console.log(meetVenue)
		console.log(meetTime)
		setLCMeetTime(meetTime, meetVenue, meetDays, id)
	}

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
                                                    setMeetTime((e.target.value));
                                                }}
                                                placeholder="meeting time"
                                            />
                                            <input
                                                type="text"
                                                onChange={e => {
                                                    setMeetVenue(
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="meeting venue"
                                            />
                                        </div>
                                        <div className={styles.weeks}>
                                            <p>meeting days</p>
                                            <div className={styles.Lcweek}>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="sun"
                                                        checked={meetDays.includes(
                                                            "sun"
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="sun">
                                                        Sun
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="mon"
                                                        checked={meetDays.includes(
                                                            "mon"
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="mon">
                                                        Mon
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="tue"
                                                        checked={meetDays.includes(
                                                            "tue"
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="tue">
                                                        Tue
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="wed"
                                                        checked={meetDays.includes(
                                                            "wed"
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="wed">
                                                        Wed
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="thu"
                                                        checked={meetDays.includes(
                                                            "thu"
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="thu">
                                                        Thu
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="fri"
                                                        checked={meetDays.includes(
                                                            "fri"
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="fri">
                                                        Fri
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id="sat"
                                                        checked={meetDays.includes(
                                                            "sat"
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="sat">
                                                        Sat
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <input type="text" placeholder="meeting venue" /> */}
                                    </div>

                                    <button className={styles.BtnBtn} onClick={handleSchedule}>
                                        Schedule
                                    </button>
                                </>
                            )}
                        </div>

                        <div className={styles.EventOn}>
                            {flag ? (
                                <div className={styles.LcNotedEvent}>
                                    <p>{lc?.note}</p>
                                    <button className={styles.BtnBtn} onClick={() => {
										console.log(lc?.note) 
										setFlag(false)
										setTimeout(() => {
                                            navigate(
                                                `/dashboard/learning-circle/details/${id}`
                                            );
                                        }, 1000);}}>
                                        edit
                                    </button>
                                </div>
                            ) : (
                                <div className={styles.LcNotedEvent}>
                                    <textarea
                                        onChange={e => {
                                            setNote(e.target.value);
                                        }}
                                        placeholder="input"
                                    />
                                    <button
                                        className={styles.BtnBtn}
                                        onClick={() => {
											updateLcNote(id, note);
											setTimeout(() => {
												setFlag(true)
												navigate(
                                                    `/dashboard/learning-circle/details/${id}`
                                                );
											}, 2000);
										}}
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