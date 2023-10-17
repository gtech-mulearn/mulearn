import React from "react";
import styles from "./Mainpage.module.css";
import img2 from "../../assets/img2.webp";
import pre from "../../assets/pre.png";

export default function mainpage() {
  return (
    <div id="heroSection" className={styles.mainpage}>
      <section className={styles.First}>
        <div className={styles.Container}>
          <div className={styles.Container_image_one}>
            <img alt="hero" src={img2} />
          </div>
          <div className={styles.Container_desc}>
            <div className={styles.Container_head}>
              Breaking into <br />
              <span className={styles.Head_two}>
                Artificial
                <br />
                Intelligence
              </span>
            </div>
            <div className={styles.Container_img_two}>
              A µLearn x{" "}
              <span
                style={{ color: "#39D3F4", backgroundColor: "transparent" }}
              >
                Pathway
              </span>{" "}
              Initiative.
            </div>
            <div className={styles.Container_button}>
              <a
                href="https://mulearn.org/r/ai-bootcamp"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.Container_button_one}>
                  <img src={pre} alt="" /> Pre apply
                </button>
              </a>
            </div>
          </div>
        </div>
        <p className={styles.desc}>
          Join us on an exciting adventure into the world of{" "}
          <b>Artificial Intelligence (AI)</b> through our collaborative
          initiative with Pathway. In this comprehensive course.
        </p>
      </section>
      <p className={styles.Lower_red}>
        Only <b> 20 individuals </b> will be selected for the{" "}
        <b> beta cohort,</b> while the remaining applicants will be placed on a
        waiting list.
      </p>
    </div>
  );
}
