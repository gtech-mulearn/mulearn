import { useEffect, useState } from "react";
import {
    deleteUserRoleVerification,
    getUserRoleVerificationDetails
} from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../../components/MuComponents/Form/Form";
import { useToast } from "@chakra-ui/react";

type Props = {};

const UserRoleVerificationDelete = (props: Props) => {
    const [input, setInput] = useState("");
    const { id } = useParams();
    const toast = useToast();
    useEffect(() => {
        getUserRoleVerificationDetails(id, setInput);
    }, []);
    const navigate = useNavigate();
    const handleSubmit = () => {
        deleteUserRoleVerification(id, toast);
        navigate("/user-role-verification");
    };
    return (
        <div>
            <Form
                title={`Are you sure you want to delete ${input} ?`}
                handleSubmitClick={handleSubmit}
                cancelPath={"/user-role-verification"}
            />
        </div>
    );
};

export default UserRoleVerificationDelete;
