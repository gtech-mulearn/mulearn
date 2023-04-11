import React from "react";
import styles from "./../Profile.module.css";

type Props = {};

const Karma = ({ karma = 0 }) => {
  return (
    <div className={styles.karma}>
      <p className={styles.bg_img}></p>
      <div className={styles.flex_div}>
        <div className={styles.karma_coin_img_div}>
          <div className={styles.karma_coin_img}></div>
        </div>
        <div>
          <p>Karma Point</p>
          <p className={styles.karma_point}>{karma}</p>
        </div>
      </div>
    </div>
  );
};

export default Karma;
