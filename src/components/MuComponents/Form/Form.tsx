import react from "react";
import { MuButton } from "../MuButtons/MuButton";
import Textfield from "../TextField/Textfield";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import Dropdown from "@Mulearn/Dropdown/Dropdown";

/*
TODO: Verify the Relevance of This File
*/
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
    cancelPath: string;
};

const Form = (props: Props) => {
    const navigate = useNavigate();

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
                            onClick={() => {
                                navigate(props.cancelPath);
                            }}
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
