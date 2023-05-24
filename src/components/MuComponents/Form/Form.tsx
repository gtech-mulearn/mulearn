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
                <center className={styles.inputContainer}>
                    <Textfield
                        content={"IG Name"}
                        inputType={"text"}
                        setInput={setInput}
                        input={input}
                    />
                </center>
                <MuButton
                    text={"Submit"}
                    className={styles.btn}
                    onClick={() => props.handleSubmitClick(input)}
                />
            </form>
        </div>
    );
};

export default Form;
