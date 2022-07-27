import React from "react";
import styles from "../Home/Home.module.css";
import illustration from "./assets/illustration.png";

const Home = () => {
  return (
    <div className={styles.firstviewmain_container}>
      <div className={styles.firstview_container}>
        <div className={styles.first_view}>
          <div className={styles.fv_texts}>
            <p className={styles.fv_heading}>
              Let's <span>break the Echo Chambers</span> Together.
            </p>
            <p className={styles.fv_tagline}>
              µLearn is a synergic philosophy of education, with a culture of
              mutual learning through micro groups of peers. µLearn is here to
              assist you in breaking through the echo chambers and free you from
              the shackles that have you grounded.
            </p>
          </div>
          <button className={styles.primary}>Join Us</button>
        </div>
        <img className={styles.fv_image} src={illustration} alt="" />
      </div>
    </div>
  );
};

export default Home;
