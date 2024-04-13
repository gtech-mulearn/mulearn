import React from "react";
import styles from "./ClicksGraph.module.css";
// import Chart from "react-google-charts";
type Response = {
    total_clicks: number;
    created_on: string;
    browsers: {
        [key: string]: number;
    };
    platforms: {
        [key: string]: number;
    };
    devices: {
        [key: string]: number;
    };
    sources: {
        [key: string]: number;
    };
    countries: {
        [key: string]: number;
    };
    dimensions: {
        [key: string]: number;
    };
    time_based_data: {
        all_time: Array<[string, number]>;
    };
    long_url: string;
    short_url: string;
    title: string;
};
type Props = {
    response: Response;
    timePeriod: any;
};
// export const options = {
//     title: "Total clicks",
//     legend: { position: "bottom" }
// };

const ClicksGraph = ({ response, timePeriod }: Props) => {
    function getLastDayOfWeek(dayOfWeek: number) {
        const today = new Date();
        const diff = today.getDay() - dayOfWeek;
        const lastDay = new Date(today);
        lastDay.setDate(today.getDate() - diff);
        return lastDay.toISOString().split("T")[0];
    }

    const formatDate = (dateString: Date) => {
        return new Date(dateString.toString())
            .toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit"
            })
            .split("/")
            .reverse()
            .join("-");
    };
    const dateWiseData =
        response.time_based_data &&
        response.time_based_data.all_time &&
        response.time_based_data.all_time.reduce(
            (result, [dateTime, clicks]) => {
                const date = new Date(dateTime).toLocaleDateString("en-US", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit"
                });

                if (result.has(date)) {
                    result.set(date, result.get(date) + clicks);
                } else {
                    result.set(date, clicks);
                }

                return result;
            },
            new Map()
        );

    const sortedDateWiseData = Array.from(dateWiseData).map(
        ([date, clicks]) => [formatDate(new Date(date)), clicks]
    );

    const getChartData = () => {
        switch (timePeriod) {
            case "all_time":
                return [["Date", "Clicks"], ...sortedDateWiseData];
            case "yesterday":
                // Calculate yesterday's date
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayDate = formatDate(yesterday);

                // Filter data for yesterday
                const yesterdayData = sortedDateWiseData.filter(entry =>
                    (entry[0] as string).includes(yesterdayDate)
                );

                return [
                    ["Time", "Clicks"],
                    ...yesterdayData.map(entry => [
                        new Date(entry[0] as string).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true
                        }),
                        entry[1]
                    ])
                ];
            case "this_week":
                const lastMondayDate = new Date(getLastDayOfWeek(1));
                const thisWeek = formatDate(lastMondayDate);
                const lastWeek = new Date(getLastDayOfWeek(7))
                    .toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit"
                    })
                    .split("/")
                    .reverse()
                    .join("-");

                const thisWeekData = sortedDateWiseData.filter(entry => {
                    const entryDate = entry[0] as string;
                    return entryDate >= thisWeek && entryDate <= lastWeek;
                });

                return [
                    ["Weekday", "Clicks"],
                    ...thisWeekData.map(entry => [entry[0], entry[1]])
                ];
            case "this_month":
                const thisMonth = (new Date().getMonth() + 1).toString();
                const thisMonthData = sortedDateWiseData.filter(entry =>
                    (entry[0] as string).endsWith(thisMonth)
                );
                return [
                    ["Date", "Clicks"],
                    ...thisMonthData.map(entry => [entry[0], entry[1]])
                ];
            case "this_year":
                const lastYear = new Date().getFullYear();
                const thisYearData = sortedDateWiseData.filter(entry =>
                    (entry[0] as string).startsWith(lastYear.toString())
                );
                return [
                    ["Month", "Clicks"],
                    ...thisYearData.map(entry => [entry[0], entry[1]])
                ];
            case "today":
                // Calculate today's date
                const today = new Date();
                const todayDate = formatDate(today);
                // Filter data for today
                const todayData = sortedDateWiseData.filter(entry =>
                    (entry[0] as string).startsWith(todayDate)
                );

                return [
                    ["Time", "Clicks"],
                    ...todayData.map(entry => [
                        new Date(entry[0] as string).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit",
                            hour12: true
                        }),
                        entry[1]
                    ])
                ];
            default:
                return [];
        }
    };
    return (
        <div className={styles.graph} id="chart-container">
            <div className={styles.v_lines}>
                {Array.from({
                    length: getChartData().length + 1
                }).map((_, index) => (
                    <i key={index} className={styles.v_line}></i>
                ))}
            </div>
            <div className={styles.h_lines}>
                <i className={styles.h_line}></i>
                <i className={styles.h_line}></i>
                <i className={styles.h_line}></i>
                <i className={styles.h_line}></i>
            </div>
            <div className={styles.bars}>
                {response.time_based_data &&
                    response.time_based_data.all_time &&
                    (() => {
                        const data = getChartData();
                        return data.map((entry, index) => {
                            // eslint-disable-next-line array-callback-return
                            if (index === 0) return;
                            return (
                                <div key={index}>
                                    <div
                                        className={styles.bar}
                                        style={{
                                            height: `${
                                                (entry[1] /
                                                    response.total_clicks) *
                                                100
                                            }%`
                                        }}
                                    >
                                        <p className={styles.tool_tip}>
                                            {timePeriod ===
                                            ("today" || "yesterday")
                                                ? "time"
                                                : "date"}
                                            : {entry[0]}
                                            <br />
                                            clicks: {entry[1]}
                                        </p>
                                    </div>
                                </div>
                            );
                        });
                    })()}
            </div>
            {/* <Chart
                chartType="Bar"
                width="100%"
                height="200px"
                data={getChartData()}
                options={options}
            /> */}
        </div>
    );
};

export default ClicksGraph;
