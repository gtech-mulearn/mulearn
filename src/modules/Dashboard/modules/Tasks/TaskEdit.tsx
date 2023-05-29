import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../../components/MuComponents/Form/Form";
import { editTask, getTaskDetails } from "./TaskApis";

type Props = {};

const TaskEdit = (props: Props) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");
    const [input6, setInput6] = useState("");
    const [input7, setInput7] = useState("");
    const [input8, setInput8] = useState("");
    const { id } = useParams();
    useEffect(() => {
        // getTaskDetails(id, setInput);
    }, []);

	const inputFields = [
        {
            content: "Hashtag",
            inputType: "text",
            input: input1,
            setInput: setInput1
        },
        {
            content: "Title",
            inputType: "text",
            input: input2,
            setInput: setInput2
        },
        {
            content: "Karma",
            inputType: "number",
            input: input3,
            setInput: setInput3
        },
        {
            content: "Usage Count",
            inputType: "number",
            input: input6,
            setInput: setInput6
        }
    ];
	const dropdownFields = [
        {
            contents: ["1", "0"],
            input: input7,
            setInput: setInput7,
            label: "Active",
            default: "Select"
        },
        {
            contents: ["1", "0"],
            input: input8,
            setInput: setInput8,
            label: "Variable Karma",
            default: "Select"
        }
    ];

    const navigate = useNavigate();
    const handleSubmit = () => {
        editTask(input1, input2, input3, input6, input7, input8, id);
        navigate("/tasks");
    };
    return (
        <div>
            <Form
                title={"Edit Task"}
                handleSubmitClick={handleSubmit}
                inputFields={inputFields}
                cancelPath={"/tasks"}
                dropdownFields={dropdownFields}
            />
        </div>
    );
};

export default TaskEdit;
