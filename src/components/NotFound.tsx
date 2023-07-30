import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

// TODO: Redesign

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
                    <img className={styles.o} src="https://i.ibb.co/swdyYhG/rock.png" alt="stone" />
                    <div className={styles.s}>s</div>
                    <div className={styles.t}>t</div>
                </div>
                <div className={styles.Notthird}>
                    <div className={styles.in}>in</div>
                    <div className={styles.space}>space </div>
                </div>
            </div>


            <img className={styles.NotFoundUfo}
                src="https://i.ibb.co/CQDjhGP/ufo.png" alt="" />

            <img className={styles.NotFound404}
                src="https://i.ibb.co/s5SJqZx/404.png" alt="" />

            <img className={styles.NotFoundRocks}
                src="https://i.ibb.co/XYVxdMF/small-rocks.png" alt="" />

            <img className={styles.NotFoundMars}
                src="https://i.ibb.co/SnRRLwv/nobg-404-1.png" alt="" />

        </div>
    );
};

export default NotFound;
