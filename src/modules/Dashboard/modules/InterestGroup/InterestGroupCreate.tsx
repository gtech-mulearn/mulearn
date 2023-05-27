import { useState } from "react";
import { createInterestGroups } from "./apis";
import styles from "./InterestGroup.module.css";
import { useToast } from "@chakra-ui/react";
import Form from "../../../../components/MuComponents/Form/Form";
import { useNavigate } from "react-router-dom";

type Props = {};

export const InterestGroupCreate = (props: Props) => {
    const [input, setInput] = useState("");
    const toast = useToast();
	const navigate = useNavigate();

    const handleSubmit = () => {
		if (input !== ''){
			createInterestGroups(input, toast);
			setInput('')
		}
		else {
			console.log("IG name cannot be blank")
		}
		navigate("/interest-groups");
    };

	const inputFields = [
        {
            content: "IG Name",
            inputType: "text",
            input: input,
            setInput: setInput
        },
	]

    return (
        <div className={styles.container}>
            <Form
                title={"Create a new Interest Group"}
                handleSubmitClick={handleSubmit}
                inputFields={inputFields}
                cancelPath={"/interest-groups"}
            />
        </div>
    );
};
