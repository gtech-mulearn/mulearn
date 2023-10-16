import React from 'react'
import styles from './Navbar.module.css'
import EnablerLogo from '../../assests/EnablerLogo.webp'

export default function Navbar() {
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
            if (currentScrollPos >= 100) {
                navbar.current.style.backgroundColor = '#ECE3FF';
            } else {
                navbar.current.style.backgroundColor = ''; // Reset background color
            }
        }

    }, [])
  return (
    <div ref={navbar} className={styles.menuBar}>
    <div className={styles.logo}>
        <a href=""><img src={EnablerLogo} alt="Logo" /></a>
    </div>
    <div className={styles.menu}>
        <a href="">Home</a>
        <a href="#WhoIs">Who is?</a>
        <a href="#Benefits">Benefits</a>
        <a href="#Program">Programs</a>
        <a href="#Onboarding">Onboarding</a>
    </div>
    <button>
        <a href="">
            Join Us
        </a>
    </button>
</div>
  )
}
