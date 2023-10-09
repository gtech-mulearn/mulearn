import React from "react"
import styles from "./CourseOverview.module.css"
import s1 from './assets/S1.png'
import arrow from './assets/arrow.png'

const content = [
    {
        id: 1,
        title: "Stage 1",
        desc: "Dive deep into the foundations of AI with a focus on Large Language Models (LLMs).",
        icon: "./assets/S1.png"
    },
    {
        id: 2,
        title: "Stage 2",
        desc: "Master LLMs and their real-world applications.",
        icon: "./assets/S2.png"
    },
    {
        id: 3,
        title: "Stage 3",
        desc: "Explore the magic of word vectors and their role in understanding language.",
        icon: "./assets/S3.png"
    },
    {
        id: 4,
        title: "Stage 4",
        desc: "Harness the potential of LLM data pipelines for AI-driven insights.",
        icon: "./assets/S4.png"
    },
    {
        id: 5,
        title: "Stage 5",
        desc: "Embark on a hands-on journey to build your own LLM-powered app using the cutting-edge Pathway framework.",
        icon: "./assets/S5.png"
    },
]

const CourseOverview = () => {
    return (
        <section className={styles.Two}>
            <div className={styles.Overview_container}>
                <div className={styles.Overview_container_head}>
                    <hr />
                    <p>Course Overview</p>
                    <hr />
                </div>
                <div className={styles.Overview_desc}>
                    {
                        content.map((item) => {
                            return (
                                <div className={styles.course}>
                                    <div className={styles.Course_desc}>
                                        <img src={s1} alt="" />
                                        <p>{item.desc}</p>
                                    </div>
                                    <div className={styles.stage}>
                                        {item.title} <img src={arrow} alt="" />
                                    </div>
                                </div>
                            )
                        }
                        )
                    }
                </div>
            </div>
        </section>
    )
}

export default CourseOverview
