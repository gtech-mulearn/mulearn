import { Link } from "react-router-dom";
import "./styles.css";
import { LuCopy, LuShare2 } from "react-icons/lu";
import { useEffect, useState } from "react";
import { getHackathons } from "./hackApi";

const Hackathon = () => {
    const [data, setData] = useState("");
    useEffect(() => {
        getHackathons(setData);
    }, []);

    return (
        <>
            <Link to="/hackathon-management">
                <div>
                    <div className="button-wrapper">
                        <button className="button">Create</button>
                    </div>
                </div>
            </Link>
            <div className="box">
                <div className="card-component">
                    <div className="frame">
                        <div className="div">
                            <div className="title">
                                <div className="text-wrapper">Lorem Ipsum</div>
                                <div className="text-wrapper-2">Hackathon</div>
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
                            <div className="text-wrapper-3">Theme</div>
                            <div className="overlap-group">
                                <div className="text-wrapper-4">DESIGN</div>
                                <div className="rectangle" />
                                <div className="text-wrapper-4">DESIGN</div>
                                <div className="rectangle" />
                                <div className="rectangle" />
                            </div>
                        </div>
                        <div className="frame-3">
                            <div className="frame-4">
                                <div className="mode">
                                    <div className="text-wrapper-small">
                                        Online
                                    </div>
                                </div>
                                <div className="date">
                                    <div className="text-wrapper-small">
                                        12/10/23
                                    </div>
                                </div>
                            </div>
                            <div className="button-wrapper">
                                <button className="button">Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-component">
                    <div className="frame">
                        <div className="div">
                            <div className="title">
                                <div className="text-wrapper">Lorem Ipsum</div>
                                <div className="text-wrapper-2">Hackathon</div>
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
                            <div className="text-wrapper-3">Theme</div>
                            <div className="overlap-group">
                                <div className="text-wrapper-4">DESIGN</div>
                                <div className="rectangle" />
                                <div className="text-wrapper-4">DESIGN</div>
                                <div className="rectangle" />
                                <div className="rectangle" />
                            </div>
                        </div>
                        <div className="frame-3">
                            <div className="frame-4">
                                <div className="mode">
                                    <div className="text-wrapper-small">
                                        Online
                                    </div>
                                </div>
                                <div className="date">
                                    <div className="text-wrapper-small">
                                        12/10/23
                                    </div>
                                </div>
                            </div>
                            <div className="button-wrapper">
                                <button className="button">Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="card-component">
                    <div className="frame">
                        <div className="div">
                            <div className="title">
                                <div className="text-wrapper">Lorem Ipsum</div>
                                <div className="text-wrapper-2">Hackathon</div>
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
                            <div className="text-wrapper-3">Theme</div>
                            <div className="overlap-group">
                                <div className="text-wrapper-4">DESIGN</div>
                                <div className="rectangle" />
                                <div className="text-wrapper-4">DESIGN</div>
                                <div className="rectangle" />
                                <div className="rectangle" />
                            </div>
                        </div>
                        <div className="frame-3">
                            <div className="frame-4">
                                <div className="mode">
                                    <div className="text-wrapper-small">
                                        Online
                                    </div>
                                </div>
                                <div className="date">
                                    <div className="text-wrapper-small">
                                        12/10/23
                                    </div>
                                </div>
                            </div>
                            <div className="button-wrapper">
                                <button className="button">Apply Now</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hackathon;
