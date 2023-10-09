import React from "react"
import styles from './WhoShouldAttend.module.css'
import line from '../../assets/line.webp';

const content = [
    {
        id: 1,
        title: "Students interested in AI and machine learning.",
        desc: "I need latency to be milliseconds or seconds, but my batch job is taking minutes or hours to run each time."
    },
    {
        id: 2,
        title: "Professionals seeking to upskill in AI.",
        desc: "I need latency to be milliseconds or seconds, but my batch job is taking minutes or hours to run each time."
    },
    {
        id: 3,
        title: "Enthusiasts eager to explore LLMs and AI frameworks.",
        desc: "I need latency to be milliseconds or seconds, but my batch job is taking minutes or hours to run each time."
    },
    {
        id: 4,
        title: "Anyone looking to break into the exciting world of AI",
        desc: "I need latency to be milliseconds or seconds, but my batch job is taking minutes or hours to run each time."
    }
]

export default function WhoShouldAttend() {
    return (
        <section id="who" className={styles.WhoShouldAttend}>
            <div className={styles.Overview_container_head}>
                <hr />
                <p>Who should Attend?</p>
            </div>
            <div className={styles.section}>
                {
                    content.map((item, index) => {
                        return (
                            <div key={index} className={styles.container}>
                                <div className={styles.box}>
                                    <b className={styles.box_top}>
                                        {item.title}
                                    </b>
                                    <div className={styles.box_mid}>
                                        <img src={line} alt="line"/>
                                    </div>
                                </div>
                                <div className={styles.box_bottom}>
                                    <p>{item.desc}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}
