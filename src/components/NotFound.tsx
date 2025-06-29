import styles from "./NotFound.module.css";
import { cdnUrl } from "@/modules/utils/cdn";

const NotFound = () => {
    return (
        <div className={styles.container_404}>
            <div className={styles.NotBg}></div>

            <div className={styles.Notbox}>
                <div className={styles.Notfirst}>
                    <div className={styles.uh}>uh,</div>
                    <div className={styles.oh}>Oh!</div>
                    <span>
                        <div className={styles.you}>you</div>
                        <div className={styles.ve}>'ve</div>
                    </span>
                </div>
                <div className={styles.Notsecond}>
                    <div className={styles.l}>l</div>
                    <img className={styles.o} src={cdnUrl("src/components/assests/NotFound/Stone.webp")} alt="Stone" />
                    <div className={styles.s}>s</div>
                    <div className={styles.t}>t</div>
                </div>
                <div className={styles.Notthird}>
                    <div className={styles.in}>in</div>
                    <div className={styles.space}>space </div>
                </div>
            </div>

            <img
                className={styles.NotFoundUfo}
                src="https://i.ibb.co/CQDjhGP/ufo.png"
                alt=""
            />

            <img className={styles.NotFound404} src={cdnUrl("src/components/assests/NotFound/FourNotFour.webp")} alt="404" />

            <img className={styles.NotFoundRocks} src={cdnUrl("src/components/assests/NotFound/SmallRocks.webp")} alt="Small Rocks" />

            <img className={styles.NotFoundMars} src={cdnUrl("src/components/assests/NotFound/NoBgFourNotFour.webp")} alt="404 No Background" />
        </div>
    );
};

export default NotFound;
