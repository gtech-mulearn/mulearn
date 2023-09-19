import React from "react";
import styles from "./MaveliPortfolio.module.css";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import image from "./assets/maveli.svg";

import webfirst from "./assets/webfirst.png";
import websec from "./assets/webSecond.png";
import webthi from "./assets/webThird.png";

import uifirst from "./assets/uifirst.png";
import uisec from "./assets/uisec.png";
import uithi from "./assets/uithi.png";

const MaveliPortfolio = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>Portfolio</span> For Maveli
              </p>
              <p className={styles.fv_tagline}>
                GTech Mulearn hosts a competition where participants create a
                creatively designed web portfolio dedicated to the character of
                Mahabali, emphasizing web development and UI design skills.
              </p>
            </div>
            <img src={image} alt="" className={styles.fv_image} />
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.second_view_container}>
              <p className={styles.sv_heading}>Earn With Creativity</p>
              <p className={styles.sv_tagline}>
                Experience the power of creativity and design in the Maveli
                Portfolio Competition! Join the Maveli Portfolio Competition and
                unleash your creativity to craft a stunning digital tribute for
                Maveli, capturing the essence of this legendary figure. Let your
                design skills shine and celebrate the spirit of Maveli
                like never before
              </p>
              <div className={styles.sv_points}>
                <div className={styles.sv_point}>
                  <p className={styles.sv_image}>⚒️</p>
                  <div className={styles.svp_heading}>Build</div>
                  <div className={styles.svp_text}>
                    To participate in <span>Mavelikk Oru Portfolio</span>, all
                    you have to do is <span>Build </span>
                    an awesome website/ui design for maveli. You can use any web
                    development framework or UI/UX design tool of your choice.
                  </div>
                </div>

                <div className={styles.sv_point}>
                  <p className={styles.sv_image}>🖥</p>
                  <div className={styles.svp_heading}>Learn</div>
                  <div className={styles.svp_text}>
                    By building a website for the Maveli Portfolio Competition,
                    you are not just showcasing your love for the character of
                    Mahabali, but also your web development and UI design
                    skills. This is a great opportunity to learn, practice, and
                    showcase your skills in a fun way!
                  </div>
                </div>

                <div className={styles.sv_point}>
                  <p className={styles.sv_image}>🏆</p>
                  <div className={styles.svp_heading}>Earn</div>
                  <div className={styles.svp_text}>
                    Once you've crafted your website or UI design for the Maveli
                    Portfolio Competition, submit your entry and stand a chance
                    to earn some karma points.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.winner_view_container}>
          <div className={styles.winner_view}>
            <p className={styles.sv_heading}>Winners</p>
            <p className={styles.sv_tagline}>
              The best performers in this event are listed below.
              Congratulations to everyone who came in and made a great effort to
              make this event a success.{" "}
              <b>Click on the image to view the website and ui.</b>
            </p>
            <br />
            <div className={styles.winners}>
              <h1>Website</h1>
              <div>
                <div className={styles.winner}>
                  <a
                    href="https://aswanthabam.github.io/Maveli-Portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <img
                      src={webfirst}
                      alt=""
                      className={styles.winner_image}
                    />
                  </a>
                  <p className={styles.winner_team}>First Prize</p>
                  <p className={styles.winner_name}>Aswanth V C</p>
                </div>
                <div className={styles.winner}>
                  <a
                    href="https://sreelakshmi-2003.github.io/portfolio/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={websec} alt="" className={styles.winner_image} />
                  </a>
                  <p className={styles.winner_team}>Second Prize</p>
                  <p className={styles.winner_name}>Sreelakshmi M K</p>
                </div>
                <div className={styles.winner}>
                  <a
                    href="https://iridescent-torrone-a6999c.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={webthi} alt="" className={styles.winner_image} />
                  </a>

                  <p className={styles.winner_team}>Third Prize</p>
                  <p className={styles.winner_name}>Sreejith Mohan</p>
                </div>
              </div>{" "}
              <h1>UI / UX</h1>
              <div>
                <div className={styles.winner}>
                  <a
                    href="https://www.figma.com/file/9xZ6CSZ8e7TMJaQW3qIeSv/Portfolio-website-%3A-UI?type=design&node-id=0-1&mode=design&t=rfd1YAGpzzgFCWLf-0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <img src={uifirst} alt="" className={styles.winner_image} />
                  </a>
                  <p className={styles.winner_team}>First Prize</p>
                  <p className={styles.winner_name}>Balasankar S</p>
                </div>
                <div className={styles.winner}>
                  <a
                    href="https://www.figma.com/file/FCwd3A2ngo4pTTNh0OQLzy/Maveli-Portforlio?type=design&node-id=0-1&mode=design&t=0BLCr4epeOyJv8A3-0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={uisec} alt="" className={styles.winner_image} />
                  </a>
                  <p className={styles.winner_team}>Second Prize</p>
                  <p className={styles.winner_name}>Aswin Asok</p>
                </div>
                <div className={styles.winner}>
                  <a
                    href="https://www.figma.com/file/KGPvI1IeEoYwKtrO01aMiz/Mahabali-Portfolio?type=design&node-id=0-1&mode=design&t=3ru1yfjiXKDJkatU-0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={uithi} alt="" className={styles.winner_image} />
                  </a>

                  <p className={styles.winner_team}>Third Prize</p>
                  <p className={styles.winner_name}>Aravind Ashokan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <p className={styles.tv_heading}>Selection Criteria</p>
            <p className={styles.tv_tagline}>
              <ul>
                <li>
                  • First level filtration will be there from which all the
                  valid website and ui will be selected and they enter to phase
                  two.
                </li>
                <li>
                  • From phase two, priority will be given to those who are
                  optimized for both desktop and mobile platforms.
                </li>
                <li>
                  • 3 winners will be selected from each(web development and
                  ui/ux)
                </li>
              </ul>
            </p>
          </div>
          <div className={styles.third_view}>
            <p className={styles.tv_heading}>Karma Awarding</p>
            <p className={styles.tv_tagline}>
              <ul>
                <li>• 200 points will be awarded for participation.</li>
                <li>
                  • 400 karma points will be awarded to the second-place winner.
                </li>
                <li>
                  • 800 karma points will be awarded to the first-place winner.
                </li>
              </ul>
            </p>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <p className={styles.tv_heading}>Rules & Guidelines</p>
            <p className={styles.tv_tagline}>
              <ul>
                <li>• The submission deadline is September 5th.</li>
                <li>• Submissions will not be accepted after this date.</li>
                <li>• A minimum of 3 scrolling pages is required.</li>
                <li>• Responsiveness of the website and ui is optional.</li>
                <li>
                  • The website and ui should be created by the participant
                  himself.
                </li>
                
              </ul>
            </p>
          </div>

          <div className={styles.third_view}>
            <p className={styles.tv_heading}>Have Doubts?</p>
            <p className={styles.tv_tagline}>
              If you have any questions or concerns about this event, or if you
              encounter any difficulties while participating, feel free to
              contact us via Discord.
            </p>
            <a
              href="https://app.mulearn.org/register"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={styles.register}>Join µLearn</button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MaveliPortfolio;
