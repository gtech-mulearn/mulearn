import styles from "./Card.module.css";
import { Link } from "react-router-dom";

const Card = ({
    name,
    image,
    link,
    description
}: {
    name: string;
    image: string;
    link: string;
    description: string;
}) => {
    return (
        <>
            <Link to={link}>
                <div className={styles.card}>
                    <div className={styles.card_image}>
                        <img
                            src={image}
                            alt="domain images"
                            className={styles.card_img}
                        />
                    </div>
                    <p className={styles.card_heading}>{name}</p>
                    <p className={styles.card_description}>{description}</p>
                    {/* {link !== "#" && (
                        <Link to={link}>
                            <span className={styles.explore_more}>
                                Explore More{" "}
                            </span>
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 15 15"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M12.1711 3.983L2.12965 14.0245L0.47998 12.3748L10.5203 2.33333H1.67115V0H14.5045V12.8333H12.1711V3.983Z"
                                    fill="#000738"
                                />
                            </svg>
                        </Link>
                    )}
                    {link === "#" && (
                        <span className={styles.explore_more}>
                            Coming Soon!
                        </span>
                    )} */}
                </div>
            </Link>
        </>
    );
};

export default Card;
