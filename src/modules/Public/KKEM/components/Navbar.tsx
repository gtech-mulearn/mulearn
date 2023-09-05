import styles from "./Navbar.module.css";
export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.container}>
                <a target="_blank" rel="noreferrer" href="https://mulearn.org">About µLearn</a>
                <a target="_blank" rel="noreferrer" href="#">About K-KEM</a>
                <a target="_blank" rel="noreferrer" href="#skillExpress">Our Programs</a>
            </div>
        </nav>
    );
}
