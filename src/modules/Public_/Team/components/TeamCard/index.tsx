import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook, FaGithub, FaTwitter } from "react-icons/fa";
import styles from "./TeamCard.module.css";
import { FaX } from "react-icons/fa6";

const img = "assets/team/default.webp";

const TeamCard = ({ name, designation, image, linkedIn, github, twitter, muid, leadDesignation }: any) => {
  return (
    <div className={styles.team_card}>
      <div className={styles.team_card__image}>
        <img className={styles.photo} src={image || img} alt={name} loading="lazy" />
      </div>
      <div className={styles.team_card__content}>
        <div>
          <h3 className={styles.team_card__name}>{name}</h3>
          {(leadDesignation || designation) && <p>
            {leadDesignation ? `${leadDesignation} Lead` : designation}</p>}
          {muid && <p className={styles.team_card__muid}>{muid}</p>}
        </div>
        <div className={styles.social_icons}>
          {linkedIn && (
            <a
              href={linkedIn}
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
      </div>
    </div>
  );
};

export default TeamCard;