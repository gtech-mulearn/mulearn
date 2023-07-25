import { useEffect, useState } from "react";
import { CiGlobe } from "react-icons/ci";
import { useNavigate, useParams } from "react-router-dom";
import { getHackDetails } from "../services/HackathonApis";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { HackList } from "../services/HackathonInterfaces";
import styles from "./HackathonCreate.module.css";

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
        <div className={styles.hackathonDetails}>
            <div className={styles.hackathonDetailDash}>
                <img className={styles.hackathonBanner} src={`https://dev.mulearn.org/${data?.banner}`} alt="" />

                <div className={styles.hackathonDesc}>
                    <div className={styles.description}>
                        <img className={styles.hackProfile} src={`https://dev.mulearn.org/${data?.event_logo}`} />
                        <div className={styles.descTitle}>
                            <div>
                                <h1>{data?.title}</h1>
                                <div className={styles.tagLine}>
                                    <b>{data?.tagline}</b>
                                    &nbsp;
                                    <b> {data?.participant_count}+ participants</b>
                                </div>
                            </div>
                            <span className={styles.love}>

                            </span>
                        </div>
                    </div>
                    <p>
                        {data?.description}
                    </p>
                </div>
            </div>

            <div className={styles.hackathonEventCard}>
                <div className={styles.hackathonApplyCard}>
                    <div className={styles.date}>
                        <span></span>
                        <div className={styles.hackathonEventDate}>
                            <div>
                                <b className={styles.title}>EVENT DATES</b>
                                <h3>{data?.event_start}</h3>
                            </div>
                            <div>
                                <b className={styles.title}>HAPPENING AT</b>
                                <h3>{data?.place}</h3>
                            </div>
                        </div>
                    </div>
                    <div className={styles.close}>
                        <b>APPLICATION CLOSING DATE</b>
                        <h4>{data?.application_ends}</h4>
                    </div>
                    <button className={styles.hackathonApplyNow} onClick={() => {
                        navigate(`/hackathon/apply/${data?.id}`)
                    }}><b>Apply Now</b></button>
                </div>
                <div className={styles.socialLinks}>
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
