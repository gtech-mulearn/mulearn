import { useEffect, useState } from "react";
import { deleteManageUsers, getManageUsersDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../../components/MuComponents/Form/Form";
import { useToast } from "@chakra-ui/react";

type Props = {};

const ManageUsersDelete = (props: Props) => {
    const [input, setInput] = useState("");
    const { id } = useParams();
    const toast = useToast();
    useEffect(() => {
        getManageUsersDetails(id, setInput);
    }, []);
    const navigate = useNavigate();
    const handleSubmit = () => {
        deleteManageUsers(id, toast);
        navigate("/manage-users");
    };
    return (
        <div>
            <Form
                title={`Are you sure you want to delete ${input} ?`}
                handleSubmitClick={handleSubmit}
                cancelPath={"/manage-users"}
            />
        </div>
    );
};

export default ManageUsersDelete;
