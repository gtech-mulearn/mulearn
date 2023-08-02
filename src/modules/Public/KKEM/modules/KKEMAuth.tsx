import { useParams } from "react-router-dom";
import { userAuthConfirm } from "../services/auth";
import { useEffect, useState } from "react";
import Astronaut from "../assets/astronaut.webp";
import styles from "./KKEMAuth.module.css";
import Footer from "../components/Footer";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
export default function KKEMAuth() {
    const { token } = useParams<{ token: string }>();
    const [status, setStatus] = useState("pending");
    useEffect(() => {
        if (!token) {
            return;
        }
        const controller = new AbortController();
        userAuthConfirm(token, controller).then(res => {
            setStatus("success");
        }).catch((err) => {
            console.log(err.hasError)
            if (err?.hasError) {
                setStatus("failure");
            }
        })
        return () => {
            controller.abort();
        };
    }, [token]);
    return (
        <main>
            {status === "pending" ?
                <div className={styles.muLoader}>
                    <MuLoader />
                </div> :
                <>
                    {status === "success" && <Success />}
                    {status === "failure" && <Failure />}
                </>
            }
            <Footer />
        </main>
    );
}

function Success() {
    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h1>Success!</h1>
                <p>
                    You have successfully authenticated with µLearn. You can now
                    close this tab.
                </p>
            </div>
            <img className={styles.image} src={Astronaut} alt="Astronaut" />
        </section>
    );
}

function Failure() {
    return (
        <section className={styles.section}>
            <div className={styles.content}>
                <h1 className={styles.failure}>Failure!</h1>
                <p>
                    You have failed to authenticate with µLearn. Please try
                    again.
                </p>
            </div>
        </section>
    );
}
