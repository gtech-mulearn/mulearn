import { Blank } from "@/MuLearnComponents/Table/Blank";
import THead from "@/MuLearnComponents/Table/THead";
import Table, { Data } from "@/MuLearnComponents/Table/Table";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getParticipants } from "../services/HackathonApis";

type Props = {};

const HackathonParticipants = (props: Props) => {
	const [data, setData] = useState<Data[]>([]);
    const toast = useToast();
    const { id } = useParams();
    const navigate = useNavigate();

    const columnOrder = [
        { column: "full_name", Label: "Name", isSortable: false },
        { column: "email", Label: "Email", isSortable: false },
        { column: "muid", Label: "Mu ID", isSortable: false }
    ];

    useEffect(() => {
        getParticipants(setData, id);
    }, []);

    const handleNothing = () => {
        console.log("clicked nothing");
    };
    return (
        <div>
			test
        </div>
    );
};

export default HackathonParticipants;