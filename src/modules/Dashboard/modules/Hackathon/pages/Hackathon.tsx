import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useEffect, useState } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import HackathonCard from "../components/HackathonCard";
import { getHackathons } from "../services/HackathonApis";
import { HackList } from "../services/HackathonInterfaces";
import styles from "./HackathonCreate.module.css";

const Hackathon = () => {
    const [data, setData] = useState<HackList[]>([]);
    const [ownData, setOwnData] = useState<HackList[]>([]);

    useEffect(() => {
        getHackathons(setData);
    }, []);

    return (
        <>
            {data && ownData ? (
                <div className={styles.HCHackathon}>
                    <div className={styles.hackathonHeading}>
                        <h1>Explore Hackathons</h1>
                        <Link to="/dashboard/hackathon/create" >
                            <PowerfulButton>
                                <FiPlusCircle/> Create
                            </PowerfulButton>
                        </Link>
                    </div>

                    <div className={styles.hackathonBox}>
                        {data &&
                            data.map((hack, i) => (
                                <HackathonCard
                                    key={i}
                                    hackathon={hack}
                                    setData={setData}
                                    index={i}
                                    setOwnData={setOwnData}
                                    ownData={ownData}
                                />
                            ))}
                    </div>
                </div>
            ) : (
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}>
                        <MuLoader />
                    </div>
                </div>
            )}
        </>
    );
};

export default Hackathon;
