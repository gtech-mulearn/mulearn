import React, { ReactNode } from "react";
import styles from "./MuButtons.module.css";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ClipLoader } from "react-spinners";

// normal button
// need text for button

/**
 * TODO: Make Single and Powerful Button Component(Multi-Purpose)
 */

export const MuButton = (props: {
    text: string; // text of button
    icon?: ReactJSXElement; // button icon
    style?: React.CSSProperties; // button style if wanted
    className?: string; // button class name if wanted
    onClick?: React.MouseEventHandler; // onclick event if wanted
    isLoading?: boolean;// show loading spinner if neccessary.
    disabled?: boolean;//disable the button if needed
}) => {
    return (
        <button
            className={props.className ? props.className : styles.btn}
            style={props.style}
            onClick={props.onClick}
            disabled={props.disabled}
        >

            {props.icon && <div className={styles.btn_icon}>{props.icon}</div>}
            <span>{props.text}</span>
            {props.isLoading && <ClipLoader size={20} color="#ff" className={styles.btn_loader} />}
        </button>
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
    listOfDropBtn?: ReactNode[]; // list of text for sub buttons and the count of button will calculate by this
    display?: string; // this is for hide and display the sub buttons
}) => {
    return (
        <div className={styles.dropdown_btn_container}>
            <div
                className={styles.dropdown_btn}
                style={{
                    ...props.style,
                    marginBottom: props.display === "0" ? "" : "4px",
                }}
                onClick={props.onClick}
            >
                <div className={styles.btn_icon}>{props.icon}</div>
                <p>{props.text}</p>
            </div>
            <div
                className={styles.drop_view}
                style={{ maxHeight: props.display === "0" ? "0" : "300px" }}
            >
                {props.listOfDropBtn?.map((btn) => btn)}
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
