import { useEffect, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { useParams } from "react-router-dom";
import { HackList } from "../User/Hackathon";
import { getHackDetails } from "../services/HackathonApis";
import "./styles.css";

type Props = {};

export const HackathonDetails = (props: Props) => {
    const { id } = useParams();
    const [data, setData] = useState<HackList>();

    useEffect(() => {
        getHackDetails(
            setData,
            id,
        )

    }, [])

    return (
        <div className="hackDetails">
            <div className="hackDetailDash">
                {/* <img className="banner" src={`https://dev.mulearn.org/${data?.banner}`} alt="" />
                     */}
                <img className="banner" src="https://i.ibb.co/HHd9Pyd/459-2.png" alt="" />

                <div className="desc">
                    <div className="description">
                        <img className="hackProfile" src={`https://dev.mulearn.org/${data?.event_logo}`} />
                        <div className="descTitle">
                            <div>
                                {/* <h1>{data?.title}</h1> */}
                                <h1>Beach Hack 5</h1>
                                <div className="tagLine">
                                    <b>{data?.tagline}</b>
                                    <b>203 interested</b>
                                    &nbsp;
                                    <b> {data?.participant_count}+ participants</b>
                                </div>
                            </div>
                            <span className="love">
                                <CiGlobe />
                            </span>
                        </div>
                    </div>
                    <p>
                        {data?.description}
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro veniam totam itaque maiores cumque qui asperiores possimus dolorem eius enim molestiae officiis, quo, modi optio commodi nemo labore quas cupiditate.
                    </p>
                </div>
            </div>

            <div className="eventCard">
                <div className="applyCard">
                    <div className="date">
                        <span></span>
                        <div className="eventDate">
                            <div>
                                <b className="title">EVENT DATES</b>
                                {/* <h3>{data?.event_start}</h3> */}
                            </div>
                            <div>
                                <b className="title">HAPPENING AT</b>
                                {/* <h3>{data?.place}</h3> */}
                            </div>
                        </div>
                    </div>
                    <div className="close">
                        <b>APPLICATION CLOSING DATE</b>
                        <h4>{data?.application_ends}</h4>
                    </div>
                    <button className="applyNow"><b>Apply Now</b></button>
                </div>
                <div className="socialLinks">
                    <a href={data?.website}>
                        <CiGlobe />
                    </a>
                    {/* <a href="#">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-instagram"></i>
                        </a>
                        <a href="#">
                            <i className="fab fa-instagram"></i>
                        </a> */}
                </div>
            </div>
        </div>
    );
};

export default HackathonDetails;
