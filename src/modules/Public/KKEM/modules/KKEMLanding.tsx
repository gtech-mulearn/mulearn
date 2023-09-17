import Navbar from "../components/Navbar";
import titleFrame from "../assets/titleFrame.svg";
import mU from "../assets/mU_pl.svg";
import styles from "./KKEMLanding.module.css";
import IGAbout from "../components/IGAbout";
import IGSection from "../components/IGSection";
import Footer from "../components/Footer";

import igAssets from "../assets/IGS";
import pastEventsAssets from "../assets/past_events";
import { useState } from "react";

export default function Landing() {
    const igCardData = [
        {
            image: igAssets.Android,
            name: "Android",
            link: "https://learn.mulearn.org/webmobile/android",
            description:
                "Android is a mobile operating system based on a modified version of the Linux kernel and other open-source software."
        },
        {
            image: igAssets.Frontend,
            name: "Front-End",
            link: "https://learn.mulearn.org/webmobile/web",
            description: `
                    The term Front-End mainly referes to the User Interface which an user view and interacts with and its `
        },
        {
            image: igAssets.Blockchain,
            name: "Blockchain",
            link: "https://learn.mulearn.org/blockchain",
            description: `
                    A blockchain is a digital ledger or database where encrypted blocks of digital asset data are stored and chained together`
        },
        {
            image: igAssets.AI,
            name: "Artifcial Intelligence",
            link: "https://learn.mulearn.org/aimlanalytics/ai",
            description:
                "AI which stands for artificial intelligence refers to systems or machines that mimic human intelligence to perform tasks."
        },
        {
            image: igAssets.ARVR,
            name: "AR/VR",
            link: "https://learn.mulearn.org/arvrxr",
            description: `
                    Augmented and virtual reality (AR/VR) are immersive technologies that enable users to experience digitally rendered content`
        },
        {
            image: igAssets.QA,
            name: "QA",
            link: "https://learn.mulearn.org/webmobile/qa",
            description:
                "Quality assurance (QA) is any systematic process of determining whether a product or service meets specified requirements."
        },
        {
            image: igAssets.PM,
            name: "Product Management",
            link: "https://learn.mulearn.org/innovationentre/pm",
            description:
                "Are you interested in learning to build the right product and the product right?."
        },
        {
            image: igAssets.IOT,
            name: "IoT",
            link: "https://learn.mulearn.org/iotrf/iot",
            description:
                "IoT is the network of physical objects that are embedded with sensors, software etc.. for the purpose of connecting and exchanging data over the internet."
        },
        {
            image: igAssets.UIUX,
            name: "UI/UX",
            link: "https://learn.mulearn.org/uiuxcreative/ux",
            description:
                "UI Design and UX Design are some of the most in-demand skills today. While UI deals with the graphical layout of an app, UX deals with the human experience."
        },
        {
            image: igAssets.Cybersec,
            name: "Cyber Security",
            link: "https://learn.mulearn.org/cybersec",
            description:
                "Cyber Security is the practice of defending computers, servers, mobile devices, electronic systems, networks, and data from malicious attacks. "
        }
    ];
    const pastEventCardData = [
        {
            name: "GTA: SandShores",
            code: "gtas",
            description:
                "After Codestorm get ready for an exhilarating journey with GTA:SandShore Hackathon💫",
            image: pastEventsAssets.gtas,
            link: "https://gta.mulearn.org",
            date: "14th and 15th October"
        },
        {
            name: "Learning Fest",
            code: "lf",
            description:
                "µLearn in association with KKEM brings you Learning Fest a series of bootcamps to improve your skills in various domains and the chance to earn Karma points and various other opportunities.",
            image: pastEventsAssets.lf,
            link: "https://mulearn.org/keralatechfest",
            date: "7th August 2023"
        },
        {
            name: "GTA:CodeStorm",
            code: "gtac",
            description:
                "It's time to gear up for the CodeStorm, the first hackathon of the Grand Tech Adventure Hackathon series. 🚀",
            image: pastEventsAssets.gtac,
            link: "https://gta.mulearn.org/codestorm",
            date: "19th and 20th August"
        },
        {
            name: "Beyond Us Hackathon",
            code: "buh",
            description:
                "Embark on an extraordinary hackathon mission 🚀. Utilize your strategic thinking and create impressive projects from scratch to explore Beyond Us ✨",
            image: pastEventsAssets.buh,
            link: "",
            date: "8th and 9th July 2023"
        },
        {
            name: "Karma Fest",
            code: "kf",
            description:
                "his festive season, don't miss the chance to boost your career with µLearn's Karma Fest‼️\n\nEarn valuable karma points by completing learning tracks, tasks, and participating in mini-hackathons based on Design & Research, Development, No-code, and AI.",
            image: pastEventsAssets.kf,
            link: "",
            date: "May 2023"
        }
    ];
    return (

        <main className={styles.mainContainer}>
            <Navbar />
            <div style={{ position: "relative", height: "100%" }}>
                <img
                    src={titleFrame}
                    alt="title frame"
                    className={styles.title}
                />
                <img src={mU} alt="mU" className={styles.mU} />
            </div>
            <IGAbout />
            <IGSection cards={igCardData} />
            <div id="events">
                <IGSection
                    cards={pastEventCardData}
                    heading="Partnered Events"
                    headerFlag={true}
                    largeImg={true}
                />
            </div>
            {/* <SkillExpress /> */}
            <Footer />
        </main>

    );
}
