import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./In50Hours.module.css";
import Footer from "../../Components/Footer/Footer";
import heroImage from "./heroimg.png";
import supporters from "./supporters.png";

const In50Hours = () => {
  return (
    <>
      <Navbar />
      <div className={styles.mainContainer}>
        <div className={styles.firstSectionContainer}>
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
          </div>
          <img src={heroImage} alt="" className={styles.fsImage} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default In50Hours;
