import React from 'react';
import styles from './Navbar.module.css';
import EnablerLogo from '../../assests/EnablerLogo.webp';

export default function Navbar() {
    const navbar = React.useRef<HTMLDivElement>(null); 

    React.useEffect(() => {
        let prevScrollpos = window.pageYOffset;

        const handleScroll = () => {
            const currentScrollPos = window.pageYOffset;

            if (navbar.current) {
                if (prevScrollpos > currentScrollPos) {
                    navbar.current.style.top = "0";
                } else {
                    navbar.current.style.top = "-150px";
                }

                prevScrollpos = currentScrollPos;

                if (currentScrollPos >= 100) {
                    navbar.current.style.backgroundColor = '#ECE3FF';
                } else {
                    navbar.current.style.backgroundColor = '';
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Clean up on unmount
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div ref={navbar} className={styles.menuBar}>
            <div className={styles.logo}>
                <a href="/"><img src={EnablerLogo} alt="Logo" /></a>
            </div>
            <div className={styles.menu}>
                <a href="/">Home</a>
                <a href="#WhoIs">Who is?</a>
                <a href="#Benefits">Benefits</a>
                <a href="#Program">Programs</a>
                <a href="#Onboarding">Onboarding</a>
            </div>
            <button>
                <a href="https://app.mulearn.org/register">
                    Join Us
                </a>
            </button>
        </div>
    );
}
