import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbar_container}>
      <div className={styles.navbar}>
        <p className={styles.link}>Career Labs</p>
        <p className={styles.headertext}>µLearn</p>
        <p className={styles.link}>Our Team</p>
      </div>
    </div>
  );
};

export default Navbar;
