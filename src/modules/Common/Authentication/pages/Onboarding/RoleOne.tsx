import React from 'react'
import styles from './RoleOne.module.css'

export default function Role1() {
    return (
        <div>
            <div className={styles.wrapper}>
            <form action="">
            <h5>Please enter your collage details</h5>
            <div className={styles.input_box}>
                <input type="text" placeholder="Collage Name" required />
            </div>
            <div className={styles.input_box}>
                <input type="text" placeholder="Department" required />
            </div>
            <div className={styles.input_box}>
                <input type="text" placeholder="Graduation year" required />
            </div>
            
            <div className={styles.submit}>
                <button className={styles.submit_b}>Submit</button>
                
            </div>
           
        </form>
    </div>
    </div>
    )}