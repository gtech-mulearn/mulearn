import React from 'react'
import styles from './RankCard.module.css'

export default function RankCard() {
    return (
        <div className={styles.RankCard}>
            <div className={styles.RankCardDetails}>
                <div className={styles.ProfileImg}>
                    <img src="/src/modules/Embeds/modules/RankCard/assets/sample.png" alt="" />
                </div>
                <div className={styles.ProfileDetails}>
                    <div className={styles.ProfileName}>
                        <h1>Minna Elizabeth Martin</h1>
                        <p>MBCET</p>
                    </div>
                    <div className={styles.Rank}>
                        <div className={styles.karma}>
                            <b>9.12K</b>
                            <p>Karma</p>
                        </div>
                        <div className={styles.muRank}>
                            <b>25</b>
                            <p>Rank</p>
                        </div>
                    </div>
                    <div className={styles.InterestGrp}>
                        <ul>
                            <li>Web Development</li>
                            <li>IoT</li>
                            <li>App Development</li>
                            <li>Machine Learning</li>
                            <li>Competitive Coding</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className={styles.Bottom}>
                <p>STUDENT</p>
                <img src="/src/modules/Embeds/modules/RankCard/assets/µLearn.png" alt="" />
            </div>

        </div>
    )
}
