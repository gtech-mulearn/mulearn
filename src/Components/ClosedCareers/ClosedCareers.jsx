import React from "react";
import styles from "./ClosedCareers.module.css";

const ClosedCareersCard = ({
  date,
  title,
  location,
  qualifications,
  role,
  duration,
  remuneration,
  poster,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.details}>
        {title && <p className={styles.hiring_title}>{title}</p>}

        <ul>
          {qualifications && (
            <li>
              <strong>Qualifications:</strong> {qualifications}
            </li>
          )}
          {date && (
            <li>
              <strong>Dated:</strong> {date}
            </li>
          )}
          {remuneration && (
            <li>
              <strong>Package:</strong> {remuneration}
            </li>
          )}
          {role && (
            <li>
              <strong>Roles:</strong> {role}
            </li>
          )}
          {duration && (
            <li>
              <strong>Duration:</strong> {duration}
            </li>
          )}
          {location && (
            <li>
              <strong>Location:</strong> {location}
            </li>
          )}
          {/* {poster && (
            <a href={poster} target="_blank" rel="noopener noreferrer">
              <button className={styles.apply}>View More</button>
            </a>
          )} */}
        </ul>
      </div>
    </div>
  );
};

export default ClosedCareersCard;
