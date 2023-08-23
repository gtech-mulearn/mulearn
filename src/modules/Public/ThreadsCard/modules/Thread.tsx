import React from 'react'
import styles from './Thread.module.css'
import qr from '/src/modules/Public/ThreadsCard/assets/qr.webp'
import mu from '/src/modules/Public/ThreadsCard/assets/mu.webp'
import title from '/src/modules/Public/ThreadsCard/assets/title.webp'
import arrow from '/src/modules/Public/ThreadsCard/assets/arrow.webp'
import barcode from '/src/modules/Public/ThreadsCard/assets/barcode.webp'
import blend1 from '/src/modules/Public/ThreadsCard/assets/Blend-1.webp'
import blend2 from '/src/modules/Public/ThreadsCard/assets/Blend-2.webp'
import blend3 from '/src/modules/Public/ThreadsCard/assets/Blend-3.webp'

export default function Thread() {
    return (
        <div className={styles.ThreadCardBg}>
            <button className={styles.ThreadCardReturn} onClick={() => window.history.back()}>
                &larr;
            </button>

            <div className={styles.cardBg}>
                <img src={blend1} alt="" />
                <img src={blend3} alt="" />
                <img src={blend2} alt="" />
            </div>

            <div className={styles.ThreadCard}>
                <div className={styles.ThreadCardContent}>
                    <div className={styles.ThreadCardFront}>
                        <div className={styles.ThreadCardLogo}>
                            <img src={title} alt="" />
                            <img src={mu} alt="" />
                        </div>
                        <div className={styles.ThreadCardLogoQr}>
                            <img src={qr} alt="" />
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
                            <span><b>Time</b>
                                <p>10:00 AM IST</p>
                            </span>
                        </div>
                        <span className={styles.ThreadCardBackArrow}>
                            <img src={arrow} alt="" />
                        </span>
                        <div className={styles.ThreadCardBarcode}>
                            <b>TICKET NUMBER :</b>
                            <img src={barcode} alt="" />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.marquee}>
                <div className={styles.marquee_group}>
                    <p>MULEARN | EVENT INVITATION |    | THU 6 JUL | 4:30 AM IST | MULEARN | EVENT INVITATION | </p>
                </div>

                <div className={styles.marquee_group}>
                    <p>MULEARN | EVENT INVITATION |    | THU 6 JUL | 4:30 AM IST | MULEARN | EVENT INVITATION | </p>
                </div>
            </div>
        </div>
    )
}
