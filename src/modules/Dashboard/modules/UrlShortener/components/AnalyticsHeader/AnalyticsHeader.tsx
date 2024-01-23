import React from "react";
import styles from "./AnalyticsHeader.module.css";
import Select from "react-select";
import makeAnimated from "react-select/animated";

type Props = {
    response: any;
    setTimePeriod: any;
};

const AnalyticsHeader = ({ response, setTimePeriod }: Props) => {
    const animatedComponents = makeAnimated();
    return (
        <div className={styles.analytics_header}>
            <div className={styles.link_basics}>
                <h1>Analytics</h1>
                <p>{response.title}</p>
                <p className={styles.date}>
                    Created on{" "}
                    {new Date(response.created_on).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                    })}
                </p>
                <Select
                    name="communities"
                    placeholder="All Time"
                    onChange={(data: any) => {
                        if (data) {
                            // Use a type assertion to specify the correct type
                            const id = (data as any).value;
                            setTimePeriod(id);
                        }
                    }}
                    defaultValue={{ value: "all_time", label: "All Time" }}
                    components={animatedComponents}
                    options={[
                        { value: "all_time", label: "All Time" },
                        { value: "today", label: "Today" },
                        { value: "yesterday", label: "Yesterday" },
                        { value: "this_week", label: "This Week" },
                        { value: "this_month", label: "This Month" },
                        { value: "this_year", label: "This Year" }
                    ]}
                    styles={{
                        control: (base, state) => ({
                            ...base,
                            background: "#fff",
                            margin: "20px auto",
                            borderRadius: "10px",
                            maxWidth: "250px",
                            border: "1px solid #456FF6"
                        }),
                        menu: (base, state) => ({
                            ...base,
                            padding: "10px",
                            maxWidth: "250px",
                            borderRadius: "10px"
                        }),
                        option: (base, state) => ({
                            ...base,
                            borderRadius: "5px",
                            background: state.isFocused
                                ? "#6c7bffdd"
                                : "transparent",
                            color: state.isFocused ? "#fff" : "#333333"
                        })
                    }}
                />
            </div>
            <div className={styles.link_copy}>
                <div>
                    <span>Short</span>
                    <a
                        href={`https://mulearn.org/r/${response.short_url}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {" "}
                        https://mulearn.org/r/{response.short_url}
                    </a>
                </div>
                <div>
                    <span>Long</span>
                    <a
                        href={response.long_url}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {" "}
                        {response.long_url}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsHeader;
