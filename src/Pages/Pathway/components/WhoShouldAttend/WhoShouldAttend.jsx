import React from "react"
import styles from './WhoShouldAttend.module.css'
import line from './assets/line.webp';

export default function WhoShouldAttend() {
    return (
        <div>
            <section className={styles.third}>
                <div className={styles.Overview_container_head}>
                    <hr />
                    <p>Who should Attend?</p>
                    <hr />
                </div>
                <div className={styles.sec}>
                    <div className={styles.sec_one}>
                        <div className={styles.sec_two}>
                            <div className={styles.section_top}>
                                <p>Students interested in AI and machine learning.</p>
                            </div>
                            <div className={styles.section_mid}>
                                <img src={line} />
                            </div>
                        </div>
                        <div className={styles.section_bottom}>
                            <p>I need latency to be <br />milliseconds or seconds, but my<br />batch job is taking minutes or<br />hours to run each time.</p>
                        </div>
                    </div>
                    <div className={styles.sec_one}>
                        <div className={styles.sec_two}>
                            <div className={styles.section_top}>
                                <p>Students interested in AI and machine learning.</p>
                            </div>
                            <div className={styles.section_mid}>
                                <img src={line} alt="" />
                            </div>
                        </div>
                        <div className={styles.section_bottom}>
                            <p>I need latency to be <br />milliseconds or seconds, but my<br />batch job is taking minutes or<br />hours to run each time.</p>
                        </div>
                    </div>
                    <div className={styles.sec_one}>
                        <div className={styles.sec_two}>
                            <div className={styles.section_top}>
                                <p>Students interested in AI and machine learning.</p>
                            </div>
                            <div className={styles.section_mid}>
                                <img src={line} alt="" srcset="" />
                            </div>
                        </div>
                        <div className={styles.section_bottom}>
                            <p>
                                I need latency to be <br />milliseconds or seconds, but my<br />batch job is taking minutes or<br />hours to run each time.
                            </p>
                        </div>
                    </div>
                    <div className={styles.sec_one}>
                        <div className={styles.sec_two}>
                            <div className={styles.section_top}>
                                <p>Students interested in AI and machine learning.</p>
                            </div>
                            <div className={styles.section_mid}>
                                <img src={line} alt="" />
                            </div>
                        </div>
                        <div className={styles.section_bottom}>
                            <p>I need latency to be <br />milliseconds or seconds, but my<br />batch job is taking minutes or<br />hours to run each time.</p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    )
}
