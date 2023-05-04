import React, { ReactFragment } from "react";
import styles from "./Mucompnents.module.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
type Props = {};

const MuButton = (props:{text:string, icon:ReactJSXElement}) => {
  return (
    <div className={styles.btn}>
      <div className={styles.btn_icon}>{props.icon}</div>
      <p>{props.text}</p>
    </div>
  );
};

export default MuButton;
