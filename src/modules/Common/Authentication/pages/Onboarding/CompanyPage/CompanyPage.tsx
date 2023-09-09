import OnboardingHeader from '../../../components/OnboardingHeader/OnboardingHeader'
import OnboardingTemplate from '../../../components/OnboardingTeamplate/OnboardingTemplate'
import styles from './CompanyPage.module.css'

export default function CompanyPage() {
    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"What describe you the most!"}
                desc={"Please select your company"}
            />
            <div>
                <div className={styles.wrapper}>
                    <form action="">
                        <h5 className={styles.text}>
                            Please enter your company details
                        </h5>
                        <div className={styles.inputBox}>
                            <input
                                type="text"
                                placeholder="Company Name"
                                required
                            />
                        </div>
                        <div className={styles.content}>
                            <h5 className={styles.text}>
                                Do you want to become a mentor?
                            </h5>
                            <div className={styles.select}>
                                <button className={styles.selectRadio}>
                                    <label>
                                        <input
                                            type="radio"
                                            id="Yes"
                                            checked
                                            name="radio"
                                        />
                                        <span>Yes</span>
                                    </label>
                                </button>
                                <button className={styles.selectRadio}>
                                    <label>
                                        <input
                                            type="radio"
                                            id="NO"
                                            name="radio"
                                        />
                                        <span>No</span>
                                    </label>
                                </button>
                            </div>
                        </div>

                        <div className={styles.submit}>
                            <button className={styles.submit_b}>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </OnboardingTemplate>
    );}