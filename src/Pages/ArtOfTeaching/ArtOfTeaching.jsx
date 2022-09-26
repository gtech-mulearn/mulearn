import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import styles from "./ArtOfTeaching.module.css";

import fvimg from "./assets/fvimg.gif";

const ArtOfTeaching = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn Art</span> of Teaching 2.0
              </p>
              <p className={styles.fv_tagline}>
                µLearn is back with Art of Teaching to honor teachers who are
                the one who mould our future generation. GTech µLearn is
                partnering with Google developers, KTU and Kerala University for
                Art of Teaching 2.0.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.theme}>Theme: Lessons of The Future.</p>
              <p className={styles.sv_heading}>
                What is <span>The Contest?</span>
              </p>

              <p className={styles.sv_tagline}>
                A 3-minute video contest, where the teachers can send in a video
                of them teaching any of the following topic in a creative
                manner.{" "}
              </p>
            </div>

            <div className={styles.cards_container}>
              <div className={styles.topic_card}>
                <p className={styles.topic}>Topic 1</p>
                <p className={styles.card_heading}>
                  Android Development with Kotlin by Google.
                </p>
                <p className={styles.card_description}>
                  The participants have to learn the Android Development with
                  Kotlin course and they have to create a 3 minute video summary
                  of the course.
                </p>
              </div>

              <div className={styles.topic_card}>
                <p className={styles.topic}>Topic 2</p>
                <p className={styles.card_heading}>Own Topic</p>
                <p className={styles.card_description}>
                  The participants can choose any topic which is related to
                  emerging topics in their field and they can create video on
                  that topic. Some sample topics are given below.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <div className={styles.tv_text}>
                <p className={styles.tv_heading}>
                  <span>Contest</span> Guidelines
                </p>
                <ul className={styles.tv_lists}>
                  <li className={styles.tv_list_item}>
                    The maximum length of the video can be 3 minutes.
                  </li>
                  <li className={styles.tv_list_item}>
                    It is not necessary that you send a 'lecture' video, you can
                    also send in a screen recording of you teaching a concept in
                    a creative manner.
                  </li>
                  <li className={styles.tv_list_item}>
                    The submission closes on 30th September midnight
                  </li>
                </ul>
              </div>
              <div className={styles.tv_text}>
                <p className={styles.tv_heading}>
                  <span>Registration</span> Process
                </p>
                <ul className={styles.tv_lists}>
                  <li className={styles.tv_list_item}>
                    Register using airtable form
                  </li>
                  <li className={styles.tv_list_item}>
                    Upon registration you'll receive a ticket of participation.
                    Which ensures your slot in the contest.
                  </li>
                  <li className={styles.tv_list_item}>
                    You'll then receive another link to submit your video within
                    a day.
                  </li>
                  <li className={styles.tv_list_item}>
                    When submitting the video you are supposed to upload the
                    ticket of participation.
                  </li>
                  <li className={styles.tv_list_item}>
                    You'll then receive an acknowledgement of submission.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArtOfTeaching;
