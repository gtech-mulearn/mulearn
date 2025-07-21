import React from "react";
import styles from "./ProgramsProject.module.css";
import Project1 from "../../assests/Project1.webp";
import Project2 from "../../assests/Project2.webp";
import Blink from "../../assests/Blink.webp";

export default function ProgramProject() {
  return (
    <div id="Program" className={styles.programProject}>
      <h1>
        Enabler <span>Programs</span> & Projects
      </h1>

      <div className={styles.programProjectGrid}>
        <div className={styles.programProjectGridCard}>
          <img
            className={styles.programProjectGridCardImg}
            src={Project1}
            alt=""
          />

          <div className={styles.programProjectEnablers}>
            <div>
              <img src={Blink} alt="" />
              <img src={Blink} alt="" />
              <img src={Blink} alt="" />
              <img src={Blink} alt="" />
            </div>
            <p>+ 40 enablers</p>
          </div>
          <div className={styles.programProjectGridContent}>
            <p>October 20th 2023</p>
            <h2>Learning Fest For Enablers</h2>
            <p>
              Are you passionate about helping others reach their full
              potential? 👀 Join us at Learning Fest, where you can enhance your
              skills as a mentor 💫 Explore new teaching techniques, network
              with fellow enablers, and help shape the future of education
            </p>
            <div>
              <a
                href="http://mulearn.org/r/enablers-learningfest"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Enroll Now</button>
              </a>
            </div>
          </div>
        </div>

        <div className={styles.programProjectGridCard}>
          <img
            className={styles.programProjectGridCardImg}
            src={Project2}
            alt=""
          />

          <div className={styles.programProjectEnablers}>
            <div>
              <img src={Blink} alt="" />
              <img src={Blink} alt="" />
              <img src={Blink} alt="" />
              <img src={Blink} alt="" />
            </div>
            <p>+ 11 enablers</p>
          </div>
          <div className={styles.programProjectGridContent}>
            {/* <p>1 - 28 July 2022</p> */}
            <h2>Art of Teaching - Teach Contest</h2>
            <p>
              Art of Teaching is an annual event that spotlights enablers'
              teaching talents. They can showcase their skills through videos,
              simplifying concepts for students. In the last edition, we
              received 150+ video entries and rewarded winners with cash prizes.
            </p>
            <div>
              <a
                href="https://mulearn.org/artofteaching"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>Know More </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
