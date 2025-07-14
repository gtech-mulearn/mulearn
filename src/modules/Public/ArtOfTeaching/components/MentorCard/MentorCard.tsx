import React from "react";
import styles from "./MentorCard.module.css";
import { cdnUrl } from "@/modules/utils/cdn";
import LinkedIn from "../../assets/svg/Linkedin";

interface MentorCardProps {
  name: string;
  designation: string;
  image?: string;
  linkedIn?: string;
  interest?: string;
  source?: string;
  clink?: string;
}

const MentorCard = ({
  name,
  designation,
  image,
  linkedIn,
  interest,
  source,
  clink,
}: MentorCardProps) => {
  return (
    <div className={styles.mentor_card_container}>
      <div className={styles.mentor_card}>
        <div className={styles.box}>
          {image && (
            <img
              src={image}
              loading="lazy"
              alt={name}
              className={styles.mentorimg}
              onError={(e) => {
                (e.target as HTMLImageElement).src = cdnUrl("public/assets/dpm.webp");
              }}
            />
          )}
          <div className={styles.textdiv}>
            {interest && <p className={styles.mentor_interest}>{interest}</p>}

            {linkedIn && linkedIn !== "" && (
              <a href={linkedIn} target="_blank" rel="noopener noreferrer">
                <div className={styles.linkedinimg}>
                  <LinkedIn />
                </div>
              </a>
            )}
          </div>
        </div>

        <p className={styles.mentor_name}>{name}</p>
        <p className={styles.mentor_designation}>{designation}</p>
        <p className={styles.mentor_source}>{source}</p>

        {clink && (
          <a href={clink} target="_blank" rel="noopener noreferrer">
            <button className={styles.comingsoon}>Checkout Course</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default MentorCard;
