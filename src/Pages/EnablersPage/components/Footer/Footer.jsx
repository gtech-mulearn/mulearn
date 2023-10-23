import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  const handleEmailClick = () => {
    window.location.href = "mailto:enabler@mulearn.org";
  };

  return (
    <div className={styles.footer}>
       <div>
        <p onClick={handleEmailClick}>Contact Us for your queries: enabler@mulearn.org</p>
       </div>
       <p>Copyright © 2023. All Rights Reserved. µLearn Foundation</p>
    </div>
  )
}
