import React from "react"
import styles from "./CareersCard.module.css"

const Card = ({
  role,
  remuneration,
  vacancies,
  location,
  lastdate,
  duration,
  logo,
  applylink,
  jdlink,
  extraField,
  extraContent,
  extraButton,
}) => {
  return (
    <div className={styles.card}>
      <img src={logo} alt="Company Logo" className={styles.card_logo} />
      <p className={styles.card_title}>{role}</p>
      <p className={styles.card_info}>
        {remuneration && (
          <>
            <span className={styles.card_label}>Remuneration:</span>
            <span className={styles.card_value}>{remuneration}</span>
          </>
        )}
      </p>
      <p className={styles.card_info}>
        {vacancies && (
          <>
            <span className={styles.card_label}>Vacancies:</span>
            <span className={styles.card_value}>{vacancies}</span>
          </>
        )}
      </p>
      <p className={styles.card_info}>
        {location && (
          <>
            <span className={styles.card_label}>Location:</span>
            <span className={styles.card_value}>{location}</span>
          </>
        )}
      </p>
      <p className={styles.card_info}>
        {lastdate && (
          <>
            <span className={styles.card_label}>Last Date:</span>
            <span className={styles.card_value}>{lastdate}</span>
          </>
        )}
      </p>
      <p className={styles.card_info}>
        {duration && (
          <>
            <span className={styles.card_label}>Duration:</span>
            <span className={styles.card_value}>{duration}</span>
          </>
        )}
      </p>
      <p className={styles.card_info}>
        {extraField && extraContent && (
          <>
            <span className={styles.card_label}>{extraField}</span>
            <span className={styles.card_value}>{extraContent}</span>
          </>
        )}
      </p>
      <div className={styles.card_buttons}>
        {applylink && (
          <a href={applylink} target="_blank" rel="noopener noreferrer">
            <button className={styles.card_button}>Apply</button>
          </a>
        )}
        {jdlink && (
          <a href={jdlink} target="_blank" rel="noopener noreferrer">
            <button className={styles.card_button_outline}>View JD</button>
          </a>
        )}
        {extraButton && (
          <a href={extraButton} target="_blank" rel="noopener noreferrer">
            <button className={styles.card_button_outline}>View Challenge</button>
          </a>
        )}
      </div>
    </div>
  )
}

export default Card
