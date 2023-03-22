import React from "react"
import Tik from "./assets/Tik"
import styles from "./Onboarding.module.css"

type Props = {}

const Success = (props: Props) => {
  return (
    <div className={styles.success_page}>
      <div className={styles.tik}>
        <Tik />
      </div>
      <br />
      <br />
      <p>Woooohh! You successfully registered</p>
      <div className={styles.buttons}>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <button className={styles.button}>Join Whatsapp</button>
        </a>
        <a href="http://" target="_blank" rel="noopener noreferrer">
          <button className={styles.button}>Discover Discord</button>
        </a>
      </div>
    </div>
  )
}

export default Success
