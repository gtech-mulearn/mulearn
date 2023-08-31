import React from 'react'
import styles from './Template.module.css'
import OnboardingHeader from '../../components/Head/OnboardingHeader'

export default function Template() {
    return (
        <div className={styles.Template}>
            <OnboardingHeader />
        </div>
    )
}
