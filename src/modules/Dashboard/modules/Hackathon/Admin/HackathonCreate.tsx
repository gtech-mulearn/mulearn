import React from 'react'
import styles from "./HackathonCreate.module.css"

const HackathonCreate = () => {
  return (
    <div className={styles.container}>

      <div className={styles.topText}>
        <h1 className={styles.dashLine}>Lets Get Started</h1>
        <button className={styles.btn}>save & Finish later</button>
      </div>

      <div className={styles.hackNav}>
        <div className={styles.starImg}>
          <img src="/src/modules/Dashboard/modules/Hackathon/Assects/Star 1.png" alt="" />
          <img src="/src/modules/Dashboard/modules/Hackathon/Assects/Star 2.png" alt="" />
        </div>
        <ul>
          <li>basics</li>
          <li>application</li>
          <li>links</li>
          <span></span>
          <li>prizes</li>
          <li>sponsors</li>
          <li>events</li>
          <li>FAQs</li>
        </ul>
      </div>

      <div className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.InputSet}>
            <label className={styles.formLabel} htmlFor="name">Name</label>
            <input type="text" id="name" placeholder='what you are calling your hackathon' />
          </div>

          <div className={styles.InputSet}>
            <label className={styles.formLabel} htmlFor="description">Tagline</label>
            <input type="text" id="description" placeholder='eg: worlds realest hackathon' />
          </div>

          <div className={styles.InputSet}>
            <label className={styles.formLabel} htmlFor="startDate">Start Date</label>
            <input type="date" id="startDate" />
          </div>

          <div className={styles.InputSet}>
            <label className={styles.formLabel} htmlFor="endDate">End Date</label>
            <input type="date" id="endDate" />
          </div>

          <div className={styles.InputSet}>
            <label className={styles.formLabel} htmlFor="registrationStartDate">Registration Start Date</label>
            <input type="date" id="registrationStartDate" />
          </div>

          <div className={styles.InputSet}>
            <label className={styles.formLabel} htmlFor="registrationEndDate">Registration End Date</label>
            <input type="date" id="registrationEndDate" />
          </div>

          <div className={styles.InputSet}>
            <label className={styles.formLabel} htmlFor="teamSize">Approx. Participants</label>
            <input type="number" id="teamSize" placeholder='eg: 250.' />
          </div>

        </div>
        <div className={styles.InputSet}>
          <label className={styles.formLabel} htmlFor="teamSize">About</label>
          <textarea id="about" placeholder='explain something' />
        </div>
      </div>

      <div className={styles.btns}>
        <button className={styles.btn}>Go back</button>
        <button className={styles.btn}>Next</button>
      </div>
    </div>
  )
}

export default HackathonCreate