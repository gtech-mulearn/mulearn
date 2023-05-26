import { background } from "@chakra-ui/react";
import styles from "./Textfield.module.css";
import React from "react";

const Textfield = (props: {
    content: string;
    style?: React.CSSProperties;
    onClick?: React.MouseEventHandler;
    inputType: string;
    setInput?: React.Dispatch<React.SetStateAction<string>>;
    input: string;
}) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.setInput) {
            props.setInput(e.target.value);
        }
    };

    return (
        <div
            className={styles.inputBox}
            style={props.style}
            onClick={props.onClick}
        >
			<span>{props.content}</span>
            <input
                type={props.inputType}
                value={props.input}
                required
                onChange={handleInputChange}
            />
        </div>
    );
};

export default Textfield;
