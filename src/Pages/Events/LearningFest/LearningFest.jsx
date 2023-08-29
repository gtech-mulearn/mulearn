import React from "react";
import styles from "./LearningFest.module.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";

const LearningFest = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.fv_background_container}>
          <div className={styles.first_view_container}>
            <div className={styles.first_view}>
              <div className={styles.fv_texts}>
                <p className={styles.fv_heading}>
                  <span>Learning</span> Fest
                </p>

                <p className={styles.fv_tagline}>
                  µLearn in association with KKEM brings you Learning Fest a
                  series of bootcamps to improve your skills in various domains
                  and the chance to earn Karma points and various other
                  opportunities.
                </p>
                <div className={styles.event_partners}>
                  <div className={styles.partners}>
                    <p className={styles.event_partners_heading}>
                      Event Partners
                    </p>
                    <div className={styles.partner}>
                      <img
                        src="/assets/events/gtacodestorm/kkem.webp"
                        alt=""
                        className={styles.partner_image}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.fv_images}>
                <img
                  src="/assets/events/learningfest/fvoverlay.png"
                  alt=""
                  className={styles.fv_img}
                />
              </div>
            </div>
          </div>
          <div className={styles.pipes} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LearningFest;
