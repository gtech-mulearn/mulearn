import React from 'react'
import mario from '../../assets/mario.webp'
import styles from './Cards.module.css'

import { BsChevronCompactLeft,BsChevronCompactRight } from "react-icons/bs"

export default function Cards() {
  return (
    <div className={styles.cardsConatiner}>
       <button><BsChevronCompactLeft size={40}/></button>
        
        <div className={styles.card}>
          <img src={mario} alt="" />
           <div className={styles.cardConatiner}>
              <div className={styles.cardContent}>
                 <h1>Learning Fest</h1>
                 <h3>Master your favorite domains, together.</h3>
                 <p>Learn your favorite domains like web development and UI/UX together with your peers. Form learning circles and compete with each other.</p>
                 <div className={styles.cardblob}>
                    <div><p>Free</p></div>
                    <div><p>Online</p></div>
                    <div><p>7K+ Karma points</p></div>
                    <div><p>Mentors from industry</p></div>
                </div>
                <button>i'm in!</button>
              </div>       
            </div>
        </div>

       <button><BsChevronCompactRight size={40}/></button>
    </div>
  )
}
