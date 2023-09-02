import { Blank } from "@/MuLearnComponents/Table/Blank";
import THead from "@/MuLearnComponents/Table/THead";
import Table, { Data } from "@/MuLearnComponents/Table/Table";
import { useToast } from "@chakra-ui/react";
import { useState, useEffect, SetStateAction } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getParticipants } from "../services/HackathonApis";
import styles from "./HackathonCreate.module.css";
import Countdown from "../../../utils/Countdown";

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

    // const targetDate = new Date("2023-12-31T23:59:59");
    // const [remainingTime, setRemainingTime] = useState<{
    //     days: number;
    //     hours: number;
    //     minutes: number;
    //     seconds: number;
    // }>({
    //     days: 0,
    //     hours: 0,
    //     minutes: 0,
    //     seconds: 0
    // });

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
            {/* <div>
                <h1>Countdown Timer</h1>
                <Countdown
                    targetDateTime={targetDate}
                    remainingTime={remainingTime}
                    setRemainingTime={setRemainingTime}
                />
            </div> */}
        </div>
    );
};

export default HackathonParticipants;