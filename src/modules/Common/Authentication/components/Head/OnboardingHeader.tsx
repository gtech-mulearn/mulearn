import React from 'react'
import mu from '/src/modules/Common/Authentication/assets/µLearn.png'
import Styles from './OnboardingHeader.module.css'

export default function OnboardingHeader() {
    return (
        <div className={Styles.onboardingHeader}>
            <img src={mu} alt="" />
            <h1>Hello ! Welcome back</h1>
            <p>Hey Welcome, please enter your details to
                <br />
                sign in your account
            </p>
        </div>
    )
}
