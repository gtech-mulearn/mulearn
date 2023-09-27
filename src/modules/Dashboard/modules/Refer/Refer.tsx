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
import { useEffect, useState } from "react";
import { RiSendPlaneLine } from "react-icons/ri";
import InviteFormModel from "./components/InviteFormModel";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

import { getReferredUserList } from "./service/api";

type Dataflow = {
    full_name: string;
    mu_id: string;
    level: number;
    karma: number;
};

const Refer = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(5);
    const [data, setData] = useState<Dataflow[] | null>(null);
    const columnOrder = [
        { column: "full_name", Label: "Name", isSortable: false },
        { column: "mu_id", Label: "Mu ID", isSortable: false },
        { column: "level", Label: "Levels", isSortable: false },
        { column: "karma", Label: "Karma", isSortable: false }
    ];

    useEffect(() => {
        (async () => {
            setData(await getReferredUserList());
        })();
    }, []);
    useEffect(() => {
        console.log(data);
    }, [data]);

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
                            <PowerfulButton
                                className={styles.createBtn}
                                onClick={() => setOpen(true)}
                                style={{
                                    display: "flex",
                                    justifyContent: "space-evenly",
                                    alignItems: "center",
                                    width: "100%"
                                }}
                            >
                                <RiSendPlaneLine />
                                Invite
                            </PowerfulButton>
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
