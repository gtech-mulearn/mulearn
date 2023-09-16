import React, { ReactNode, useState } from "react";
import styles from "./MuButtons.module.css";
import { ClipLoader } from "react-spinners";
import { Spinner } from '@chakra-ui/react'
import { LuCheck } from "react-icons/lu";

/**
 * TODO: Make Single and Powerful Button Component(Multi-Purpose)
 * TODO: Remove unused buttons
 */

export const MuButton = (props: {
    text: string; // text of button
    type?: "button" | "submit" | "reset"; // type of button
    icon?: JSX.Element; // button icon
    style?: React.CSSProperties; // button style if wanted
    className?: string; // button class name if wanted
    onClick?: React.MouseEventHandler; // onclick event if wanted
    onSubmit?: any;
    isLoading?: boolean; // show loading spinner if neccessary.
    disabled?: boolean; //disable the button if needed
    buttonUrl?: string; // for styling purposes
    submit?: boolean; // for styling purposes
    isMinWidth?: boolean;
}) => {
    return (
        <button
            className={props.className ? props.className : styles.btn}
            style={{
                background:
                    `${props.buttonUrl}` === window.location.pathname
                        ? "#DEE6FF"
                        : "",
                color:
                    `${props.buttonUrl}` === window.location.pathname
                        ? "#5570F1"
                        : "",
                width: props.isMinWidth ? "fit-content" : "",
                ...props.style
            }}
            onClick={props.onClick}
            onSubmit={props.onSubmit}
            disabled={props.disabled}
            type={props.type ? props.type : "button"}
        //When there are more than two button with type submit
        //pressing enter wont submit the form
        //buttons default to submit if left undefined
        >
            {props.icon && <div className={styles.btn_icon}>{props.icon}</div>}
            <span>{props.text}</span>
            {props.isLoading && (
                <ClipLoader
                    size={20}
                    color="#ff"
                    className={styles.btn_loader}
                />
            )}
        </button>
    );
};

export const SingleButton = (props: {
    text: string; // text of main button
    icon?: JSX.Element; // main button icon
    style?: React.CSSProperties; // main button style if wanted
    onClick?: React.MouseEventHandler; // onclick event if wanted
    link?: string;
}) => {
    return (
        <div className={styles.createBtnContainer} style={props.style}>
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
};

type Props = {
    text: string;
    type?: any;
    onHoverBackground?: string;
    onHoverColor?: string;
    backgroundColor?: string;
    color?: string;
    onButtonClick?: any;
    margin?: string;
    padding?: string;
    "font-size"?: string;
    borderColor?: string;
    icon?: JSX.Element;
    isLoading?: boolean; // show loading spinner if necessary.
    disabled?: boolean;
};

type Variants =
    | "primary"
    | "secondary"
    | "ghost"
    | "outline"
    | "destructive"
    | "success"
    | "link"
    | "draft";


type ButtonProps = ({ children, className, variant, style, isLoading, ...props }:
    { children: ReactNode, className?: string, variant?: Variants, isLoading?: boolean, style?: React.CSSProperties } & React.ButtonHTMLAttributes<HTMLButtonElement>) => JSX.Element

export const PowerfulButton: ButtonProps = ({ children, className = "", variant = "primary", style, isLoading, ...props }) => {
    const variantName = variant ? styles[`${variant}-btn`] : ""

    return <button disabled={isLoading !== undefined ? isLoading : false} className={styles["common-btn"] + "  " + variantName + " " + className}
        {...props} style={style}>
        {children}
        {isLoading !== undefined &&
            (isLoading ?
                <Spinner
                    thickness='3px'
                    speed='0.6s'
                    size={"md"}
                    color="currentcolor"
                    marginLeft={"1"}
                />
                : <></>) // <LuCheck size={"20px"} />)
        }
    </button>
}