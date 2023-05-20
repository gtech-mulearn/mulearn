import { SetStateAction, useState } from "react";
import Textfield from "../../../../components/MuComponents/TextField/Textfield";
import { createInterestGroups } from "./apis";
import styles from "./InterestGroup.module.css";
import { useToast } from "@chakra-ui/react";

type Props = {};

export const InterestGroupCreate = (props: Props) => {
    const [input, setInput] = useState("");
    const toast = useToast();

    const handleSubmit = (e: any) => {
        e.preventDefault();
		setInput('')
        createInterestGroups(input, toast);
    };

    return (
        <div className={styles.container}>
            <form action="" onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.text}>Create a new Interest Group</h1>
                <br />
                <Textfield
                    content={"Name"}
                    inputType={"text"}
                    setInput={setInput}
                    input={input}
                />
            </form>
        </div>
    );
};
