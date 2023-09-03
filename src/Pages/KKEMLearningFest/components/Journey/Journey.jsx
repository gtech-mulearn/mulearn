import React from 'react'
import styles from "./Journey.module.css";
import Img1 from "../../assets/learn.webp";
import Img2 from "../../assets/compete.webp";
import Img3 from "../../assets/oppo.webp";

export default function Journey() {
    return (
        <div className={styles.kkemJourney}>
            <h1>YOUR JOURNEY</h1>
            <div className={styles.kkemJourneyContent}>
                <div className={styles.kkemJourneyCard}>
                    <img src={Img1} alt="" />
                    <h1>1: LEARN</h1>
                    <span>
                        <p>⭐ Choose your interest groups</p>
                        <p>⭐ Form Learning Circle</p>
                        <p>⭐ Study Together</p>
                    </span>
                </div>
                <div className={styles.kkemJourneyCard}>
                    <img src={Img2} alt="" />
                    <h1>2: COMPETE</h1>
                    <span>
                        <p>⭐ Participate in Competitions</p>
                        <p>⭐ Meet Industry Experts</p>
                        <p>⭐ Build your Profile</p>
                    </span>
                </div>
                <div className={styles.kkemJourneyCard}>
                    <img src={Img3} alt="" />
                    <h1>3: OPPORTUNITIES</h1>
                    <span>
                        <p>⭐ Connect with industry experts</p>
                        <p>⭐ Get valuable insights</p>
                        <p>⭐ Launch your Career</p>
                    </span>
                </div>
            </div>
        </div>
    )
}
