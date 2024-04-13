import React, { useEffect } from "react";
import styles from "./ClicksAndVisits.module.css";
import ClicksGraph from "./ClicksGraph";

type Props = {
    response: any;
    timePeriod: any;
};

const ClicksAndVisits = ({ response, timePeriod }: Props) => {
    const visits = response.total_clicks;
    useEffect(() => {
        const totalValue = visits;
        const bar = document.getElementById("progress-bar");

        if (bar) {
            const perc =
                totalValue > 100 ? (totalValue / totalValue) * 100 : totalValue; // Calculate the percentage
            const rotateDegree = 45 + perc * 1.8;
            bar.style.transition = "transform 3s ease";
            bar.style.transform = `rotate(${rotateDegree}deg)`;
        }
    }, [visits]);
    return (
        <div className={styles.clicks_visits}>
            <div className={styles.clicks}>
                <h1>
                    Total clicks
                    <span>
                        {response.total_clicks > 1000
                            ? `${(response.total_clicks / 1000).toPrecision(
                                  3
                              )}k`
                            : response.total_clicks}{" "}
                    </span>
                </h1>
                <p>{response.total_clicks}</p>
                <ClicksGraph response={response} timePeriod={timePeriod} />
            </div>
            <div className={styles.visits}>
                <div className={styles.progress}>
                    <div className={styles.barOverflow}>
                        <div id="progress-bar" className={styles.bar}></div>
                    </div>
                    <p>{visits}</p>
                    <p>Visits</p>
                </div>
            </div>
        </div>
    );
};

export default ClicksAndVisits;
