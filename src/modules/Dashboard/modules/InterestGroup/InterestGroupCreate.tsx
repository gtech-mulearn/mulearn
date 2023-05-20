import { SetStateAction, useState } from "react";
import Textfield from "../../../../components/MuComponents/TextField/Textfield";
import { createInterestGroups } from "./apis";
import styles from "./InterestGroup.module.css";
import { useToast } from "@chakra-ui/react";
import { MuButton } from "../../../../components/MuComponents/MuButtons/MuButton";

type Props = {};

export const InterestGroupCreate = (props: Props) => {
    const [input, setInput] = useState("");
    const toast = useToast();

    const handleSubmit = (e: any) => {
		if (input !== ''){
			e.preventDefault();
			setInput('')
			createInterestGroups(input, toast);
		}
		else {
			console.log("IG name cannot be blank")
		}
    };

    return (
        <div className={styles.container}>
            <form action="" onSubmit={handleSubmit} className={styles.form}>
                <h1 className={styles.text}>Create a new Interest Group</h1>
                <br />
				<center className={styles.inputContainer}>
					<Textfield
						content={"IG Name"}
						inputType={"text"}
						setInput={setInput}
						input={input}
						/>
				</center>
				<MuButton text={"Submit"} className={styles.btn} onClick={handleSubmit} />
            </form>
        </div>
    );
};
