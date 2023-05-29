import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../../components/MuComponents/Form/Form";
import { createTask } from "./TaskApis";

type Props = {};

const TaskCreate = (props: Props) => {
    const [hastag, setHashtag] = useState("");
    const [title, setTitle] = useState("");
    const [karma, setKarma] = useState("");
    const [usage_count, setUsage_count] = useState("");
    const [variable_karma, setVariable_karma] = useState("");
    const [active, setActive] = useState("");
    const [description, setDescription] = useState("");
    const [channel_id, setChannel_id] = useState("");
    const [type_id, setType_id] = useState("");
    const [level_id, setLevel_id] = useState("");
    const [ig_id, setIg_id] = useState("");
	
    const inputFields = [
        {
            content: "Hashtag",
            inputType: "text",
            input: hastag,
            setInput: setHashtag
        },
        {
            content: "Title",
            inputType: "text",
            input: title,
            setInput: setTitle
        },
        {
            content: "Karma",
            inputType: "number",
            input: karma,
            setInput: setKarma
        },
        {
            content: "Usage Count",
            inputType: "number",
            input: usage_count,
            setInput: setUsage_count
        },
        {
            content: "Description",
            inputType: "text",
            input: description,
            setInput: setDescription
        },
        {
            content: "Channel ID",
            inputType: "number",
            input: channel_id,
            setInput: setChannel_id
        },
        {
            content: "Type ID",
            inputType: "number",
            input: type_id,
            setInput: setType_id
        },
        {
            content: "Level ID",
            inputType: "number",
            input: level_id,
            setInput: setLevel_id
        },
        {
            content: "IG ID",
            inputType: "number",
            input: ig_id,
            setInput: setIg_id
        },
    ];
    const dropdownFields = [
        {
            contents: ["1", "0"],
            input: active,
            setInput: setActive,
            label: "Active",
            default: "Select"
        },
        {
            contents: ["1", "0"],
            input: variable_karma,
            setInput: setVariable_karma,
            label: "Variable Karma",
            default: "Select"
        }
    ];

    const navigate = useNavigate();
    const handleSubmit = () => {
        createTask(
            hastag,
            title,
            karma,
            usage_count,
            active,
            variable_karma,
            description,
            channel_id,
            type_id,
            level_id,
            ig_id
        );
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

export default TaskCreate;
