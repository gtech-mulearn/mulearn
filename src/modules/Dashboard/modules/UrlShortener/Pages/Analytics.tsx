import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";
import { useParams } from "react-router-dom";
import { getAnalytics } from "../Services/apis";
import AnalyticsHeader from "../components/AnalyticsHeader/AnalyticsHeader";
import ClicksAndVisits from "../components/AnaylticsMainSection/ClicksGraphAndVists/ClicksAndVisits";
import SourcesAndWeeks from "../components/AnaylticsMainSection/SourcesAndWeekGraph/SourcesAndWeeks";
import SourceCountryAndScreens from "../components/AnaylticsMainSection/SourceCountryAndScreens/SourceCountryAndScreens";

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

const Analytics = () => {
    const [timePeriod, setTimePeriod] = useState("all_time");
    const { id } = useParams<{ id: string }>();
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
    useEffect(() => {
        if (id) {
            getAnalytics(id)
                .then((res: any) => {
                    setResponse(res);
                })
                .catch((err: any) => console.log(err));
        }
    }, [id]);
    return (
        <>
            <AnalyticsHeader
                response={response}
                setTimePeriod={setTimePeriod}
            />
            <div className={styles.main_section_analytics}>
                <ClicksAndVisits response={response} timePeriod={timePeriod} />
                <SourcesAndWeeks response={response} />
                <SourceCountryAndScreens response={response} />
            </div>
        </>
    );
};

export default Analytics;
