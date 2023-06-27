import React, { useState } from "react";
import styles from "./Heatmap.module.css";
import { Tooltip } from "@chakra-ui/react";
import moment from "moment";

type Props = {
    data: { task_name: string; karma: string; created_date: string }[];
    year: any;
};

const HeatmapComponent = (props: Props) => {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    const startDate = moment(`${year}-01-01`);
    const endDate = moment(`${year}-12-31`);
    const totalDays = endDate.diff(startDate, "days") + 1;
    const content: JSX.Element[] = [];

    const dataYearFiltered = props.data.filter(
        item => item.created_date.slice(0, 4) === year.toString()
    );

    const dataDayFiltered: {
        date: string;
        totalKarma: number;
        taskCount: number;
    }[] = dataYearFiltered.reduce(
        (
            acc: { date: string; totalKarma: number; taskCount: number }[],
            item
        ) => {
            const date = item.created_date.slice(0, 10);
            const existingItem = acc.find(el => el.date === date);
            if (existingItem) {
                existingItem.totalKarma += parseInt(item.karma);
                existingItem.taskCount += 1;
            } else {
                acc.push({
                    date,
                    totalKarma: parseInt(item.karma),
                    taskCount: 1
                });
            }
            return acc;
        },
        []
    );

    const renderSquares = () => {
        let currentDate = moment(startDate);
        let currentWeekday = currentDate.isoWeekday(); // Get the ISO weekday (1-7, Monday-Sunday) of the start date
        let emptySquaresCount = currentWeekday - 1;

        // Render empty squares for the first week
        for (let i = 0; i < emptySquaresCount; i++) {
            content.push(<p key={`empty_${i}`}></p>);
        }

        for (let i = 0; i < totalDays; i++) {
            const dateString = currentDate.format("YYYY-MM-DD");
            const existingItem = dataDayFiltered.find(
                item => item.date === dateString
            );
            const totalKarma = existingItem?.totalKarma ?? 0; // Use nullish coalescing operator to provide a default value
            const backgroundColor =
                totalKarma >= 500
                    ? "#00814a"
                    : totalKarma >= 100
                    ? "#27b176"
                    : totalKarma >= 50
                    ? "#2dce89ba"
                    : totalKarma >= 10
                    ? "#2dce899e"
                    : totalKarma > 0
                    ? "#2dce897d"
                    : "";
            const tooltipContent = existingItem
                ? `Total Task: ${
                      existingItem.taskCount
                  }, Total Karma: ${totalKarma}, ${moment(
                      existingItem.date
                  ).format("ll")}`
                : "";
            content.push(
                <Tooltip
                    key={i}
                    hasArrow
                    placement="top"
                    fontSize="12px"
                    label={tooltipContent}
                    aria-label="A tooltip"
                >
                    <p style={{ backgroundColor }}></p>
                </Tooltip>
            );

            currentWeekday++;
            if (currentWeekday > 7) {
                // Start a new week
                currentWeekday = 1;
                content.push(
                    <div key={`week_${i}`} className={styles.weekBreak}></div>
                ); // Add a break between weeks
            }

            currentDate.add(1, "day");
        }
    };

    const renderYearButtons = () => {
        const years = [];
        for (let y = props.year; y <= currentYear; y++) {
            years.push(
                <p
                    key={y}
                    style={
                        year === y
                            ? { backgroundColor: "#2DCE89", color: "#fff" }
                            : {}
                    }
                    onClick={() => {
                        setYear(y);
                    }}
                >
                    {y}
                </p>
            );
        }
        return years;
    };

    renderSquares();

    return (
        <div className={styles.heatmap_container}>
            <div className={styles.months}>
                <p>Jan</p>
                <p>Feb</p>
                <p>Mar</p>
                <p>Apr</p>
                <p>May</p>
                <p>Jun</p>
                <p>Jul</p>
                <p>Aug</p>
                <p>Sep</p>
                <p>Oct</p>
                <p>Nov</p>
                <p>Dec</p>
            </div>
            <div className={styles.weeks}>
                <p>Mon</p>
                <p>Tue</p>
                <p>Wed</p>
                <p>Thu</p>
                <p>Fri</p>
                <p>Sat</p>
                <p>Sun</p>
            </div>
            <div className={styles.heatmap}>{content}</div>
            <div className={styles.year_btns}>{renderYearButtons()}</div>
        </div>
    );
};

export default HeatmapComponent;
