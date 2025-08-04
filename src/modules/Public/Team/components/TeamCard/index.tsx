import { useState } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import styles from "./TeamCard.module.css";
import { cdnUrl } from "@/modules/utils/cdn";

// Fallback image
const fallbackImage = cdnUrl("public/assets/team/default.webp");

interface TeamCardProps {
  name: string;
  designation?: string;
  image?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  muid?: string;
  lead?: string;
  team?: string;
}

const TeamCard = ({
  name,
  designation,
  image,
  linkedin,
  github,
  twitter,
  muid,
  lead,
  team,
}: TeamCardProps) => {
  const [showAllRoles, setShowAllRoles] = useState(false);

  const teamRoles: string[] = team
    ? team.split(",").map((role) => role.trim()).filter((role) => role !== "")
    : [];

  const displayedRoles = showAllRoles ? teamRoles : teamRoles.slice(0, 1);
  const hiddenCount = teamRoles.length - 2;

  let finalImage: string;
  if (image) {
    finalImage = cdnUrl(image);
  } else {
    finalImage = fallbackImage;
  }

  return (
    <div className={styles.team_card}>
      <div className={styles.team_card__image}>
        <img
          className={styles.photo}
          src={finalImage}
          alt={name}
          loading="lazy"
        />
      </div>

      <div className={styles.team_card__content}>
        <div>
          {name && <h3 className={styles.team_card__name}>{name}</h3>}
          {(lead || designation) && (
            <p>{lead ? `${lead} Lead` : designation}</p>
          )}
          {muid && <p className={styles.team_card__muid}>{muid}</p>}

          {teamRoles.length > 0 && (
  <ul
    className={`${styles.team_card__roles} ${
      showAllRoles ? styles.expanded : ""
    }`}
  >
    {displayedRoles.map((role, index) => (
      <li key={index}>{role}</li>
    ))}
    {!showAllRoles && hiddenCount > 0 && (
      <li
        className={styles.more_button}
        onClick={(e) => {
          e.stopPropagation();
          setShowAllRoles(true);
        }}
      >
        +{hiddenCount} more
      </li>
    )}
  </ul>
)}

        </div>

        {(linkedin || github || twitter) && (
          <div className={styles.social_icons}>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className={styles.team_card__icon}
              >
                <FaLinkedin size={24} />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className={styles.team_card__icon}
              >
                <FaGithub size={24} />
              </a>
            )}
            {twitter && (
              <a
                href={twitter}
                target="_blank"
                rel="noreferrer"
                className={styles.team_card__icon}
              >
                <FaTwitter size={24} />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamCard;
