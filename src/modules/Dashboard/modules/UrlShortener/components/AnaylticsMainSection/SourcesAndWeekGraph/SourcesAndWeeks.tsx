import React, { useState } from "react";
import styles from "./SourcesAndWeeks.module.css";
import { Chart } from "react-google-charts";

export const options = {
    title: "Weekly Analytics",
    curveType: "function",
    legend: { position: "bottom" }
};
type Props = {
    response: any;
};

const SourcesAndWeeks = ({ response }: Props) => {
    const [month, setMonth] = useState<number>(
        new Date().getDay() === 0 ? 6 : new Date().getDay() - 1
    );

    function getLastDayOfWeek(dayOfWeek: number) {
        const today = new Date();
        const diff = today.getDay() - dayOfWeek;
        const lastDay = new Date(today);
        lastDay.setDate(today.getDate() - diff);
        return lastDay.toISOString().split("T")[0];
    }
    const lastMonday = getLastDayOfWeek(month);
    const lastMondayData = response.time_based_data
        ? (response.time_based_data.all_time as Array<[string, number]>).filter(
              entry => (entry[0] as string).startsWith(lastMonday)
          )
        : [];

    const convertedData = [
        ["time", "clicks"],
        ...lastMondayData.map(entry => [
            new Date(entry[0] as string).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
                hour12: true
            }),
            entry[1]
        ])
    ];
    const devicesCount = response.devices
        ? Object.keys(response.devices).length
        : 0;
    const platformsCount = response.platforms
        ? Object.keys(response.platforms).length
        : 0;
    const browsersCount = response.browsers
        ? Object.keys(response.browsers).length
        : 0;
    const totalCategories = platformsCount + devicesCount + browsersCount;
    const buttonMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
        <div className={styles.sources_weeks}>
            <div className={styles.sources}>
                <Sources
                    title="Devices"
                    sourceCount={devicesCount}
                    totalCategories={totalCategories}
                    response={response}
                />
                <Sources
                    title="Platforms"
                    sourceCount={platformsCount}
                    totalCategories={totalCategories}
                    response={response}
                />
                <Sources
                    title="Browsers"
                    sourceCount={browsersCount}
                    totalCategories={totalCategories}
                    response={response}
                />
            </div>

            <div className={styles.week_analytics}>
                {/* <div className={styles.header}>
                    <Day />
                    <Night />
                    <DayAndNight />
                </div> */}
                <div className={styles.graph}>
                    <Chart
                        chartType="LineChart"
                        // width="100%"
                        height="250px"
                        data={convertedData}
                        options={options}
                    />
                </div>
                <div className={styles.footer}>
                    {buttonMap.map((button, index) => (
                        <button
                            key={index}
                            onClick={() => setMonth(index)}
                            className={month === index ? styles.active : ""}
                        >
                            {button}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SourcesAndWeeks;

type Props2 = {
    title: string;
    sourceCount: number;
    totalCategories: number;
    response: any;
};
const Sources = ({ title, sourceCount, totalCategories, response }: Props2) => {
    return (
        <div className={styles.source_box}>
            <h1>{title}</h1>
            {/* <div className={styles.circle_progress_bar}>
                <CircularProgress
                    value={
                        parseInt(
                            ((sourceCount / totalCategories) * 100).toPrecision(
                                2
                            )
                        ) + 50
                    }
                    color="#6C7BFF"
                    capIsRound
                >
                    <CircularProgressLabel>
                        {(
                            (sourceCount / totalCategories) * 100 +
                            50
                        ).toPrecision(3)}
                    </CircularProgressLabel>
                </CircularProgress>
            </div> */}
            <div className={styles.source_list}>
                {response[title.toLowerCase() as keyof typeof response] &&
                    Object.keys(
                        response[title.toLowerCase() as keyof typeof response]
                    ).map(key => (
                        <div className={styles.source} key={key}>
                            <p> {key}</p>
                            <p className={styles.percentage}>
                                {(
                                    (response[
                                        title.toLowerCase() as keyof typeof response
                                    ][
                                        key as keyof (typeof response)[typeof title]
                                    ] /
                                        response.total_clicks) *
                                    100
                                ).toPrecision(2)}
                                %
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};
