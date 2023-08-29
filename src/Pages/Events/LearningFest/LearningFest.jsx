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
                  <span>Learning Fest </span>
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
                      <img
                        src="/assets/events/learningfest/pygrammers.png"
                        alt=""
                        className={styles.partner_image}
                      />
                    </div>
                  </div>

                  <p className={styles.event_partners_heading}>
                    Earn Upto 7000 Karma Points
                  </p>

                  <a
                    href="http://mulearn.org/r/learningfest"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button className={styles.register_button}>
                      Register Now
                    </button>
                  </a>
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
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <p className={styles.tracks}>Learning Fest Tracks</p>
            <p className={styles.sv_tagline}>
              There are multiple tracks which you can travel in this learning
              fest to witness and learn new things.
            </p>

            <div className={styles.tracks_container}>
              <img
                src="/assets/events/learningfest/tracks/android.png"
                alt=""
                className={styles.track}
              />
              <img
                src="/assets/events/learningfest/tracks/arvr.png"
                alt=""
                className={styles.track}
              />
              <img
                src="/assets/events/learningfest/tracks/cybersec.png"
                alt=""
                className={styles.track}
              />
              <img
                src="/assets/events/learningfest/tracks/iot.png"
                alt=""
                className={styles.track}
              />
              <img
                src="/assets/events/learningfest/tracks/nocode.png"
                alt=""
                className={styles.track}
              />
              <img
                src="/assets/events/learningfest/tracks/uiux.png"
                alt=""
                className={styles.track}
              />
              <img
                src="/assets/events/learningfest/tracks/web.png"
                alt=""
                className={styles.track}
              />
            </div>

            <div className={styles.stars_container}>
              <div className={styles.star}>
                <img
                  src="/assets/events/learningfest/star.png"
                  alt=""
                  className={styles.starimg}
                />
                <p className={styles.star_text}>
                  Elevate Your Skills with Bootcamps.
                </p>
              </div>
              <div className={styles.star}>
                <img
                  src="/assets/events/learningfest/star.png"
                  alt=""
                  className={styles.starimg}
                />
                <p className={styles.star_text}>
                  Dive into your Passionate Field.
                </p>
              </div>
              <div className={styles.star}>
                <img
                  src="/assets/events/learningfest/star.png"
                  alt=""
                  className={styles.starimg}
                />
                <p className={styles.star_text}>
                  Learn and Lead with Learning Circles.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.third_view_container}>
            <div className={styles.third_view}>
              <div className={styles.tv_texts}>
                <p className={styles.tv_heading}>Registrations Started</p>
                <p className={styles.tv_tagline}>
                  The Seats are Limited, So register now and Get Ready to embark
                  on a journey of learning, growth and transformation at Kerala
                  Tech Fest!
                </p>
              </div>
              <a
                href="http://mulearn.org/r/learningfest"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/assets/events/learningfest/tvimg.png"
                  alt=""
                  className={styles.tvimage}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LearningFest;
