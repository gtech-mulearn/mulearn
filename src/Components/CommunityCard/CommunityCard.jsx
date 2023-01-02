import React from "react";
import styles from "./CommunityCard.module.css";

import { Link } from "react-router-dom";

const CommunityCard = ({ cname, cimage, clink, customlink, type }) => {
  return (
    <div className={styles.community_card_container}>
      <div className={styles.community_card}>
        {type ||
          (clink && clink.length > 0 && (
            <a href={clink} target="_blank" rel="noopener noreferrer">
              <div className={styles.box}>
                <img src={cimage} alt="" className={styles.communityimg} />

                {cname && (
                  <span className={styles.community_interest}>{cname}</span>
                )}
              </div>
            </a>
          ))}
        {customlink && customlink.length > 0 && (
          <>
            <Link to={customlink}>
              <div className={styles.box}>
                <img src={cimage} alt="" className={styles.communityimg} />

                {cname && (
                  <span className={styles.community_interest}>{cname}</span>
                )}
              </div>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
