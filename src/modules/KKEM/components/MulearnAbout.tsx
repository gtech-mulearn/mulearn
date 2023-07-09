import styles from "./MulearnAbout.module.css";
import Astronaut from "../assets/astronaut.png";
import MuIDModal from "../components/MuIDModal";
import KKEMAuth from "../components/Auth";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
export default function MulearnAbout() {
    const [searchParams] = useSearchParams();
    const dwms_id = searchParams.get("dwms_id");
    const [modalOpen, setModalOpen] = useState(false);
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
                <p className={styles.description}>Join Now: </p>
                {dwms_id && (
                    <>
                        <section id="muId" className={styles.muidSection}>
                            <KKEMAuth dwmsId={dwms_id} />
                            <button
                                className={styles.muidLink}
                                onClick={() => setModalOpen(true)}
                            >
                                No Mu-Id? Get now
                            </button>
                        </section>
                        <MuIDModal open={modalOpen} setOpen={setModalOpen} />
                    </>
                )}
            </div>
            <div className={styles.imgc}>
                <img className={styles.image} src={Astronaut} alt="Astronaut" />
                <p className={styles.dc2}>Curated by</p>
            </div>
        </section>
    );
}
