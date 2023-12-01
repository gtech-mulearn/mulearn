import React, { useEffect, useState } from "react";
import styles from "./Analytics.module.css";

type Props = {};
const Analytics = (props: Props) => {
    const [visits, setVisits] = useState<number>(90);
  
    useEffect(() => {
      const bar = document.getElementById("progress-bar");
      if (bar) {
        const perc = visits;
        const rotateDegree = 45 + perc * 1.8;
        bar.style.transition = "transform 3s ease";
        bar.style.transform = `rotate(${rotateDegree}deg)`;
      }
    }, [visits]);
  
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
                        <p>204</p>
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
            </div>
        </>
    );
};

export default Analytics;
