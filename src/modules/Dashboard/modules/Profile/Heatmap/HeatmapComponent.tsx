import React from "react";
import styles from "./Heatmap.module.css";
import { Tooltip } from "@chakra-ui/react";
import moment from "moment";

type Props = {
    data: { taskName: string; karmaPoint: string; createdDate: string }[];
};

const HeatmapComponent = (props: Props) => {
    let content: JSX.Element[] = [];
    let i = 1;
    do {
        let dateNumber = i.toLocaleString("en-US", {
            minimumIntegerDigits: 2,
            useGrouping: false
        });
        props.data.forEach(item => {
            let MonthNumber = 0;
            if (item.createdDate.slice(5, 7) === "01") {
                MonthNumber = 0;
            } else if (item.createdDate.slice(5, 7) === "02") {
                MonthNumber = 31;
            } else if (item.createdDate.slice(5, 7) === "03") {
                MonthNumber = 59;
            } else if (item.createdDate.slice(5, 7) === "04") {
                MonthNumber = 90;
            } else if (item.createdDate.slice(5, 7) === "05") {
                MonthNumber = 120;
            } else if (item.createdDate.slice(5, 7) === "06") {
                MonthNumber = 151;
            } else if (item.createdDate.slice(5, 7) === "07") {
                MonthNumber = 181;
            } else if (item.createdDate.slice(5, 7) === "08") {
                MonthNumber = 212;
            } else if (item.createdDate.slice(5, 7) === "09") {
                MonthNumber = 243;
            } else if (item.createdDate.slice(5, 7) === "10") {
                MonthNumber = 273;
            } else if (item.createdDate.slice(5, 7) === "11") {
                MonthNumber = 304;
            } else if (item.createdDate.slice(5, 7) === "12") {
                MonthNumber = 334;
            }
            if (
                parseInt(item.createdDate.slice(8, 10)) + MonthNumber ===
                parseInt(dateNumber)
            ) {
                content.push(
                    <Tooltip
                        hasArrow
                        placement="top"
                        fontSize="12px"
                        label={
                            "Task: " +
                            item.taskName +
                            " , " +
                            "Karma: " +
                            item.karmaPoint +
                            " , " +
                            moment(item.createdDate).format("ll")
                        }
                        aria-label="A tooltip"
                    >
                        <p
                            style={{
                                backgroundColor: "#014BB2"
                            }}
                            key={i}
                        ></p>
                    </Tooltip>
                );
                i++;
            }
        });
        content.push(<p key={i}></p>);
        i++;
    } while (i <= 365);
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
        </div>
    );
};

export default HeatmapComponent;
