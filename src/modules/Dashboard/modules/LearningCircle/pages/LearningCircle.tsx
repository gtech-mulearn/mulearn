import { ChangeEvent, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import styles from "./LearningCircle.module.css";
import pic from "../../Profile/assets/images/dpm.webp";
import {
    approveLcUser,
    getLcDetails,
    leaveLc,
    removeMember,
    setLCMeetTime,
    toast,
    transferLead,
    updateLcNote
} from "../services/LearningCircleAPIs";
import { useNavigate, useParams } from "react-router-dom";
import { BiEditAlt } from "react-icons/bi";
import { RxCrossCircled } from "react-icons/rx";
import {
    AllWeeks,
    convert24to12,
    getNextDate,
    monthNames
} from "../services/utils";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { Tooltip } from "react-tooltip";
import Modal from "@/MuLearnComponents/Modal/Modal";
import data from "../data/data.json";
import { BsFillBookmarksFill } from "react-icons/bs";
import { TbArrowsTransferUp } from "react-icons/tb";
import Select from "react-select";

type Props = {};

const generateTimeOptions = () => {
    const options = [];
    const intervals = ["00", "30"]; // for 30-minute intervals

    for (let i = 1; i <= 12; i++) {
        for (let interval of intervals) {
            const time = `${i.toString().padStart(2, "0")}:${interval}`;
            options.push({ value: time + " AM", label: time + " AM" });
            options.push({ value: time + " PM", label: time + " PM" });
        }
    }

    return options;
};

const LearningCircle = (props: Props) => {
    const [lc, setLc] = useState<LcDetail>();
    const [note, setNote] = useState("");
    const [temp, setTemp] = useState(false);
    const [meetTime, setMeetTime] = useState("");
    const [meetVenue, setMeetVenue] = useState("");
    const [flag, setFlag] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [meetDays, setMeetDays] = useState<number[]>([]);
    const [validAvatar, setValidAvatar] = useState<string[]>([]);

    const [nextMeet, setNextMeet] = useState<string | null>(null);
    const [week, setWeek] = useState<string>("");

    const [openRemoveConfrim, setOpenRemoveConfirm] = useState(false);
    const [resourceLink, setResourceLink] = useState("");
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState<string>("");

    const [transferConfirm, setTransferConfirm] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getLcDetails(setLc, id);
        setTimeout(() => {
            setTemp(true);
            if (lc?.note !== "") {
                setFlag(true);
            }
            if (lc?.meet_place || lc?.meet_time !== "") {
                setIsEdit(true);
            }
        }, 2000);
    }, []);

    useEffect(() => {
        lc?.members?.map(async member => {
            const imagePath: string = member.profile_pic;

            try {
                const response: AxiosResponse = await axios.get(imagePath);
            } catch (error) {
                setValidAvatar(valid => [...valid, member.id]);
            }
        });
    }, []);

    useEffect(() => {
        //find the corresponding resourceLink from the data by matching the igcode from lc
        const igCode = lc?.ig_code;
        const resourceLink = data.find(
            ig => ig.igcode === igCode
        )?.resourcelink;
        setResourceLink(resourceLink || "");

        if (lc) {
            const sortedLc = [...lc.members].sort((a, b) => b.karma - a.karma);
            setLc(prevLc => ({
                ...prevLc!,
                members: sortedLc
            }));
        }
    }, []);

    useEffect(() => {
        if (lc && !lc.is_member && lc?.circle_code?.length > 0) {
            toast({
                title: "Access Denied",
                description: "Make sure you are a member of that circle",
                status: "error",
                duration: 2000,
                isClosable: true
            });
            navigate("/dashboard/learning-circle/");
        }
    }, [lc]);

    useEffect(() => {
        setMeetTime(lc?.meet_time || "");
        setMeetVenue(lc?.meet_place || "");
        setMeetDays(lc?.day || []);
        setNote(lc?.note || "");

        if (lc?.day) {
            const eventDate = getNextDate(lc?.day, lc.meet_time);
            const date = eventDate.getDate(); //
            const month = eventDate.getMonth();
            const year = eventDate.getFullYear();
            const day = eventDate.getDay();
            // console.log(date, month, year, day);

            setNextMeet(`${date} ${monthNames[month]} ${year}`);
            setWeek(AllWeeks[day]);
        } else {
            setNextMeet(null);
            setWeek("");
        }
    }, [lc]);

    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const id = parseInt(event.target.id);
        setMeetDays(prevSelected =>
            prevSelected.includes(id)
                ? prevSelected.filter(day => day !== id)
                : [...prevSelected, id]
        );
    };

    const handleSchedule = async (event: any) => {
        if (meetDays.length === 0 || meetTime === "" || meetVenue === "") {
            toast({
                title: "Please fill all the fields",
                description: "",
                status: "warning",
                duration: 2000,
                isClosable: true
            });
            return;
        }

        // console.log("Meet days & time", getNextDate(meetDays, meetTime)); // get next date of meeting

        setLCMeetTime(meetTime, meetVenue, meetDays, id);
        setTimeout(() => {
            getLcDetails(setLc, id);
        }, 2000);
        setTimeout(() => {
            if (lc?.meet_place || lc?.meet_time !== "") {
                setIsEdit(true);
            }
        }, 2000);
    };
    const handleLeave = () => {
        leaveLc(id, "test", navigate);
    };
    function handleRemove(circle: string | undefined, id: string): void {
        removeMember(circle, id, navigate);
    }

    function handleTransfer(circle: string): void {
        console.log("New Lead", userId);
        transferLead(circle, userId, navigate);
        setTimeout(() => {
            navigate(`/dashboard/learning-circle/details/${id}`);
        }, 4000);
    }

    function avatarValidate(member: LcMembers) {
        const isInvalid = validAvatar.find(id => member.id === id);
        return isInvalid ? pic : member?.profile_pic || pic;
    }

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        const sanitizedInput = inputValue.replace(/[<>/]/g, ''); // Remove < and > characters

        setNote(sanitizedInput);
    };

    return (
        <>
            {temp ? (
                <div className={styles.LearningCircleDetailsContent}>
                    <div className={styles.CreatedCircle}>
                        <div className={styles.CircleName}>
                            <h1>{lc?.name}</h1>
                            <b>
                                {lc?.college} <br /> Code:
                                {lc?.circle_code}
                            </b>
                            {resourceLink.length > 0 && (
                                <a
                                    href={resourceLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <p className={styles.resourcesLink}>
                                        <BsFillBookmarksFill color="#456ff6" />
                                        Learning Resources
                                    </p>
                                </a>
                            )}
                        </div>
                        <div className={styles.CircleRank}>
                            <div>
                                <b>Rank</b>
                                <h1>{lc?.rank}</h1>
                                <b className={styles.points}>
                                    {lc?.total_karma} Karma
                                </b>
                            </div>
                            {/* <IoArrowBackCircleOutline
                                data-tooltip-id="Icon"
                                data-tooltip-content="Leave LC"
                                style={{
                                    color: "var(--White)",
                                    backgroundColor: "red",
                                    borderRadius: "50%",
                                    fontSize: "30px",
                                    cursor: "pointer"
                                }}
                                onClick={() => {
                                    setIsOpen(true);
                                }}
                            /> */}
                            <div className={styles.deleteIcon}>
                                <button
                                    onClick={() => {
                                        setIsOpen(true);
                                    }}
                                >
                                    Leave Circle
                                </button>
                            </div>
                            <div></div>
                            <Tooltip
                                id="Icon"
                                style={{
                                    backgroundColor: "red",
                                    color: "var(--White)",
                                    borderRadius: "10px",
                                    padding: "0 10px"
                                }}
                            />
                            {isOpen && (
                                <Modal
                                    setIsOpen={setIsOpen}
                                    id={"Leave"}
                                    heading={
                                        lc?.members.length === 1
                                            ? "Delete Learning Circle"
                                            : "Leave Learning Circle"
                                    }
                                    content={
                                        lc?.members.length === 1
                                            ? "Since you are the last member, the circle will be deleted, Once you leave."
                                            : `Are you sure you want to leave ${lc?.name} ?`
                                    }
                                    click={handleLeave}
                                    type="Leave"
                                />
                            )}
                        </div>
                    </div>

                    <div className={styles.BoxContent}>
                        <div className={styles.LeftBox}>
                            <div className={styles.EventOn}>
                                {isEdit ? (
                                    <>
                                        {nextMeet !== null ? (
                                            <>
                                                <div
                                                    className={styles.MeetingOn}
                                                >
                                                    <div>
                                                        {" "}
                                                        <h2>
                                                            Next Meeting on
                                                        </h2>{" "}
                                                    </div>
                                                    <BiEditAlt
                                                        style={{
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() =>
                                                            setIsEdit(false)
                                                        }
                                                    />
                                                </div>
                                                <div
                                                    className={
                                                        styles.MeetingDate
                                                    }
                                                >
                                                    <h1>{nextMeet}</h1>
                                                    {week !== null && (
                                                        <p>{week}</p>
                                                    )}
                                                </div>
                                                <div
                                                    className={
                                                        styles.MeetingBtn
                                                    }
                                                >
                                                    <div>
                                                        <b>
                                                            Venue:{" "}
                                                            {lc?.meet_place}{" "}
                                                            <br />
                                                        </b>
                                                        {lc?.meet_time && (
                                                            <b>
                                                                Time:{" "}
                                                                {convert24to12(
                                                                    String(
                                                                        lc?.meet_time
                                                                    )
                                                                )}
                                                            </b>
                                                        )}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div
                                                    className={
                                                        styles.MeetingDate
                                                    }
                                                >
                                                    <h1>
                                                        No meeting scheduled
                                                    </h1>
                                                </div>
                                                <button
                                                    className={styles.BtnBtn}
                                                    onClick={() =>
                                                        setIsEdit(false)
                                                    }
                                                >
                                                    Schedule now
                                                </button>
                                            </>
                                        )}
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

                                        <div className={styles.dateandtime}>
                                            <Select
                                                options={generateTimeOptions()}
                                                value={generateTimeOptions().find(
                                                    option =>
                                                        option.value ===
                                                        convert24to12(meetTime)
                                                )}
                                                isSearchable={false}
                                                onChange={e => {
                                                    function convertTo24Hr(
                                                        time: string
                                                    ) {
                                                        const [
                                                            timeStr,
                                                            modifier
                                                        ] = time.split(" ");
                                                        let [hours, minutes] =
                                                            timeStr.split(":");
                                                        if (hours === "12") {
                                                            hours = "00";
                                                        }
                                                        if (modifier === "PM") {
                                                            hours = String(
                                                                parseInt(
                                                                    hours,
                                                                    10
                                                                ) + 12
                                                            );
                                                        }
                                                        return `${hours}:${minutes}`;
                                                    }
                                                    // console.log(e.value);
                                                    e &&
                                                        setMeetTime(
                                                            convertTo24Hr(
                                                                e.value.toString()
                                                            )
                                                        );
                                                }}
                                                className={styles.inputTime}
                                            />

                                            <input
                                                required
                                                value={meetVenue}
                                                type="text"
                                                onChange={e => {
                                                    setMeetVenue(
                                                        e.target.value
                                                    );
                                                }}
                                                placeholder="meeting venue"
                                                className={styles.inputVenue}
                                            />
                                        </div>
                                        <div className={styles.InputSchedule}>
                                            <div className={styles.weeks}>
                                                <p>Meeting Days</p>
                                                <div className={styles.Lcweek}>
                                                    <div>
                                                        <input
                                                            required
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
                                                    setFlag(false);
                                                    setTimeout(() => {
                                                        navigate(
                                                            `/dashboard/learning-circle/details/${id}`
                                                        );
                                                    }, 2000);
                                                }}
                                            />
                                        </div>
                                        <p>{lc?.note}</p>
                                    </div>
                                ) : (
                                    <div className={styles.LcNotedEvent}>
                                        <textarea
                                            value={note}
                                            onChange={handleChange}
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
                                            lc?.pending_members?.map(
                                                (member, index) => (
                                                    <div
                                                        key={index}
                                                        className={
                                                            styles.PendingMembers
                                                        }
                                                    >
                                                        <span>
                                                            <img
                                                                src={avatarValidate(
                                                                    member
                                                                )}
                                                                alt="Profile picture"
                                                            />
                                                            <b>
                                                                {
                                                                    member.username
                                                                }
                                                            </b>
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
                                                                        1,
                                                                        "Approved Successfully"
                                                                    );
                                                                    setTimeout(
                                                                        () => {
                                                                            getLcDetails(
                                                                                setLc,
                                                                                id
                                                                            );
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
                                                                        0,
                                                                        "Rejected Successfully"
                                                                    );
                                                                    setTimeout(
                                                                        () => {
                                                                            getLcDetails(
                                                                                setLc,
                                                                                id
                                                                            );
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
                                        lc.members?.map((member, index) => (
                                            <div
                                                key={index}
                                                className={styles.MemberName}
                                            >
                                                <div
                                                    className={
                                                        styles.memberNameDiv
                                                    }
                                                >
                                                    <img
                                                        src={avatarValidate(
                                                            member
                                                        )}
                                                        alt="Profile Picture"
                                                    />
                                                    <div>
                                                        <div
                                                            className={
                                                                styles.username
                                                            }
                                                        >
                                                            <p>
                                                                {
                                                                    member.username
                                                                }{" "}
                                                                {member.is_lead &&
                                                                    "(Lead)"}
                                                            </p>
                                                        </div>
                                                        <span>
                                                            <img
                                                                src="https://i.ibb.co/Dbhv9rS/karma.png"
                                                                alt="karma"
                                                            />
                                                            {member.karma}
                                                        </span>
                                                    </div>
                                                </div>
                                                {lc.is_lead &&
                                                    !member.is_lead && (
                                                        <div>
                                                            <TbArrowsTransferUp
                                                                size={24}
                                                                onClick={() => {
                                                                    setTransferConfirm(
                                                                        true
                                                                    );
                                                                    setUsername(
                                                                        member?.username
                                                                    );
                                                                    setUserId(
                                                                        member?.id
                                                                    );
                                                                }}
                                                            />
                                                            {transferConfirm && (
                                                                <Modal
                                                                    click={() => {
                                                                        console.log(
                                                                            member
                                                                        );
                                                                        id &&
                                                                            handleTransfer(
                                                                                id
                                                                            );
                                                                    }}
                                                                    content={`Are you want to transfer lead to ${username} of ${lc.name} ?`}
                                                                    heading={
                                                                        "Transfer Lead Position"
                                                                    }
                                                                    id={
                                                                        "Transfer"
                                                                    }
                                                                    setIsOpen={
                                                                        setTransferConfirm
                                                                    }
                                                                    type="Confirm"
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                                {lc.is_lead &&
                                                    !member.is_lead && (
                                                        <div>
                                                            <RxCrossCircled
                                                                size={24}
                                                                onClick={() => {
                                                                    setOpenRemoveConfirm(
                                                                        true
                                                                    );
                                                                    setUsername(
                                                                        member?.username
                                                                    );
                                                                    setUserId(
                                                                        member?.id
                                                                    );
                                                                }}
                                                            />
                                                            {openRemoveConfrim && (
                                                                <Modal
                                                                    click={() => {
                                                                        handleRemove(
                                                                            id,
                                                                            userId
                                                                        );
                                                                    }}
                                                                    content={`Are you want to remove ${username} from ${lc.name}?`}
                                                                    heading={
                                                                        "Remove user from Learning Cicle"
                                                                    }
                                                                    id={
                                                                        "Remove"
                                                                    }
                                                                    setIsOpen={
                                                                        setOpenRemoveConfirm
                                                                    }
                                                                    type="error"
                                                                />
                                                            )}
                                                        </div>
                                                    )}
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.loader_container}>
                    <MuLoader />
                </div>
            )}
        </>
    );
};

export default LearningCircle;
