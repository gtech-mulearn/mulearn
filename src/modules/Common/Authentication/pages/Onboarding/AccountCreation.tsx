import React from 'react'
import styles from './accountCreation.module.css'

export default function AccountCreation() {
  return (
    <div className={styles.accountCreationContainer}>
      <div className={styles.accountCreationInputs}>
        <input type="email" placeholder='Email id'/>
        <div className={styles.accountCreationName}>
            <input type="text" placeholder='First Name' />
            <input type="text" placeholder='Last Name'/>
        </div>
        <input type="number" placeholder='+91' />
        <div className={styles.accountCreationPassword}>
        <input type="password" placeholder='Password' />eye
        </div>    
        <input type='password' placeholder='Confirm Password'/>
        <button>Create Account</button>
      </div>

    </div>
  )
}

