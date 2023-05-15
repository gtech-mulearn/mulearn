import React from "react";
import styles from "./../Profile.module.css";

type Props = {};

const Navbar = ({ name = "" }) => {
  return (
    <div className={styles.nav}>
      <p className={styles.logo}></p>
      <div className={styles.profile}>
        <p>{name}</p>
        <img src="https://whatsondisneyplus.com/wp-content/uploads/2021/12/merida-avatar-wodp.png" />
      </div>
    </div>
  );
};

export default Navbar;
