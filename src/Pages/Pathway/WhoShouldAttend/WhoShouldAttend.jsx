import React from "react"
import styles from "./Contact.module.css"
import line from "./assets/line.webp";

const WhoShouldAttend = () => {
    return (
    <>
    <section className={third}>
    <div className={Overview_container_head}>
        <hr>
        <p>Who should Attend?</p>
        <hr>
    </div>
    <div className={sec}>
        <div className={sec_one}>
            <div className={sec_two}>
            <div className={section_top}>
                <P>Students interested in AI and machine learning.</P>
            </div>
            <div className={section_mid}>
                <img src={line.webp}>
            </div>
            </div>
            <div className={section_bottom}>
                <p>I need latency to be <br>milliseconds or seconds, but my<br>batch job is taking minutes or<br>hours to run each time.</p>
            </div>
        </div>
        <div className={sec_one}>
            <div className={sec_two}>
            <div className={section_top}>
                <P>Students interested in AI and machine learning.</P>
            </div>
            <div className={section_mid}>
                <img src="line.webp" alt="" srcset="">
            </div>
            </div>
            <div className={section_bottom}>
                <p>I need latency to be <br>milliseconds or seconds, but my<br>batch job is taking minutes or<br>hours to run each time.</p>
            </div>
        </div>
        <div className={sec_one}>
            <div className={sec_two}>
            <div className={section_top}>
                <P>Students interested in AI and machine learning.</P>
            </div>
            <div className={section_mid}>
                <img src="line.webp" alt="" srcset="">
            </div>
            </div>
            <div className={section_bottom}>
                <p>I need latency to be <br>milliseconds or seconds, but my<br>batch job is taking minutes or<br>hours to run each time.</p>
            </div>
        </div>
        <div className={sec_one}>
            <div className={sec_two}>
            <div className={section_top}>
                <P>Students interested in AI and machine learning.</P>
            </div>
            <div className={section_mid}>
                <img src="line.webp" alt="" srcset="">
            </div>
            </div>
            <div className={section_bottom}>
                <p>I need latency to be <br>milliseconds or seconds, but my<br>batch job is taking minutes or<br>hours to run each time.</p>
            </div>
        </div>
    </div>
    </section>
    
</>
)
}

export default WhoShouldAttend
