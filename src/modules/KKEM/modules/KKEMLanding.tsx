import KKEMAuth from "../components/Auth";
import Navbar from "../components/Navbar";
import SkillExpress from "../components/SkillExpress";
import { useSearchParams } from "react-router-dom";
import styles from "./KKEmLanding.module.css";
import MulearnAbout from "../components/MulearnAbout";
import Footer from "../components/Footer";
import MuIDModal from "../components/MuIDModal";
import { useState } from "react";
/**
 * Landing page for KKEM
 */
export default function Landing() {
    const [searchParams] = useSearchParams();
    const dwms_id = searchParams.get("dwms_id");
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <main className={styles.main}>
            <Navbar />
            {dwms_id && (
                <>
                    <section id="muId" className={styles.muidSection}>
                        <div>
                            <KKEMAuth dwmsId={dwms_id} />
                            <p className={styles.muidSectionText}>
                                To get started, please enter your{" "}
                                <strong>µLearn ID</strong>. If you don't have a
                                µLearn ID yet, click the button below to visit
                                the{" "}
                                <strong>µLearn website and create one</strong>.
                            </p>
                            <button
                                className={styles.muidLink}
                                onClick={() => setModalOpen(true)}
                            >
                                Still without a Mu-Id? Grab one now
                            </button>
                            <MuIDModal
                                open={modalOpen}
                                setOpen={setModalOpen}
                            />
                        </div>
                    </section>
                    <div className={styles.wave}></div>
                </>
            )}
            <SkillExpress />
            <MulearnAbout />
            <Footer />
        </main>
    );
}
