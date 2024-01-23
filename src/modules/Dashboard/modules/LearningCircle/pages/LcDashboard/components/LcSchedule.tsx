import { Dispatch, SetStateAction, useState } from "react";
import styles from "../LcDashboard.module.css";
import toast from "react-hot-toast";
import { setLCMeetTime } from "../../../services/LearningCircleAPIs";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
    lc: LcDetail | undefined;
    id: string | undefined;
};

const LcSchedule = (props: Props) => {
    const [meetDays, setMeetDays] = useState<number[]>([]);

    const [meetSchedule, setMeetSchedule] = useState<LcMeetSchedule>({
        meet_time: "",
        meet_place: "",
        day: ""
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        // Use the spread operator to create a new object with the updated property
        setMeetSchedule(prevMeetSchedule => ({
            ...prevMeetSchedule,
            [name]: value
        }));
    };

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
        meetSchedule.day = meetDays.join(",");
        if (
            meetDays.length === 0 ||
            meetSchedule.meet_time === "" ||
            meetSchedule.meet_place === ""
        ) {
            toast.error("Please fill all the fields");
        } else {
            console.log(meetSchedule);
            toast.promise(setLCMeetTime(meetSchedule, props.id), {
                loading: "Saving...",
                success: () => {
                    props.setTemp(prev => ({
                        ...prev,
                        isSchedule: false
                    }));
                    return <b>Meeting schedule updated.</b>;
                },
                error: <b>Could not save.</b>
            });
        }
    };

    return (
        <>
            <div className={styles.ScheduleOn}>
                <b>Schedule meeting</b>
                <p>Enter details to schedule your weekly meeting</p>
            </div>

            <div className={styles.dateandtime}>
                <input
                    type="time"
                    id="timePicker"
                    required
                    placeholder="Meeting time"
                    name="meet_time"
                    value={meetSchedule.meet_time}
                    onChange={handleInputChange}
                />

                <input
                    required
                    type="text"
                    placeholder="meeting venue"
                    className={styles.inputVenue}
                    name="meet_place"
                    value={meetSchedule.meet_place}
                    onChange={handleInputChange}
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
                                checked={meetDays.includes(0)}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="0">Sun</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="day"
                                id="1"
                                checked={meetDays.includes(1)}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="1">Mon</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="day"
                                id="2"
                                checked={meetDays.includes(2)}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="2">Tue</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="day"
                                id="3"
                                checked={meetDays.includes(3)}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="3">Wed</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="day"
                                id="4"
                                checked={meetDays.includes(4)}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="4">Thu</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="day"
                                id="5"
                                checked={meetDays.includes(5)}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="5">Fri</label>
                        </div>
                        <div>
                            <input
                                type="checkbox"
                                name="day"
                                id="6" // sat
                                checked={meetDays.includes(6)}
                                onChange={handleCheckboxChange}
                            />
                            <label htmlFor="6">Sat</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.Bottom}>
                <button className={styles.BtnBtn} onClick={handleSchedule}>
                    Schedule
                </button>
            </div>
        </>
    );
};

export default LcSchedule;
