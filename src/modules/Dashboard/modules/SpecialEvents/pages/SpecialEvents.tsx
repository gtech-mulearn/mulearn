import React from "react";
import styles from "./SpecialEvents.module.css";
import top100coders from ".././assets/top-100.webp";
import launchpad from "../assets/launchpad.webp";
import trivialideas from "../assets/trivialideas.webp";
import SpecialEventCardLanding from "../../landing/components/SpecialEventCardLanding/SpecialEventCardLanding";

const SpecialEventsList: SpecialEvent[] = [
    {
        id: 1,
        title: "Top 100 Coders",
        description:
            "Welcome to the Top 100 Coders initiative Recognised by Kerala Govt. We're on a mission to recognize and empower the best coders in India. If you're passionate about coding and want to make a significant impact in the tech community, you're in the right place.",
        // date: "2025-04-09",
        // participants: 100,
        link: "https://top100coders.com/",
        image: top100coders,
        isLive: true
    },
    {
        id: 2,
        title: "Launchpad",
        description:
            "Launchpad Kerala 2024 is a premier job fair that brings together talented individuals and innovative companies in the technical and engineering fields.",
        // date: "2024-06-02",
        participants: 200,
        link: "https://launchpadkerala.org/",
        image: launchpad,
        isLive: false
    },
    {
        id: 3,
        title: "Trivial Ideas",
        description:
            "Have an idea that's out-of-the-box crazy? This is your chance to turn it into a real product! ",
        recurrence: "Monthly",
        // date: "2025-02-02",
        // participants: 500,
        link: "https://www.instagram.com/mulearn.official/p/C6eHEzJyMMn/",
        image: trivialideas,
        isLive: false
    }
];

const SpecialEvents = () => {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.Banner}>
                <div className={styles.BannerContent}>
                    <h1 className={styles.BannerTitle}>Special Events</h1>
                    <p className={styles.BannerSubtitle}>
                        Discover exclusive events designed to inspire
                        innovation, enhance skills, and foster meaningful
                        connections across technology, management, and
                        creativity.
                    </p>
                </div>
            </div>
            <div className={styles.eventsGrid}>
                {SpecialEventsList.map(specialevent => (
                    <SpecialEventCardLanding
                        key={specialevent.id}
                        specialevent={specialevent}
                    />
                ))}
            </div>
        </div>
    );
};

export default SpecialEvents;
