import { useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTask, getTaskDetails } from "./TaskApis";
import Form from "../../../../components/MuComponents/Form/Form";
import { TaskEditInterface } from "./TaskInterface";

type Props = {};

const TaskDelete = (props: Props) => {
    const [input, setInput] = useState<TaskEditInterface>({});
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
                title={`Are you sure you want to delete ${input.hashtag} ?`}
                handleSubmitClick={handleSubmit}
                cancelPath={"/tasks"}
            />
        </div>
    );
};

export default TaskDelete;
