import React from 'react'
import styles from './RoleFour.module.css'

export default function Role1() {
    return (
        <div>
            <div className={styles.wrapper}>
        <form action="">
            <h5 className={styles.text}>Please enter your collage details</h5>
            <div className={styles.inputBox}>
                <input type="text" placeholder="Collage Name" required />
            </div>
            <div className={styles.content}>
                <h5 className={styles.text}>Do you want to become a mentor?</h5>
                <div className={styles.select}>
                    <button className={styles.selectRadio}>
                        <label>
                            <input type="radio" id="Yes" checked name="radio"/>
                            <span>Yes</span>
                        </label>
                    </button>
                    <button className={styles.selectRadio}>
                        <label>
                            <input type="radio" id="NO" name="radio"/>
                            <span>No</span>
                        </label>
                    </button>
                </div>
            </div>
            
            
            <div className={styles.submit}>
                <button className={styles.submit_b}>Submit</button>
                
            </div>
           
        </form>
    </div>
        </div>
    )}