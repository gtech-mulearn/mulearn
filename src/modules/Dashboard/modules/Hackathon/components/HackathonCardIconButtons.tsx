import {
    deleteHackathon,
    getHackathons,
    publishHackathon
} from "../services/HackathonApis";

import { BsPersonAdd } from "react-icons/bs";
import { LuCopy, LuEdit } from "react-icons/lu";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

import { HackList } from "../services/HackathonInterfaces";

import Modal from "@/MuLearnComponents/Modal/Modal";

import styles from "../pages/HackathonCreate.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";

enum ModalType {
    Publish,
    Delete
}

type Props = {
    hackathon: HackList;
    index: number;
    ownData: HackList[];
    setOwnData: React.Dispatch<React.SetStateAction<HackList[]>>;
    setData: React.Dispatch<React.SetStateAction<HackList[]>>;
};

const HackathonCardIconButtons = ({
    hackathon,
    index,
    ownData,
    setOwnData,
    setData
}: Props) => {
    const navigate = useNavigate();
    const toast = useToast();

    const [isPublishOpen, setIsPublishOpen] = useState<boolean[]>(
        ownData.map(() => false)
    );

    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean[]>(
        ownData.map(() => false)
    );

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
        <div className={styles.shared}>
            {hackathon.editable ? (
                <div className={styles.shared2}>
                    <div className={styles.frame2}>
                        <div>
                            <div className={styles.group}>
                                <Link
                                    to={`/dashboard/hackathon/edit/${hackathon.id}`}
                                >
                                    <LuEdit
                                        data-tooltip-id="Icon"
                                        data-tooltip-content="Edit"
                                    />
                                </Link>
                            </div>
                            <div className={styles.group}>
                                <Link
                                    to={`/dashboard/hackathon/organizers/${hackathon.id}`}
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
                                        toggleModal(index, ModalType[1]);
                                    }}
                                />
                                {isDeleteOpen[index] && (
                                    <Modal
                                        setIsOpen={() =>
                                            toggleModal(index, ModalType[1])
                                        }
                                        id={hackathon.id}
                                        heading={"Delete"}
                                        content={`Are you sure you want to delete ${hackathon.title} ?`}
                                        click={() => {
                                            deleteHackathon(
                                                hackathon.id,
                                                toast
                                            );
                                            setTimeout(() => {
                                                getHackathons(setOwnData);
                                                getHackathons(setData);
                                            }, 1000);
                                            setTimeout(() => {
                                                navigate(
                                                    "/dashboard/hackathon"
                                                );
                                            }, 1000);
                                        }}
                                    />
                                )}
                            </div>
                            <div className={styles.group}>
                                {hackathon.status === "Draft" ? (
                                    <MdPublishedWithChanges
                                        data-tooltip-id="Icon"
                                        data-tooltip-content="Publish"
                                        onClick={() => {
                                            if (
                                                hackathon.id &&
                                                hackathon.title &&
                                                hackathon.type &&
                                                hackathon.tagline &&
                                                hackathon.event_logo &&
                                                hackathon.banner &&
                                                hackathon.website &&
                                                hackathon.place &&
                                                hackathon.event_start &&
                                                hackathon.event_end &&
                                                hackathon.application_start &&
                                                hackathon.application_ends &&
                                                hackathon.description &&
                                                hackathon.participant_count !==
                                                    null &&
                                                hackathon.district &&
                                                hackathon.organisation &&
                                                hackathon.district_id &&
                                                hackathon.org_id !== null &&
                                                hackathon.editable !== null
                                            ) {
                                                toggleModal(
                                                    index,
                                                    ModalType[0]
                                                );
                                            } else {
                                                // Show an error message or take appropriate action
                                                console.log(
                                                    "Please fill in all the details before publishing."
                                                );
                                                toast({
                                                    title: "Error",
                                                    description:
                                                        "Please fill in all the details before publishing.",
                                                    status: "error",
                                                    duration: 3000,
                                                    isClosable: true,
                                                    position: "top"
                                                });
                                            }
                                        }}
                                    />
                                ) : (
                                    <MdOutlineUnpublished
                                        data-tooltip-id="Icon"
                                        data-tooltip-content="Change to Draft"
                                        onClick={() => {
                                            toggleModal(index, ModalType[0]);
                                        }}
                                    />
                                )}
                                {isPublishOpen[index] && (
                                    <Modal
                                        setIsOpen={() =>
                                            toggleModal(index, ModalType[0])
                                        }
                                        id={hackathon.id}
                                        heading={
                                            hackathon.status === "Draft"
                                                ? "Publish"
                                                : "Draft"
                                        }
                                        content={
                                            hackathon.status === "Draft"
                                                ? `Make sure all details are filled before Publishing ${hackathon.title}`
                                                : `Are you sure you want to set ${hackathon.title} to Draft`
                                        }
                                        click={() => {
                                            publishHackathon(
                                                hackathon.id,
                                                hackathon.status,
                                                toast
                                            );
                                            setTimeout(() => {
                                                getHackathons(setOwnData);
                                                getHackathons(setData);
                                            }, 1000);
                                            setTimeout(() => {
                                                navigate(
                                                    "/dashboard/hackathon"
                                                );
                                            }, 2000);
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    {hackathon.status === "Draft" ? (
                        <div></div>
                    ) : (
                        <button
                            data-tooltip-id="Icon"
                            data-tooltip-content="List Participants"
                            onClick={() => {
                                navigate(
                                    `/dashboard/hackathon/applicants/${hackathon.id}`
                                );
                            }}
                        >
                            List
                        </button>
                    )}
                </div>
            ) : (
                <div className={styles.frame2}>
                    <div
                        className={styles.group}
                        onClick={() => {
                            const shareData = {
                                title: hackathon.title,
                                url: `${
                                    import.meta.env.VITE_FRONTEND_URL
                                }/dashboard/hackathon/details/${hackathon.id}`
                            };

                            try {
                                window.navigator.clipboard.writeText(
                                    shareData.url
                                );
                                toast({
                                    title: "Success",
                                    description: "Link copied to clipboard",
                                    status: "success",
                                    duration: 3000,
                                    isClosable: true
                                });
                                window.navigator.share(shareData);
                            } catch (err) {
                                console.log(err);
                            }
                        }}
                    >
                        <LuCopy />
                    </div>
                </div>
            )}
        </div>
    );
};

export default HackathonCardIconButtons;
