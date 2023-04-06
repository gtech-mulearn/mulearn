import React, { useState } from "react"
import styles from "./Login.module.css"
import axios from "axios"

type Props = {}

const ForgetPassword = (props: Props) => {
  const [email, setEmail] = useState("")

  const handleForgetPassword = () => {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/v1/user/forgot-password", {
        muid: email,
      })
      .then((res) => {
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.login_page}>
      <div className={styles.login_container}>
        <div className={styles.login_form}>
          <h1>Forgot Password</h1>
          <p className={styles.p_welcome}>
            Don't worry, enter your details to reset your password
          </p>
          <form>
            <input
              type="text"
              placeholder="Enter your email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault()
                if (email.length > 0) {
                  handleForgetPassword()
                }
              }}
              type="submit"
            >
              Reset password
            </button>
            <p className={styles.p_welcome}>
              We've just sent you an email with a reset link. Please check your
              mail inbox.
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ForgetPassword
