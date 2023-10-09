import React from "react"
import styles from "./mainpage.module.css"
import img2 from "./assets/img2.webp";
import pre from "./assets/pre.png";

export default function mainpage() {
    return (
        <div className={styles.mainpage}>
            <section class={styles.First}>
                <div class={styles.Container}>
                    <div className={styles.Container_image_one}>
                        <img src={img2} />
                    </div>
                    <div class={styles.Container_desc}>
                        <div class={styles.Container_head}>
                            Breaking into <br />
                            <span className={styles.Head_two}>Artificial<br />Intelligence</span>
                        </div>
                        <div class={styles.Container_img_two}>
                            A µLearn x <span style={{ color: "#39D3F4", backgroundColor: "transparent" }}>Pathway</span> Initiative.
                        </div>
                        <div class={styles.Container_button}>
                            <button class={styles.Container_button_one}>
                                <img src={pre} alt="" /> Pre apply
                            </button>
                            <button class={styles.Container_button_two}>Explore Beta</button>
                        </div>
                    </div>
                </div>
                <div class={styles.Lower_desc}>
                    <p class={styles.desc}>
                        Join us on an exciting adventure into the world of <b>Artificial Intelligence (AI)</b> through our collaborative <br />
                        initiative with Pathway. In this comprehensive course.
                    </p>
                </div>
            </section>
            <p className={styles.Lower_red}>
                Only <b> 20 individuals </b> will be selected for the <b> beta cohort,</b> while the remaining applicants will be placed on a waiting list.
            </p>
        </div>
    )
}
