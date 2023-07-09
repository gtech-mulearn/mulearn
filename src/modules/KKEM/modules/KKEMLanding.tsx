import Navbar from "../components/Navbar";
import SkillExpress from "../components/SkillExpress";
import titleFrame from "../assets/titleFrame.svg";
import styles from "./KKEMLanding.module.css";
import MulearnAbout from "../components/MulearnAbout";
import Footer from "../components/Footer";
/**
 * Landing page for KKEM
 */
export default function Landing() {
    return (
        <main className={styles.main}>
            <Navbar />
            <img src={titleFrame} alt="title frame" className={styles.title} />
            <MulearnAbout />

            {/* <SkillExpress /> */}
            <Footer />
        </main>
    );
}
