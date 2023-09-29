import styles from "./Marketplace.module.css";
import coin from "./assets/muCoin.svg";
import i from "./assets/i.svg";
import bgCard from "./assets/bgCard.svg";
import { History, RedNoti, LinkLogo } from "./assets/svg";
type Props = {};

export const Marketplace = (props: Props) => {
    const data = [
        {
            coins: 20,
            noti: 2,
            bg: bgCard,
            title: "ChatGPT Pro",
            descp: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            link: "https://dribbble.com/"
        },
        {
            coins: 20,
            noti: 2,
            bg: bgCard,
            title: "ChatGPT Pro",
            descp: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            link: "https://dribbble.com/"
        },
        {
            coins: 20,
            noti: 2,
            bg: bgCard,
            title: "ChatGPT Pro",
            descp: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            link: "https://dribbble.com/"
        }
    ];
    return (
        <div className={styles.wrapper}>
            <div className={styles.topSectionWrapper}>
                <div className={styles.cont1}>
                    <h1>Welcome to Marketplace</h1>
                    <div>
                        <p>20</p>
                        <img src={coin} alt="" />
                    </div>
                </div>
                <div className={styles.cont2}>
                    <div>
                        <h2>Redeem rewards using your Mucoins</h2>
                        <img src={i} alt="" />
                    </div>{" "}
                    <a href="">
                        <History />
                    </a>
                </div>
                <div className={styles.cont3}>
                    {data.map(({ coins, noti, bg, title, descp, link }, i) => (
                        <div>
                            <div>
                                <img src={bgCard} alt="" />
                                <div>
                                    <div>
                                        <p>{coins}</p>
                                        <img src={coin} alt="" />
                                    </div>
                                    <div>
                                        <RedNoti />
                                        <p>{noti} remaining !!</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1>{title}</h1>
                                    <p>{descp}</p>
                                </div>
                                <a href={link}>
                                    <p>Claim</p>
                                    <LinkLogo />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div></div>
        </div>
    );
};
