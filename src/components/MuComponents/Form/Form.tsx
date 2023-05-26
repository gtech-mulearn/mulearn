import { useEffect, useState } from "react";
import { MuButton } from "../MuButtons/MuButton";
import Textfield from "../TextField/Textfield";
import styles from "./Form.module.css";

type Props = {
    title: string;
	input: string
    handleSubmitClick: any
};

const Form = (props: Props) => {
    const [input, setInput] = useState("");
	useEffect(() => {
        setInput(props.input)
    }, []);
    return (
        <div className={styles.container}>
            <form
                action=""
                onSubmit={() => props.handleSubmitClick(input)}
                className={styles.form}
            >
                <h1 className={styles.text}>{props.title}</h1>
                <br />
                <div className={styles.inputContainer}>
                    <Textfield
                        content={"IG Name"}
                        inputType={"text"}
                        setInput={setInput}
                        input={input}
                    />
                    <Textfield
                        content={"Description"}
                        inputType={"text"}
                        setInput={setInput}
                        input={input}
                    />
                    <Textfield
                        content={"Description"}
                        inputType={"text"}
                        setInput={setInput}
                        input={input}
                    />
                    <div className={styles.btn_container}>
                        <MuButton
                            text={"Decline"}
                            className={styles.btn_cancel}
                            onClick={() => props.handleSubmitClick(input)}
                        />
                        <MuButton
                            text={"Confirm"}
                            className={styles.btn_submit}
                            onClick={() => props.handleSubmitClick(input)}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Form;
