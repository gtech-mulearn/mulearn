import { useEffect, useState } from "react";
import { MuButton } from "../MuButtons/MuButton";
import Textfield from "../TextField/Textfield";
import styles from "./Form.module.css";
import { Navigate } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";

type Props = {
    title: string;
    handleSubmitClick: any;
    inputFields?: {
        content: string;
        inputType: string;
        input: string;
        setInput: React.Dispatch<React.SetStateAction<string>>;
    }[];
    dropdownFields?: {
        contents: string[];
        input: string;
        setInput: React.Dispatch<React.SetStateAction<string>>;
        label: string;
        default?: string;
    }[];
};

const Form = (props: Props) => {
	
    return (
        <div className={styles.container}>
            <form
                action=""
                onSubmit={() => props.handleSubmitClick()}
                className={styles.form}
            >
                <h1 className={styles.text}>{props.title}</h1>
                <br />
                <div className={styles.inputContainer}>
                    {props.inputFields &&
                        props.inputFields.map(field => (
                            <Textfield
                                content={field.content}
                                inputType={field.inputType}
                                setInput={field.setInput}
                                input={field.input}
                            />
                        ))}
                    {props.dropdownFields &&
                        props.dropdownFields.map(field => (
                            <Dropdown
                                contents={field.contents}
                                label={field.label}
                                setInput={field.setInput}
                                input={field.input}
                            />
                        ))}
                    <div className={styles.btn_container}>
                        <MuButton
                            text={"Decline"}
                            className={styles.btn_cancel}
                            // onClick={() => Navigate}
                        />
                        <MuButton
                            text={"Confirm"}
                            className={styles.btn_submit}
                            onClick={() => props.handleSubmitClick()}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
