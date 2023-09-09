import React from "react";
import mario from "../../assets/mario.webp";
import styles from "./Cards.module.css";
import princess from "../../assets/Princess.webp";
import luigi from "../../assets/Luigi.webp";

export default function Cards() {
  return (
    <div className={styles.carosel}>      
      <div className={styles.mainConatiner}>
      <div className={styles.cardsConatiner}>
        <div className={styles.card}>
          <img src={mario} alt="" />
          <div className={styles.cardConatiner}>
            <div className={styles.cardContent}>
              <h1>Learning Fest</h1>
              <h3>Master your favorite domains, together.</h3>
              <p>
                Learn your favorite domains like web development and UI/UX
                together with your peers. Form learning circles and compete with
                each other.
              </p>
              <div className={styles.cardblob}>
                <div>
                  <p>Free</p>
                </div>
                <div>
                  <p>Online</p>
                </div>
                <div>
                  <p>7K+ Karma points</p>
                </div>
                <div>
                  <p>Mentors from industry</p>
                </div>
              </div>
              <a
                href="https://mulearn.org/r/learningfest"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>i'm in!</button>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardsConatiner}>
        <div className={styles.card}>
          <img src={princess} alt="" />
          <div className={styles.cardConatiner}>
            <div className={styles.cardContent}>
              <h1>Compete and Experience </h1>
              <h3>Show the world what you are upto.</h3>
              <p>
                Compete with talent across the state to gain experience.: It's a
                journey that takes you through college-level competitions,
                district-level showdowns, and ultimately a state-level battle of
                wits.
              </p>
              <div className={styles.cardblob}>
                <div>
                  <p>Challenges</p>
                </div>
                <div>
                  <p>Hackathons</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.cardsConatiner}>
        <div className={styles.card}>
          <img src={luigi} alt="" />
          <div className={styles.cardConatiner}>
            <div className={styles.cardContent}>
              <h1>Opportunities & Beyond</h1>
              <h3>Monetize your skills.</h3>
              <p>
                Get that Job. Become a Freelancer or start a business. At the
                end of this incredible journey, we bring you a job fair,
                connecting you with top-notch companies and opportunities.
              </p>
              <div className={styles.cardblob}>
                <div>
                  <p>Industry connect</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

    </div>
  );
}
