import react from "react";
import { deleteManageRoles } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../../components/MuComponents/Form/Form";
import { useToast } from "@chakra-ui/react";

type Props = {};

const ManageRolesDelete = (props: Props) => {
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (id) {
            deleteManageRoles(id, toast);
            navigate("/manage-roles");
        }
    };
    return (
        <div>
            <Form
                title={`Are you sure you want to delete ?`}
                handleSubmitClick={handleSubmit}
                cancelPath={"/manage-roles"}
            />
        </div>
    );
};

export default ManageRolesDelete;
