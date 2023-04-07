import React, { useState } from "react"
import styles from "./Login.module.css"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useToast } from "@chakra-ui/react"

type Props = {}

const ForgotPassword = (props: Props) => {
  const [muid, setMuid] = useState("")

  const navigate = useNavigate()
  const toast = useToast()

  const handleForgotPassword = () => {
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/forgot-password/",
        {
          muid: muid,
        }
      )
      .then((res) => {
        console.log(res.data)
        toast({
          title: "Token Mail Sent",
          description: "Kindly check your mail for the reset password link",
          status: "success",
          duration: 3000,
          isClosable: true,
        })

        setTimeout(() => {
          navigate("/user/login")
        }, 5000)
      })
      .catch((error) => {
        toast({
          title: error.response?.data?.message?.general[0],
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
                  handleForgotPassword()
                }
              }}
              type="submit"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword
