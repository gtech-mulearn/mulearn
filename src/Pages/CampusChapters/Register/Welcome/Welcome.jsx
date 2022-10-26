import React, { useState } from "react";
import Footer from "../../../../Components/Footer/Footer";
import Navbar from "../../../../Components/Navbar/Navbar";
import styles from "./Welcome.module.css";

const Welcome = () => {
  const [trigger, setTrigger] = useState(false);
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.welcome_container}>
              <p className={styles.wc_heading}>
                {trigger ? "Check your Mail" : "Welcome"}
              </p>
              <p className={styles.wc_text}>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. In,
                amet ex libero hic minus nesciunt!
              </p>
              <br />
              <p className={styles.wc_text}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>

              {!trigger && (
                <div className={styles.wc_form}>
                  <p className={styles.label}>Enter your Email</p>
                  <input type="email" />
                  <button onClick={() => setTrigger(true)} type="submit">
                    Continue
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Welcome;
