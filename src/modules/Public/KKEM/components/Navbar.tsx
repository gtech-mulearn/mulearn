import styles from "./Navbar.module.css";
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
