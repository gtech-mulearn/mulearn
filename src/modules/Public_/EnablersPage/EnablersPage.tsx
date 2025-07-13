import React from 'react'
import styles from './EnablersPage.module.css'
import EnablersHero from './components/HeroSection/EnablersHero'
import WhoIsEnabler from './components/WhoISEnabler/WhoIsEnabler'
import BenefitsEnabler from './components/BenefitsEnabler/BenefitsEnabler'
import ProgramsProject from './components/ProgramsProject/ProgramsProject'
import Onboarding from './components/Onboarding/Onboarding'
import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar/Navbar'

export default function EnablersPage() {
  return (
    <>
    
    <div className={styles.EnablersPage}>
      <Navbar/>
      <EnablersHero/>
    </div>

    <WhoIsEnabler/>
    <BenefitsEnabler/>
    <ProgramsProject/>
    <Onboarding/>
    <Footer/>
    </>
  )
}
