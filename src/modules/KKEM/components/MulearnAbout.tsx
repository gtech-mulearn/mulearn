import styles from "./MulearnAbout.module.css";
import Astronaut from "../assets/astronaut.png";
export default function MulearnAbout() {
    return (
        <section id="about" className={styles.section}>
            <div className={styles.text}>
                <h1 className={styles.title}>About µLearn</h1>
                <p className={styles.description}>
                    Inspired by the <a href="#">Silicon Valley</a> movement,
                    µLearn aims to foster an environment that nurtures
                    groundbreaking ideas and drives technological advancements.
                </p>
                <p className={styles.description}>
                    µLearn is an innovative hub dedicated to future
                    technologies, with the vision of transforming Kerala into a
                    knowledge-based, sustainable, and innovation-centric state.
                </p>
            </div>
            <img className={styles.image} src={Astronaut} alt="Astronaut" />
        </section>
    );
}
