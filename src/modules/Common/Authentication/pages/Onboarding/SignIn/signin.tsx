import styles from "./SignIn.module.css";
import google from "../../../assets/google.png";
import OnboardingTemplate from "../OnboardingTeamplate/OnboardingTemplate";
import OnboardingHeader from "../../../components/Head/OnboardingHeader";

export default function SignIn() {
    return (
        <OnboardingTemplate>
            <OnboardingHeader
                title={"Hello ! Welcome back"}
                desc={
                    "Hey Welcome, please enter your details to<br/>sign in your account"
                }
            />
            <div>
                <div className={styles.wrapper}>
                    <form action="">
                        <div className={styles.inputBox}>
                            <input type="text" placeholder="Email" required />
                        </div>
                        <div className={styles.inputBox}>
                            <input
                                type="password"
                                placeholder="Password"
                                required
                            />
                        </div>
                        <div className={styles.forgot}>
                            <p>
                                Forgot your <span>Password</span>
                            </p>
                            <p>
                                Login with <span>OTP</span>
                            </p>
                        </div>
                        <div className={styles.submit}>
                            <button className={styles.submitB}>Submit</button>
                            <p>OR</p>
                            <button className={styles.google}>
                                <img
                                    className={styles.googleIcon}
                                    src={google}
                                    alt=""
                                />
                                <p>Sign in with google</p>
                            </button>
                        </div>
                        <div className={styles.noAccount}>
                            <p>
                                Don't have an account?<a href="">Sign Up</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </OnboardingTemplate>
    );
}
