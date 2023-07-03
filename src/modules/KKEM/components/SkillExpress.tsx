import styles from "./SkillExpress.module.css";
import feat1 from "../assets/feat1.svg";
import feat2 from "../assets/feat2.svg";
import feat3 from "../assets/feat3.svg";
import Train from "../assets/Train.png";
export default function SkillExpress() {
    return (
        <section id="skillExpress" className={styles.skillExpressSection}>
            <h1 className={styles.title}>Kerala Skill Express</h1>
            <p className={styles.description}>
                The Kerala Skill Express is a program initiated by the Kerala
                Knowledge Economy Mission (K-KEM) as a part of its efforts to
                promote skill development and employability in the State of
                Kerala.
            </p>
            <p className={styles.featureText}>
                Key features of the Kerala Skill Express Program:
            </p>
            <Features />
        </section>
    );
}

function Features() {
    return (
        <div className={styles.features}>
            <div className={styles.featureContainer}>
                <Feature
                    title="Personalized Learning"
                    description="Learning resources tailored to your specific needs and goals."
                    icon={<img src={feat1} alt="Personalized Learning" />}
                />
                <Feature
                    title="Skill Development"
                    description="The program offers a wide range of skill development courses and training modules to enhance the participants' proficiency in different domains."
                    icon={<img src={feat2} alt="Skill Development" />}
                />
                <Feature
                    title="Industry-Relevant Curriculum"
                    description="The program's curriculum is designed in collaboration with industry experts and stakeholders to ensure that the skills taught are aligned with the current demands and trends of the job market."
                    icon={
                        <img src={feat3} alt="Industry-Relevant Curriculum" />
                    }
                />
            </div>
            <div className={styles.featuresImage}>
                <img src={Train} alt="Skill Express Features" />
            </div>
        </div>
    );
}

function Feature({
    title,
    description,
    icon
}: {
    title: string;
    description: string;
    icon: JSX.Element;
}) {
    return (
        <div className={styles.feature}>
            <div className={styles.featureGroup}>
                <h2 className={styles.featureTitle}>{title}</h2>
                <p className={styles.featureDescription}>{description}</p>
            </div>
            <div className={styles.featureIcon}>{icon}</div>
        </div>
    );
}
