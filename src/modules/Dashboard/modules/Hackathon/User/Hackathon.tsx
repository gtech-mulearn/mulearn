import { Link, useNavigate } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import "./styles.css";
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

enum ModalType {
    Publish,
    Delete
}

export interface HackList {
    id: string;
    title: string;
    type: string;
    tagline: string;
    event_logo: any;
    district: string;
    is_open_to_all: boolean;
    banner: any;
    website: string;
    place: string;
    status: string;
    event_start: string | null;
    event_end: string | null;
    application_start: string | null;
    application_ends: string | null;
    description: string;
    participant_count: number;
    organisation: string;
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
                <button className="button">Create</button>
            </Link>

            <div className="heading">
                <h1>Own Hackathons</h1>
            </div>
            <div className="box">
                {ownData &&
                    ownData.map((hack, index) => (
                        <div key={hack.id} className="card-component">
                            <div className="frame">
                                <div className="div">
                                    <div className="title">
                                        <div className="text-wrapper">
                                            {hack.title}
                                        </div>
                                        <div className="text-wrapper-2">
                                            {hack.tagline}
                                        </div>
                                    </div>
                                    <div className="shared">
                                        <div className="frame-2">
                                            <div>
                                                <div className="group">
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
                                                <div className="group">
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
                                                <div className="group">
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
                                                <div className="group">
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
                                <div className="group-2">
                                    <div className="text-wrapper-3">
                                        Application Date
                                    </div>
                                    <div className="overlap-group">
                                        <div className="text-wrapper-4">
                                            {hack.application_start
                                                ? DateConverter(
                                                      hack.application_start
                                                  )
                                                : "No Date"}
                                        </div>
                                        <div className="rectangle" />
                                        <div className="text-wrapper-4">
                                            {hack.application_ends
                                                ? DateConverter(
                                                      hack.application_ends
                                                  )
                                                : "No Date"}
                                        </div>
                                        <div className="rectangle" />
                                        <div className="rectangle" />
                                    </div>
                                </div>
                                <div className="frame-3">
                                    <div className="frame-4">
                                        <div className="mode">
                                            <div className="text-wrapper-small">
                                                {/* coverting first letter to UpperCase */}
                                                {hack.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    hack.type.slice(1)}
                                            </div>
                                        </div>
                                        <div className="date">
                                            <div className="text-wrapper-small">
                                                {hack.event_start
                                                    ? DateConverter(
                                                          hack.event_start
                                                      )
                                                    : "No Date"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="button-wrapper">
                                        <Link
                                            to={`/hackathon/details/${hack.id}`}
                                        >
                                            <button className="button">
                                                {hack.status}
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            <div className="heading">
                <h1 className="all">All Hackathons</h1>
            </div>
            <div className="box">
                {data &&
                    data.map(hack => (
                        <div key={hack.id} className="card-component">
                            <div className="frame">
                                <div className="div">
                                    <div className="title">
                                        <div className="text-wrapper">
                                            {hack.title}
                                        </div>
                                        <div className="text-wrapper-2">
                                            {hack.tagline}
                                        </div>
                                    </div>
                                    <div className="shared">
                                        <div className="frame-2">
                                            <div className="group">
                                                <LuCopy />
                                            </div>
                                            <div className="group">
                                                <LuShare2 />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="group-2">
                                    <div className="text-wrapper-3">
                                        Application Date
                                    </div>
                                    <div className="overlap-group">
                                        <div className="text-wrapper-4">
                                            {hack.application_start
                                                ? DateConverter(
                                                      hack.application_start
                                                  )
                                                : "No Date"}
                                        </div>
                                        <div className="rectangle" />
                                        <div className="text-wrapper-4">
                                            {hack.application_ends
                                                ? DateConverter(
                                                      hack.application_ends
                                                  )
                                                : "No Date"}
                                        </div>
                                        <div className="rectangle" />
                                        <div className="rectangle" />
                                    </div>
                                </div>
                                <div className="frame-3">
                                    <div className="frame-4">
                                        <div className="mode">
                                            <div className="text-wrapper-small">
                                                {/* coverting first letter to UpperCase */}
                                                {hack.type
                                                    .charAt(0)
                                                    .toUpperCase() +
                                                    hack.type.slice(1)}
                                            </div>
                                        </div>
                                        <div className="date">
                                            <div className="text-wrapper-small">
                                                {hack.event_start
                                                    ? DateConverter(
                                                          hack.event_start
                                                      )
                                                    : "No Date"}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="button-wrapper">
                                        <Link
                                            to={`/hackathon/details/${hack.id}`}
                                        >
                                            <button className="button">
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
