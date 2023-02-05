import React from "react";
import styles from "./CareersCard.module.css";

const CareersCard = ({
  title,
  about,
  payment,
  vacancy,
  location,
  criteria,
  duration,
  lastdate,
  jdlink,
  applylink,
}) => {
  return (
    <div className={styles.opportunity}>
      <div className={styles.op_logo}>
        {/* <img
          src="/assets/careers/softnotion.png"
          alt=""
          className={styles.company_logo}
        /> */}
      </div>
      <div className={styles.op_texts}>
        <p className={styles.op_header}>{title}</p>
        <div className={styles.card_contents}>
          {/* <p className={styles.op_text}>{about}</p> */}
          {payment && (
            <p className={styles.op_text}>
              <span>Remuneration: </span>
              {payment}
            </p>
          )}

          {criteria && (
            <p className={styles.op_text}>
              <span>Responsiblities: </span>
              {criteria}
            </p>
          )}

          {vacancy && (
            <p className={styles.op_text}>
              <span>No. of Vacancy: </span>
              {vacancy}
            </p>
          )}

          <p className={styles.op_text}>
            <span>Location: </span>
            {location}
          </p>
          <p className={styles.op_text}>
            <span>Last Date To Apply: </span>
            {lastdate}
          </p>
          {duration && (
            <p className={styles.op_text}>
              <span>Duration </span>
              {duration}
            </p>
          )}
        </div>
        <div className={styles.op_buttons}>
          {/* {jdlink && <a href={jdlink} target="_blank" rel="noopener noreferrer">
            <button className={styles.op_jobdescription}>View More</button>
          </a>} */}
          {applylink && (
            <a href={applylink} target="_blank" rel="noopener noreferrer">
              <button className={styles.op_jobdescription}>Apply Now</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default CareersCard;
