import React from "react";
import styles from "./Footer.module.css";
import µLearn from "./assets/µLearn.png";

import instagram from "./assets/instagram.png";
import twitter from "./assets/twitter.png";
import youtube from "./assets/youtube.png";
import linkedin from "./assets/linkedin.png";
import facebook from "./assets/facebook.png";
import { Testimonail } from "./Testimonial";

const Footer = () => {
  return (
    <>
    <Testimonail /><div className={styles.mainfooter_container}>
      <div className={styles.footer_container}>
        <div className={styles.first_section}>
          <div className={styles.fs_leftside}>
            <img src={µLearn} alt="" className={styles.mulearn} />

            <div className={styles.links}>
              <a
                href="https://careers.mulearn.org/"
              >
                <p className={styles.link}>Career Labs</p>
              </a>
              <a
                href="https://gtechmulearn.medium.com/"
              >
                <p className={styles.link}>Blog</p>
              </a>
              <a
                href="https://events.mulearn.org/"
              >
                <p className={styles.link}>Events</p>
              </a>
            </div>
          </div>

          <div className={styles.fs_rightside}>
            <a
              href="http://twitter.com/GtechMulearn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img src={twitter} alt="" className={styles.social} />
            </a>
            <a
              href="http://www.instagram.com/gtechmulearn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <img src={instagram} alt="" className={styles.social} />
            </a>
            <a
              href="http://www.linkedin.com/company/gtechmulearn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="" className={styles.social} />
            </a>
            <a
              href="https://www.youtube.com/c/mulearn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={youtube} alt="" className={styles.social} />
            </a>
            <a
              href="http://www.facebook.com/gtechmulearn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={facebook} alt="" className={styles.social} />
            </a>
          </div>
        </div>

        <div className={styles.line}></div>

        <div className={styles.bottom_section}>
          <div className={styles.address_container}>
            <div className={styles.fleft_side}>
              <p className={styles.address}>
                Technopark Trivandrum, Kazhakkoottam, Trivandrum - 695581,
                Kerala, India
              </p>

              <p className={styles.mail}>Mail Us: mulearn@gtechindia.org</p>
            </div>
          </div>

          {/* <div className={styles.fright_side}>
      <div class={styles.fsection2}>
        <div class={styles.newsletter}>
          <p class={styles.fheadingtext}>Join Our Mailing List</p>
          <p class={styles.fparagraph}>
            Join Our Mailing List Be the first to know about upcoming
            coding workshops, new coding tools, and other Mulearn related
            news.
          </p>

          <div class={styles.invite_container}>
            <input type="email" placeholder="Enter your email" />
            <button>Join</button>
          </div>
        </div>
      </div>
    </div> */}
        </div>
      </div>
    </div></>
  );
};

export default Footer;
