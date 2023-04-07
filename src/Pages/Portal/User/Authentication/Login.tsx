import React, { useState } from "react"
import Eye from "./assets/Eye"
import styles from "./Login.module.css"
import axios from "axios"
import { useToast } from "@chakra-ui/react"

type Props = {}

const Login = (props: Props) => {
  const [showOrHidePassword, setShowOrHidePassword] = useState("password")
  const [muid, setMuID] = useState("")
  const [password, setPassword] = useState("")
  const toast = useToast()

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
          toast({
            title: "Login Successful",
            description: "You have been logged in successfully",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
        }
      })
      .catch((error) => {
        console.log(error)
        toast({
          title: error.response.data.message.general[0],
          status: "error",
          duration: 3000,
          isClosable: true,
        })
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
              <a href="forgot-password">
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
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
