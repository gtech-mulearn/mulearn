import kkemlogo from "../assets/kkemlogo.png";
import XSvg from "../assets/x.svg";
import mulearnLogo from "../assets/µ.svg";
import styles from "./Navbar.module.css";
export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <div className={styles.logos}>
                    <img src={mulearnLogo} alt="Mulearn Logo" />
                    <img src={XSvg} alt="X" />
                    <img src={kkemlogo} alt="KKEM Logo" />
                </div>
                <div className={styles.links}>
                    <a href="#">About µLearn</a>
                    <a href="#">About K-KEM</a>
                    <a href="#skillExpress">Kerala Skill Express?</a>
                </div>
            </div>
        </nav>
    );
}
