import { deleteManageUsers } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../../components/MuComponents/Form/Form";
import { useToast } from "@chakra-ui/react";

type Props = {};

const ManageUsersDelete = (props: Props) => {
    const { id } = useParams();
    const toast = useToast();
    const navigate = useNavigate();
    const handleSubmit = () => {
        if (id) {
            deleteManageUsers(id, toast);
            navigate("/manage-users");
        }
    };
    return (
        <div>
            <Form
                title={`Are you sure you want to delete ?`}
                handleSubmitClick={handleSubmit}
                cancelPath={"/manage-users"}
            />
        </div>
    );
};

export default ManageUsersDelete;
