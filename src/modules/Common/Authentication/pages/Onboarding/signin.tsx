import React from 'react'
import styles from './signin.module.css'
import google from '../../assets/google.png'

export default function Signin() {
    return (
        <div>
            <div className={styles.wrapper}>
        <form action="">
            <div className={styles.input_box}>
                <input type="text" placeholder="Email" required/>
            </div>
            <div className={styles.input_box}>
                <input type="password" placeholder="Password" required/>
            </div>
            <div className={styles.forgot}>
                <p>Forgot your <span>Password</span></p>
                <p>Login with <span>OTP</span></p>
            </div>
            <div className={styles.submit}>
                <button className={styles.submit_b}>Submit</button>
                <p>OR</p>
                <button className={styles.google}>
                    <img className={styles.google_icon} src={google} alt=""/>
                    <p>Sign in with google</p>
                </button>

            </div>
            <div className={styles.no_account}>
                <p>Don't have an account?<a href="">Sign Up</a></p>
                
            </div>
        </form>
    </div>
        </div>

    )
}