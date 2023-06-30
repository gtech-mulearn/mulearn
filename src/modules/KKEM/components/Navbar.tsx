import { useCallback, useEffect, useState } from "react";
import kkemlogo from "../assets/kkemlogo.png";
import XSvg from "../assets/X.svg";
import mulearnLogo from "../assets/µ.svg";
import styles from "./Navbar.module.css";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const clickHandler = useCallback(() => {
        setOpen(prev => !prev);
    }, []);
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logos}>
                    <img src={mulearnLogo} alt="Mulearn Logo" />
                    <img src={XSvg} alt="X" />
                    <img src={kkemlogo} alt="KKEM Logo" />
                </div>
                <div
                    className={[styles.links, open ? styles.active : ""].join(
                        " "
                    )}
                >
                    <a href="#about">About µLearn</a>
                    <a href="#">About K-KEM</a>
                    <a href="#skillExpress">Kerala Skill Express?</a>
                </div>
            </div>
            <div className={styles.mobile} onClick={clickHandler}>
                {open ? <RiCloseLine /> : <RiMenu4Line />}
            </div>
        </nav>
    );
}
