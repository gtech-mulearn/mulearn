import React from "react";
import styles from "./BuildForTeam.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";

const Build4Team = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>Build</span> For Team
              </p>
              <p className={styles.fv_tagline}>
                GTech μLearn in association with Pygrammers present
                BuildForTeam, your chance to build your favourite team’s
                website. With your favourite teams battling it out on the
                Football field, it’s up to you to build them an awesome website.
              </p>
              {/* <p className={styles.lastdate}>Registrations Closed</p> */}
              <div class={styles.supporters}>
                <span>Supported By </span>

                <div className={styles.s_images}>
                  <a
                    href="https://pygrammers.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/assets/events/build4team/pygrammers.png"
                      alt="Pygrammers"
                      class={styles.supporter}
                    />
                  </a>
                </div>
              </div>
              {/* <div className={styles.buttons}>
                <a
                  href="https://bit.ly/BuildForTeam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.register}>Participate Now</button>
                </a>
                <a
                  href="https://chat.whatsapp.com/HXO8x10Zg0zJ8LaBlcvJXg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className={styles.register}>
                    Join Whatsapp Group
                  </button>
                </a>
              </div> */}
            </div>
            <img
              src="/assets/events/build4team/fvimgr.gif"
              alt=""
              className={styles.fv_image}
            />
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.second_view_container}>
              <p className={styles.sv_heading}>Build, Learn & Earn</p>
              <p className={styles.sv_tagline}>
                Nothing get’s the world talking like the FIFA World Cup⚽ does
                ‼️ Has your favourite team made it to the Knockout stages ❓
                Well, here’s your chance to make your team win, regardless of
                whether they’re winning on the field.
              </p>
              <div className={styles.sv_points}>
                <div className={styles.sv_point}>
                  <p className={styles.sv_image}>⚒️</p>
                  <div className={styles.svp_heading}>Build</div>
                  <div className={styles.svp_text}>
                    To participate in <span>BuildForTeam</span>, all you have to
                    do is <span>Build </span>
                    an awesome website for your favourite World Cup team to
                    express your love and support. Priority will be given for
                    responsive websites.
                  </div>
                </div>

                <div className={styles.sv_point}>
                  <p className={styles.sv_image}>🖥</p>
                  <div className={styles.svp_heading}>Learn</div>
                  <div className={styles.svp_text}>
                    By building a website for your favourite football team, you
                    are not just showcasing your love for your team but also
                    your Web development skills. See this as an opportunity to
                    learn, practice and showcase your skills in a fun way!
                  </div>
                </div>

                <div className={styles.sv_point}>
                  <p className={styles.sv_image}>🏆</p>
                  <div className={styles.svp_heading}>Earn</div>
                  <div className={styles.svp_text}>
                    Once you’re done crafting the website, fill the and stand a
                    chance to win your favorite team's jersey. 💥 Selected
                    participants also stand a chance of winning cool goodies.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.winner_view_container}>
          <div className={styles.winner_view}>
            <p className={styles.sv_heading}>Winning Websites</p>
            <p className={styles.sv_tagline}>
              The best performers in this event are listed below.
              Congratulations to everyone who came in and made a great effort to
              make this event a success.{" "}
              <b>Click on the image to view the websites.</b>
            </p>
            <br />
            <div className={styles.winners}>
              <div className={styles.winner}>
                <a
                  href="https://sivaprasad43.github.io/Brazil-Team-Website/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <img
                    src="/assets/events/build4team/Sivaprasad.png"
                    alt=""
                    className={styles.winner_image}
                  />
                </a>
                <p className={styles.winner_team}>Brazil</p>
                <p className={styles.winner_name}>Sivaprasad C</p>
              </div>
              <div className={styles.winner}>
                <a
                  href="https://edwinliby.github.io/FIFA-Portugal/#"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/events/build4team/Edwin.png"
                    alt=""
                    className={styles.winner_image}
                  />
                </a>
                <p className={styles.winner_team}>Portugal</p>
                <p className={styles.winner_name}>Edwin liby</p>
              </div>
              <div className={styles.winner}>
                <a
                  href="https://ilyasbabu.github.io/france-football-mulearn-pygrammer/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/events/build4team/Ilyas.png"
                    alt=""
                    className={styles.winner_image}
                  />
                </a>

                <p className={styles.winner_team}>France</p>
                <p className={styles.winner_name}>Ilyas Babu</p>
              </div>
              <div className={styles.winner}>
                <a
                  href="https://muhdfarseen.github.io/Brazil_site.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/assets/events/build4team/Farseen.png"
                    alt=""
                    className={styles.winner_image}
                  />
                </a>

                <p className={styles.winner_team}>Brazil</p>
                <p className={styles.winner_name}>Muhammed Farseen T P</p>
              </div>
              <div className={styles.winner}>
                <a
                  href="https://farragoweb.me/BUILD-4-TEAM/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {" "}
                  <img
                    src="/assets/events/build4team/Hashim.png"
                    alt=""
                    className={styles.winner_image}
                  />
                </a>
                <p className={styles.winner_team}>Argentina</p>
                <p className={styles.winner_name}>Muhammed Hashim T</p>
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
                  • First level filteration will be there from which all the
                  valid websites will be selected and they enter to phase two.
                </li>
                <li>
                  • From phase two, 5 winners will be selected with prizes
                </li>
                <li>
                  • 2 winners will be from participants in build.myweb (web
                  design bootcamp)
                </li>
              </ul>
            </p>
          </div>
          <div className={styles.third_view}>
            <p className={styles.tv_heading}>Karma Awarding</p>
            <p className={styles.tv_tagline}>
              <ul>
                <li>• 20 karma points will be awarded for participation.</li>
                <li>
                  • 200 karma points will be awarded to those who qualify for
                  the second phase.
                </li>
                <li>• 400 karma points will be awarded to the five winners</li>
              </ul>
            </p>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <p className={styles.tv_heading}>Rules & Guidelines</p>
            <p className={styles.tv_tagline}>
              <ul>
                <li>• Your Last Date for Submission is 12th December.</li>
                <li>• Websites should be responsive.</li>
                <li>
                  • You should use html and css, You can use any other libraries
                </li>
                <li>
                  • You can use predefined templates, but websites without
                  templates will be given priority
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
              href="https://app.mulearn.org/user/register"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className={styles.register}>Join Discord</button>
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Build4Team;
