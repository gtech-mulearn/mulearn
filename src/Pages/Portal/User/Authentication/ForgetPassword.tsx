import React, { useState } from "react"
import styles from "./Login.module.css"
import axios from "axios"

type Props = {}

const ForgetPassword = (props: Props) => {
  const [muid, setMuid] = useState("")
  const [apiTrigger, setAPITrigger] = useState(false)
  const [hasError, setHasError] = useState({
    error: false,
    statusCode: 0,
    message: "",
  })

  const handleForgetPassword = () => {
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/forgot-password/",
        {
          muid: muid,
        }
      )
      .then((res) => {
        console.log(res.data)
        setAPITrigger(true)
      })
      .catch((error) => {
        console.log(error)
        setHasError({
          error: error.response.data.hasError,
          statusCode: error.response.data.statusCode,
          message:
            error.response.data.message.length > 0
              ? error.response.data.message
              : "Some Error Has Occured",
        })

        setTimeout(() => {
          setHasError({
            error: false,
            statusCode: 0,
            message: "",
          })
        }, 2000)
      })
  }

  return (
    <div className={styles.login_page}>
      {hasError.error && (
        <div className={styles.validation_error_message}>
          <p>{hasError.message}</p>
        </div>
      )}
      <div className={styles.login_container}>
        <div className={styles.login_form}>
          <h1>Forgot Password</h1>
          <p className={styles.p_welcome}>
            Don't worry, enter your muid to reset your password
          </p>
          <form>
            <input
              type="text"
              placeholder="Enter your Muid"
              required
              value={muid}
              onChange={(e) => setMuid(e.target.value)}
            />
            <br />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault()
                if (muid.length > 0) {
                  handleForgetPassword()
                }
              }}
              type="submit"
            >
              Reset password
            </button>
            {apiTrigger && (
              <p className={styles.p_welcome}>
                We've just sent you an muid with a reset link. Please check your
                mail inbox.
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}
export default ForgetPassword
