import React from "react";
import styles from "./Login.module.css";

type Props = {};

const ForgetPassword = (props: Props) => {
  return (
    <div className={styles.login_page}>
      <div className={styles.login_container}>
        <div className={styles.login_form}>
          <h1>Forgot Password</h1>
          <p className={styles.p_welcome}>
            Don't worry, enter your details to reset your password
          </p>
          <form>
            <input type="text" placeholder="Enter µID" required />
            <input
              type="text"
              placeholder="Enter your email address"
              required
            />
            <br />
            <br />
            <button type="submit">Reset password</button>
            <p className={styles.p_welcome}>
              We've just sent you an email with a reset link. Please check your
              mail inbox.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ForgetPassword;
