import React, { useEffect, useState } from "react";
import Eye from "./assets/Eye";
import styles from "./Login.module.css";
import { useToast } from "@chakra-ui/react";
import { login } from "./helpers/apis";
import { useNavigate } from "react-router-dom";

type Props = {};

const Login = (props: Props) => {
  const [showOrHidePassword, setShowOrHidePassword] = useState("password");
  const [muid, setMuID] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

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
                  e.preventDefault();
                  showOrHidePassword == "password"
                    ? setShowOrHidePassword("text")
                    : setShowOrHidePassword("password");
                }}
              >
                <Eye />
              </button>
            </div>
            <p style={{ textAlign: "left"}}>
              <a href="forgot-password">
                Forgot your <b>password?</b>
              </a>
              <a href="register">
                <b>SignUp?</b>
              </a>
            </p>
            <button
              onClick={(e) => {
                e.preventDefault();
                if (muid != "" && password != "") {
                  login(muid, password, toast, navigate);
                  // console.log("Hoi");
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
  );
};

export default Login;
