import React from 'react'
import styles from './EnablersHero.module.css'
import hero from '../../assests/Hero.webp'

export default function EnablersHero() {
  return (
    <div className={styles.enablersHero}>      
          <div>
            <p>Polish your <span>skills</span> through <br /> <span>‘µLearn’</span> to make <br /> students <span>industry ready</span> !</p>
            {/* <button>EXPLORE MULEARN FOR ENABLERS</button> */}
          </div> 
          <img src={hero} alt="" />          
    </div>
  )
}
