import styles from "../Donation.module.css";
import Footer from "@/modules/Common/Footer/Footer";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import RefundPage from "../components/RefundText";

const Refund = () => {
    return (
        <div className={styles.RefundPage}>
            <HomeNav />
            <div className={styles.backgroundImage}>
                <img
                    src="https://i.ibb.co/cCvB4r6/Learning-BG.png"
                    alt="textured background"
                ></img>
            </div>
            <div className={styles.refundSection}>
                <div className={styles.textContainer}>
                    <RefundPage />
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Refund;
