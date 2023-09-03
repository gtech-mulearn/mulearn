import styles from "./IGAbout.module.css";
import Astronaut from "../assets/astronaut.webp";
import KKEMAuth from "./Auth";
import im7 from "../assets/im7.webp";
import im9 from "../assets/im9.webp";
import im10 from "../assets/im10.webp";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
export default function MulearnAbout() {
    const [searchParams] = useSearchParams();
    const jsid = searchParams.get("jsid");
    const mu_id = searchParams.get("mu_id");
    const navigate = useNavigate();
    return (
        <section id="about" className={styles.section}>
            <div className={styles.text}>
                <h1 className={styles.title}>Interest Groups?</h1>
                <p className={styles.description}>
                    Discover your passion, collaborate with like-minded
                    individuals, and embark on a transformative learning
                    journey.
                </p>
                <p className={styles.description}>
                    Join our vibrant community of students and explore a wide
                    range of interest areas, from coding to design,
                    entrepreneurship to data science
                </p>

                {jsid && !(jsid && mu_id) && (
                    <>
                        <p className={styles.description}>Join Now: </p>
                        <section id="muId" className={styles.muidSection}>
                            <KKEMAuth jsid={jsid} />
                            <PowerfulButton
                                onClick={() => {
                                    navigate(`/register?jsid=${jsid}`);
                                }}
                                className={styles.muidLink}
                            // onClick={() => setModalOpen(true)}
                            >
                                No Mu-Id? Get now
                            </PowerfulButton>
                        </section>
                        {/* <MuIDModal open={modalOpen} setOpen={setModalOpen} /> */}
                    </>
                )}
            </div>
            <div className={styles.imgc}>
                <img className={styles.image} src={Astronaut} alt="Astronaut" />
                <p className={styles.dc2}>Curated by</p>
                <div className={styles.curated}>
                    <img src={im7} alt="im7" />
                    <img src={im9} alt="im9" />
                    <img src={im10} alt="im10" />
                    <p>and more...</p>
                </div>
            </div>
        </section>
    );
}
