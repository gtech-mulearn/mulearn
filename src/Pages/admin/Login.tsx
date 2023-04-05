import React, { useState } from "react"
import Eye from "./assets/Eye"
import styles from "./Login.module.css"
import axios from "axios"

type Props = {}

const Login = (props: Props) => {
  const [showOrHidePassword, setShowOrHidePassword] = useState("password")
  const [muid, setMuID] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = () => {
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/auth/user-authentication",
        {
          muid: muid,
          password: password,
        }
      )
      .then((res) => {
        console.log(res.data)
        if (res.data.hasError == false) {
          localStorage.setItem("access_token", res.data.response.access_token)
          localStorage.setItem("refresh_token", res.data.response.refresh_token)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className={styles.login_page}>
      <div className={styles.login_container}>
        <div className={styles.login_form}>
          <h1>User Login</h1>
          <p className={styles.p_welcome}>
            Hey welcome, Please enter your details to get sign in to your
            account
          </p>
          <form>
            <input
              type="text"
              placeholder="Enter µID"
              required
              value={muid}
              onChange={(e) => setMuID(e.target.value)}
            />
            <div className={styles.password_div}>
              <input
                type={showOrHidePassword}
                placeholder="Password"
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
            <p style={{ textAlign: "left" }}>
              <a href="forget">
                Forgot your <b>password?</b>
              </a>
            </p>
            <button
              onClick={(e) => {
                e.preventDefault()
                if (muid != "" && password != "") {
                  handleLogin()
                }
              }}
              type="submit"
            >
              Sign in
            </button>
            <p>
              <a href="/">
                Don’t have an account ? <b>Join now</b>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
