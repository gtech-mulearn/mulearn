import React from 'react'
import styles from './../Profile.module.css'

type Props = {}

const Tasks = (props: Props) => {
    return (
        <div className={styles.tasks}>
            <h2>Tasks</h2>
            <div className={styles.tasks_div}>
                <div className={styles.task}>
                    <p>Introduction to Markdown <b>200 Karma Points</b></p>
                    <p>Sunday, February 2023 </p>
                </div>
                <div className={styles.task}>
                    <p>Introduction to GitHub <b>200 Karma Points</b></p>
                    <p>Sunday, February 2023 </p>
                </div>
                <div className={styles.task}>
                    <p>Introduction to μLearn <b>50 Karma Points</b></p>
                    <p>Sunday, February 2023 </p>
                </div>
                <div className={styles.task}>
                    <p>Introduction to Discord <b>50 Karma Points</b></p>
                    <p>Sunday, February 2023 </p>
                </div>
                <div className={styles.task}>
                    <p>Self Introduction to the community  <b>20 Karma Points</b></p>
                    <p>Sunday, February 2023 </p>
                </div>
            </div>
        </div>
    )
}

export default Tasks