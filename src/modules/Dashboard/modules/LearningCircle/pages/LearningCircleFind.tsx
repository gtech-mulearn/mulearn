import React, { useEffect, useRef, useState } from "react";
import styles from "./LearningCircle.module.css";
import imageTop from "../assets/images/LC1.svg";
import { BsSearch } from "react-icons/bs";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import { useNavigate } from "react-router-dom";
import { createStandaloneToast, UseToastOptions } from "@chakra-ui/react";
import {
    getCampusLearningCircles,
    joinCircle
} from "../services/LearningCircleAPIs";
import { join } from "path";

const { toast } = createStandaloneToast();

const FindCircle = () => {
    const [lc, setLc] = useState<LcType[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        getCampusLearningCircles(setLc);
    }, []);

    return (
        <>
            <div className={styles.FindCircleContent}>
                <div className={styles.FindCircleContentTop}>
                    <div className={styles.desc}>
                        <h3>Find your learning circle</h3>
                        <b style={{ color: "#000" }}>
                            Browse and join learning circle around you
                        </b>
                    </div>
                    <img src={imageTop} alt="image" />
                </div>

                {lc ? (
                    <div className={styles.container}>
                        {lc.map(
                            circle =>
                                circle && (
                                    <>
                                        <div className={styles.one}>
                                            <h2>{circle?.name}</h2>
                                            <p>
                                                Team Lead: {circle?.created_by}
                                            </p>
                                            <p>{circle?.ig}</p>
                                            <p>
                                                {circle?.member_count} Members
                                            </p>
                                            <div className={styles.join}>
                                                <PowerfulButton
                                                    onClick={() => {
                                                        joinCircle(circle.id);

                                                        setTimeout(() => {
                                                            navigate(
                                                                `/dashboard/learning-circle`
                                                            );
                                                        }, 1500);
                                                    }}
                                                >
                                                    Join
                                                </PowerfulButton>
                                            </div>
                                        </div>
                                    </>
                                )
                        )}
                    </div>
                ) : (
                    <div className={styles.error_container}>
                        <h1>Found no learning circles </h1>
                    </div>
                )}
            </div>
        </>
    );
};

export default FindCircle;
