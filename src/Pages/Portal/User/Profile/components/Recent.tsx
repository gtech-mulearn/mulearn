import React from 'react'
import styles from './../Profile.module.css'

type Props = {}

const Recent = (props: Props) => {
    return (
        <div className={styles.recent}>
            <h2>Recently received Karma</h2>
            <div className={styles.recent_div}>
                <p>On Sunday, February 2023</p>
                <p><b>800 ⭐</b></p>
            </div>
            <div className={styles.recent_div}>
                <p>On Sunday, February 2023</p>
                <p><b>800 ⭐</b></p>
            </div>
            <div className={styles.recent_div}>
                <p>On Sunday, February 2023</p>
                <p><b>800 ⭐</b></p>
            </div>
            <div className={styles.recent_div}>
                <p>On Sunday, February 2023</p>
                <p><b>800 ⭐</b></p>
            </div>
            <div className={styles.recent_div}>
                <p>On Sunday, February 2023</p>
                <p><b>800 ⭐</b></p>
            </div>
            <div className={styles.recent_div}>
                <p>On Sunday, February 2023</p>
                <p><b>800 ⭐</b></p>
            </div>
        </div>
    )
}

export default Recent