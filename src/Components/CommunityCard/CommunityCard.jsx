import React from "react";
import styles from "./CommunityCard.module.css";

const CommunityCard = ({ cname, cimage, clink, interest }) => {
  return (
    <div className={styles.community_card_container}>
      <div className={styles.community_card}>
        <a href={clink} target="_blank" rel="noopener noreferrer">
          <div className={styles.box}>
            <img src={cimage} alt="" className={styles.communityimg} />

            {cname && (
              <span className={styles.community_interest}>{cname}</span>
            )}
          </div>
        </a>
      </div>
    </div>
  );
};

export default CommunityCard;
