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
        <div className="content">
            <div className="profileDash">
                <div className="banner">
                    <img src={`https://dev.mulearn.org/api/v1/${data?.banner}`} alt="" />
                </div>
                <div className="event__card">
                    <div className="apply__Card">
                        <div className="date">
                            <span></span>
                            <div className="event__Date">
                                <div>
                                    <p>EVENT DATES</p>
                                    <h3>{data?.event_start}</h3>
                                </div>
                                <div>
                                    <p>HAPPENING AT</p>
                                    <h3>{data?.place}</h3>
                                </div>
                            </div>
                        </div>
                        <div className="close">
                            <p>APPLICATION CLOSING DATE</p>
                            <h4>{data?.application_ends}</h4>
                        </div>
                        <button className="apply__Now">Apply Now</button>
                    </div>
                    <div className="social__links">
                        <a href={data?.website}>
                         <CiGlobe/>
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

            <div className="desc">
                <div className="description">
                    <img className="hackprofile" src={`https://dev.mulearn.org/api/v1/${data?.event_logo}`}>

                    </img>
                    <div>
                        <h1>{data?.title}</h1>
                        <div>
                            <span>{data?.tagline}</span>
                            &nbsp;
                            <span> {data?.participant_count}+ participants</span>
                        </div>
                    </div>
                    <span className="love">

                    </span>
                </div>

                <p>
                    {data?.description}
                </p>
            </div>
        </div>
    );
};

export default HackathonDetails;
