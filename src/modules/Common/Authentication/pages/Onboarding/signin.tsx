import React from 'react'
import styles from './signin.module.css'
import google from '../../assets/google.png'
import { PowerfulButton } from '@/MuLearnComponents/MuButtons/MuButton'

export default function Signin() {
    return (
        <div>
            <div className={styles.wrapper}>
        <form action="">
            <div className={styles.inputBox}>
                <input type="text" placeholder="Email" required/>
            </div>
            <div className={styles.inputBox}>
                <input type="password" placeholder="Password" required/>
            </div>
            <div className={styles.forgot}>
                <p>Forgot your <span>Password</span></p>
                <p>Login with <span>OTP</span></p>
            </div>
            <div className={styles.submit}>
                <PowerfulButton className={styles.submitB}>Submit</PowerfulButton>
                <p>OR</p>
                <PowerfulButton className={styles.google}>
                    <img className={styles.googleIcon} src={google} alt=""/>
                    <p>Sign in with google</p>
                </PowerfulButton>

            </div>
            <div className={styles.noAccount}>
                <p>Don't have an account?<a href="">Sign Up</a></p>
                
            </div>
        </form>
    </div>
        </div>

    )
}