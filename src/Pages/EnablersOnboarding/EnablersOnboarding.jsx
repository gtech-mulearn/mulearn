import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./EnablersOnboarding.module.css";
import TermsAndConditionsModal from "../../Components/TermsAndConditionsModel/TermsAndConditionsModal";
 
import React from "react";

const EnablersOnboarding = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                {" "}
                <span>µLearn</span> Enablers and Mentors
              </p>
              <p className={styles.fv_tagline}>
                Our program involves contributions from individuals and
                organizations all working towards the goal of an Industry Ready
                Student.
              </p>
              <p className={styles.fv_secondtagline}>
                Mentors are the backbone of our Platform. Mentors create
                learning paths, help Enablers and Students to understand topics,
                and collate and curate Digital Content. Mentors also lead many
                initiatives within ATFG such as moderation, UI/UX design, bot
                development, etc
              </p>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/forms/d/e/1FAIpQLSe1pnerwvYeUOSUtVTJHDYD7eDkPtv69FsNP3iSu8gwI7euew/viewform"
              >
                <button className={styles.primary}>Join as Enabler</button>
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://docs.google.com/forms/d/e/1FAIpQLSfvyMA5f6ZUAfJMHoV81Nx6PlsM5F4krJzwP4fZWOIqx7XQ3w/viewform"
              >
                <button className={styles.primary}>Join as Mentor</button>
              </a>
            </div>
            <div className={styles.fv_images}>
              <img
                src="/assets/enablers/enablers.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>
      </div>
      
 <TermsAndConditionsModal />
      <Footer />
    </>
  );
};

export default EnablersOnboarding;
