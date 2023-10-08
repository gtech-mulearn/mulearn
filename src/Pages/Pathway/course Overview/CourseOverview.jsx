import React from "react"
import styles from "./CourseOverview.module.css"

const CourseOverview = () => {
    return (
    <>
    <section className={Two}>
        <div className={Overview_container}>
            <div className={Overview_container_head}>
                <hr>
                <p>Course Overview</p>
                <hr>
            </div>
            <div className={Overview_desc}>
                <div className={course}>
                    <div className={Course_desc}>
                        <span className={icon}>
                        </span>
                        <p className={desc_one}>Dive deep into the foundations of AI with a focus on <span>Large Language Models (LLMs)</span>. </p>
                    </div>
                    <div className={stage}>
                        <p>Stage 1</p>
                    </div>
                </div>
                <div className={course}>
                    <div className={Course_desc}>
                        <span className={icon}></span>
                        <p className={desc_one}>Dive deep into the foundations of AI with a focus on <span>Large Language Models (LLMs)</span>. </p>
                    </div>
                    <div className={stage}>
                        <p>Stage 1</p>
                    </div>
                </div>
                <div className={course}>
                    <div className={Course_desc}>
                        <span className={icon}></span>
                        <p className={desc_one}>Dive deep into the foundations of AI with a focus on <span>Large Language Models (LLMs)</span>. </p>
                    </div>
                    <div className={stage}>
                        <p>Stage 1</p>
                    </div>
                </div>
                <div className={course}>
                    <div className={Course_desc}>
                        <span className={icon}></span>
                        <p className={desc_one}>Dive deep into the foundations of AI with a focus on <span>Large Language Models (LLMs)</span>. </p>
                    </div>
                    <div className={stage}>
                        <p>Stage 1</p>
                    </div>
                </div>
                <div className={course}>
                    <div className={Course_desc}>
                        <span className={icon}></span>
                        <p className={desc_one}>Dive deep into the foundations of AI with a focus on <span>Large Language Models (LLMs)</span>. </p>
                    </div>
                    <div className={stage}>
                        <p>Stage 1</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    
</>
)
}

export default CourseOverview
