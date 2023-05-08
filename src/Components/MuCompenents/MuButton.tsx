import React, { ReactFragment } from "react";
import styles from "./Mucompnents.module.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";


const MuButton = (props:{text:string, icon?:ReactJSXElement, style?: React.CSSProperties, onClick?: React.MouseEventHandler;}) => {
  return (
    <div className={styles.btn} style={props.style} onClick={props.onClick}>
      <div className={styles.btn_icon}>{props.icon}</div>
      <p>{props.text}</p>
    </div>
  );
};

export default MuButton;
