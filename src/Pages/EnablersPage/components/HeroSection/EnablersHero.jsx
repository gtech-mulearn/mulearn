import React from 'react'
import styles from './EnablersHero.module.css'
import hero from '../../assests/Hero.png'

export default function EnablersHero() {
  return (
    <div className={styles.EnablersHero}>      
          <div>
            <p>Polish your skills through <br />‘µLearn’ to make <br /> students industry ready!</p>
            <button>EXPLORE MULEARN FOR ENABLERS</button>
          </div> 
          <img src={hero} alt="" />          
    </div>
  )
}
