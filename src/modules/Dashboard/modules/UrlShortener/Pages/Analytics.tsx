import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import Day from "../assets/SVGs/Day";
import Night from "../assets/SVGs/Night";
import DayAndNight from "../assets/SVGs/DayAndNight";
import { Chart } from "react-google-charts";

export const options = {
    title: "Weekly Analytics",
    curveType: "function",
    legend: { position: "bottom" }
};
const response = {
    total_clicks: 500,
    browsers: {
        Instagram: 24,
        Firefox: 1,
        "Chrome Mobile": 7,
        FacebookBot: 2,
        "Mobile Safari UI/WKWebView": 4,
        Chrome: 14,
        Facebook: 1
    },
    platforms: {
        Android: 32,
        Windows: 13,
        Other: 2,
        iOS: 4,
        "Mac OS X": 2
    },
    devices: {
        Mobile: 36,
        PC: 17
    },
    sources: {
        "https://l.instagram.com/": 37,
        "https://x.com/": 15,
        "https://mulearn.org/": 1
    },
    countries: {
        USA: 20,
        Canada: 15,
        UK: 8,
        India: 5
    },
    time_based_data: {
        all_time: [
            ["time", "clicks"],
            ["2023-12-03T18:43:27.654Z", 100],
            ["2023-12-03T19:15:45.123Z", 350],
            ["2023-12-03T20:30:12.789Z", 200],
            ["2023-12-03T21:05:59.321Z", 250],
            ["2023-12-03T22:12:34.567Z", 100]
        ]
    }
};

// Function to get the date of the last occurrence of a specific day of the week
// const dayOfWeek = 1; // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

const devicesCount = Object.keys(response.devices).length;
const platformsCount = Object.keys(response.platforms).length;
const browsersCount = Object.keys(response.browsers).length;

const totalCategories = platformsCount + devicesCount + browsersCount;

type Props = {};
const Analytics = (props: Props) => {
    const [visits, setVisits] = useState<number>(response.total_clicks);
    const [month, setMonth] = useState<number>(0);
    function getLastDayOfWeek(dayOfWeek: number) {
        const today = new Date();
        const diff = today.getDay() - dayOfWeek;
        const lastDay = new Date(today);
        lastDay.setDate(today.getDate() - diff);
        return lastDay.toISOString().split("T")[0];
    }

    // Example: Get last Monday's date
    const lastMonday = getLastDayOfWeek(month); // 0 for Sunday, 1 for Monday, ..., 6 for Saturday

    // Filter data for last Monday
    const lastMondayData = (
        response.time_based_data.all_time as Array<[string, number]>
    ).filter(entry => (entry[0] as string).startsWith(lastMonday));

    // Convert to the desired format with 12-hour time
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

    useEffect(() => {
        const bar = document.getElementById("progress-bar");
        if (bar) {
            const perc = visits;
            const rotateDegree = 45 + perc * 1.8;
            bar.style.transition = "transform 3s ease";
            bar.style.transform = `rotate(${rotateDegree}deg)`;
        }
    }, [visits]);
    const buttonMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
        <>
            <div className={styles.analytics_header}>
                <div className={styles.link_basics}>
                    <h1>Analytics</h1>
                    <p>Link title</p>
                    <p className={styles.date}>Created on oct 11,2023</p>

                    <select name="" id="">
                        <option value="">All Time</option>
                        <option value="">Yesterday</option>
                        <option value="">This week</option>
                        <option value="">This Month</option>
                        <option value="">This Year</option>
                    </select>
                </div>
                <div className={styles.link_copy}>
                    <a href="/">https://mulearn.r/shortenlink</a>
                    <a href="/">https://mulearn.org/longlonglonglongl...</a>
                </div>
            </div>

            <div className={styles.main_section_analytics}>
                <div className={styles.clicks_visits}>
                    <div className={styles.clicks}>
                        <h1>
                            Total clicks <span>+2.3%</span>
                        </h1>
                        <p>{response.total_clicks}</p>
                        <div className={styles.graph}>
                            <div className={styles.v_lines}>
                                <i className={styles.v_line}></i>
                                <i className={styles.v_line}></i>
                                <i className={styles.v_line}></i>
                                <i className={styles.v_line}></i>
                                <i className={styles.v_line}></i>
                                <i className={styles.v_line}></i>
                                <i className={styles.v_line}></i>
                                <i className={styles.v_line}></i>
                                <i className={styles.v_line}></i>
                            </div>
                            <div className={styles.h_lines}>
                                <i className={styles.h_line}></i>
                                <i className={styles.h_line}></i>
                                <i className={styles.h_line}></i>
                                <i className={styles.h_line}></i>
                            </div>
                            <div className={styles.bars}>
                                <i
                                    style={{
                                        height: "20%",
                                        background: "rgb(108 123 255 / 20%)"
                                    }}
                                    className={styles.bar}
                                ></i>
                                <i
                                    style={{
                                        height: "80%",
                                        background: "rgb(108 123 255 / 80%)"
                                    }}
                                    className={styles.bar}
                                ></i>
                                <i
                                    style={{
                                        height: "50%",
                                        background: "rgb(108 123 255 / 50%)"
                                    }}
                                    className={styles.bar}
                                ></i>
                                <i
                                    style={{
                                        height: "10%",
                                        background: "rgb(108 123 255 / 10%)"
                                    }}
                                    className={styles.bar}
                                ></i>
                                <i
                                    style={{
                                        height: "90%",
                                        background: "rgb(108 123 255 / 90%)"
                                    }}
                                    className={styles.bar}
                                ></i>
                                <i
                                    style={{
                                        height: "70%",
                                        background: "rgb(108 123 255 / 70%)"
                                    }}
                                    className={styles.bar}
                                ></i>
                            </div>
                        </div>
                    </div>
                    <div className={styles.visits}>
                        <div className={styles.progress}>
                            <div className={styles.barOverflow}>
                                <div
                                    id="progress-bar"
                                    className={styles.bar}
                                ></div>
                            </div>
                            <p>{visits}</p>
                            <p>Visits</p>
                        </div>
                    </div>
                </div>

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
                        <div className={styles.header}>
                            <Day />
                            <Night />
                            <DayAndNight />
                        </div>
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
                                    className={
                                        month === index ? styles.active : ""
                                    }
                                >
                                    {button}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.sources_countries}>
                    <div className={styles.sources}>
                        <h1>Sources</h1>
                        <div className={styles.source_list}>
                            <div className={styles.rowsH}>
                                <p className={styles.sourceH}>Source</p>
                                <p className={styles.visitsH}>Visits</p>
                            </div>
                            {Object.keys(response.sources).map(key => (
                                <div className={styles.rows} key={key}>
                                    <p className={styles.source}>
                                        {new URL(key).hostname
                                            .split(".")
                                            .slice(-2)
                                            .join(".")}
                                    </p>
                                    <p className={styles.visits}>
                                        {
                                            response.sources[
                                                key as keyof typeof response.sources
                                            ]
                                        }
                                        <span>
                                            {(
                                                (response.sources[
                                                    key as keyof typeof response.sources
                                                ] /
                                                    response.total_clicks) *
                                                100
                                            ).toPrecision(2)}
                                            %
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.countries}>
                        <h1>Countries</h1>
                        <div className={styles.source_list}>
                            <div className={styles.rowsH}>
                                <p className={styles.sourceH}>Country</p>
                                <p className={styles.visitsH}>Visits</p>
                            </div>
                            {Object.keys(response.countries).map(key => (
                                <div className={styles.rows} key={key}>
                                    <p className={styles.source}>{key}</p>
                                    <p className={styles.visits}>
                                        {
                                            response.countries[
                                                key as keyof typeof response.countries
                                            ]
                                        }
                                        <span>
                                            {(
                                                (response.countries[
                                                    key as keyof typeof response.countries
                                                ] /
                                                    response.total_clicks) *
                                                100
                                            ).toPrecision(2)}
                                            %
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Analytics;

type Props2 = {
    title: string;
    sourceCount: number;
    totalCategories: number;
    response: any;
};
const Sources = ({ title,sourceCount,totalCategories,response }: Props2) => {
    return (
        <div className={styles.source_box}>
            <h1>{title}</h1>
            <div className={styles.circle_progress_bar}>
                <CircularProgress
                    value={
                        parseInt(
                            (
                                (sourceCount / totalCategories) *
                                100
                            ).toPrecision(2)
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
            </div>
            <div className={styles.source_list}>
                {Object.keys(
                    response[title.toLowerCase() as keyof typeof response]
                ).map(key => (
                    <p className={styles.source} key={key}>
                        {key}
                    </p>
                ))}
            </div>
        </div>
    );
};
