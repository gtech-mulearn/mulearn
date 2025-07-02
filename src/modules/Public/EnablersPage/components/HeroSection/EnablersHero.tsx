import React from 'react'
import styles from './EnablersHero.module.css'
import { cdnUrl } from '@/modules/utils/cdn'

export default function EnablersHero() {
  return (
    <div className={styles.enablersHero}>      
          <div>
            <p>Polish your <span>skills</span> through <br /> <span>'µLearn'</span> to make <br /> students <span>industry ready</span>!</p>
            {/* <button>EXPLORE MULEARN FOR ENABLERS</button> */}
          </div> 
          <img src={cdnUrl("src/modules/Public/EnablersPage/assests/Hero.webp")} alt="Hero" />          
    </div>
  )
}
