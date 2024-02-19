import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./In50Hours.module.css";
import Footer from "../../Components/Footer/Footer";
import heroImage from "./heroimg.png";
import supporters from "./supporters.png";
import tsImage from "./tsimg.png";
import makemyPass from "./makemypass.png";

const In50Hours = () => {
  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.firstSectionContainer}>
          <img src={heroImage} alt="" className={styles.fsImage} />
          <div className={styles.fsTexts}>
            <p className={styles.fsHeading}>
              IN<span>50</span>HOURS
            </p>
            <p className={styles.fsTagline}>
              Get ready to hack your way to success in just 50 hours at In50Hr!
              Dive into a whirlwind of innovation, collaboration, and
              caffeine-fueled brilliance!
            </p>
            <p className={styles.supportedBy}>Supported By</p>
            <img src={supporters} alt="" className={styles.supporters} />
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.makemypass.com/in50hours"
            >
              <button className={styles.register}>Register Now</button>
            </a>
          </div>
        </div>
        <div className={styles.secondSectionContainer}>
          <div className={styles.steps}>
            <div className={styles.step}>
              <p className={styles.stepHeading}>
                P<span>IT</span>CH
              </p>
              <p className={styles.stepTagline}>
                Pitch your boldest ideas and captivate them all in just minutes.{" "}
              </p>
            </div>
            <div className={styles.step}>
              <p className={styles.stepHeading}>
                PRO<span>TO</span>TYPE
              </p>
              <p className={styles.stepTagline}>
                Dive into the hustle and bustle of collaboration as teams form
                and dive headfirst into building their prototypes.
              </p>
            </div>
            <div className={styles.step}>
              <p className={styles.stepHeading}>
                <span>GET</span> FUNDED
              </p>
              <p className={styles.stepTagline}>
                Pitch your boldest ideas and captivate them all in just minutes.{" "}
              </p>
            </div>
          </div>
        </div>

        <div className={styles.thirdSectionContainer}>
          <div className={styles.tsTexts}>
            <p className={styles.tsHeading}>
              HOW <span>TO</span> JOIN
            </p>
            <p className={styles.tsTagline}>
              If you are already into the level 5, you can participate in the
              event completely free of cost. If you are not, you can still
              participate by paying a nominal fee of INR 1000.
            </p>
            <p className={styles.supportedBy}>Ticketing Partner</p>
            <img src={makemyPass} alt="" className={styles.tsImage} />{" "}
          </div>
        </div>
        <div className={styles.steps}>
          <div className={styles.step}>
            <p className={styles.stepHeading}>
              STEP <span>1</span>
            </p>
            <p className={styles.stepTagline}>
              Collect your coupons, got to the to In-50hr-Challenge and type
              <strong> /get-in50hours-coupon</strong> to get your coupon code.
            </p>
          </div>
          <div className={styles.step}>
            <p className={styles.stepHeading}>
              STEP <span>2</span>
            </p>
            <p className={styles.stepTagline}>
              <strong>Go to MakeMyPass.com </strong> and register for the event
              using the coupon code. In case you are not in level 5, you can pay
              and register.
            </p>
          </div>
          <div className={styles.step}>
            <p className={styles.stepHeading}>
              STEP <span>3</span>
            </p>
            <p className={styles.stepTagline}>
              You will receive a confirmation mail having the ticket for joining
              the event on the 23rd of February.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default In50Hours;
