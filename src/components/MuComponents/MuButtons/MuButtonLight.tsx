import React from "react";
import styles from "../MuComponents.module.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

const MuButtonLight = (props: {
  text: string;
  icon: ReactJSXElement;
  onClick?: React.MouseEventHandler;
}) => {
  return (
    <div className={styles.btn_light} onClick={props.onClick}>
      <div className={styles.btn_icon}>{props.icon}</div>
      <p>{props.text}</p>
    </div>
  );
};

export default MuButtonLight;
