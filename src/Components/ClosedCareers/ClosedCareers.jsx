import React from "react";
import styles from "./ClosedCareers.module.css";

const CareersCard = ({
  title,
  duration,
  payment,
  criteria,
  date,
  jdlink,
  roles,
}) => {
  return (
    <div className={styles.opportunity}>
      <div className={styles.op_logo}>
        <p className={styles.op_header}>{title}</p>
      </div>
      <div className={styles.op_texts}>
        <div className={styles.card_contents}>
          {duration && (
            <p className={styles.op_text}>
              <span>Duration: </span>
              {duration}
            </p>
          )}
          {payment && (
            <p className={styles.op_text}>
              <span>Package: </span>
              {payment}
            </p>
          )}
          {criteria && (
            <p className={styles.op_text}>
              <span>Criteria: </span>
              {criteria}
            </p>
          )}
          {date && (
            <p className={styles.op_text}>
              <span>Dated: </span>
              {date}
            </p>
          )}
          {roles && (
            <p className={styles.op_text}>
              <span>Roles: </span>
              <ul>
                {roles.map((role) => (
                  <li>{role}</li>
                ))}
              </ul>
            </p>
          )}
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
