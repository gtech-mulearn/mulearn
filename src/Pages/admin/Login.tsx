import React, { useState } from "react";
import Eye from "./assets/Eye";
import styles from "./Login.module.css";

type Props = {};

const Login = (props: Props) => {
  const [showOrHidePassword, setShowOrHidePassword] = useState("password");
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
              placeholder="Enter µID or Email address"
              required
            />
            <div className={styles.password_div}>
              <input
                type={showOrHidePassword}
                placeholder="Password"
                required
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
            <p style={{ textAlign: "left" }}>
              <a href="forget">
                Forgot your <b>password?</b>
              </a>
            </p>
            <button type="submit">Sign in</button>
            <p>
              <a href="/">
                Don’t have an account ? <b>Join now</b>
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
