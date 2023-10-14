import React from 'react'
import styles from './BenfitsEnabler.module.css'
import Benefits1 from '../../assests/Benefits1.png'
import Benefits2 from '../../assests/Benefits2.png'
import Benefits3 from '../../assests/Benefits3.png'
import BenefitsIcon1 from '../../assests/BenefitsIcon1.svg'
import BenefitsIcon2 from '../../assests/BenefitsIcon2.svg'
import BenefitsIcon3 from '../../assests/BenefitsIcon3.svg'


export default function BenefitsEnabler() {
  return (
    <div id='Benefits' className={styles.BenefitsEnabler}>
        <h1 className={styles.BenefitsEnablerHeading}><span>Benefits</span> to the Enabler</h1>
        
            <div className={styles.BenefitsEnablerBenefits}>
                <img className={styles.BenefitsEnablerBenefitsImage} src={Benefits1} alt="" />
                 <div>
                    <h1>Industry Immersion Programs</h1>
                    <div>
                       <img src={BenefitsIcon1} alt="" />
                      <p>Offering Enablers short-term industry internships to stay connected with current practices and emerging technologies.</p>
                    </div>
                    <div>
                    <img src={BenefitsIcon2} alt="" />
                    <p>TA’s and presenters can be moved to the front of the class.</p>
                    </div>
                 </div>
            </div>

            <div className={styles.BenefitsEnablerBenefits}>
                 <div>
                    <h1>Up-Skill Programs</h1>
                    <div>
                       <img src={BenefitsIcon1} alt="" />
                      <p>Providing a platform for enablers to gain insights from industry mentors.</p>
                    </div>
                    <div>
                    <img src={BenefitsIcon2} alt="" />
                    <p>Enablers can enhance their skills and stay updated with emerging technologies.</p>
                    </div>
                    <div>
                    <img src={BenefitsIcon3} alt="" />
                    <p>Workshops focused on technology, no-code solutions, Git, GitHub, and participation in open-source programs to enhance enablers' knowledge.</p>
                    </div>
                 </div>
                 <img className={styles.BenefitsEnablerBenefitsImage} src={Benefits2} alt="" />
            </div>

            <div className={styles.BenefitsEnablerBenefits}>
                <img className={styles.BenefitsEnablerBenefitsImage} src={Benefits3} alt="" />
                 <div>
                    <h1>Meet-ups</h1>
                    <div>
                       <img src={BenefitsIcon3} alt="" />
                      <p>Enabler meet-ups with industry and peers offer statewide networking, benefiting both their network and their institution's reputation.</p>
                    </div>

                    <div>
                    <img src={BenefitsIcon1} alt="" />
                    <p>Monthly District Meetups: Virtual/Offline event to check the status of involvement in colleges.</p>
                   </div>

                   <div>
                    <img src={BenefitsIcon2} alt="" />
                    <p>Zonal Meetups: Offline event organized with the help of our three zonal heads once in 3 months.</p>
                   </div>
                    
                 </div>
            </div>
            

    </div>
  )
}
