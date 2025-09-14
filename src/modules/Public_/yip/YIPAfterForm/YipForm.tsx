import React from "react";
import img from "../assets/yipform.svg";

import styles from "./YipForm.module.css";

const YipForm = () => {
  return (
    <div>
      <div className={styles.content}>
        <h2>
          Engage more student participation from your campuses for a chance to
          grab <span>exciting awards</span> for best performing colleges.
        </h2>
        <img src={img} alt="Team Work" />
        <br />
        <a href="/" target="_blank" rel="noopener noreferrer">
          <button>Check It Out Now!</button>
        </a>
      </div>
    </div>
  );
};

export default YipForm;
