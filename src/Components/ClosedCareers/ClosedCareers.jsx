import React from "react";
import styles from "./ClosedCareers.module.css";

const CareersCard = ({
    title,
    duration,
    payment,
    criteria,
    lastdate,
    jdlink,
}) => {
    return (
        <div className={styles.opportunity}>
            <div className={styles.op_logo}>
                <img
                    src="/assets/careers/softnotion.png"
                    alt=""
                    className={styles.company_logo}
                />
            </div>
            <div className={styles.op_texts}>
                <p className={styles.op_header}>{title}</p>
                <div className={styles.card_contents}>
                    <p className={styles.op_text}>
                        <span>Duration: </span>
                        {duration}
                    </p>
                    <p className={styles.op_text}>
                        <span>Package: </span>
                        {payment}
                    </p>
                    <p className={styles.op_text}>
                        <span>Criteria: </span>
                        {criteria}
                    </p>
                    <p className={styles.op_text}>
                        <span>Last Date To Apply: </span>
                        {lastdate}
                    </p>
                </div>
                <div className={styles.op_buttons}>
                    <a href={jdlink} target="_blank" rel="noopener noreferrer">
                        <button className={styles.op_jobdescription}>View More</button>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default CareersCard;
