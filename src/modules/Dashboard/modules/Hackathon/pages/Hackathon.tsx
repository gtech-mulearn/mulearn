import { Link } from "react-router-dom";
import "react-tooltip/dist/react-tooltip.css";
import { FiPlusCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import { getHackathons } from "../services/HackathonApis";

import styles from "./HackathonCreate.module.css";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { HackList } from "../services/HackathonInterfaces";
import HackathonCard from "../components/HackathonCard";

const Hackathon = () => {
    const [data, setData] = useState<HackList[]>([]);
    const [ownData, setOwnData] = useState<HackList[]>([]);
    const [isPublishOpen, setIsPublishOpen] = useState<boolean[]>(
        ownData.map(() => false)
    );

    const [isDeleteOpen, setIsDeleteOpen] = useState<boolean[]>(
        ownData.map(() => false)
    );

    useEffect(() => {
        getHackathons(setData);
    }, []);

    return (
        <>
            {data && ownData ? (
                <div className={styles.HCHackathon}>
                    <div className={styles.hackathonHeading}>
                        <h1>Explore Hackathons</h1>
                        <Link
                            to="/dashboard/hackathon/create"
                            className={styles.HCbutton}
                        >
                            <PowerfulButton
                                text="Create"
                                icon={<FiPlusCircle />}
                            />
                        </Link>
                    </div>

                    <div className={styles.hackathonBox}>
                        {data &&
                            data.map((hack, i) => (
                                <HackathonCard
                                    hackathon={hack}
                                    isPublishOpen={isPublishOpen}
                                    setIsPublishOpen={setIsPublishOpen}
                                    isDeleteOpen={isDeleteOpen}
                                    setIsDeleteOpen={setIsDeleteOpen}
                                    setData={setData}
                                    index={i}
                                    setOwnData={setOwnData}
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
