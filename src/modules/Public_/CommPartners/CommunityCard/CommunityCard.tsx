import React from "react";
import styles from "./CommunityCard.module.css";
import { Link } from "react-router-dom";

interface CommunityCardProps {
  cname: string;
  cimage: string;
  clink: string;
  customlink?: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  cname,
  cimage,
  clink,
  customlink,
}) => {
  return (
    <div className={styles.community_card_container}>
      <div className={styles.community_card}>
        {clink && clink.length > 0 && (
          <a href={clink} target="_blank" rel="noopener noreferrer">
            <div className={styles.box}>
              <img src={cimage} alt="" className={styles.communityimg} />

              {cname && (
                <span className={styles.community_interest}>{cname}</span>
              )}
            </div>
          </a>
        )}
        {customlink && customlink.length > 0 && (
          <Link to={customlink}>
            <div className={styles.box}>
              <img src={cimage} alt="" className={styles.communityimg} />

              {cname && (
                <span className={styles.community_interest}>{cname}</span>
              )}
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CommunityCard;
