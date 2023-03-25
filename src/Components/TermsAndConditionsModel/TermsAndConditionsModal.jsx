import React, { useState, useEffect } from "react"
import styles from "./TermsAndConditionsModal.module.css"

const TermsAndConditionsModal = () => {
  const [showModal, setShowModal] = useState(false)

  const handleShowModal = () => {
    const hasAccepted = localStorage.getItem("hasAcceptedTerms")
    if (!hasAccepted) {
      setShowModal(true)
    }
  }

  useEffect(() => {
    handleShowModal()
  }, [])

  const handleAcceptTerms = () => {
    localStorage.setItem("hasAcceptedTerms", "true")
    setShowModal(false)
  }

  const handleDeclineTerms = () => {
    localStorage.setItem("hasAcceptedTerms", "false")
    setShowModal(false)
  }

  return (
    <div>
      {showModal && (
        <div className={styles.modal_wrapper}>
          <div
            className={styles.modal_backdrop}
            onClick={handleDeclineTerms}
          ></div>
          <div className={styles.modal}>
            <h1>Terms and Conditions & Privacy Policy</h1>

            <p>
              By clicking 'Accept', you agree to our website's{" "}
              <a
                href="/termsandconditions"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms and Conditions
              </a>
              &nbsp;and{" "}
              <a
                href="/privacypolicy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
            </p>
            <div className={styles.button_align}>
              <div className={styles.button_container}>
                <button onClick={handleAcceptTerms}>Accept</button>
              </div>
              <div className={styles.button_decline}>
                <button onClick={handleDeclineTerms}>Decline</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TermsAndConditionsModal
