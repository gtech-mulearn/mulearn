import React from "react";
import styles from "./Notifications.module.css";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const Notifications = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_view_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_header}>Notifications</p>
              <p className={styles.fv_tagline}>
                Hey its seems like there are some new notifications waiting for
                you.
              </p>
            </div>
          </div>
          <hr className={styles.line} />
          <div className={styles.notications_view_container}>
            <div className={styles.notifications_view}>
              <p className={styles.timeline}>This Week</p>
              <div className={styles.notification}>
                <p className={styles.notification_header}>
                  Undaku Hiring Call <span>3 Days Ago</span>
                </p>
                <p className={styles.notification_text}>
                  Undaku is a ‘SasSiest No-code Plaorm with more flexibility to
                  solve complex Logic B2B use cases. They are presently looking
                  for Sales and Marketing Intern, Content Writer Intern and two
                  MEAN Stack Developer Interns
                </p>
                <p className={styles.link}>Read More</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notifications;
