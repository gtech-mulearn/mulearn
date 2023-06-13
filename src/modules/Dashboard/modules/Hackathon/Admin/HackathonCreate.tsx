import { AiOutlineArrowRight } from "react-icons/ai";
import styles from "./HackathonCreate.module.css";
import logo from "../../../../../assets/images/hackadmin.png";
import illustration from "../../../../../assets/images/hackIllustration.png";
import text from "../../../../../assets/images/hackText.png";

const HackathonCreate = () => {
    return (
        <>
            <div className={styles.topNav}>
                <img className={styles.logo} src={logo} alt="logo" />
                <div className={styles.navLinks}>
                    <p>Organize a hackathon</p>
                    <p>Go to dashboard</p>
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.text}>
                    <img src={text} alt="Heading" />
                    <h1>Join Us</h1>
                    <form action="">
                        <input type="text" placeholder="Your email" />
                        <button><AiOutlineArrowRight/></button>
                    </form>
                </div>
                <div className={styles.illustration}>
                    <img src={illustration} alt="Illustration" />
                </div>
            </div>
        </>
    );
};

export default HackathonCreate;
