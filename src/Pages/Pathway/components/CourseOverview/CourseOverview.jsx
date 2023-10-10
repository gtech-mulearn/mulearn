import React from "react"
import styles from "./CourseOverview.module.css"
import arrow from '../../assets/arrow.png'
import s1 from '../../assets/S1.png'
import s2 from '../../assets/s2.png'
import s3 from '../../assets/s3.png'
import s4 from '../../assets/s4.png'
import s5 from '../../assets/s5.png'

const content = [
    {
        id: 1,
        title: "Stage 1",
        desc: "Dive deep into the foundations of AI with a focus on",
        bold: "Large Language Models (LLMs).",
        icon: s1
    },
    {
        id: 2,
        title: "Stage 2",
        desc: "Master LLMs and their",
        bold: "real-world applications.",
        icon: s2
    },
    {
        id: 3,
        title: "Stage 3",
        desc: "Explore the magic of",
        bold: "word vectors",
        desc2: "and their role in understanding language.",
        icon: s3
    },
    {
        id: 4,
        title: "Stage 4",
        desc: "Harness the potential of",
        bold: "LLM data pipelines",
        desc2: "for AI-driven insights.",
        icon: s4
    },
    {
        id: 5,
        title: "Stage 5",
        desc: "Embark on a hands-on journey to",
        bold: "build your own LLM-powered app",
        desc2: "using the cutting-edge Pathway framework.",
        icon: s5
    },
]

export default function CourseOverview() {
    return (
        <section id="Course" className={styles.Two}>
            <div className={styles.Overview_container}>
                <div className={styles.Overview_container_head}>
                    <hr />
                    <p>Course Overview</p>
                </div>
                <div className={styles.Overview_desc}>
                    {
                        content.map((item, key) => {
                            return (
                                <div key={key} className={styles.course}>
                                    <div className={styles.Course_desc}>
                                        <img src={item.icon} alt="" />
                                        <p>
                                            {item.desc}
                                            <b> {item.bold} </b>
                                            {item.desc2 ? item.desc2 : null}
                                        </p>
                                    </div>
                                    <div className={styles.stage}>
                                        {item.title} <img src={arrow} alt="" />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </section>
    )
}
