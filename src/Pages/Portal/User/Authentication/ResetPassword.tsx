import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Eye from "./assets/Eye"
import styles from "./Login.module.css"
import axios from "axios"

type Props = {}

//TODO: Add Error Handling
//TOOD: Login => Reset Password Mail(Message: Mail Ayichiund) => Reset Password Page => Reset Password => Login Page

const ResetPassword = (props: Props) => {
  const [showOrHidePassword, setShowOrHidePassword] = useState("password")
  const [muid, setMuID] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [searchParams] = useSearchParams()
  const [token, setToken] = useState("")
  useEffect(() => {
    setToken(searchParams.get("token") as string)
    console.log(token)
    if (token.length > 0 && muid.length === 0) {
      getMuid()
    }
  })

  const getMuid = () => {
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL +
          `/api/v1/user/reset-password/verify-token/${token}/`
      )
      .then((response) => {
        console.log(response.data)
        setMuID(response.data.response.muid)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const ResetPassword = () => {
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL +
          `/api/v1/user/reset-password/${token}/`,
        {
          new_password: password,
        }
      )
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <div className={styles.login_page}>
      <div className={styles.login_container}>
        <div className={styles.login_form}>
          <h1>Reset Password</h1>
          <p className={styles.p_welcome}>
            Choose a new, strong password to keep your information securee
          </p>
          <form>
            <input
              type="text"
              placeholder="Your µID"
              disabled
              required
              value={muid}
            />
            <div className={styles.password_div}>
              <input
                type={showOrHidePassword}
                placeholder="Enter new password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={styles.password_icon}
                onClick={(e) => {
                  e.preventDefault()
                  showOrHidePassword == "password"
                    ? setShowOrHidePassword("text")
                    : setShowOrHidePassword("password")
                }}
              >
                <Eye />
              </button>
            </div>
            <div className={styles.password_div}>
              <input
                type={showOrHidePassword}
                placeholder="Re-enter your new password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                className={styles.password_icon}
                onClick={(e) => {
                  e.preventDefault()
                  showOrHidePassword == "password"
                    ? setShowOrHidePassword("text")
                    : setShowOrHidePassword("password")
                }}
              >
                <Eye />
              </button>
            </div>
            <br />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault()
                if (
                  password == confirmPassword &&
                  password.length > 0 &&
                  confirmPassword.length > 0
                ) {
                  ResetPassword()
                }
              }}
              type="submit"
            >
              Confirm password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
