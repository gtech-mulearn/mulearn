import React from 'react'
import styles from "./LandingPage.module.css"
import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div className={styles.LClandingPage}>

      <nav className={styles.LClandingPageNav}>
        <img src="https://i.ibb.co/vY786NX/image.png" alt="muLearn" />
        <div className={styles.navLinks}>
          <div>
            <Link to="#">About</Link>
            <Link to="#">Programs</Link>
            <Link to="#">Events</Link>
            <Link to="#">Interest Group</Link>
            <Link to="#">Careers</Link>
          </div>
          <button>Join Us</button>
        </div>
      </nav>

      <div className={styles.LClandingPageHeader}>
        <div>
          <span><b>Introducing</b> <img src="https://i.ibb.co/FDQ2M4n/Learn.png" alt="" /></span>
          <b>Learning Circles</b>
        </div>
        <p>An informal mechanism for bringing together learners who are interested in the same topic from across different fields and disciplines. A fantastic way to spend a small amount of time learning about new things with a group of people with same interests!</p>
        <button>Create/Join Learning Circles</button>
      </div>

      <div className={styles.LClandingPage}>
        <div>
          <h2>What are Learning Circles?</h2>
        </div>
      </div>
    </div>
  )
}

export default LandingPage