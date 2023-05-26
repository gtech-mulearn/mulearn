import { useEffect, useState } from "react";
import Form from "../../../../components/MuComponents/Form/Form";
import { editInterestGroups } from "./apis";
import { useParams } from "react-router-dom";

type Props = {};

const InterestGroupEdit = (props: Props) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");

	useEffect(() => {
		setInput1('Test')
	}, [])
	

	const formFields = [
        {
            content: "IG Name",
            inputType: "text",
            input: input1,
            setInput: setInput1
        },
        // {
        //     content: "1234",
        //     inputType: "text",
        //     input: input2,
        //     setInput: setInput2
        // },
        // {
        //     content: "8553",
        //     inputType: "text",
        //     input: input3,
        //     setInput: setInput3
        // }
    ];
	const {id} = useParams();
	const handleSubmit = () => {
		editInterestGroups(input1, id);
    };
    return (
        <div>
            <Form
                title={"Edit Name of Interest Group"}
                handleSubmitClick={handleSubmit}
                formFields={formFields}
            />
        </div>
    );
};

export default InterestGroupEdit;

