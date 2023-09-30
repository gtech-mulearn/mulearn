import React from "react";
import styles from "./100C.module.css";
import Logo from "./Logo.png";
import LogoW from "./LogoW.png";
import Hacker from "./Hacker.png";
import comb from "./comb.png";

const Top100C = () => {
  return (
    <div className={styles.main_container}>
      <nav>
        <div className={styles.navbar}>
          <img src={Logo} alt="" className={styles.nav_logo1} />
          <div className={styles.links}>
            <p className={styles.link}>About</p>
            <p className={styles.link}>How To</p>
            <p className={styles.link}>Join Now</p>
          </div>
          <img src={comb} alt="" className={styles.nav_logo2} />
        </div>
      </nav>
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
      <div className={styles.second_view_container}>
        <div className={styles.second_view}>
          <div className={styles.sv_heading}>Steps of the Challenge</div>
          <div className={styles.sv_steps}>
            <div className={styles.step}>
              <p className={styles.number}>30 Days</p>
              <p className={styles.text}>Portfolio Building</p>
            </div>
            <div className={styles.step}>
              <p className={styles.number}>10 Days</p>
              <p className={styles.text}>Timed Challenges</p>
            </div>

            <div className={styles.step}>
              <p className={styles.number}>3 Days</p>
              <p className={styles.text}>Deep Assessment</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.third_view_container}>
        <div className={styles.third_view}>
          <div className={styles.thrid_view_text}>
            <p className={styles.tv_heading}>Huddle Super Coders</p>
            <p className={styles.tv_tagline}>
              Kerala's Top 100 Coders, a highlight of Huddle Global 2023, aims
              to identify the state's top tech talents. This initiative seeks to
              connect these individuals with startups and the industry,
              fostering a vibrant startup ecosystem in Kerala. By linking
              skilled talents with investors and startups, Kerala aims to create
              a resourceful army targeting the global tech market.
            </p>
          </div>
          <div className={styles.third_view_image}>
            <img className={styles.third_view_img} src={Hacker} alt="" />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <div className={styles.footer_text}>
          <img className={styles.footer_logo} src={LogoW} alt="" />
          <hr />
          <img className={styles.footer_logo} src={comb} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Top100C;
