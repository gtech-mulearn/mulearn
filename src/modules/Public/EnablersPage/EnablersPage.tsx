import React from 'react'
import styles from './EnablersPage.module.css'
import EnablersHero from './components/HeroSection/EnablersHero'
import WhoIsEnabler from './components/WhoISEnabler/WhoIsEnabler'
import BenefitsEnabler from './components/BenefitsEnabler/BenefitsEnabler'
import ProgramsProject from './components/ProgramsProject/ProgramsProject'
import Onboarding from './components/Onboarding/Onboarding'
import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import Footer from "@/modules/Common/Footer/Footer";

export default function EnablersPage() {
  return (
    <>
    
    <div className={styles.EnablersPage}>
      <HomeNav />
      <EnablersHero/>
    </div>

    <WhoIsEnabler/>
    <BenefitsEnabler/>
    <ProgramsProject/>
    <Onboarding/>
    <Footer />
    </>
  )
}
