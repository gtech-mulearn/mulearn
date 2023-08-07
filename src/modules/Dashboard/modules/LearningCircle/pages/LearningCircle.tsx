import { useEffect, useState } from "react";
import styles from "./LearningCircle.module.css";
import pic from "../../Profile/assets/images/dpm.webp";
import { approveLcUser, getLcDetails, setLCMeetTime, toast, updateLcNote } from "../services/LearningCircleAPIs";
import { useNavigate, useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi"
import { AllWeeks, getNextDate, monthNames } from "../services/utils";


type Props = {};

const LearningCircle = (props: Props) => {
    const [lc, setLc] = useState<LcDetail>();
    const [note, setNote] = useState('');
    const [meetTime, setMeetTime] = useState('');
    const [meetVenue, setMeetVenue] = useState('');
    const [flag, setFlag] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [meetDays, setMeetDays] = useState<number[]>([]);

    const [nextMeet, setNextMeet] = useState<string | null>(null);
    const [week, setWeek] = useState<string>("");

    const { id } = useParams();
    const navigate = useNavigate()

    useEffect(() => {
        getLcDetails(setLc, id);
        if (lc?.note !== '') {
            setFlag(true)
        }
        if (lc?.meet_place || lc?.meet_time !== '') {
            setIsEdit(true)
        }
    }, []);

    useEffect(() => {
        setMeetTime(lc?.meet_time || '')
        setMeetVenue(lc?.meet_place || '')
        setMeetDays(lc?.day || [])
        setNote(lc?.note || '');

        if (lc?.day) {
            const eventDate = getNextDate(lc?.day, lc.meet_time)
            const date = eventDate.getDate() // 
            const month = eventDate.getMonth()
            const year = eventDate.getFullYear()
            const day = eventDate.getDay()
            console.log(date, month, year, day)

            setNextMeet(`${date} ${monthNames[month]} ${year}`)
            setWeek(AllWeeks[day])
        }
        else {
            setNextMeet(null)
            setWeek("")
        }
    }, [lc]);



    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const id = parseInt(event.target.id)
        setMeetDays(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(day => day !== id)
                : [...prevSelected, id]
        );
    };

    const handleSchedule = async (event: any) => {
        if (meetDays.length === 0 || meetTime === '' || meetVenue === '') {
            toast({
                title: "Please fill all the fields",
                description: "",
                status: "warning",
                duration: 2000,
                isClosable: true
            });
            return
        }

        console.log('Meet days & time', getNextDate(meetDays, meetTime)) // get next date of meeting

        setLCMeetTime(meetTime, meetVenue, meetDays, id)
        setTimeout(() => {
            getLcDetails(setLc, id);
        }, 300);
        setTimeout(() => {
            if (lc?.meet_place || lc?.meet_time !== '') {
                setIsEdit(true)
            }
        }, 2000);
    }
    console.log(meetDays[0])
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
                            {isEdit ? (
                                <>
                                    {nextMeet !== null ? <>
                                        <div className={styles.MeetingOn}>
                                            <div> <h2>Next Meeting on</h2> </div>
                                            <BiEditAlt onClick={() => setIsEdit(false)} />
                                        </div>
                                        <div className={styles.MeetingDate}>
                                            <h1>{nextMeet}</h1>
                                            {week !== null && <p>{week}</p>}
                                        </div>
                                        <div className={styles.MeetingBtn}>
                                            <div>
                                                <b>venue: {lc?.meet_place} <br /></b>
                                                <b>time: {lc?.meet_time}</b>
                                            </div>

                                            {/* <button className={styles.BtnBtn}>
                                                    Done
                                                </button> */}
                                        </div>
                                    </>
                                        :
                                        <>
                                            <div className={styles.MeetingDate}>
                                                <h1>No meeting scheduled</h1>
                                            </div>
                                            <button className={styles.BtnBtn} onClick={() => setIsEdit(false)}>
                                                schedule now
                                            </button>
                                        </>

                                    }


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
                                            <input required
                                                type="time"
                                                value={meetTime}
                                                onChange={e => {
                                                    setMeetTime(e.target.value);
                                                }}
                                                placeholder="meeting time"
                                            />
                                            <input required
                                                value={meetVenue}
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
                                                    <input required
                                                        name="day"
                                                        type="checkbox"
                                                        id="0"
                                                        checked={meetDays.includes(
                                                            0
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="0">
                                                        Sun
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name="day"
                                                        id="1"
                                                        checked={meetDays.includes(
                                                            1
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="1">
                                                        Mon
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name="day"
                                                        id="2"
                                                        checked={meetDays.includes(
                                                            2
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="2">
                                                        Tue
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name="day"
                                                        id="3"
                                                        checked={meetDays.includes(
                                                            3
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="3">
                                                        Wed
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name="day"
                                                        id="4"
                                                        checked={meetDays.includes(
                                                            4
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="4">
                                                        Thu
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name="day"
                                                        id="5"
                                                        checked={meetDays.includes(
                                                            5
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="5">
                                                        Fri
                                                    </label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        name="day"
                                                        id="6" // sat
                                                        checked={meetDays.includes(
                                                            6
                                                        )}
                                                        onChange={
                                                            handleCheckboxChange
                                                        }
                                                    />
                                                    <label htmlFor="6">
                                                        Sat
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <input type="text" placeholder="meeting venue" /> */}
                                    </div>

                                    <button
                                        className={styles.BtnBtn}
                                        onClick={handleSchedule}
                                    >
                                        Schedule
                                    </button>
                                </>
                            )}
                        </div>

                        <div className={styles.EventOn}>
                            {flag ? (
                                <div className={styles.LcNotedEvent}>
                                    <div className={styles.LcNotedEdit}>
                                        <b>Notes</b>
                                        <BiEditAlt
                                            style={{ cursor: "pointer" }}
                                            onClick={() => {
                                                console.log(lc?.note);
                                                setFlag(false);
                                                setTimeout(() => {
                                                    navigate(
                                                        `/dashboard/learning-circle/details/${id}`
                                                    );
                                                }, 1000);
                                            }}
                                        />
                                    </div>
                                    <p>{lc?.note}</p>
                                </div>
                            ) : (
                                <div className={styles.LcNotedEvent}>
                                    <textarea
                                        value={note}
                                        onChange={e => {
                                            setNote(e.target.value);
                                        }}
                                        placeholder="Notes"
                                    />
                                    <button
                                        className={styles.BtnBtn}
                                        onClick={() => {
                                            updateLcNote(id, note);
                                            setTimeout(() => {
                                                getLcDetails(setLc, id);
                                                setFlag(true);
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
                                                    key={index}
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
                                        <div key={index} className={styles.MemberName}>
                                            <img
                                                src={
                                                    member.profile_pic
                                                        ? member?.profile_pic
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