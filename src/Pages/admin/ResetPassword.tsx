import React, { useState } from "react";
import Eye from "./assets/Eye";
import styles from "./Login.module.css";

type Props = {};

const ResetPassword = (props: Props) => {
  const [showOrHidePassword, setShowOrHidePassword] = useState("password");

  return (
    <div className={styles.login_page}>
      <div className={styles.login_container}>
        <div className={styles.login_form}>
          <h1>Reset Password</h1>
          <p className={styles.p_welcome}>
            Choose a new, strong password to keep your information secure
          </p>
          <form>
            <input
              type="text"
              placeholder="Your µID :  muhammedfaris-1@mulearn"
              required
            />
            <div className={styles.password_div}>
              <input
                type={showOrHidePassword}
                placeholder="Enter new password"
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
            <div className={styles.password_div}>
              <input
                type={showOrHidePassword}
                placeholder="Re-enter your new password"
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
            <br />
            <br />
            <button type="submit">Confirm password</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
