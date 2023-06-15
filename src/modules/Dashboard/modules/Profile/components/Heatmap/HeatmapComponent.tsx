import React, { useState } from "react";
import styles from "./Heatmap.module.css";
import { Tooltip } from "@chakra-ui/react";
import moment from "moment";

type Props = {
    data: { taskName: string; karmaPoint: string; createdDate: string }[];
    year: any;
};

const HeatmapComponent = (props: Props) => {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(currentYear);
    let content: JSX.Element[] = [];
    let i = 1;
    const dataYearFiltered = props.data.filter(item => {
        return item.createdDate.slice(0, 4) === year.toString();
    });

    const dataDayFiltered: { date: string; sum: number; count: number }[] =
        dataYearFiltered.reduce(
            (acc: { date: string; sum: number; count: number }[], item) => {
                const date = item.createdDate.slice(0, 10);
                const existingItem = acc.find(el => el.date === date);
                if (existingItem) {
                    existingItem.sum += parseInt(item.karmaPoint);
                    existingItem.count += 1;
                } else {
                    acc.push({
                        date,
                        sum: parseInt(item.karmaPoint),
                        count: 1
                    });
                }
                return acc;
            },
            []
        );

    // console.log(dataDayFiltered);

    const monthMapping: Record<string, number> = {
        "01": 0,
        "02": 31,
        "03": 59,
        "04": 90,
        "05": 120,
        "06": 151,
        "07": 181,
        "08": 212,
        "09": 243,
        "10": 273,
        "11": 304,
        "12": 334
    };
    do {
        let dateNumber = i.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        let foundItem = false;
        dataDayFiltered.forEach(item => {
            const month = item.date.slice(5, 7);
            const monthNumber = monthMapping[month] || 0;
            if (
                parseInt(item.date.slice(8, 10)) + monthNumber ===
                parseInt(dateNumber)
            ) {
                foundItem = true;
                content.push(
                    <Tooltip
                        hasArrow
                        placement="top"
                        fontSize="12px"
                        label={
                            "Total Task: " +
                            item.count +
                            " , " +
                            "Total Karma: " +
                            item.sum +
                            " , " +
                            moment(item.date).format("ll")
                        }
                        aria-label="A tooltip"
                    >
                        <p
                            style={{
                                backgroundColor: "#2DCE89"
                            }}
                            key={i}
                        ></p>
                    </Tooltip>
                );
                i++;
            }
        });
        !foundItem && content.push(<p key={i}></p>);
        !foundItem && i++;
    } while (i <= 365);

    const renderYearButtons = () => {
        const years = [];
        for (let y = currentYear; y >= props.year; y--) {
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
