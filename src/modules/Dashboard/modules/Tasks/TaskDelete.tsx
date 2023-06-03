import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTaskDetails } from "./TaskApis";
import Form from "../../../../components/MuComponents/Form/Form";

type Props = {};

const TaskDelete = (props: Props) => {
    const [input, setInput] = useState("");
    const { id } = useParams();
    const toast = useToast();
    useEffect(() => {
        getTaskDetails(id, setInput);
    }, []);
    const navigate = useNavigate();
    const handleSubmit = () => {
        deleteTask(id, toast);
        navigate("/tasks");
    };
    return (
        <div>
            <Form
                title={`Are you sure you want to delete ${input} ?`}
                handleSubmitClick={handleSubmit}
                cancelPath={"/interest-groups"}
            />
        </div>
    );
};

export default TaskDelete;
