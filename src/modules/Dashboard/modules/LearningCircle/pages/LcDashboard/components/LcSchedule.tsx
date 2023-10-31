import { Dispatch, SetStateAction, useState } from "react";
import styles from "../LcDashboard.module.css";
import toast from "react-hot-toast";

type Props = {
    setTemp: Dispatch<SetStateAction<LcDashboardTempData>>;
	lc: LcDetail | undefined;
};

const LcSchedule = (props: Props) => {
    const [meetDays, setMeetDays] = useState<number[]>([]);

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

	// const handleSchedule = async (event: any) => {
    //     if (meetDays.length === 0 || meetTime === "" || meetVenue === "") {
    //         toast({
    //             title: "Please fill all the fields",
    //             description: "",
    //             status: "warning",
    //             duration: 2000,
    //             isClosable: true
    //         });
	// 		toast.success("Meeting scheduled successfully");
    //         return;
    //     }

    return (
        <>
            <div className={styles.ScheduleOn}>
                <b>Schedule meeting</b>
                <p>Enter details to schedule your weekly meeting</p>
            </div>

            <div className={styles.dateandtime}>
                {/* <Select
                    options={generateTimeOptions()}
                    value={generateTimeOptions().find(
                        option => option.value === convert24to12(meetTime)
                    )}
                    isSearchable={false}
                    onChange={e => {
                        function convertTo24Hr(time: string) {
                            const [timeStr, modifier] = time.split(" ");
                            let [hours, minutes] = timeStr.split(":");
                            if (hours === "12") {
                                hours = "00";
                            }
                            if (modifier === "PM") {
                                hours = String(parseInt(hours, 10) + 12);
                            }
                            return `${hours}:${minutes}`;
                        }
                        // console.log(e.value);
                        e && setMeetTime(convertTo24Hr(e.value.toString()));
                    }}
                    className={styles.inputTime}
                /> */}

                <input
                    required
                    // value={meetVenue}
                    type="text"
                    // onChange={e => {
                    //     setMeetVenue(e.target.value);
                    // }}
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

            <button className={styles.BtnBtn}>
                Schedule
            </button>
        </>
    );
};

export default LcSchedule;
