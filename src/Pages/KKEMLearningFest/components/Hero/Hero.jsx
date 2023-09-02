import React from 'react'
import styles from './Hero.module.css'
import coin from '../../assets/coin.webp'
import KKEMLogo from '../../assets/KKEMLogo.webp'
import Illustration from '../../assets/illustration.webp'
import Logo from '../../assets/Logo.webp'
import Group from '../../assets/Group.webp'

export default function Hero() {
  return (
    <div className={styles.kkemHero}>
      <div className={styles.kkemHeroContent}>
        <div className={styles.kkemHeroLeft}>
          <img className={styles.kkemHeroLogo} src={KKEMLogo} alt="" />
          <h1>READY TO <br /> CHASE YOUR <br />AMBITIONS?</h1>
          <p>Kerala Tech Expo is here..</p>
          <button>Start</button>
        </div>
        <div className={styles.kkemHeroRight}>
          <img className={styles.kkemHeroLogoImg} src={Logo} alt="" />
          <img className={styles.kkemHeroGroup} src={Group} alt="" />
        </div>
      </div>
      <img className={styles.kkemHeroIllustration} src={Illustration} alt="" />
    </div>
  )
}
