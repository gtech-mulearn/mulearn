import styles from "./IGAbout.module.css";
import KKEMAuth from "./Auth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicGateway } from "@/MuLearnServices/apiGateways";
import { KKEMRoutes } from "@/MuLearnServices/urls";
import { cdnUrl } from "@/modules/utils/cdn";

export default function MulearnAbout() {
    const [searchParams] = useSearchParams();
    const encrypted_key = searchParams.get("param");
    // console.log(encrypted_key);

    // const [jsid, setJsId] = useState("");
    const [mu_id, setMuId] = useState("");
    // let mu_id = null;

    useEffect(() => {
        if (!encrypted_key) return;
        publicGateway
            .get(KKEMRoutes.userStatus + `${encrypted_key}/`)
            .then(res => {
                setMuId(res.data.response.muid);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

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

                {encrypted_key && !(encrypted_key && mu_id) && (
                    <>
                        <p className={styles.description}>Join Now: </p>
                        <section id="muId" className={styles.muidSection}>
                            <KKEMAuth param={encrypted_key} />
                            <button
                                onClick={() => {
                                    navigate(
                                        `/register?param=${encrypted_key}`
                                    );
                                }}
                                className={styles.muidLink}
                                // onClick={() => setModalOpen(true)}
                            >
                                No muid ? Get now
                            </button>
                        </section>
                        {/* <MuIDModal open={modalOpen} setOpen={setModalOpen} /> */}
                    </>
                )}
            </div>
            <div className={styles.imgc}>
                <img className={styles.image} src={cdnUrl("src/modules/Public/KKEM/assets/astronaut.webp")} alt="Astronaut" />
                <p className={styles.dc2}>Curated by</p>
                <div className={styles.curated}>
                    <img src={cdnUrl("src/modules/Public/KKEM/assets/im7.webp")} alt="Curator 1" />
                    <img src={cdnUrl("src/modules/Public/KKEM/assets/im9.webp")} alt="Curator 2" />
                    <img src={cdnUrl("src/modules/Public/KKEM/assets/im10.webp")} alt="Curator 3" />
                    <p>and more...</p>
                </div>
            </div>
        </section>
    );
}
