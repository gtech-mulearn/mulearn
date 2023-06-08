import React, { ReactFragment } from "react";
import styles from "./MuButtons.module.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

// normal button
// need text for button

export const MuButton = (props: {
    text: string; // text of button
    icon?: ReactJSXElement; // button icon
    style?: React.CSSProperties; // button style if wanted
    className?: string; // button class name if wanted
    onClick?: React.MouseEventHandler; // onclick event if wanted
}) => {
    return (
        <div
            className={props.className ? props.className : styles.btn}
            style={props.style}
            onClick={props.onClick}
        >
            <div className={styles.btn_icon}>{props.icon}</div>
            <p>{props.text}</p>
        </div>
    );
};

export const MuButtonLight = (props: {
    text: string; // text of button
    icon?: ReactJSXElement; // button icon
    style?: React.CSSProperties; // button style if wanted
    className?: string; // button class name if wanted
    onClick?: React.MouseEventHandler; // onclick event if wanted
}) => {
    return (
        <div
            className={props.className ? props.className : styles.btn_light}
            style={props.style}
            onClick={props.onClick}
        >
            <div className={styles.btn_icon}>{props.icon}</div>
            <p>{props.text}</p>
        </div>
    );
};

// dropdown button
// need texts of main button and texts of sub buttons

export const DropDownButtons = (props: {
    text: string; // text of main button
    icon?: ReactJSXElement; // main button icon
    style?: React.CSSProperties; // main button style if wanted
    onClick?: React.MouseEventHandler; // onclick event if wanted
    listOfDropBtn?: { [key: string]: any }[]; // list of text for sub buttons and the count of button will calculate by this
    display?: string; // this is for hide and display the sub buttons
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
                {props.listOfDropBtn?.map((btn, i) => {
                    return (
                        <div
                            key={i}
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

export const SingleButton = (props: {
    text: string; // text of main button
    icon?: ReactJSXElement; // main button icon
    style?: React.CSSProperties; // main button style if wanted
    onClick?: React.MouseEventHandler; // onclick event if wanted
	link?: string;
}) => {
	return (
        <div className={styles.createBtnContainer}>
            <a href={props.link} target="_blank">
                <MuButton
                    className={styles.createBtn}
                    text={props.text}
                    icon={props.icon}
                    onClick={props.onClick}
                />
            </a>
        </div>
    );
}
