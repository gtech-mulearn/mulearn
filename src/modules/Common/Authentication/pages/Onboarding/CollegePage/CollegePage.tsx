import OnboardingHeader from "../../../components/OnboardingHeader/OnboardingHeader";
import OnboardingTemplate from "../../../components/OnboardingTeamplate/OnboardingTemplate";
import styles from "./CollegePage.module.css";

export default function CollegePage() {
    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"What describe you the most!"}
                desc={"Please select your college"}
            />
            <div>
                <div className={styles.wrapper}>
                    <form action="">
                        <h5 className={styles.text}>
                            Please enter your collage details
                        </h5>
                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                placeholder="Collage Name"
                                required
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                placeholder="Department"
                                required
                            />
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                placeholder="Graduation year"
                                required
                            />
                        </div>

                        <div className={styles.submit}>
                            <button className={styles.submitB}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </OnboardingTemplate>
    );
}
