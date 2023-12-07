import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";
import Day from "../assets/SVGs/Day";
import Night from "../assets/SVGs/Night";
import DayAndNight from "../assets/SVGs/DayAndNight";
import { Chart } from "react-google-charts";
import { useParams } from "react-router-dom";
import { getAnalytics } from "../Services/apis";

export const options = {
    title: "Weekly Analytics",
    curveType: "function",
    legend: { position: "bottom" }
};

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

type Props = {};
const Analytics = (props: Props) => {
    // get id from query of url
    const { id } = useParams<{ id: string }>();
    // console.log(id);

    const [response, setResponse] = useState({
        total_clicks: 0,
        created_on: "",
        browsers: {},
        platforms: {},
        devices: {},
        sources: {},
        countries: {},
        dimensions: {},
        time_based_data: {
            all_time: []
        },
        long_url: "",
        short_url: "",
        title: ""
    } as Response);
    const [visits, setVisits] = useState<number>(response.total_clicks);
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

    // Example: Get last Monday's date
    const lastMonday = getLastDayOfWeek(month);
    // console.log(lastMonday);

    // Filter data for last Monday
    const lastMondayData = response.time_based_data
        ? (response.time_based_data.all_time as Array<[string, number]>).filter(
              entry => (entry[0] as string).startsWith(lastMonday)
          )
        : [];

    // console.log(response.time_based_data.all_time.filter(
    //     entry => (entry[0] as string).startsWith(lastMonday)
    // ));

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
    // console.log(convertedData);

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
    useEffect(() => {
        if (id) {
            // get analytics for the link with id
            getAnalytics(id)
                .then((res: any) => {
                    // console.log(res);
                    setResponse(res);
                    setVisits(res.total_clicks);
                })
                .catch((err: any) => console.log(err));
        }
    }, []);

    useEffect(() => {
        const totalValue = visits; // Set the total value you want to represent
        const bar = document.getElementById("progress-bar");

        if (bar) {
            const perc = visits > 100 ? (visits / totalValue) * 100 : visits; // Calculate the percentage
            const rotateDegree = 45 + perc * 1.8;
            bar.style.transition = "transform 3s ease";
            bar.style.transform = `rotate(${rotateDegree}deg)`;
        }
    }, [visits]);
    const buttonMap = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
        ([date, clicks]) => [
            date.split("/").reverse().join("-"), // Format date as "YY-MM-DD"
            clicks
        ]
    );

    console.log(sortedDateWiseData);

    // console.log(response);
    return (
        <>
            <div className={styles.analytics_header}>
                <div className={styles.link_basics}>
                    <h1>Analytics</h1>
                    <p>{response.title}</p>
                    <p className={styles.date}>
                        Created on{" "}
                        {new Date(response.created_on).toLocaleDateString(
                            "en-US",
                            {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }
                        )}
                    </p>

                    <select name="" id="">
                        <option value="">All Time</option>
                        <option value="">Yesterday</option>
                        <option value="">This week</option>
                        <option value="">This Month</option>
                        <option value="">This Year</option>
                    </select>
                </div>
                <div className={styles.link_copy}>
                    <a
                        href={`https://mulearn.r/${response.short_url}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        https://mulearn.r/{response.short_url}
                    </a>
                    <a
                        href={response.long_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {response.long_url}
                    </a>
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
                                {response.time_based_data &&
                                    response.time_based_data.all_time &&
                                    (() => {
                                        const dateWiseData =
                                            response.time_based_data.all_time.reduce(
                                                (
                                                    result,
                                                    [dateTime, clicks]
                                                ) => {
                                                    const date = new Date(
                                                        dateTime
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "2-digit",
                                                            month: "2-digit",
                                                            day: "2-digit"
                                                        }
                                                    );

                                                    if (result.has(date)) {
                                                        result.set(
                                                            date,
                                                            result.get(date) +
                                                                clicks
                                                        );
                                                    } else {
                                                        result.set(
                                                            date,
                                                            clicks
                                                        );
                                                    }

                                                    return result;
                                                },
                                                new Map()
                                            );

                                        const sortedDateWiseData = Array.from(
                                            dateWiseData
                                        ).map(([date, clicks]) => [
                                            date.split("/").reverse().join("-"), // Format date as "YY-MM-DD"
                                            clicks
                                        ]);

                                        return sortedDateWiseData.map(
                                            ([date, clicks], i) => (
                                                <i
                                                    key={i}
                                                    style={{
                                                        height: `${
                                                            (clicks /
                                                                response.total_clicks) *
                                                            100
                                                        }%`,
                                                        minHeight: "10%",
                                                        background: `rgb(108 123 255 / ${
                                                            clicks * 10
                                                        }%)`
                                                    }}
                                                    className={styles.bar}
                                                ></i>
                                            )
                                        );
                                    })()}
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
                            {response.sources &&
                                Object.keys(response.sources).map(key => {
                                    return (
                                        <div className={styles.rows} key={key}>
                                            <p className={styles.source}>
                                                {/* {key != null
                                                    ? new URL(key).hostname
                                                          .split(".")
                                                          .slice(-2)
                                                          .join(".")
                                                    : "Unknown"} */}
                                                {key}
                                            </p>
                                            <p className={styles.visits}>
                                                {response.sources &&
                                                    response.sources[
                                                        key as keyof typeof response.sources
                                                    ]}
                                                <span>
                                                    {(
                                                        (response.sources[
                                                            key as keyof typeof response.sources
                                                        ] /
                                                            response.total_clicks) *
                                                        100
                                                    ).toPrecision(3)}
                                                    %
                                                </span>
                                            </p>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className={styles.countries}>
                        <h1>Countries</h1>
                        <div className={styles.source_list}>
                            <div className={styles.rowsH}>
                                <p className={styles.sourceH}>Country</p>
                                <p className={styles.visitsH}>Visits</p>
                            </div>
                            {response.countries &&
                                Object.keys(response.countries).map(key => (
                                    <div className={styles.rows} key={key}>
                                        <p className={styles.source}>{key}</p>
                                        <p className={styles.visits}>
                                            {response.countries &&
                                                response.countries[
                                                    key as keyof typeof response.countries
                                                ]}
                                            <span>
                                                {(
                                                    (response.countries[
                                                        key as keyof typeof response.countries
                                                    ] /
                                                        response.total_clicks) *
                                                    100
                                                ).toPrecision(3)}
                                                %
                                            </span>
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>

                <div className={styles.screen_size}>
                    <div className={styles.sources}>
                        <h1>Screens</h1>
                        <div className={styles.source_list}>
                            <div className={styles.rowsH}>
                                <p className={styles.sourceH}>Dimensions</p>
                                <p className={styles.visitsH}>Visits</p>
                            </div>
                            {response.dimensions &&
                                Object.keys(response.dimensions).map(key => (
                                    <div className={styles.rows} key={key}>
                                        <p className={styles.source}>{key}</p>
                                        <p className={styles.visits}>
                                            {
                                                response.dimensions[
                                                    key as keyof typeof response.dimensions
                                                ]
                                            }
                                            <span>
                                                {(
                                                    (response.dimensions[
                                                        key as keyof typeof response.dimensions
                                                    ] /
                                                        response.total_clicks) *
                                                    100
                                                ).toPrecision(3)}
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
const Sources = ({ title, sourceCount, totalCategories, response }: Props2) => {
    return (
        <div className={styles.source_box}>
            <h1>{title}</h1>
            <div className={styles.circle_progress_bar}>
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
            </div>
            <div className={styles.source_list}>
                {response[title.toLowerCase() as keyof typeof response] &&
                    Object.keys(
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
