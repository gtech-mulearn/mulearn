import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate()
  return (
    <motion.footer
      className={styles.footer}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><a href="https://mulearn.org/careers">Career Labs</a></li>
            <li><a href="https://gtechmulearn.medium.com/">Blog</a></li>
            <li><a className="cursor-pointer" onClick={() => navigate("dashboard/interestgroups")}>Interest Groups</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Legal</h3>
          <ul>
            <li><a href="/termsandconditions">Terms and Conditions</a></li>
            <li><a href="/privacypolicy">Privacy Policy</a></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="http://www.linkedin.com/company/gtechmulearn/"><FaLinkedin /></a>
            <a href="https://www.instagram.com/mulearn.official/"><FaInstagram /></a>
            <a href="https://www.youtube.com/c/mulearn"><FaYoutube /></a>
            <a href="http://www.facebook.com/gtechmulearn"><FaFacebook /></a>
          </div>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact</h3>
          <p>Technopark Trivandrum, Kazhakkoottam,</p>
          <p>Trivandrum - 695581, Kerala, India</p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
