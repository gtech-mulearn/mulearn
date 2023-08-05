import React from "react";
import {
    deleteUserRoleVerification,
} from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import Form from "@/MuLearnComponents/Form/Form";
import { useToast } from "@chakra-ui/react";

type Props = {};

const UserRoleVerificationDelete = (props: Props) => {

    const { id } = useParams();
    const toast = useToast();
   
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (id) deleteUserRoleVerification(id, toast);
        navigate("/user-role-verification");
    };
    return (
        <div>
            <Form
                title={`Are you sure you want to delete  ?`}
                handleSubmitClick={handleSubmit}
                cancelPath={"/user-role-verification"}
            />
        </div>
    );
};

export default UserRoleVerificationDelete;
