import { useEffect, useState } from "react";
import Form from "../../../../components/MuComponents/Form/Form";
import { editManageUsers, getManageUsersDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";

type Props = {};

const ManageUsersEdit = (props: Props) => {
    const [input1, setInput1] = useState("");
    const [input2, setInput2] = useState("");
    const [input3, setInput3] = useState("");

    useEffect(() => {
        getManageUsersDetails(id, setInput1);
    }, []);

    const inputFields = [
        {
            content: "User Name",
            inputType: "text",
            input: input1,
            setInput: setInput1
        }
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
    // const dropdownFields = [
    //     {
    //         contents: ["IG Name", "1", "2", "3"],
    //         input: input2,
    //         setInput: setInput2,
    //         label: "Select Name",
    //         default: "string"
    //     },
    //     {
    //         contents: ["IG Name", "1", "2", "3"],
    //         input: input3,
    //         setInput: setInput3,
    //         label: "Select test",
    //         default: "select from following"
    //     }
    // ];
    const { id } = useParams();
    const navigate = useNavigate();
    const handleSubmit = () => {
        editManageUsers(input1, id);
        navigate("/manage-users");
    };
    return (
        <div>
            <Form
                title={"Edit Name of User"}
                handleSubmitClick={handleSubmit}
                inputFields={inputFields}
                cancelPath={"/manage-users"}
                // dropdownFields={dropdownFields}
            />
        </div>
    );
};

export default ManageUsersEdit;

