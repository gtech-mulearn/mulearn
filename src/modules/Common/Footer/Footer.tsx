import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import styles from "./Footer.module.css";
import { useNavigate } from "react-router-dom";
import { useRedirectToApp } from "@/modules/utils/redirectToApp";

const Footer = () => {
  const navigate = useNavigate();
  const redirect = useRedirectToApp();
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
            <li><a href="https://gtechmulearn.medium.com/">Blog</a></li>
            <li><a href="/team">Team</a></li>
            <li><a href="https://mulearn.org/careers">Career Labs</a></li>
            <li><a className="cursor-pointer" onClick={() => redirect("dashboard/interestgroups")}>Interest Groups</a></li>
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
      </div>
      <div className={styles.footerBottom}>
        <div style={{ textAlign: 'center', marginTop: 16 }}>
          <div style={{ fontWeight: 600, fontSize: '1.1rem' }}>
            μLearn Foundation | Copyright © 2025 All rights reserved.
          </div>
          <div style={{ margin: '8px 0' }}>
            Technopark Phase 1, Thiruvananthapuram, Kerala - 695581
          </div>
          <div>
            <a href="mailto:info@mulearn.org" style={{ color: '#1976d2', textDecoration: 'none' }}>info@mulearn.org</a>
            {' | '}
            <a href="tel:+918943647000" style={{ color: '#1976d2', textDecoration: 'none' }}>+91 89436 47000</a>
            {' | '}
            <a href="https://www.mulearn.org" style={{ color: '#1976d2', textDecoration: 'none' }}>www.mulearn.org</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
