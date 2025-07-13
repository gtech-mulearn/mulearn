import { useState } from "react";
import MulearnBrand from "../../../../Dashboard/assets/MulearnBrand";
import { motion } from 'framer-motion';
import styles from "./Navbar.module.css";
import { useNavigate } from "react-router-dom";

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Navbar = ({ refreshToken }: { refreshToken: string | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  function NavLinks() {
    return (
      <>
        <li className="cursor-pointer" onClick={() => navigate("/")}>Home</li>
        <li className="cursor-pointer" onClick={() => navigate("/dashboard/search?activetab=mentors")}>Mentorship</li>
        <li className="cursor-pointer" onClick={() => navigate("/dashboard/mujourney")}>Learning Paths</li>
        <li className="cursor-pointer" onClick={() => navigate("/dashboard/learningcircle")}>Learning Circles</li>
        <li className="cursor-pointer" onClick={() => navigate("/team")}>Team</li>
        <li className="cursor-pointer" onClick={() => window.open("https://www.youtube.com/watch?v=qEILjuB7oPk&feature=youtu.be", "_blank")}>
          Why μLearn
        </li>
        <li className="cursor-pointer" onClick={() => window.open("https://mulearn.org", "_blank")}>
          Visit the Old Site
        </li>
      </>
    );
  }

  return (
    <motion.nav
      className={styles.navbar}
      variants={fadeInUp}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className={styles.logo}>
        <MulearnBrand />
      </div>
      <ul className={styles.navLinks}>
        <NavLinks />
      </ul>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div className={styles.navButtons}>
          {refreshToken ? (
            <button
              className={`${styles.loginBtn} ${styles.logInDesktop}`}
              onClick={() => navigate("/dashboard/home")}
            >
              Dashboard
            </button>
          ) : (
            <button
              className={`${styles.loginBtn} ${styles.logInDesktop}`}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          )}
        </div>
        {isMenuOpen && (
          <motion.div
            className={`${styles.mobileNavLinks} ${isMenuOpen ? styles.sh : ""}`}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsMenuOpen(false)}
            >
              ×
            </button>
            <ul>
              <NavLinks />
            </ul>
            <div className={styles.navButtons}>
              {refreshToken ? (
                <button
                  className={styles.loginBtn}
                  onClick={() => navigate("/dashboard/home")}
                >
                  Dashboard
                </button>
              ) : (
                <button
                  className={styles.loginBtn}
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              )}
            </div>
          </motion.div>
        )}
        <div
          className={styles.hamburger}
          onClick={() => setIsMenuOpen(true)}
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </motion.nav>
  )
}

export default Navbar