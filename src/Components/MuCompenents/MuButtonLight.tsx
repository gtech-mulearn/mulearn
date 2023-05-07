import React from "react";
import styles from "./Mucompnents.module.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const MuButtonLight = (props: { text: string; icon: ReactJSXElement }) => {
  return (
    <div className={styles.btn_light}>
      <div className={styles.btn_icon}>{props.icon}</div>
      <p>{props.text}</p>
    </div>
  );
};

export default MuButtonLight;
