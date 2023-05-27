import React from "react";
import styles from "./Journey.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import onboard from "./onboard.svg";
import basics from "./basics.svg";
import enablement from "./enablement.svg";
import learningcircle from "./learningcircle.svg";
import grouptask from "./grouptask.svg";
import participate from "./participate.svg";
const Journey = () => {
  return (
    <div className={styles.main}>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.c_texts}>
          <p className={styles.ct_heading}>How to get started with µLearn? </p>
          <p className={styles.ct_text}>
            µLearn is a community of learners. We are a community of learners
            who are passionate about learning and sharing knowledge.Follow the 6
            steps below to get started with µLearn.
          </p>
        </div>
        <div className={styles.journey_container}>
          <div className={`${styles.journey_1} ${styles.layout}`}>
            <div className={styles.heading}>
              <h3>1 . The Onboarding</h3>
            </div>
            <div className={styles.list}>
              <ul>
                <li>
                  Create an account on µLearn at
                  https://app.mulearn.org/register.
                </li>
                <li>Retrieve your muid from the dashboard. </li>
                <li>
                  Paste your muid in the onboarding channel to complete the
                  onboarding procedure.
                </li>
              </ul>
              <img src={onboard} alt="icon"></img>
            </div>
          </div>
          <div className={`${styles.journey_2} ${styles.layout}`}>
            <div className={styles.heading}>
              <h3>2 . The Basics</h3>
            </div>
            <div className={styles.list}>
              <ul>
                <li>
                  The Basics Ensure your Discord account has a valid profile
                  picture with your face clearly visible.
                </li>
                <li>Set your Discord name to your real name.</li>
                <li>
                  Earn your first 20 Karma Points by posting an introduction in
                  the #introductions channel.
                </li>
              </ul>
              <img src={basics} alt="icon"></img>
            </div>
          </div>
          <div className={`${styles.journey_3} ${styles.layout}`}>
            <div className={styles.heading}>
              <h3>3 . The Enablement</h3>
            </div>
            <div className={styles.list}>
              <ul>
                <li>
                  Complete the basic enablement tasks at
                  https://learn.mulearn.org /challenges.
                </li>
                <li>
                  These tasks are relevant regardless of the domain you choose.
                </li>
                <li>Earn Karma Points and improve your rank. </li>
              </ul>
              <img src={enablement} alt="icon"></img>
            </div>
          </div>
          <div className={`${styles.journey_4} ${styles.layout}`}>
            <div className={styles.heading}>
              <h3>4 . Forming Learning Circles</h3>
            </div>
            <div className={styles.list}>
              <ul>
                <li>
                  Form a learning circle with friends who have completed the
                  enablement tasks.
                </li>
                <li>
                  Create your learning circle at
                  https://learn.mulearn.org/create.
                </li>
              </ul>
              <img src={learningcircle} alt="icon"></img>
            </div>
          </div>
          <div className={`${styles.journey_5} ${styles.layout}`}>
            <div className={styles.heading}>
              <h3>5 . Interest Group Tasks</h3>
            </div>
            <div className={styles.list}>
              <ul>
                <li>
                  Engage in interest group-based tasks listed at
                  https://learn.mulearn.org.
                </li>
                <li>
                  Complete core tasks, sub-tasks, and challenges to earn Karma
                  Points.
                </li>
                <li>
                  Explore bootcamps and other interests to expand your learning
                  journey.
                </li>
              </ul>
              <img src={grouptask} alt="icon"></img>
            </div>
          </div>
          <div className={`${styles.journey_6} ${styles.layout}`}>
            <div className={styles.heading}>
              <h3>6 . Participate</h3>
            </div>
            <div className={styles.list}>
              <ul>
                <li>
                  Grab Your Superpowers to meet and connect with new people with
                  similar interests
                </li>
                <li>
                  Also participate in events such as: Office Hours, ISR, Salt
                  Mango Tree
                </li>
              </ul>
              <img src={participate} alt="icon"></img>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Journey;
