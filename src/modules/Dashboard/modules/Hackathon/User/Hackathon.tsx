import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import { LuCopy, LuShare2, LuEdit } from "react-icons/lu";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useEffect, useState } from "react";
import { getHackathons, getOwnHackathons } from "./hackApi";
import { DateConverter } from "../../../utils/common";

export interface HackList {
    id: string;
    title: string;
    type: string;
    tagline: string;
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
    useEffect(() => {
        getHackathons(setData);
        getOwnHackathons(setOwnData);
    }, []);

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
                    ownData.map(hack => (
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
                                                <Link
                                                    to={`/hackathon/edit/${hack.id}`}
                                                >
                                                    <LuEdit />
                                                </Link>
                                            </div>
                                            <div className="group">
                                                <Link
                                                    to={`/hackathon/delete/${hack.id}`}
                                                >
                                                        <RiDeleteBin5Line />
                                                </Link>
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
                                        <button className="button">
                                            Apply Now
                                        </button>
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
                                        <button className="button">
                                            Apply Now
                                        </button>
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
