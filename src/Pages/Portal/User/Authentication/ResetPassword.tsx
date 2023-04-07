import React, { useState, useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import Eye from "./assets/Eye"
import styles from "./Login.module.css"
import axios from "axios"
import { Button, useToast } from "@chakra-ui/react"

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

  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    console.log("test")
    const paramToken = searchParams.get("token")
    setToken(paramToken as string)
    console.log(token)
    if (token.length > 0 && muid.length === 0) {
      getMuid()
    }
  }, [token])

  const getMuid = () => {
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL +
          `/api/v1/user/reset-password/verify-token/${token}/`
      )
      .then((response) => {
        console.log(response.data)
        toast({
          title: "User Verified",
          description: "Your Token has been validated,reset your password",
          status: "success",
          duration: 5000,
          isClosable: true,
        })
        setMuID(response.data.response.muid)
      })
      .catch((error) => {
        toast({
          title: "Invalid Token",
          description: "Make sure you entered the correct token, try again",
          status: "error",
          duration: 4000,
          isClosable: true,
        })

        setTimeout(() => {
          navigate("/user/forgot-password")
        }, 5000)
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
        if (response.data.statusCode === 200) {
          toast({
            title: "Password Reset Successful",
            description: "You will be redirected to login page shortly",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
          setTimeout(() => {
            navigate("/user/login")
          }, 4000)
        }
      })
      .catch((error) => {
        toast({
          title: "Invalid Token",
          description:
            "Kindly request for a new token, you will be redirected.",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
        setTimeout(() => {
          navigate("/user/forgot-password")
        }, 4000)
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
