import React from 'react'
import styles from './../Profile.module.css'

type Props = {}

const Roles = (props: Props) => {
    return (
        <div className={styles.roles}>
            <h2>Roles</h2>
            <div className={styles.roles_div}>
                <ul>
                    <li>Sunteec</li>
                    <li>Zorone</li>
                    <li>Cyber - sec</li>
                    <li>Student</li>
                    <li>tfp - learner</li>
                    <li>Entrepreneurship</li>
                </ul>
            </div>
        </div>
    )
}

export default Roles