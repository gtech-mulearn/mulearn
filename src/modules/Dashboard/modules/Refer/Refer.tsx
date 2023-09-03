import styles from "./Refer.module.css";
import imageTop from "./assets/LC2.webp";
import {
    MuButton,
    PowerfulButton
} from "@/MuLearnComponents/MuButtons/MuButton";
import Modal from "./components/Modal";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import { TableHeadProps } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import ModalCreateComponent from "@/MuLearnComponents/ModalCreate/ModalCreate";
import InviteFormModel from "./components/InviteFormModel";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

import { getReferredUserList } from "./service/api";

type Dataflow = {
    name: string;
    muId: number;
    levels: number;
    karma: number;
};

const Refer = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [data, setData] = useState<Dataflow[] | null>(null);
    // const data: Dataflow[] = [
    //     { name: 'Alice', muId: 12345, levels: 5, karma: 150 },
    //     { name: 'Bob', muId: 67890, levels: 3, karma: 80 },
    //     { name: 'Carol', muId: 24680, levels: 7, karma: 220 },
    //     { name: 'David', muId: 13579, levels: 2, karma: 40 },
    //     { name: 'Eve', muId: 97531, levels: 4, karma: 120 },
    //     { name: 'David', muId: 13579, levels: 2, karma: 40 },
    // ];
    const columnOrder = [
        { column: "full_name", Label: "Name", isSortable: false },
        { column: "muid", Label: "Mu ID", isSortable: false },
        { column: "level", Label: "Levels", isSortable: false },
        { column: "karma", Label: "Karma", isSortable: false }
    ];

    useEffect(() => {
        (async () => {
            setData(await getReferredUserList());
        })();
    }, []);

    const handleIconClick = () => {
        // Handle icon click logic
    };

    if (!data) {
        return <MuLoader />;
    }

    return (
        <>
            {open && (
                <Modal
                    icon="send"
                    header="Invite"
                    paragraph="Send a invite link to a email"
                    onClose={() => setOpen(false)}
                >
                    <InviteFormModel onClose={() => setOpen(false)} />
                </Modal>
            )}
            <div className={styles.learningCircleLandingPage}>
                <div className={styles.headContent}>
                    <img src={imageTop} alt="image" loading="eager" />
                    <div className={styles.learningCircleLandingPageDesc}>
                        <h1>Discover, collaborate and grow</h1>
                        <b style={{ fontWeight: "600", width: "80%" }}>
                            An amazing opportunity to invest a brief moment in
                            exploring fresh horizons alongside a community of
                            like-minded enthusiasts!
                        </b>
                        <div className={styles.learningCircleLandingPageButton}>
                            <MuButton
                                className={styles.createBtn}
                                text={"Invite"}
                                onClick={() => setOpen(true)}
                                icon={<RiSendPlaneLine />}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    width: "100%"
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Table
                rows={data}
                columnOrder={columnOrder}
                page={currentPage}
                perPage={perPage}
            >
                <THead
                    columnOrder={columnOrder}
                    onIconClick={handleIconClick}
                    action={false}
                />
                <Blank />
            </Table>
        </>
    );
};

export default Refer;
