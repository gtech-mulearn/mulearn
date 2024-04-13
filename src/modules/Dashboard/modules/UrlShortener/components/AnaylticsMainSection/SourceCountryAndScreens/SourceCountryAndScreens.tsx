import React from "react";
import styles from "./SourceCountryAndScreens.module.css";

type Props = {
    response: {
        sources: {
            [key: string]: number;
        };
        countries: {
            [key: string]: number;
        };
        total_clicks: number;
    };
};

const SourceCountryAndScreens = ({ response }: Props) => {
    return (
        <>
            <div className={styles.sources_countries}>
                <Box response={response} title={"Sources"} />
                <Box response={response} title={"Countries"} />
            </div>
            <div className={styles.sources_countries}>
                <Box response={response} title={"City"} />
                <Box response={response} title={"Region"} />
            </div>
            <div
                className={styles.sources_countries}
                style={{ justifyContent: "center" }}
            >
                <Box response={response} title={"IP_Address"} />
            </div>
        </>
    );
};

export default SourceCountryAndScreens;
type Props2 = {
    response: any;
    title: string;
};
const Box = ({ response, title }: Props2) => {
    const data = response[title.toLowerCase()];
    return (
        <div className={styles.sources}>
            <h1>{title}</h1>
            <div className={styles.source_list}>
                <div className={styles.rowsH}>
                    <p className={styles.sourceH}>{title}</p>
                    <p className={styles.visitsH}>Visits</p>
                </div>
                {data &&
                    Object.keys(data).map((key: string) => {
                        const hostname =
                            key.split("/")[2] &&
                            key
                                .split("/")[2]
                                .toString()
                                .split(".")
                                .slice(-2)
                                .join(".")
                                .split(".")[0];
                        return (
                            <div className={styles.rows} key={key as string}>
                                <p className={styles.source}>
                                    {title === "Sources"
                                        ? hostname == null
                                            ? "Direct"
                                            : hostname
                                        : key}
                                </p>
                                <p className={styles.visits}>
                                    {data[key as keyof typeof data]}
                                    <span>
                                        {(
                                            (data[key as keyof typeof data] /
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
    );
};
