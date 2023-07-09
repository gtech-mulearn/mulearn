import { useCallback, useEffect, useState } from "react";
import kkemlogo from "../assets/kkemlogo.png";
import XSvg from "../assets/X.svg";
import mulearnLogo from "../assets/µ.svg";
import styles from "./Navbar.module.css";
import { RiMenu4Line, RiCloseLine } from "react-icons/ri";
export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <a href="#about">About µLearn</a>
                <a href="#">About K-KEM</a>
                <a href="#skillExpress">Our Programs</a>
            </div>
        </nav>
    );
}
