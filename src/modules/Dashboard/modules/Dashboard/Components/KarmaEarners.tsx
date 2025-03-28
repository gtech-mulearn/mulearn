import React from "react";
import styles from "./KarmaEarners.module.css";
import { FaFire } from "react-icons/fa";
import profileImage from "../../../assets/images/dpm.webp";
import { useNavigate } from "react-router-dom";

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

  const navigate = useNavigate();
  
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>Karma Earners</h3>
      <div className={styles.earnersList}>
        <div className={`${styles.earnerItem} ${styles.studentCard}`} onClick={() => {
          navigate(`/profile/${highestStudent.muid}`);
        }}>
          <div className={styles.earnerParts}>
            <div className={styles.earnerPartConnector}>
              <div className={styles.earnerTitle}>Highest Karma Earner (Student)</div>
              <div className={styles.earnerDetails}>
                <p className={styles.earnerName}>{highestStudent.user}</p>
                <p className={styles.earnerName}>{highestStudent.muid}</p>
                <span className={styles.currentKarma}>Karma :{highestStudent.karma}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.earnerItem} ${styles.collegeCard}`}>
          <div className={styles.earnerTitle}>Highest Karma Earner (College/Organisation)</div>
          <div className={styles.earnerDetails}>
            <span className={styles.earnerName}>{highestCollege.user}</span>
            <span className={styles.currentKarma}>Karma: {highestCollege.karma}</span>
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
