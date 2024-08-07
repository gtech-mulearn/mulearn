import React from "react";
import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const Footer = () => {
  return (
    <div className={styles.mainfooter_container}>
      <div className={styles.footer_container}>
        <div className={styles.first_section}>
          <div className={styles.fs_leftside}>
            <img
              src="/assets/footer/µLearn-white.webp"
              alt=""
              className={styles.mulearn}
            />

            <div className={styles.links}>
              <a href="https://mulearn.org/careers">
                <p className={styles.link}>Career Labs</p>
              </a>
              <a href="https://gtechmulearn.medium.com/">
                <p className={styles.link}>Blog</p>
              </a>
              <a
                href="https://learn.mulearn.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <p className={styles.link}>Interest Groups</p>
              </a>
            </div>
            <div className={`${styles.links_mobile} ${styles.larger_screen}`}>
              <Link to={"/termsandconditions"} onClick={scrollTop}>
                <p className={styles.link}>Terms and Condition</p>
              </Link>
              <Link to={"/privacypolicy"} onClick={scrollTop}>
                <p className={styles.link}>Privacy Policy</p>
              </Link>
            </div>
          </div>

          <div className={styles.fs_rightside}>
            <a
              href="https://mulearn.org/r/whatsapp-community"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/footer/whatsapp.svg"
                alt="li"
                className={styles.social}
              />
            </a>
            <a
              href="http://twitter.com/GtechMulearn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/footer/twitter.webp"
                alt=""
                className={styles.social}
              />
            </a>
            <a
              href="https://www.instagram.com/mulearn.official/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/footer/instagram.webp"
                alt="ig"
                className={styles.social}
              />
            </a>
            <a
              href="http://www.linkedin.com/company/gtechmulearn/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/footer/linkedin.webp"
                alt="li"
                className={styles.social}
              />
            </a>

            <a
              href="https://www.youtube.com/c/mulearn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/footer/youtube.webp"
                alt="yt"
                className={styles.social}
              />
            </a>
            <a
              href="http://www.facebook.com/gtechmulearn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="/assets/footer/facebook.webp"
                alt="fb"
                className={styles.social}
              />
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

              <p className={styles.mail}>
                <a href="mailto:info@mulearn.org">info@mulearn.org</a>
              </p>
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
      <div className={styles.bottomcopyright}>
        <div className={styles.line2}></div>
        <p>µLearn Foundation | Copyright © 2023 All rights reserved.</p>
      </div>
    </div>
  );
};

export default Footer;
