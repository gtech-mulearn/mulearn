import { Blank } from "@/MuLearnComponents/Table/Blank";
import THead from "@/MuLearnComponents/Table/THead";
import Table, { Data } from "@/MuLearnComponents/Table/Table";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getParticipants } from "../services/HackathonApis";
import styles from "./HackathonCreate.module.css";

type Props = {};

const HackathonParticipants = (props: Props) => {
	const [data, setData] = useState<Data[]>([]);
	const [columnOrder, setColumnOrder] = useState<any[]>([]);
    const toast = useToast();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getParticipants(setData, setColumnOrder, id);
    }, []);

    const handleNothing = () => {
        console.log("clicked nothing");
    };
    return (
        <div>
            <div className={styles.hackathonHeading}>
                <h1>List of applicants</h1>
            </div>
            <>
                {data && (
                    <Table
                        rows={data}
                        page={1}
                        perPage={50}
                        columnOrder={columnOrder}
                        id={["id"]}
                    >
                        <THead
                            columnOrder={columnOrder}
                            onIconClick={handleNothing}
                        />
                        <Blank />
                    </Table>
                )}
            </>
        </div>
    );
};

export default HackathonParticipants;