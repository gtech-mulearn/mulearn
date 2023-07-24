import { useEffect, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { getHackDetails } from "../services/HackathonApis";
import "./styles.css";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { HackList } from "../services/HackathonInterface";

type Props = {};

export const HackathonDetails = (props: Props) => {
    const { id } = useParams();
    const [data, setData] = useState<HackList>();
	const navigate = useNavigate()

    useEffect(() => {
        getHackDetails(
            setData,
            id,
        )

    }, [])

    return (
        <div className="hackDetails">
            <div className="hackDetailDash">
                <img className="banner" src={`https://dev.mulearn.org/${data?.banner}`} alt="" />
                    
                <div className="desc">
                    <div className="description">
                        <img className="hackProfile" src={`https://dev.mulearn.org/${data?.event_logo}`} />
                        <div className="descTitle">
                            <div>
                                <h1>{data?.title}</h1>
                                <div className="tagLine">
                                    <b>{data?.tagline}</b>
                                    &nbsp;
                                    <b> {data?.participant_count}+ participants</b>
                                </div>
                            </div>
                            <span className="love">
                                
                            </span>
                        </div>
                    </div>
                    <p>
                        {data?.description}
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
                                <h3>{data?.event_start}</h3>
                            </div>
                            <div>
                                <b className="title">HAPPENING AT</b>
                                <h3>{data?.place}</h3>
                            </div>
                        </div>
                    </div>
                    <div className="close">
                        <b>APPLICATION CLOSING DATE</b>
                        <h4>{data?.application_ends}</h4>
                    </div>
                    <button className="applyNow" onClick={() => {
						navigate(`/hackathon/apply/${data?.id}`)
					}}><b>Apply Now</b></button>
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
