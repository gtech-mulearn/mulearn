import { background } from "@chakra-ui/react";
import styles from "./Textfield.module.css";
import React from "react";

const Textfield = (props: {
    content: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
    inputType: "text" | "number";
	setInput: React.Dispatch<React.SetStateAction<string>>
	input: string
}) => {

    return (
        <div
            className={styles.inputBox}
            style={props.style}
            onClick={props.onClick}
        >
            <input type={props.inputType} value={props.input} required onChange={(e) => {props.setInput(e.target.value)}}/>
            <span>{props.content}</span>
        </div>
    );
};

export default Textfield;
