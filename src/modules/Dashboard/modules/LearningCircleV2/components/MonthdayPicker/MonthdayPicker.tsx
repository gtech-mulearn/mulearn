import { useState } from "react";
import styles from "./MonthdayPicker.module.css";

export default function MonthdayPicker({
    selectedMonthdays,
    setSelectedMonthdays
}: {
    selectedMonthdays: number;
    setSelectedMonthdays: React.Dispatch<React.SetStateAction<number>>;
}) {
    const handleCheckboxChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const id = parseInt(event.target.id);
        setSelectedMonthdays(id);
    };
    return (
        <div className={styles.InputSchedule}>
            <div className={styles.weeks}>
                {Array.from({ length: 28 }, (_, index) => (
                    <div
                        className={
                            styles.box +
                            " " +
                            (selectedMonthdays === index + 1
                                ? styles.active
                                : "")
                        }
                    >
                        <input
                            name="day"
                            type="checkbox"
                            id={`${index + 1}`}
                            checked={selectedMonthdays === index + 1}
                            onChange={handleCheckboxChange}
                        />
                        <label htmlFor={`${index + 1}`}>{index + 1}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
