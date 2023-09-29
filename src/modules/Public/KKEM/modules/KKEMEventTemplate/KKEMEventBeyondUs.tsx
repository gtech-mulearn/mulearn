import React from "react";
import styles from "./KKEMEventTemplate.module.css";
import titleFrame from "../../assets/titleFrame.svg";
import mU from "../../assets/mU_pl.svg"
import Card from "../../components/Card"
import Footer from "../../components/Footer";
import learningfest from "../../assets/learningfest.svg"
import d1 from "../../assets/past_events/beyondus/d1.jpg"
import d2 from "../../assets/past_events/beyondus/d2.jpg"
import d3 from "../../assets/past_events/beyondus/d3.jpg"
import s1 from "../../assets/past_events/beyondus/s1.jpg"
import s2 from "../../assets/past_events/beyondus/s2.jpg"
import s3 from "../../assets/past_events/beyondus/s3.jpg"

import banner from "../../assets/past_events/beyondus/Beyond Us Banner.svg"
import beyondus from "../../assets/past_events/beyondus/beyondus.png"


const KKEMEventBeyondUs = () => {
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
          src={banner}
          alt="title frame"
          className={styles.title}
        />
        <img src={mU} alt="mU" className={styles.mU} />
      </div>

      <div className={styles.aboutSection}>
        <div className={styles.aboutTexts}>
          <p className={styles.aboutTextsHeading}>Beyond Us</p>
          <p className={styles.aboutTextstDescription}>
            A hackathon like never before in association iwht Kerala Knowledge Economy Mission as a part of Kerala Skill Express wherein your skills of technical knowledge and problem solving will be put to the test.
          </p>
          <p className={styles.aboutTextDate}>
            08 August 2023 - 09 August 2023
          </p>
        </div>
        <img
          src={beyondus}
          alt="about section"
          className={styles.aboutSectionImage}
        />
      </div>

      <div className={styles.countsSectionContainer}>
        <div className={styles.counts}>
          <div className={styles.countSection}>
            <p className={styles.countSectionCount}>200+</p>
            <p className={styles.countSectionDescription}>Participants</p>
          </div>
          <div className={styles.countSection}>
            <p className={styles.countSectionCount}>375+</p>
            <p className={styles.countSectionDescription}>Registrations</p>
          </div>
          <div className={styles.countSection}>
            <p className={styles.countSectionCount}>50K</p>
            <p className={styles.countSectionDescription}>Worth Prize</p>
          </div>
        </div>
      </div>

      <div className={styles.winnerDetails}>
        <p className={styles.winnerDetailsHeading}>Winners: Design Domain</p>

        <div className={styles.winnerDetailsListing}>
          <div className={styles.winnerCards}>
            <Card
              name="Team DT12"
              description="Adarsh has managed to create a user interface for an app that helps you schedule your day. The app is designed to be simple and easy to use."
              image={d1}
              link="https://www.figma.com/file/zG7oCsCIlxuvK1uiV5g0TO/Beyond-Us-24-Hour-%7C-Scheduler-App-DT12-(Individual)?type=design&node-id=6-24&mode=design&t=38JirqJdGQl19Szp-0" />
            <Card
              name="Team DT05"
              description="This platform should provide a space for like-minded students to network, work together on projects, share achievements, and foster a sense of community."
              image={d2}
              link="https://www.figma.com/file/zG7oCsCIlxuvK1uiV5g0TO/Beyond-Us-24-Hour-%7C-Scheduler-App-DT12-(Individual)?type=design&node-id=6-24&mode=design&t=38JirqJdGQl19Szp-0" />
            <Card
              name="Team DT08"
              description="Mobile Application: We have designed a mobile application that allows users to easily record attendance. The app will have an intuitive interface with options to input the name of the attendee and their entry time."
              image={d3}
              link="https://www.figma.com/file/gBHFXhyYJNloANQlTbFlN5/Beyond-Us-Hackathon?type=design&node-id=0-1&mode=design&t=InTgCXHZn2TR2WHe-0" />
          </div>
        </div>
      </div>

      <div className={styles.winnerDetails}>
        <p className={styles.winnerDetailsHeading}>Winners: Software Domain</p>

        <div className={styles.winnerDetailsListing}>
          <div className={styles.winnerCards}>
            <Card
              name="Team ST03"
              description="Introducing CV Wizard from Beyond-Us: the game-changing automated CV parsing tool. With the powerful PyRes Parser, CV Wizard extracts and organizes resume data with precision, saving time for employers."
              image={s1}
              link="https://github.com/shihabsaleem/CV-BeyondUs" />
            <Card
              name="Team ST10"
              description="This platform should provide a space for like-minded students to network, work together on projects, share achievements, and foster a sense of community."
              image={s2}
              link="" />
            <Card
              name="Team ST13"
              description="Ekipa is a comprehensive team management and task allocation platform designed to streamline collaboration and enhance productivity within teams."
              image={s3}
              link="https://github.com/suryan-s/Ekipa" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default KKEMEventBeyondUs;
