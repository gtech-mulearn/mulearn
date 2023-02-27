import React from "react";
import styles from "./../Profile.module.css";

type Props = {};

const Karma = (props: Props) => {
  return (
    <div className={styles.karma}>
      <p className={styles.bg_img}></p>
      <div className={styles.flex_div}>
        <div className={styles.karma_coin_img_div}>
          <div className={styles.karma_coin_img}></div>
        </div>
        <div>
          <p>Karma Point</p>
          <p className={styles.karma_point}>10208</p>
        </div>
      </div>
    </div>
  );
};

export default Karma;
