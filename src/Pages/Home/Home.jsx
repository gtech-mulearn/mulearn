import React from "react";
import styles from "../Home/Home.module.css";
import illustration from "./assets/illustration.png";

import involvement from "./assets/involvement.png";
import interactive from "./assets/interactive.png";
import innovation from "./assets/innovation.png";

const Home = () => {
  return (
    <>
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
                assist you in breaking through the echo chambers and free you
                from the shackles that have you grounded.
              </p>
            </div>
            <button className={styles.primary}>Join Us</button>
          </div>
          <img className={styles.fv_image} src={illustration} alt="" />
        </div>
      </div>

      <div className={styles.secondviewmain_container}>
        <div className={styles.secondview_container}>
          <div className={styles.second_view}>
            <p className={styles.sv_mainheading}>
              Knowing more about <span>µLearn!</span>{" "}
            </p>
            <p className={styles.sv_tagline}>
              Curious know more about µLearn and explore what all magic we can
              do together, come lets witness it!
            </p>
            <div className={styles.sv_points}>
              <div className={styles.sv_point}>
                <img src={involvement} alt="" className={styles.svp_image} />
                <div className={styles.svp_heading}>Involve</div>
                <div className={styles.svp_text}>
                  Mulearn is a place for everyone. A place where one could
                  involve the most and enjoy our interesting events like{" "}
                  <span>Inspiration Radio</span>, <span>Let's Chill</span> and
                  Much more.. to their fullest
                </div>
              </div>
              <div className={styles.sv_point}>
                <img src={innovation} alt="" className={styles.svp_image} />
                <div className={styles.svp_heading}>Innovate</div>
                <div className={styles.svp_text}>
                  A space full of opportunties to innovate and create amazing
                  creations. To showcase yourself. You Improve yourself and
                  Innovate yourself!.
                </div>
              </div>
              <div className={styles.sv_point}>
                <img src={interactive} alt="" className={styles.svp_image} />
                <div className={styles.svp_heading}>Interact</div>
                <div className={styles.svp_text}>
                  A Interactive space where each one of you could interact with
                  peers with same mindset and mentors with marvellous mindset.
                  If you interact well it could even turn into an Internship.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
