import React from 'react'
import styles from './BenfitsEnabler.module.css'
import { cdnUrl } from "@/modules/utils/cdn";


export default function BenefitsEnabler() {
  return (
    <div id='Benefits' className={styles.benefitsEnabler}>
        <h1 className={styles.benefitsEnablerHeading}><span>Benefits</span> to the Enabler</h1>
        
            <div className={styles.benefitsEnablerBenefits}>
                <img className={styles.benefitsEnablerBenefitsImage} src={cdnUrl("src/modules/Public/EnablersPage/assests/Benefits1.webp")} alt="Industry Immersion Programs" />
                 <div>
                    <h1>Industry Immersion Programs</h1>
                    <div>
                       <img src={cdnUrl("src/modules/Public/EnablersPage/assests/BenefitsIcon1.svg")} alt="Benefits Icon 1" />
                      <p>Offering Enablers short-term industry internships to stay connected with current practices and emerging technologies.</p>
                    </div>
                    <div>
                    <img src={cdnUrl("src/modules/Public/EnablersPage/assests/BenefitsIcon2.svg")} alt="Benefits Icon 2" />
                    <p>TA's and presenters can be moved to the front of the class.</p>
                    </div>
                 </div>
            </div>

            <div className={styles.benefitsEnablerBenefits}>
                 <div>
                    <h1>Up-Skill Programs</h1>
                    <div>
                       <img src={cdnUrl("src/modules/Public/EnablersPage/assests/BenefitsIcon1.svg")} alt="Benefits Icon 1" />
                      <p>Providing a platform for enablers to gain insights from industry mentors.</p>
                    </div>
                    <div>
                    <img src={cdnUrl("src/modules/Public/EnablersPage/assests/BenefitsIcon2.svg")} alt="Benefits Icon 2" />
                    <p>Enablers can enhance their skills and stay updated with emerging technologies.</p>
                    </div>
                    <div>
                    <img src={cdnUrl("src/modules/Public/EnablersPage/assests/BenefitsIcon3.svg")} alt="Benefits Icon 3" />
                    <p>Workshops focused on technology, no-code solutions, Git, GitHub, and participation in open-source programs to enhance enablers' knowledge.</p>
                    </div>
                 </div>
                 <img className={styles.benefitsEnablerBenefitsImage} src={cdnUrl("src/modules/Public/EnablersPage/assests/Benefits2.webp")} alt="Up-Skill Programs" />
            </div>

            <div className={styles.benefitsEnablerBenefits}>
                <img className={styles.benefitsEnablerBenefitsImage} src={cdnUrl("src/modules/Public/EnablersPage/assests/Benefits3.webp")} alt="Meet-ups" />
                 <div>
                    <h1>Meet-ups</h1>
                    <div>
                       <img src={cdnUrl("src/modules/Public/EnablersPage/assests/BenefitsIcon3.svg")} alt="Benefits Icon 3" />
                      <p>Enabler meet-ups with industry and peers offer statewide networking, benefiting both their network and their institution's reputation.</p>
                    </div>

                    <div>
                    <img src={cdnUrl("src/modules/Public/EnablersPage/assests/BenefitsIcon1.svg")} alt="Benefits Icon 1" />
                    <p>Monthly District Meetups: Virtual/Offline event to check the status of involvement in colleges.</p>
                   </div>

                   <div>
                    <img src={cdnUrl("src/modules/Public/EnablersPage/assests/BenefitsIcon2.svg")} alt="Benefits Icon 2" />
                    <p>Zonal Meetups: Offline event organized with the help of our three zonal heads once in 3 months.</p>
                   </div>
                    
                 </div>
            </div>
            

    </div>
  )
}
