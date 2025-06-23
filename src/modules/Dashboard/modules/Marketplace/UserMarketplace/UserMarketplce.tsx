import styles from "./UserMarketplce.module.css";
import { cdnUrl } from "@/modules/utils/cdn";
import { History, RedNoti, LinkLogo, LockLogo } from "../assets/svg";
type Props = {};

const Marketplace = (props: Props) => {
    const data = [
        {
            coins: 20,
            noti: 2,
            bg: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            descp: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            link: "https://dribbble.com/"
        },
        {
            coins: 20,
            noti: 2,
            bg: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            descp: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            link: "https://dribbble.com/"
        },
        {
            coins: 20,
            noti: 2,
            bg: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            descp: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            link: "https://dribbble.com/"
        },
        {
            coins: 20,
            noti: 2,
            bg: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            descp: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            link: "https://dribbble.com/"
        },
        {
            coins: 20,
            noti: 2,
            bg: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            descp: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            link: "https://dribbble.com/"
        },
        {
            coins: 20,
            noti: 2,
            bg: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            descp: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.",
            link: "https://dribbble.com/"
        }
    ];
    const rewards = [
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/phone.svg"),
            detail: "iphone",
            coins: 20
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/phone.svg"),
            detail: "iphone",
            coins: 20
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/phone.svg"),
            detail: "iphone",
            coins: 20
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/phone.svg"),
            detail: "iphone",
            coins: 20
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/phone.svg"),
            detail: "iphone",
            coins: 20
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/phone.svg"),
            detail: "iphone",
            coins: 20
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/phone.svg"),
            detail: "iphone",
            coins: 20
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/phone.svg"),
            detail: "iphone",
            coins: 20
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/phone.svg"),
            detail: "iphone",
            coins: 20
        }
    ];
    const hello = (p: any) => {
        console.log("hello");
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.topSectionWrapper}>
                <div className={styles.cont1}>
                    <h1>Welcome to Marketplace</h1>
                    <div>
                        <p>20</p>
                        <img src={cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/muCoin.svg")} alt="" />
                    </div>
                </div>
                <div className={styles.cont2}>
                    <div>
                        <h2>Redeem rewards using your Mucoins</h2>
                        <button>
                            {" "}
                            <img src={cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/i.svg")} alt="" />
                        </button>
                    </div>{" "}
                    <button onClick={hello}>
                        <History />
                    </button>
                </div>
                <div className={styles.cont3}>
                    {data.map(({ coins, noti, bg, title, descp, link }, i) => (
                        <div className={styles.cardIndividualWrapper}>
                            <div className={styles.TopSet}>
                                <img src={bg} alt="" />
                                <div>
                                    <div>
                                        <p>{coins}</p>
                                        <img src={cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/muCoin.svg")} alt="" />
                                    </div>
                                    <div>
                                        <RedNoti />
                                        <p style={{ color: "red" }}>
                                            {noti} remaining !!
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.bottomSet}>
                                <div>
                                    <h1>{title}</h1>
                                    <p>{descp}</p>
                                </div>
                                <button onClick={() => hello(link)}>
                                    <p>Claim</p>
                                    <LinkLogo />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.bottomSectionWrapper}>
                <div className={styles.hiddenTreaasue}>
                    {rewards.map(({ coins, img, detail }, i) => (
                        <div className={styles.IndividualTreasure}>
                            <img src={img} alt="" />
                            <div>
                                <p>{detail}</p>
                                <div>
                                    <p>{coins}</p>
                                    <img src={cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/muCoin.svg")} alt="" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={styles.Overlapper}>
                    <div>
                        <LockLogo />
                        <p>
                            Oops! You're short on Mucoins.Help friends hit Level
                            4, earn Mucoins!
                        </p>
                        <button onClick={() => hello("https://dribbble.com/")}>
                            Invite
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Marketplace;
