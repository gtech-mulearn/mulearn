import React from "react";
import styles from "./HackathonKarma.module.css";

import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const HackathonKarma = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Hackathon <span>Karma Points</span>
              </p>
              <p className={styles.fv_tagline}>
                To get karma points for the hackathon in which you participated,
                complete the steps given below. After you have completed the
                steps give below our team will be verifing it and will award you
                karma points
              </p>

              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.com/channels/771670169691881483/782353185552465951"
              >
                <button className={styles.primary}>
                  Go To Students Channel
                </button>
              </a>
            </div>
            <div className={styles.fv_images}>
              <img
                src="/assets/hackathonkarma/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <p className={styles.sv_heading}>
              <span>How To Get</span> Hackathon Karma Points
            </p>

            <div className={styles.steps_container}>
              <div className={styles.sv_steps}>
                <div className={styles.step}>
                  <p className={styles.step_number}>Step 1</p>
                  <p className={styles.step_content}>
                    To claim your karma points, you will need to submit your
                    certificate in the student channel of our Discord server.
                    Here are the steps to do so:
                  </p>
                </div>
                <div className={styles.step}>
                  <p className={styles.step_number}>Step 2</p>
                  <p className={styles.step_content}>
                    First, make sure that you have your certificate handy. You
                    can save it as a PDF or an image file on your computer or
                    device.
                  </p>
                </div>
                <div className={styles.step}>
                  <p className={styles.step_number}>Step 3</p>
                  <p className={styles.step_content}>
                    Next, navigate to the student channel in our Discord server.
                    You can find this channel by looking for the #student
                    channel in the list of channels on the left side of the
                    Discord window.
                  </p>
                </div>
                <div className={styles.step}>
                  <p className={styles.step_number}>Step 4</p>
                  <p className={styles.step_content}>
                    Once you are in the student channel, click on the "Add a
                    message" field at the bottom of the channel window and type
                    in your message. Make sure to include the hashtag #hackathon
                    in your message so that we can properly track and review
                    your submission.
                  </p>
                </div>
                <div className={styles.step}>
                  <p className={styles.step_number}>Step 5</p>
                  <p className={styles.step_content}>
                    To attach your certificate, click on the "Add an attachment"
                    button next to the "Send" button. This will open a file
                    browser window where you can select your certificate file.
                  </p>
                </div>
                <div className={styles.step}>
                  <p className={styles.step_number}>Step 6</p>
                  <p className={styles.step_content}>
                    After you have selected your certificate file, click "Open"
                    to attach it to your message.
                  </p>
                </div>
                <div className={styles.step}>
                  <p className={styles.step_number}>Step 7</p>
                  <p className={styles.step_content}>
                    Finally, click on the "Send" button to send your message and
                    submit your certificate for review.
                  </p>
                </div>
                <div className={styles.step}>
                  <p className={styles.step_number}>Step 8</p>
                  <p className={styles.step_content}>
                    Once your certificate has been reviewed and approved, you
                    will receive up to 200 karma points. These points can be
                    used to unlock special perks and rewards within the Discord
                    server.
                  </p>
                </div>
                <div className={styles.step}>
                  <p className={styles.step_number}>Step 9</p>
                  <p className={styles.step_content}>
                    Thank you for participating in µLearn and we hope that you
                    enjoy your time with us!
                  </p>
                </div>
              </div>
            </div>

            {/* <div className={styles.sv_steps_container}>
              <div className={styles.sv_steps}>
                <ol>
                  <li className={styles.step}>
                    To claim your karma points, you will need to submit your
                    certificate in the student channel of our Discord server.
                    Here are the steps to do so:
                  </li>
                  <li className={styles.step}>
                    First, make sure that you have your certificate handy. You
                    can save it as a PDF or an image file on your computer or
                    device.
                  </li>
                  <li className={styles.step}>
                    Next, navigate to the student channel in our Discord server.
                    You can find this channel by looking for the #student
                    channel in the list of channels on the left side of the
                    Discord window.
                  </li>
                  <li className={styles.step}>
                    Once you are in the student channel, click on the "Add a
                    message" field at the bottom of the channel window and type
                    in your message. Make sure to include the hashtag #hackathon
                    in your message so that we can properly track and review
                    your submission.
                  </li>
                  <li className={styles.step}>
                    To attach your certificate, click on the "Add an attachment"
                    button next to the "Send" button. This will open a file
                    browser window where you can select your certificate file.
                  </li>
                  <li className={styles.step}>
                    After you have selected your certificate file, click "Open"
                    to attach it to your message.
                  </li>
                  <li className={styles.step}>
                    Finally, click on the "Send" button to send your message and
                    submit your certificate for review.
                  </li>
                  <li className={styles.step}>
                    Once your certificate has been reviewed and approved, you
                    will receive up to 200 karma points. These points can be
                    used to unlock special perks and rewards within the Discord
                    server.
                  </li>
                  <li className={styles.step}>
                    Thank you for participating in µLearn and we hope that you
                    enjoy your time with us!
                  </li>
                </ol>
              </div> */}
            {/* </div> */}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HackathonKarma;
