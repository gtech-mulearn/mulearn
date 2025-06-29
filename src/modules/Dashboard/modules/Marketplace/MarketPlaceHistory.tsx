import styles from "./MarketPlaceHistory.module.css";
import { cdnUrl } from "@/modules/utils/cdn";
import { HintLogo } from "./assets/svg";
import { style } from "d3";
import { useState } from "react";

type Props = {};

const MarketPlaceHistory = (props: Props) => {
    const statusClr = (status: string) => {
        if (status === "Delivered") return styles.green;
        if (status === "Cancelled") return styles.red;
    };

    const [data, setData] = useState([
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            desp: "Lorem Ipsum bla bla description I guess",
            coins: 20,
            status: "Cancelled",
            address:
                "102, Dream Nest Opp.Tikka Hut, Mallamar Chokkabettu, Surathkal Mangaluru-575014",
            hints: "https://www.google.com"
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            desp: "Lorem Ipsum bla bla description I guess",
            coins: 20,
            status: "Delivered",
            address:
                "102, Dream Nest Opp.Tikka Hut, Mallamar Chokkabettu, Surathkal Mangaluru-575014",
            hints: "https://www.google.com"
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            desp: "Lorem Ipsum bla bla description I guess",
            coins: 20,
            status: "Ordered",
            address:
                "102, Dream Nest Opp.Tikka Hut, Mallamar Chokkabettu, Surathkal Mangaluru-575014",
            hints: "https://www.google.com"
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            desp: "Lorem Ipsum bla bla description I guess",
            coins: 20,
            status: "Ordered",
            address:
                "102, Dream Nest Opp.Tikka Hut, Mallamar Chokkabettu, Surathkal Mangaluru-575014",
            hints: "https://www.google.com"
        },
        {
            img: cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/bgCard.svg"),
            title: "ChatGPT Pro",
            desp: "Lorem Ipsum bla bla description I guess",
            coins: 20,
            status: "Ordered",
            address:
                "102, Dream Nest Opp.Tikka Hut, Mallamar Chokkabettu, Surathkal Mangaluru-575014",
            hints: "https://www.google.com"
        }
    ]);
    return (
        <div className={styles.wrapper}>
            <div className={styles.topSectionWrapper}>
                <div className={styles.cont1}>
                    <h1>Your past orders</h1>
                    <div>
                        <p>20</p>
                        <img src={cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/muCoin.svg")} alt="Coin" />
                    </div>
                </div>
                <div className={styles.cont2}>
                    <div>
                        <h2>View your order details and history.</h2>
                        <button>
                            {" "}
                            <img src={cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/i.svg")} alt="Info" />
                        </button>
                    </div>{" "}
                </div>
                <div className={styles.cont3}>
                    {data.map(
                        (
                            { img, title, desp, coins, status, address, hints },
                            i
                        ) => (
                            <div className={styles.innerContainer}>
                                <img src={img} alt="" />
                                <div className={styles.containerContent}>
                                    <div className={styles.containerContent1}>
                                        <div className={styles.firstdiv}>
                                            <h1>ChatGPT Pro</h1>
                                            <p>
                                                Lorem Ipsum bla bla description
                                                I guess
                                            </p>
                                        </div>

                                        <div className={styles.coinss}>
                                            <p>20</p>
                                            <img src={cdnUrl("src/modules/Dashboard/modules/Marketplace/assets/muCoin.svg")} alt="Coin" />
                                        </div>
                                    </div>
                                    <div
                                        className={
                                            styles.status +
                                            " " +
                                            statusClr(status)
                                        }
                                    >
                                        <p>Status:</p>
                                        <h1>{status}</h1>
                                    </div>
                                    <div
                                        style={{
                                            display: "flex"
                                        }}
                                    >
                                        <p>to</p>
                                        <p>{address}</p>
                                    </div>
                                </div>
                                <button>
                                    <HintLogo />
                                </button>
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default MarketPlaceHistory;
