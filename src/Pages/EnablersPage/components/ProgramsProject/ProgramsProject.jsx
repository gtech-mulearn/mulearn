import React from 'react'
import styles from './ProgramsProject.module.css'
import Project1 from '../../assests/Project1.webp'
import Project2 from '../../assests/Project2.webp'
import Blink from '../../assests/Blink.webp'

export default function ProgramProject() {
  return (
    <div id='Program' className={styles.programProject}>
        <h1>Enabler <span>Programs</span>  & Projects</h1>

         <div className={styles.programProjectGrid}>
            
            <div className={styles.programProjectGridCard}>
                <img className={styles.programProjectGridCardImg} src={Project1} alt="" />

                <div  className={styles.programProjectEnablers}>
                    <div>
                        <img src={Blink} alt="" />
                        <img src={Blink} alt="" />
                        <img src={Blink} alt="" />
                        <img src={Blink} alt="" />
                    </div>
                     <p>+ 40 enablers</p>
                </div>
                <div className={styles.programProjectGridContent}>
                    <p>1 - 28 July 2022</p>
                    <h2>WikiSyllabus Project</h2>
                    <p>µLearn's open-source WikiSyllabus Project aims to create a dynamic curriculum library enriched by enablers' valuable contributions. They’ll receive lessons on Git, GitHub, and open-source principles to support their WikiSyllabus Project contributions.</p>
                    <div>
                        <h3>$ 300 <span>$500</span></h3>
                        <button>Enroll Now</button>
                    </div>
                </div>   

            </div>

            <div className={styles.programProjectGridCard}>
                <img className={styles.programProjectGridCardImg} src={Project2} alt="" />
                  
                <div  className={styles.programProjectEnablers}>
                    <div>
                        <img src={Blink} alt="" />
                        <img src={Blink} alt="" />
                        <img src={Blink} alt="" />
                        <img src={Blink} alt="" />
                    </div>
                     <p>+ 11 enablers</p>
                </div>
                <div className={styles.programProjectGridContent}>
                    <p>1 - 28 July 2022</p>
                    <h2>Art of Teaching - Teach Contest</h2>
                    <p>Art of Teaching is an annual event that spotlights enablers' teaching talents. They can showcase their skills through videos, simplifying concepts for students. In the last edition, we received 150+ video entries and rewarded winners with cash prizes.</p>
                    <div>
                        <h3>$ 300 <span>$500</span></h3>
                        <button>Enroll Now</button>
                    </div>
                </div>     

            </div>
      

         </div>
    </div>
  )
}
