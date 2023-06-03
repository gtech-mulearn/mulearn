import { useEffect, useState } from "react";
import { deleteInterestGroups, getIGDetails } from "./apis";
import { useNavigate, useParams } from "react-router-dom";
import Form from "../../../../components/MuComponents/Form/Form";
import { useToast } from "@chakra-ui/react";

type Props = {};

const InterestGroupDelete = (props: Props) => {
    const [input, setInput] = useState("");
	const { id } = useParams();
    const toast = useToast();
	useEffect(() => {
        getIGDetails(id, setInput);
    }, []);
	const navigate = useNavigate();
    const handleSubmit = () => {
        deleteInterestGroups(id, toast);
		navigate("/interest-groups");
		
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

export default InterestGroupDelete;
