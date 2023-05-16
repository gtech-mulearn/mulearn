import React, { ReactFragment } from "react";
import styles from "./MuComponents.module.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export const MuButton = (props: {
    text: string;
    icon?: ReactJSXElement;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
}) => {
    return (
        <div className={styles.btn} style={props.style} onClick={props.onClick}>
            <div className={styles.btn_icon}>{props.icon}</div>
            <p>{props.text}</p>
        </div>
    );
};

// dropdown button

export const DropDownButtons = (props: {
    text: string;
    icon?: ReactJSXElement;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
    listOfDropBtn?: { [key: string]: any }[];
    display?: string;
}) => {
    return (
        <div className={styles.dropdown_btn_container}>
            <div
                className={styles.dropdown_btn}
                style={props.style}
                onClick={props.onClick}
            >
                <div className={styles.btn_icon}>{props.icon}</div>
                <p>{props.text}</p>
            </div>
            <div
                className={styles.drop_view}
                style={{ maxHeight: props.display === "0" ? "0" : "300px" }}
            >
                {props.listOfDropBtn?.map(btn => {
                    return (
                        <div
                            className={styles.btn}
                            // style={btn.style}
                            // onClick={btn.onClick}
                        >
                            <p>{btn.text}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
