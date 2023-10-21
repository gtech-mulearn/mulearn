import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  const handleEmailClick = () => {
    window.location.href = "mailto:info@mulearn.in";
  };

  return (
    <div className={styles.footer}>
       <div>
        <p onClick={handleEmailClick}>Contact Us for your queries: info@mulearn.in</p>
       </div>
       <p>Copyright © 2023. All Rights Reserved. µLearn Foundation</p>
    </div>
  )
}
