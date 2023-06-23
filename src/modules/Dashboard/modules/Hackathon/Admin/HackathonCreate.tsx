import styles from "./HackathonCreate.module.css";
import HackathonCreateTabs from "./HackathonCreateTabs";

const HackathonCreate = () => {

    const handleFormSubmit = () => {
        console.log("Submitted")
    };
    return (
        <div className={styles.container}>
            <div className={styles.topText}>
                <h1 className={styles.dashLine}>Lets Get Started</h1>
                <button onClick={handleFormSubmit} className={styles.btn}>save & Finish later</button>
            </div>

            <div>
                <HackathonCreateTabs />
            </div>

        </div>
    );
};

export default HackathonCreate;
