import React from "react";

import styles from "./Notifications.module.css";
import ReactTimeAgo from "react-time-ago";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

const Notifications = () => {
  let notifications = require("./data/notifications.json");
  console.log(new Date());

  TimeAgo.setDefaultLocale(en.locale);
  TimeAgo.addLocale(en);

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
              {notifications &&
                notifications.new.map((notification) => (
                  <div className={styles.notification}>
                    <p className={styles.notification_header}>
                      {notification.title}{" "}
                      <span>
                        <ReactTimeAgo date={notification.date} locale="en-US" />
                      </span>
                    </p>
                    <p className={styles.notification_text}>
                      {notification.description}
                    </p>
                    <a
                      href={notification.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className={styles.link}>Read More</p>
                    </a>
                  </div>
                ))}
            </div>
            <hr className={styles.line} />
            <div className={styles.notifications_view}>
              <p className={styles.timeline}>Past Notifications</p>
              {notifications &&
                notifications.old.map((notification) => (
                  <div className={styles.notification}>
                    <p className={styles.notification_header}>
                      {notification.title}{" "}
                      <span>
                        <ReactTimeAgo date={notification.date} locale="en-US" />
                      </span>
                    </p>
                    <p className={styles.notification_text}>
                      {notification.description}
                    </p>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Notifications;
