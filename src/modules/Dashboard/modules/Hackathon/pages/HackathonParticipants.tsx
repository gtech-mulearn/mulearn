import { Blank } from "@/MuLearnComponents/Table/Blank";
import THead from "@/MuLearnComponents/Table/THead";
import Table, { Data } from "@/MuLearnComponents/Table/Table";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getParticipants } from "../services/HackathonApis";
import styles from "./HackathonCreate.module.css";
const HackathonParticipants = () => {
    const [data, setData] = useState<Data[]>([]);
    const [columnOrder, setColumnOrder] = useState<any[]>([]);
    const { id } = useParams();

    useEffect(() => {
        getParticipants(setData, setColumnOrder, id);
    }, []);

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
                            onIconClick={() => {}}
                        />
                        <Blank />
                    </Table>
                )}
            </>
        </div>
    );
};

export default HackathonParticipants;
