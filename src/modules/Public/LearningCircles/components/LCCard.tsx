import React, { Dispatch } from 'react'
import styles from "../pages/LandingPage.module.css";
import imageBottom from "../Assets/LC3.webp";
interface Props {
    lc: LcRandom;
    setIsOpen: Dispatch<React.SetStateAction<boolean>>;
    msg: string;
    setLcId: Dispatch<React.SetStateAction<string>>;
}
const LCCard = ({ lc, setIsOpen, msg, setLcId }: Props) => {
    return (
        <>

            <div className={styles.exploreCards}>
                <img
                    src="https://i.ibb.co/zJkPfqB/Iot-Vector.png"
                    alt="png"
                />
                <h1>{lc.name}</h1>
                <span>
                    <b>{lc.ig_name}</b> &nbsp;{" "}
                    <b>Members count: {lc.member_count}</b>{" "}
                    {lc.meet_place && (
                        <>
                            <br />
                            <b>
                                Meet Place: {lc.meet_place}
                            </b>{" "}
                        </>
                    )}
                    {lc.meet_time && (
                        <>
                            <br />
                            <b>
                                Meet Time: {lc.meet_time}
                            </b>{" "}
                        </>
                    )}
                    {lc.org_name && (
                        <>
                            <br />
                            <b>{lc.org_name}</b>
                        </>
                    )}



                </span>
                <div
                    onClick={() => {
                        setIsOpen(true);
                        setLcId(lc.id.toString());
                    }}
                    className={styles.joinCircle}
                >
                    Join Circle
                </div>{" "}
            </div>

        </>
    )
}

export default LCCard