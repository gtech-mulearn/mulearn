import Navbar from "../components/Navbar";
import SkillExpress from "../components/SkillExpress";
import titleFrame from "../assets/titleFrame.svg";
import mU from "../assets/mU_pl.svg";
import styles from "./KKEMLanding.module.css";
import IGAbout from "../components/IGAbout";
import IGSection from "../components/IGSection";
import Footer from "../components/Footer";
/**
 * Landing page for KKEM
 */
export default function Landing() {
    return (
        <main className={styles.main}>
            <Navbar />
            <div style={{ position: "relative", height: "100%" }}>
                <img
                    src={titleFrame}
                    alt="title frame"
                    className={styles.title}
                />
                <img src={mU} alt="mU" className={styles.mU} />
            </div>
            <IGAbout />
            <IGSection />
            {/* <SkillExpress /> */}
            <Footer />
        </main>
    );
}
