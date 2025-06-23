import React from "react";
import styles from "./Thread.module.css";
import { cdnUrl } from "@/modules/utils/cdn";
export default function Thread() {
    return (
        <div className={styles.ThreadCardBg}>
            <button
                className={styles.ThreadCardReturn}
                onClick={() => window.history.back()}
            >
                &larr;
            </button>

            <div className={styles.cardBg}>
                <img src={cdnUrl("src/modules/Public/ThreadsCard/assets/Blend-1.webp")} alt="Background blend effect" />
                <img src={cdnUrl("src/modules/Public/ThreadsCard/assets/Blend-3.webp")} alt="Background blend effect" />
                <img src={cdnUrl("src/modules/Public/ThreadsCard/assets/Blend-2.webp")} alt="Background blend effect" />
            </div>

            <div className={styles.ThreadCard}>
                <div className={styles.ThreadCardContent}>
                    <div className={styles.ThreadCardFront}>
                        <div className={styles.ThreadCardLogo}>
                            <img src={cdnUrl("src/modules/Public/ThreadsCard/assets/title.webp")} alt="Event title" />
                            <img src={cdnUrl("src/modules/Public/ThreadsCard/assets/mu.webp")} alt="µLearn logo" />
                        </div>
                        <div className={styles.ThreadCardLogoQr}>
                            <img src={cdnUrl("src/modules/Public/ThreadsCard/assets/qr.webp")} alt="QR code" />
                        </div>
                    </div>
                    <div className={styles.ThreadCardBack}>
                        <h1>YOU ARE INVITED</h1>
                        <div className={styles.ThreadCardBackDetails}>
                            <span>
                                <b>Name</b>
                                <p>Edwin liby</p>
                            </span>
                            <span>
                                <b>Date</b>
                                <p>THU 6 JUL</p>
                            </span>
                            <span>
                                <b>Time</b>
                                <p>10:00 AM IST</p>
                            </span>
                        </div>
                        <span className={styles.ThreadCardBackArrow}>
                            <img src={cdnUrl("src/modules/Public/ThreadsCard/assets/arrow.webp")} alt="Arrow indicator" />
                        </span>
                        <div className={styles.ThreadCardBarcode}>
                            <b>TICKET NUMBER :</b>
                            <img src={cdnUrl("src/modules/Public/ThreadsCard/assets/barcode.webp")} alt="Ticket barcode" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.marquee}>
                <div className={styles.marquee_group}>
                    <p>
                        MULEARN | EVENT INVITATION | | THU 6 JUL | 4:30 AM IST |
                        MULEARN | EVENT INVITATION |{" "}
                    </p>
                </div>

                <div className={styles.marquee_group}>
                    <p>
                        MULEARN | EVENT INVITATION | | THU 6 JUL | 4:30 AM IST |
                        MULEARN | EVENT INVITATION |{" "}
                    </p>
                </div>
            </div>
        </div>
    );
}
