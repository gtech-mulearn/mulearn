import React from "react";
import styles from './Menubar.module.css';
import img4 from "../../assets/logo.webp";
import pre from '../../assets/pre.png';

export default function Menubar() {
    const navbar = React.useRef(null)

    React.useEffect(() => {
        var prevScrollpos = window.pageYOffset;
        window.onscroll = function () {
            var currentScrollPos = window.pageYOffset;
            if (prevScrollpos > currentScrollPos) {
                navbar.current.style.top = "0";
            } else {
                navbar.current.style.top = "-150px";
            }
            prevScrollpos = currentScrollPos;
        }
    }, [])

    return (
        <div ref={navbar} className={styles.menu_bar}>
            <div className={styles.logo}>
                <a href="/"><img src={img4} alt="Logo" /></a>
            </div>
            <div className={styles.menu}>
                <a href="#heroSection">Home</a>
                <a href="#Course">Course Overview</a>
                <a href="#who">Who Should Attend?</a>
                <a href="#about">About Pathway</a>
            </div>
            <div className={styles.pre_rg}>
                <a href="/">
                    <img src={pre} alt="Pre-register" />
                    Pre-register
                </a>
            </div>
        </div>
    );
}
