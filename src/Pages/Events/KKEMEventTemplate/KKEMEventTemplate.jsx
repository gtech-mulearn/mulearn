import React from "react";
import styles from "./KKEMEventTemplate.module.css";

const KKEMEventTemplate = () => {
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <a target="_blank" rel="noreferrer" href="https://mulearn.org">
            About µLearn
          </a>
          <a
            target="_blank"
            rel="noreferrer"
            href="https://knowledgemission.kerala.gov.in/"
          >
            About K-KEM
          </a>
          <a href="/kkem#events">Our Programs</a>
        </div>
      </nav>
      <div style={{ position: "relative", height: "100%" }}>
        <img
          src="/assets/events/kkem/titleFrame.svg"
          alt="title frame"
          className={styles.title}
        />
        <img src="/assets/events/kkem/mU.svg" alt="mU" className={styles.mU} />
      </div>

      <div className={styles.aboutSection}>
        <div className={styles.aboutTexts}>
          <p className={styles.aboutTextsHeading}>Learning Fest</p>
          <p className={styles.aboutTextstDescription}>
            µLearn in association with KKEM brings you Learning Fest a series of
            bootcamps to improve your skills in various domains and the chance
            to earn Karma points and various other opportunities.
          </p>
          <p className={styles.aboutTextDate}>
            01 October 2023 - 01 November 2023
          </p>
          <button className={styles.aboutTextButton}>Explore More</button>
        </div>
        <img
          src="/assets/events/kkem/aboutImage.svg"
          alt="about section"
          className={styles.aboutSectionImage}
        />
      </div>

      <div className={styles.countsSectionContainer}>
        <div className={styles.countSection}>
          <p className={styles.countSectionCount}>1000+</p>
          <p className={styles.countSectionDescription}>Participants</p>
        </div>
        <div className={styles.countSection}>
          <p className={styles.countSectionCount}>1000+</p>
          <p className={styles.countSectionDescription}>Participants</p>
        </div>
        <div className={styles.countSection}>
          <p className={styles.countSectionCount}>1000+</p>
          <p className={styles.countSectionDescription}>Participants</p>
        </div>
      </div>

      <div className={styles.winnerDetails}>
        <p className={styles.winnerDetailsHeading}>Winners Leaderboard</p>
      </div>
    </>
  );
};

export default KKEMEventTemplate;
