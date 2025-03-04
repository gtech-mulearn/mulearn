import { useState } from "react";
import styles from "./WeekdayPicker.module.css";

export default function WeekdayPicker({
    selectedWeekdays,
    setSelectedWeekdays
}: {
    selectedWeekdays: number;
    setSelectedWeekdays: React.Dispatch<React.SetStateAction<number>>;
}) {
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const id = parseInt(event.target.id);
        setSelectedWeekdays(id);
    };
    return (
        <div className={styles.InputSchedule}>
            <div className={styles.weeks}>
                {/* <p>Meeting Days</p> */}
                <div
                    className={
                        styles.box +
                        " " +
                        (selectedWeekdays === 0 ? styles.active : "")
                    }
                >
                    <input
                        name="day"
                        type="checkbox"
                        id="0"
                        checked={selectedWeekdays === 0}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="0">Sun</label>
                </div>
                <div
                    className={
                        styles.box +
                        " " +
                        (selectedWeekdays === 1 ? styles.active : "")
                    }
                >
                    <input
                        type="checkbox"
                        name="day"
                        id="1"
                        checked={selectedWeekdays === 1}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="1">Mon</label>
                </div>
                <div
                    className={
                        styles.box +
                        " " +
                        (selectedWeekdays === 2 ? styles.active : "")
                    }
                >
                    <input
                        type="checkbox"
                        name="day"
                        id="2"
                        checked={selectedWeekdays === 2}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="2">Tue</label>
                </div>
                <div
                    className={
                        styles.box +
                        " " +
                        (selectedWeekdays === 3 ? styles.active : "")
                    }
                >
                    <input
                        type="checkbox"
                        name="day"
                        id="3"
                        checked={selectedWeekdays === 3}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="3">Wed</label>
                </div>
                <div
                    className={
                        styles.box +
                        " " +
                        (selectedWeekdays === 4 ? styles.active : "")
                    }
                >
                    <input
                        type="checkbox"
                        name="day"
                        id="4"
                        checked={selectedWeekdays === 4}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="4">Thu</label>
                </div>
                <div
                    className={
                        styles.box +
                        " " +
                        (selectedWeekdays === 5 ? styles.active : "")
                    }
                >
                    <input
                        type="checkbox"
                        name="day"
                        id="5"
                        checked={selectedWeekdays === 5}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="5">Fri</label>
                </div>
                <div
                    className={
                        styles.box +
                        " " +
                        (selectedWeekdays === 6 ? styles.active : "")
                    }
                >
                    <input
                        type="checkbox"
                        name="day"
                        id="6" // sat
                        checked={selectedWeekdays === 6}
                        onChange={handleCheckboxChange}
                    />
                    <label htmlFor="6">Sat</label>
                </div>
            </div>
        </div>
    );
}
