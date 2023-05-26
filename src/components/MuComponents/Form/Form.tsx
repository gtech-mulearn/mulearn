import { useEffect, useState } from "react";
import { MuButton } from "../MuButtons/MuButton";
import Textfield from "../TextField/Textfield";
import styles from "./Form.module.css";
import { Navigate } from "react-router-dom";
import Dropdown from "../Dropdown/Dropdown";

type Props = {
    title: string;
    handleSubmitClick: any;
    formFields?: {
        content: string;
        inputType: string;
        input: string;
        setInput: React.Dispatch<React.SetStateAction<string>>;
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
                    {props.formFields &&
                        props.formFields.map(field => (
                            <Textfield
                                content={field.content}
                                inputType={field.inputType}
                                setInput={field.setInput}
                                input={field.input}
                            />
                        ))}
					<Dropdown contents={["1", '2', '3']} label={"Testing"}/>
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
