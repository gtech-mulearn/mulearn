import { useParams } from "react-router-dom";
import { userAuthConfirm } from "../services/auth";
import { useEffect, useState } from "react";
import kkemlogo from "../assets/kkemlogo.png";
import XSvg from "../assets/x.svg";
import mulearnLogo from "../assets/µ.svg";
import Astronaut from "../assets/astronaut.png";
import navStyles from "../components/Navbar.module.css";
import styles from "./KKEMAuth.module.css";
import Footer from "../components/Footer";
export default function KKEMAuth() {
    const { token } = useParams<{ token: string }>();
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        if (!token) {
            return;
        }
        const controller = new AbortController();
        userAuthConfirm(token, controller).then(res => {
            setSuccess(true);
        });
        return () => {
            controller.abort();
        };
    }, [token]);
    return (
        <main>
            <nav className={navStyles.navbar}>
                <div className={navStyles.container}>
                    <div className={navStyles.logos}>
                        <img src={mulearnLogo} alt="Mulearn Logo" />
                        <img src={XSvg} alt="X" />
                        <img src={kkemlogo} alt="KKEM Logo" />
                    </div>
                </div>
            </nav>
            {success ? <Success /> : <Failure />}
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
