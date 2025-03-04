import React from "react";
import styles from "./KarmaEarners.module.css";
import { FaFire } from "react-icons/fa";

type KarmaEarnersProps = {
  highestStudent: {
    user: string;
    karma: number;
    muid?: string;
  };
  highestCollege: {
    user: string;
    karma: number;
  };
};

const KarmaEarners: React.FC<KarmaEarnersProps> = ({
  highestStudent,
  highestCollege,
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Karma Earners</h3>
      <div className={styles.earnersList}>
        <div className={`${styles.earnerItem} ${styles.studentCard}`}>
          <div className={styles.earnerTitle}>Highest Karma Earner (Student)</div>
          <div className={styles.earnerDetails}>
            <span className={styles.earnerName}>AwinDas R</span>
            <span className={styles.earnerName}>awindasr@mulearn</span>

            <span className={styles.currentKarma}>{highestStudent.karma}</span>
           
          </div>
        </div>
        <div className={`${styles.earnerItem} ${styles.collegeCard}`}>
          <div className={styles.earnerTitle}>Highest Karma Earner (College)</div>
          <div className={styles.earnerDetails}>
            <span className={styles.earnerName}>{highestCollege.user}</span>
            <span className={styles.currentKarma}>{highestCollege.karma}</span>
            {/* <span className={styles.earnedYesterday}>
              +{highestCollege.earnedYesterday} yesterday
            </span> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KarmaEarners;
