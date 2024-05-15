import React from "react";
import styles from "./ProfileHeader.module.css";
import Karma from "../../assets/svg/Karma";
import Rank from "../../assets/svg/Rank";
import AvgKarma from "../../assets/svg/AvgKarma";
import Github from "../../assets/svg/Github";
import LinkedIn from "../../assets/svg/LinkedIn";
import Twitter from "../../assets/svg/Twitter";
import Instagram from "../../assets/svg/Instagram";
import Behance from "../../assets/svg/Behance";
import Facebook from "../../assets/svg/Facebook";
import Dribble from "../../assets/svg/Dribble";
import StackOverflow from "../../assets/svg/StackOverflow";
import Medium from "../../assets/svg/Medium";
interface ProfileHeaderProps {
  userProfile: {
    first_name: string;
    last_name: string;
    college_code: string;
    muid: string;
    level: string;
    profile_pic: string;
    karma: string;
    rank: string;
  };
  socials: { key: string; value: string }[];
  monthDifference: number;
}
const socialMediaUrlMappings: { [key: string]: string } = {
  github: "https://github.com/",
  facebook: "https://www.facebook.com/",
  instagram: "https://www.instagram.com/",
  linkedin: "https://www.linkedin.com/in/",
  dribble: "https://dribbble.com/",
  behance: "https://www.behance.net/",
  stackoverflow: "https://stackoverflow.com/users/",
  medium: "https://medium.com/@",
};

const socialMediaSvgComponents: { [key: string]: JSX.Element | null } = {
  github: <Github />,
  linkedin: <LinkedIn />,
  twitter: <Twitter />,
  instagram: <Instagram />,
  behance: <Behance />,
  facebook: <Facebook />,
  dribble: <Dribble />,
  stackoverflow: <StackOverflow />,
  medium: <Medium />,
};

const ProfileHeader = ({
  userProfile,
  socials,
  monthDifference,
}: ProfileHeaderProps) => {
  return (
    <div className={styles.basic_details}>
      <div className={styles.profile_details_container}>
        <img
          className={styles.profile_pic}
          src={userProfile.profile_pic}
          alt={userProfile.first_name}
        />
        <div className={styles.profile_details}>
          <h1>
            {userProfile.first_name} {userProfile.last_name}{" "}
            {userProfile.college_code ? `(${userProfile.college_code})` : null}
          </h1>
          <p
            onClick={() => {
              navigator.clipboard.writeText(`${userProfile.muid}`);
            }}
          >
            {userProfile.muid}
          </p>
          <div className={styles.socials}>
            {Object.entries(socials).map(([key, value]) => {
              return (
                <a
                  href={socialMediaUrlMappings[key] + value}
                  target="_blank"
                  rel="noreferrer"
                  key={key}
                >
                  {socialMediaSvgComponents[key]}
                </a>
              );
            })}
          </div>
        </div>
        <div className={styles.Levels}>
          <p>Level</p>
          <p>{userProfile.level ? userProfile?.level?.slice(3, 4) : 1}</p>
        </div>
      </div>

      <div className={styles.basic_details_detail}>
        <div className={styles.status_container}>
          <div className={styles.status + " " + styles.Levels}>
            <div className={styles.status_box}>
              <p>Level</p>
              <p style={{ color: "#B7C7FC" }}>
                {userProfile.level ? userProfile?.level?.slice(3, 4) : 1}
              </p>
            </div>
          </div>
          <div className={styles.status}>
            <Karma />
            <div className={styles.status_box}>
              <p>Karma</p>
              <p>
                {parseInt(userProfile.karma) > 1000
                  ? (parseInt(userProfile.karma) / 1000).toPrecision(3) + "K"
                  : userProfile.karma}
              </p>
            </div>
          </div>
          <div className={styles.status}>
            <Rank />
            <div className={styles.status_box}>
              <p>Rank</p>
              <p>{userProfile.rank}</p>
            </div>
          </div>
          <div className={styles.status}>
            <AvgKarma />
            <div className={styles.status_box}>
              <p>Avg.Karma</p>
              <p>
                {parseInt(userProfile.karma) / monthDifference > 1000 &&
                monthDifference !== 0
                  ? (
                      parseInt(userProfile.karma) /
                      monthDifference /
                      1000
                    ).toPrecision(4) + "K"
                  : isNaN(parseInt(userProfile.karma) / monthDifference)
                  ? "0"
                  : monthDifference === 0
                  ? "0"
                  : (parseInt(userProfile.karma) / monthDifference).toPrecision(
                      3
                    )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;

