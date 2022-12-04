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
                BuildForTeam, your chance to build your favorite team’s website.
                With your favourite teams battling it out on the Football field,
                it’s up to you to build them an awesome website.
              </p>
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
              <a
                href="https://bit.ly/BuildForTeam"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.register}>Register Now</button>
              </a>
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
                    To Participate in BuildForTeam Event, You have to Build an
                    awesome website for your favourite World Cup team to express
                    your love and support. Priority will be given for responsive
                    websites.
                  </div>
                </div>
                <div className={styles.sv_point}>
                  <p className={styles.sv_image}>🖥</p>
                  <div className={styles.svp_heading}>Learn</div>
                  <div className={styles.svp_text}>
                    By building a website for your favourite football team, you
                    are improving yourself by learning new technology and web
                    development skills⚽.
                  </div>
                </div>

                <div className={styles.sv_point}>
                  <p className={styles.sv_image}>🏆</p>
                  <div className={styles.svp_heading}>Earn</div>
                  <div className={styles.svp_text}>
                    Once you’re done crafting the website, fill the form given
                    above stand a chance to win the jersey of your favorite
                    team. 💥 Selected participants also stand a chance of
                    winning cool goodies.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <p className={styles.tv_heading}>Selection Criteria</p>
            <p className={styles.tv_tagline}>
              The competition will be open to the public, but Build.MyWeb
              participants will be given priority; at least one of the winners
              must be from Build.MyWeb V5, and one must be from any previous
              Build.MyWeb. All registrations will be validated in the first
              phase, and all web sites that meet the minimal requirements will
              be qualified for the second phase. Five winners will be chosen in
              the second phase.
            </p>
          </div>
          <div className={styles.third_view}>
            <p className={styles.tv_heading}>Karma Awarding</p>
            <p className={styles.tv_tagline}>
              <ul>
                <li>20 karma points will be awarded for participation.</li>
                <li>
                  200 karma points will be awarded to those who qualify for the
                  second phase.
                </li>
                <li> 400 karma points will be awarded to the five winners</li>
              </ul>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Build4Team;
