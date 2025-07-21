import React from "react";
import styles from "./Calendar.module.css";
import Footer from "@/modules/Common/Footer/Footer";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";




const Calendar = () => {
  return (
    <>
      <HomeNav />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn</span> Calendar
              </p>
              <p className={styles.fv_tagline}>
                There are a lot of opportunties for you to learn and improve
                yourself. Want to join and learn from such opportunties. Keep a
                close watch on this calendar. We have many surpises for you on
                the way!
              </p>
            </div>
          </div>
        </div>

        <div id="calendardiv" className={styles.calendar_view_container}>
          <div className={styles.calendar_view}>
            <div className={styles.cv_texts}></div>
            <div className={styles.iframe_container}>
              <iframe src="https://embed.styledcalendar.com/#hew26NgCmtLDa4E2BeTK" title="Styled Calendar" className="airtable-embed"  data-cy="calendar-embed-iframe" width="100%" height="700"></iframe>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Calendar;