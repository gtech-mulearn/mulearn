import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import styles from "./Launchpad.module.css";
import "./steps.css";
const Launchpad = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome aboard <span>LAUNCHPAD</span> 2024
              </p>
              <p className={styles.fv_content}>
                The IEEE LAUNCHPAD Job Fair is an opportunity to secure your
                spotlight and connect with potential employers through karma
                points!{" "}
                {/* <br />
                                <br /> */}
                This event is designed to facilitate meaningful interactions
                between talented individuals like yourself and companies seeking
                top-tier talent.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>How to join Launchpad?</p>
            </div>
          </div>
          <div className={styles.steps}>
            <div className="ktimeline-container">
              <div className="ktimeline">
                <div className="ktimeline__event animated fadeInUp delay-3s ktimeline__event--type1">
                  <div className="ktimeline__event__icon">
                    <img
                      src={require("./assets/steps/studentreg.png")}
                      alt=""
                      className="lni-cake"
                    />
                  </div>
                  <div className="ktimeline__event__date">1</div>
                  <div className="ktimeline__event__content">
                    <div className="ktimeline__event__title">Step One</div>
                    <div className="ktimeline__event__description">
                      {/* Register{" "}
                                            <a
                                                href="https://forms.gle/C5e6XHhVGkV3axQS8"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                here
                                            </a>
                                            {" "}and */}
                      Get ready for the adventure! Once you receive your
                      confirmation email, we're set to chart a course to your
                      future!
                    </div>
                    <div className="ktimeline__event__register_btn">
                      <button
                        href="https://forms.gle/C5e6XHhVGkV3axQS8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ktimeline__event__register"
                      >
                        Register now
                      </button>
                    </div>
                  </div>
                </div>
                <div className="ktimeline__event animated fadeInUp delay-2s ktimeline__event--type2">
                  <div className="ktimeline__event__icon">
                    <img
                      src={require("./assets/steps/team.webp")}
                      alt=""
                      className="lni-cake"
                    />
                  </div>
                  <div className="ktimeline__event__date">2</div>
                  <div className="ktimeline__event__content">
                    <div className="ktimeline__event__title">Step Two</div>
                    <div className="ktimeline__event__description">
                      Join the GTech µLearn Discord Server! Dive into the action{" "}
                      <a
                        href="https://app.mulearn.org/register"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        here
                      </a>{" "}
                      and join fellow Launchpad enthusiasts!
                    </div>
                  </div>
                </div>
                <div className="ktimeline__event animated fadeInUp delay-1s ktimeline__event--type3">
                  <div className="ktimeline__event__icon">
                    <img
                      src={require("./assets/steps/medal.svg").default}
                      alt=""
                      className="lni-cake"
                    />
                  </div>
                  <div className="ktimeline__event__date">3</div>
                  <div className="ktimeline__event__content">
                    <div className="ktimeline__event__title">Step Three</div>
                    <div className="ktimeline__event__description">
                      Conquer the <b>21-day challenge</b> and earn{" "}
                      <b>Karma points</b>! Log in, climb the ranks from{" "}
                      <b> Level 1 to 3</b>, and don't miss our daily{" "}
                      <b>Office Hours</b> from 8 to 9 pm for support.
                    </div>
                  </div>
                </div>
                <div className="ktimeline__event animated fadeInUp ktimeline__event--type4">
                  <div className="ktimeline__event__icon">
                    <img
                      src={require("./assets/steps/test.svg").default}
                      alt=""
                      className="lni-cake"
                    />
                  </div>
                  <div className="ktimeline__event__date">4</div>
                  <div className="ktimeline__event__content">
                    <div className="ktimeline__event__title">Step Four</div>
                    <div className="ktimeline__event__description">
                      Gear up for the <b>Qualification Test</b> – show it who's
                      boss! This is your chance to shine and set yourself apart
                      from the pack.
                    </div>
                  </div>
                </div>
                <div className="ktimeline__event animated fadeInUp delay-3s ktimeline__event--type1">
                  <div className="ktimeline__event__icon">
                    <img
                      src={require("./assets/steps/goal.svg").default}
                      alt=""
                      className="lni-cake"
                    />
                  </div>
                  <div className="ktimeline__event__date">5</div>
                  <div className="ktimeline__event__content">
                    <div className="ktimeline__event__title">Step Five</div>
                    <div className="ktimeline__event__description">
                      Passed the test? <b>Congratulations</b>! You're in the
                      company pool, where opportunities await to advance your
                      career further!
                    </div>
                  </div>
                </div>
                <div className="ktimeline__event animated fadeInUp delay-3s ktimeline__event--type6">
                  <div className="ktimeline__event__icon">
                    <img
                      src={require("./assets/steps/intervieww.svg").default}
                      alt=""
                      className="lni-cake"
                    />
                  </div>
                  <div className="ktimeline__event__date">6</div>
                  <div className="ktimeline__event__content">
                    <div className="ktimeline__event__title">Step Six</div>
                    <div className="ktimeline__event__description">
                      Lights, camera, interview! It's your time to shine. Show
                      off your skills and make a lasting impression!
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.callout}>
              Bravo! You've secured your dream career! Get ready to dive into
              your exciting new role, and make a splash in the professional
              world!
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Launchpad;
