import React from "react";
import styles from "./100C.module.css";
import Logo from "./Logo.png";
import LogoW from "./LogoW.png";


const Top100C = () => {
  return (
    <div className={styles.main_container}>
      <div className={styles.first_view_container}>
        <div className={styles.first_view}>
          <div className={styles.first_view_text}>
            {/* <p className={styles.fv_heading}>
              Top 100 Coders
            </p> */}
            <img className={styles.fv_heading} src={Logo} alt="" />
            <p className={styles.fv_tagline}>
              Kerala Startup Mission (KSUM) has launched the 'Top 100 Series'
              challenge in partnership with MuLearn, a tech talent-building
              platform by GTech. The initiative aims to identify and reward the
              top 100 coders through a three-level coding challenge over 45
              days, starting October 1, targeting global market opportunities.
            </p>
            <button className={styles.register}>
              <a href="https://www.mulearn.io/top100coders">Register Now</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Top100C;
