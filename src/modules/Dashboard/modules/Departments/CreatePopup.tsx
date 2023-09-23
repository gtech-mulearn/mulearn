import React from 'react'
import styles from './CreatePopup.module.css'

export default function Popup() {
  return (
    <div>
       <div className={styles.popupConatiner}>
        <div>
            <h1>Create a new Department</h1>
            <p>Enter the name of the Department</p>
        </div>
        <div className={styles.popupInput}>
           <input type="text" name="Department_name" id="Department_name" placeholder="Department name"/>
        </div>
        <div className={styles.popupbtns}>
            <button>Submit</button>
            <button>cancel</button>
        </div>
    </div>
    </div>
  )
}

