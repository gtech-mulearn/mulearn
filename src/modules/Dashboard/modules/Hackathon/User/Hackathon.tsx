import { Link, useNavigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { LuCopy, LuShare2, LuEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getHackathons, getOwnHackathons } from "./hackApi";
import { DateConverter } from "../../../utils/common";
import { deleteHackathon, publishHackathon } from "../services/HackathonApis";
import { useToast } from "@chakra-ui/react";
import { BsPersonAdd } from "react-icons/bs";
import Modal from "@/MuLearnComponents/Modal/Modal";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { HackList } from "../services/HackathonInterface";
import styles from "./Hackathon.module.css";

enum ModalType {
    Publish,
    Delete
}

const Hackathon = () => {
    const [data, setData] = useState<HackList[]>([]);
    const [ownData, setOwnData] = useState<HackList[]>([]);
    const [isPublishOpen, setIsPublishOpen] = useState<boolean[]>(ownData.map(() => false));
    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean[]>(ownData.map(() => false));
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        getHackathons(setData);
        getOwnHackathons(setOwnData);
    }, []);

    const toggleModal = (index: number, type: string) => {
        if (type == ModalType[0]) {
            setIsPublishOpen(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        } else {
            setIsDeleteOpen(prevState => {
                const newState = [...prevState];
                newState[index] = !newState[index];
                return newState;
            });
        }
    };

    return (
        <>
            <Link to="/hackathon/create">
                <button className={styles.hackathonBtn}>Create</button>
            </Link>

            <div className={styles.hackathonHeading}>
                <b>Own Hackathons</b>
            </div>
            <div className={styles.hackathonBox}>
                {ownData &&
                    ownData.map((hack, index) => (
                        <div key={hack.id} className={styles.cardComponent}>
                            <div className={styles.frame}>
                                <div className={styles.div}>
                                    <div className={styles.title}>
                                        <div className={styles.testWrapper}>
                                            {hack.title}
                                        </div>
                                        <div className={styles.textWrapper2}>
                                            {hack.tagline}
                                        </div>
                                    </div>
                                    <div className={styles.shared}>
                                        <div className={styles.frame2}>
                                            <div>
                                                <div className={styles.group}>
                                                    <Link
                                                        to={`/hackathon/edit/${hack.id}`}
                                                    >
                                                        <LuEdit
                                                            data-tooltip-id="Icon"
                                                            data-tooltip-content="Edit"
                                                        />
                                                        <Tooltip
                                                            id="Icon"
                                                            style={{
                                                                backgroundColor:
                                                                    "var(--blue)",
                                                                color: "var(--White)",
                                                                borderRadius:
                                                                    "10px"
                                                            }}
                                                        />
                                                    </Link>
                                                </div>
                                                <div className={styles.group}>
                                                    <Link
                                                        to={`/hackathon/organizers/${hack.id}`}
                                                    >
                                                        <BsPersonAdd
                                                            data-tooltip-id="Icon"
                                                            data-tooltip-content="Add Organizer"
                                                        />
                                                    </Link>
                                                </div>
                                            </div>
                                            <div>
                                                <div className={styles.group}>
                                                    <RiDeleteBin5Line
                                                        data-tooltip-id="Icon"
                                                        data-tooltip-content="Delete"
                                                        onClick={() => {
                                                            toggleModal(
                                                                index,
                                                                ModalType[1]
                                                            );
                                                        }}
                                                    />
                                                    {isDeleteOpen[index] && (
                                                        <Modal
                                                            setIsOpen={() =>
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[1]
                                                                )
                                                            }
                                                            id={hack.id}
                                                            heading={"Delete"}
                                                            content={`Are you sure you want to delete ${hack.title} ?`}
                                                            click={() => {
                                                                deleteHackathon(
                                                                    hack.id,
                                                                    toast
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        getOwnHackathons(
                                                                            setOwnData
                                                                        );
                                                                        getHackathons(
                                                                            setData
                                                                        );
                                                                    },
                                                                    1000
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        navigate(
                                                                            "/hackathon"
                                                                        );
                                                                    },
                                                                    1000
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                                <div className={styles.group}>
                                                    {hack.status === "Draft" ? (
                                                        <MdPublishedWithChanges
                                                            data-tooltip-id="Icon"
                                                            data-tooltip-content="Publish"
                                                            onClick={() => {
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[0]
                                                                );
                                                            }}
                                                        />
                                                    ) : (
                                                        <MdOutlineUnpublished
                                                            onClick={() => {
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[0]
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                    {isPublishOpen[index] && (
                                                        <Modal
                                                            setIsOpen={() =>
                                                                toggleModal(
                                                                    index,
                                                                    ModalType[0]
                                                                )
                                                            }
                                                            id={hack.id}
                                                            heading={
                                                                hack.status ===
                                                                    "Draft"
                                                                    ? "Publish"
                                                                    : "Draft"
                                                            }
                                                            content={
                                                                hack.status ===
                                                                    "Draft"
                                                                    ? `Make sure all details are filled before Publishing ${hack.title}`
                                                                    : `Are you sure you want to set ${hack.title} to Draft`
                                                            }
                                                            click={() => {
                                                                publishHackathon(
                                                                    hack.id,
                                                                    hack.status,
                                                                    toast
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        getOwnHackathons(
                                                                            setOwnData
                                                                        );
                                                                        getHackathons(
                                                                            setData
                                                                        );
                                                                    },
                                                                    1000
                                                                );
                                                                setTimeout(
                                                                    () => {
                                                                        navigate(
                                                                            "/hackathon"
                                                                        );
                                                                    },
                                                                    1000
                                                                );
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.group2}>
                                    <div className={styles.textWrapper3}>
                                        Application Date
                                    </div>
                                    <div className={styles.overlapGroup}>
                                        <div className={styles.textWrapper4}>
                                            {hack.application_start
                                                ? DateConverter(
                                                    hack.application_start
                                                )
                                                : "No Date"}
                                        </div>
                                        <div className={styles.rectangle} />
                                        <div className={styles.textWrapper4}>
                                            {hack.application_ends
                                                ? DateConverter(
                                                    hack.application_ends
                                                )
                                                : "No Date"}
                                        </div>
                                        <div className={styles.rectangle} />
                                        <div className={styles.rectangle} />
                                    </div>
                                </div>
                                <div className={styles.frame3}>
                                    <div className={styles.frame4}>
                                        <div className={styles.mode}>
                                            <div className={styles.textWrapperSmall}>
                                                {/* coverting first letter to UpperCase */}
                                                {hack.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    hack.type.slice(1)}
                                            </div>
                                        </div>
                                        <div className={styles.date}>
                                            <div className={styles.textWrapperSmall}>
                                                {hack.event_start
                                                    ? DateConverter(
                                                        hack.event_start
                                                    )
                                                    : "No Date"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.buttonWrapper}>
                                        <Link to={`/hackathon/details/${hack.id}`}>
                                            <button className={styles.hackathonBtn}>
                                                {hack.status}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <div className={styles.hackathonHeading}>
                <b className="all">All Hackathons</b>
            </div>
            <div className={styles.hackathonBox}>
                {data &&
                    data.map(hack => (
                        <div key={hack.id} className={styles.cardComponent}>
                            <div className={styles.frame}>
                                <div className={styles.div}>
                                    <div className={styles.title}>
                                        <div className={styles.testWrapper}>
                                            {hack.title}
                                        </div>
                                        <div className={styles.textWrapper2}>
                                            {hack.tagline}
                                        </div>
                                    </div>
                                    <div className={styles.shared}>
                                        <div className={styles.frame2}>
                                            <div className={styles.group}>
                                                <LuCopy />
                                            </div>
                                            <div className={styles.group}>
                                                <LuShare2 />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.group2}>
                                    <div className={styles.textWrapper3}>
                                        Application Date
                                    </div>
                                    <div className={styles.overlapGroup}>
                                        <div className={styles.textWrapper4}>
                                            {hack.application_start
                                                ? DateConverter(
                                                    hack.application_start
                                                )
                                                : "No Date"}
                                        </div>
                                        <div className={styles.rectangle} />
                                        <div className={styles.textWrapper4}>
                                            {hack.application_ends
                                                ? DateConverter(
                                                    hack.application_ends
                                                )
                                                : "No Date"}
                                        </div>
                                        <div className={styles.rectangle} />
                                        <div className={styles.rectangle} />
                                    </div>
                                </div>
                                <div className={styles.frame3}>
                                    <div className={styles.frame4}>
                                        <div className={styles.mode}>
                                            <div className={styles.textWrapperSmall}>
                                                {/* coverting first letter to UpperCase */}
                                                {hack.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    hack.type.slice(1)}
                                            </div>
                                        </div>
                                        <div className={styles.date}>
                                            <div className={styles.textWrapperSmall}>
                                                {hack.event_start
                                                    ? DateConverter(
                                                        hack.event_start
                                                    )
                                                    : "No Date"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.buttonWrapper}>
                                        <Link
                                            to={`/hackathon/details/${hack.id}`}
                                        >
                                            <button className={styles.hackathonBtn}>
                                                Apply Now
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </>
    );
};

export default Hackathon;
