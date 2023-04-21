import { useState, useEffect } from "react"
import styles from "./Validate.module.css"
import axios from "axios"
import { useParams } from "react-router-dom"
import Preloader from "../../../../Components/Preloader/Preloader"

const Validate = () => {
  const [validation, setValidation] = useState(false)
  const [responseStatus, setResponseStatus] = useState(false)
  let { token } = useParams()
  useEffect(() => {
    axios
      .post(`https://dummyjson.com/http/400`)
      .then((response) => {
        console.log(response.data)
        setValidation(true)
        setResponseStatus(true)
      })
      .catch((error) => {
        console.log(error.response)
        setResponseStatus(true)
      })
  }, [])

  return (
    <>
      <div className={styles.main_container}>
        <div className={styles.validation}>
          {responseStatus ? (
            validation ? (
              <div className={styles.validation_message}>
                <p className={styles.validation_header}>Authorized</p>
                <p className={styles.validation_content}>
                  You token has been validation and you are authorized to access
                  the KKEM Portal using this token
                </p>
                <img
                  src="/assets/common/µLearn.webp"
                  alt=""
                  className={styles.logo}
                />
              </div>
            ) : (
              <div className={styles.validation_message}>
                <p className={styles.validation_header}>Un-Authorized</p>
                <p className={styles.validation_content}>
                  You token has not been validated and you are not authorized to
                  access the KKEM Portal using this token
                </p>
                <img
                  src="/assets/common/µLearn.webp"
                  alt=""
                  className={styles.logo}
                />
              </div>
            )
          ) : (
            <Preloader />
          )}
        </div>
      </div>
    </>
  )
}

export default Validate
