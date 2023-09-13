import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { BsPersonAdd } from "react-icons/bs";
import { LuCopy, LuEdit } from "react-icons/lu";
import { MdOutlineUnpublished, MdPublishedWithChanges } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";

import Modal from "@/MuLearnComponents/Modal/Modal";

import {
    deleteHackathon,
    getHackathons,
    publishHackathon
} from "../services/HackathonApis";

import { HackList } from "../services/HackathonInterfaces";

import styles from "../pages/HackathonCreate.module.css";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { FaThList } from "react-icons/fa";

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
    style?: React.CSSProperties
};

const HackathonCardIconButtons = ({
    hackathon,
    index,
    ownData,
    setOwnData,
    setData,
    style
}: Props) => {
    const navigate = useNavigate();
    const toast = useToast();

    const shareData = {
        title: hackathon.title as (string | undefined),
        url: `${
            import.meta.env.VITE_FRONTEND_URL
        }/dashboard/hackathon/details/${hackathon.id}`
    };
    const isShareable =
        window.navigator.canShare && window.navigator.canShare(shareData);

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

    function isDetailsComplete(hackathon:HackList) {
        const requiredFields:(keyof HackList)[] = [
            'id', 'title', 'type', 'tagline', 'event_logo', 'banner', 'website',
            'place', 'event_start', 'event_end', 'application_start',
            'application_ends', 'description', 'participant_count', 'district',
            'organisation', 'district_id', 'org_id', 'editable'
        ];
    
        return requiredFields.every(field => hackathon[field] !== undefined && hackathon[field] !== null);
    }
    

    const isDraft = hackathon.status === "Draft";

    return (
        <div className={styles.shared} style={{color: "var(--blue)", ...style}}>
            <div className={styles.shared2}>
                <div className={styles.frame2}>
                    {hackathon.editable ? (
                            <>
							{/* <div className={styles.group}>
                                <Link to={`/dashboard/hackathon/edit/${hackathon.id}`} >
                                    <LuEdit
                                        data-tooltip-id="Icon"
                                        data-tooltip-content="Edit"
                                    />
                                </Link>
                            </div> */}
                            <div className={styles.group}>
                                <Link to={`/dashboard/hackathon/organizers/${hackathon.id}`} >
                                    <BsPersonAdd
                                        data-tooltip-id="Icon"
                                        data-tooltip-content="Add Organizer"
                                    />
                                </Link>
                            </div>
                            <div className={styles.group}>
                                <RiDeleteBin5Line
                                    data-tooltip-id="Icon"
                                    data-tooltip-content="Delete"
                                    onClick={() => toggleModal(index, ModalType[1]) }
                                />
                                {isDeleteOpen[index] && (
                                    <Modal id={hackathon.id}
                                        setIsOpen={() => toggleModal(index, ModalType[1]) }
                                        heading={"Delete"}
                                        content={`Are you sure you want to delete "${hackathon.title}" ?`}
                                        click={() => {
                                            deleteHackathon( hackathon.id);
                                            setTimeout(() => {
                                                getHackathons(setOwnData);
                                                getHackathons(setData);
                                            }, 1000);
                                            setTimeout(() => navigate( "/dashboard/hackathon" ), 1000);
                                        }}
                                    />
                                )}
                            </div>
                            <div>
                            {!isDraft && (
                                <div className={styles.group}>
                                    <FaThList
                                        data-tooltip-id="Icon"
                                        data-tooltip-content="List Participants"
                                        onClick={() => {
                                            navigate(
                                                `/dashboard/hackathon/applicants/${hackathon.id}`
                                            );
                                        }}
                                    />
                                </div>
                            )}
							</div>
							<div>
                            {!isDraft && (
                                <>
                                    <div className={styles.group}>
                                        <MdOutlineUnpublished
                                            data-tooltip-id="Icon"
                                            data-tooltip-content="Change to Draft"
                                            onClick={() => {
                                                toggleModal(
                                                    index,
                                                    ModalType[0]
                                                );
                                            }}
                                        />
                                    </div>
                                    {isPublishOpen[index] && (
                                        <Modal
                                            setIsOpen={() => toggleModal(index, ModalType[0]) }
                                            id={hackathon.id}
                                            heading="Draft"
                                            content={`Are you sure you want to set ${hackathon.title} to Draft`}
                                            click={() => {
                                                // publishHackathon(
                                                //     hackathon.id,
                                                //     hackathon.status,
                                                // );
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
                                </>
                            )}
                            </div>
                            
                        </>
                                
                    ) : (
                            <div className={styles.group}
                                style={{ gridArea: "1 / 2 / 2 / 3" }}
                                onClick={() => {
                                    window.navigator.clipboard.writeText(shareData.url);
                                    toast({
                                        title: "Success",
                                        description: "Link copied to clipboard",
                                        status: "success",
                                        duration: 3000,
                                        isClosable: true
                                    });
                                    if (isShareable) window.navigator.share(shareData);
                                }}
                            >
                                <LuCopy data-tooltip-id="Icon"
                                    // data-tooltip-content={`Copy${ isShareable ? "/Share" : ""}`}
                                />
                            </div>
                        )}
                </div>
            </div>
        </div>
    );
};

export default HackathonCardIconButtons;
