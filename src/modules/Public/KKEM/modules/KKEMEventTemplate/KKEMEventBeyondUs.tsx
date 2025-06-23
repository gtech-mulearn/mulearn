import React from "react";
import styles from "./KKEMEventTemplate.module.css";
import Card from "../../components/Card";
import Footer from "../../components/Footer";
import { cdnUrl } from "@/modules/utils/cdn";

const KKEMEventBeyondUs = () => {
    return (
        <>
            <nav className={styles.navbar}>
                <div className={styles.container}>
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href="https://mulearn.org"
                    >
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
                <img src={cdnUrl("src/modules/Public/KKEM/assets/past_events/beyondus/Beyond Us Banner.svg")} alt="Beyond Us Banner" className={styles.title} />
                <img src={cdnUrl("src/modules/Public/KKEM/assets/mU_pl.svg")} alt="µLearn Logo" className={styles.mU} />
            </div>

            <div className={styles.aboutSection}>
                <div className={styles.aboutTexts}>
                    <p className={styles.aboutTextsHeading}>Beyond Us</p>
                    <p className={styles.aboutTextstDescription}>
                        A hackathon like never before in association iwht Kerala
                        Knowledge Economy Mission as a part of Kerala Skill
                        Express wherein your skills of technical knowledge and
                        problem solving will be put to the test.
                    </p>
                    <p className={styles.aboutTextDate}>
                        08 August 2023 - 09 August 2023
                    </p>
                </div>
                <img
                    src={cdnUrl("src/modules/Public/KKEM/assets/past_events/beyondus/beyondus.png")}
                    alt="Beyond Us Event"
                    className={styles.aboutSectionImage}
                />
            </div>

            <div className={styles.countsSectionContainer}>
                <div className={styles.counts}>
                    <div className={styles.countSection}>
                        <p className={styles.countSectionCount}>200+</p>
                        <p className={styles.countSectionDescription}>
                            Participants
                        </p>
                    </div>
                    <div className={styles.countSection}>
                        <p className={styles.countSectionCount}>375+</p>
                        <p className={styles.countSectionDescription}>
                            Registrations
                        </p>
                    </div>
                    <div className={styles.countSection}>
                        <p className={styles.countSectionCount}>50K</p>
                        <p className={styles.countSectionDescription}>
                            Worth Prize
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.winnerDetails}>
                <p className={styles.winnerDetailsHeading}>
                    Winners: Design Domain
                </p>

                <div className={styles.winnerDetailsListing}>
                    <div className={styles.winnerCards}>
                        <Card
                            name="Team DT12"
                            description="Adarsh has managed to create a user interface for an app that helps you schedule your day. The app is designed to be simple and easy to use."
                            image={cdnUrl("src/modules/Public/KKEM/assets/past_events/beyondus/d1.jpg")}
                            link="https://www.figma.com/file/zG7oCsCIlxuvK1uiV5g0TO/Beyond-Us-24-Hour-%7C-Scheduler-App-DT12-(Individual)?type=design&node-id=6-24&mode=design&t=38JirqJdGQl19Szp-0"
                        />
                        <Card
                            name="Team DT05"
                            description="This platform should provide a space for like-minded students to network, work together on projects, share achievements, and foster a sense of community."
                            image={cdnUrl("src/modules/Public/KKEM/assets/past_events/beyondus/d2.jpg")}
                            link="https://www.figma.com/file/zG7oCsCIlxuvK1uiV5g0TO/Beyond-Us-24-Hour-%7C-Scheduler-App-DT12-(Individual)?type=design&node-id=6-24&mode=design&t=38JirqJdGQl19Szp-0"
                        />
                        <Card
                            name="Team DT08"
                            description="Mobile Application: We have designed a mobile application that allows users to easily record attendance. The app will have an intuitive interface with options to input the name of the attendee and their entry time."
                            image={cdnUrl("src/modules/Public/KKEM/assets/past_events/beyondus/d3.jpg")}
                            link="https://www.figma.com/file/gBHFXhyYJNloANQlTbFlN5/Beyond-Us-Hackathon?type=design&node-id=0-1&mode=design&t=InTgCXHZn2TR2WHe-0"
                        />
                    </div>
                </div>
            </div>

            <div className={styles.winnerDetails}>
                <p className={styles.winnerDetailsHeading}>
                    Winners: Software Domain
                </p>

                <div className={styles.winnerDetailsListing}>
                    <div className={styles.winnerCards}>
                        <Card
                            name="Team ST03"
                            description="Introducing CV Wizard from Beyond-Us: the game-changing automated CV parsing tool. With the powerful PyRes Parser, CV Wizard extracts and organizes resume data with precision, saving time for employers."
                            image={cdnUrl("src/modules/Public/KKEM/assets/past_events/beyondus/s1.jpg")}
                            link="https://github.com/shihabsaleem/CV-BeyondUs"
                        />
                        <Card
                            name="Team ST10"
                            description="This platform should provide a space for like-minded students to network, work together on projects, share achievements, and foster a sense of community."
                            image={cdnUrl("src/modules/Public/KKEM/assets/past_events/beyondus/s2.jpg")}
                            link=""
                        />
                        <Card
                            name="Team ST13"
                            description="Ekipa is a comprehensive team management and task allocation platform designed to streamline collaboration and enhance productivity within teams."
                            image={cdnUrl("src/modules/Public/KKEM/assets/past_events/beyondus/s3.jpg")}
                            link="https://github.com/suryan-s/Ekipa"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default KKEMEventBeyondUs;
