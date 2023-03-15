import React from 'react'
import Tik from './assets/Tik';
import styles from "./Onboarding.module.css";

type Props = {}

const Success = (props: Props) => {
    return (
        <div className={styles.success_page}>
            <div className={styles.tik}>
                <Tik />
            </div>
            <br /><br />
            <p>Woooohh! You successfully registerd</p>
        </div>
    )
}

export default Success