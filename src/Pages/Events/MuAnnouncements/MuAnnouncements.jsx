import React from "react";
import styles from "./MuAnnouncements.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";

import college100k from "./data/college100k";
import college200k from "./data/college200k";
import bootcamps from "./data/bootcamps"
import hackathons from "./data/hackathons";

const MuAnnouncements = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn</span> Announcements
              </p>
              <p className={styles.fv_tagline}>
                Lots of amazing things filled with happiness and joy is
                happening around you each day. Listed below are few such amazing
                moments that have been announced in µLearn.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src="assets/announcements/fvimg.gif" alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>200K Karma</span> Points
              </p>
              <p className={styles.sv_tagline}>
                These are the list of Mulearn Campuses which have achieved a
                total of 200K Karma Points for their contributions and
                achievements.
              </p>
            </div>
            <div className={styles.sv_cards_container}>
              {college200k.map((college) => (
                <div className={styles.sv_cards}>
                  <div className={styles.card}>
                    <img
                      src={college.image}
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>100K Karma</span> Points
              </p>
              <p className={styles.sv_tagline}>
                Students are individually awarded Karma Points for their
                achievements. When a group of several student join hands
                together big achievements are made.
              </p>
            </div>
            <div className={styles.sv_cards_container}>
              {college100k.map((college) => (
                <div className={styles.sv_cards}>
                  <div className={styles.card}>
                    <img
                      src={college.image}
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>


          {/* ---------- Bootcamp ---------- */}
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>Bootcamps</span>
              </p>
              <p className={styles.sv_tagline}>
                {/* tagline */}
              </p>
            </div>
            <div className={styles.sv_cards_container}>
              {bootcamps.map((bootcamp) => (
                <div className={styles.sv_cards}>
                  <div className={styles.card}>
                    <img
                      src={bootcamp.image}
                      alt=""
                      className={styles.card_img}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/common/img-error-replace.png";
                      }}
                    />
                    <p className={styles.card_title}>{bootcamp.title}</p>
                    <p className={styles.card_description}>
                      {bootcamp.description.substring(0, 250)}{" "}
                      {bootcamp.description.length >= 20 && "..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Bootcamp ---------- */}
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>Hackathons</span>
              </p>
              <p className={styles.sv_tagline}>
                {/* tagline */}
              </p>
            </div>
            <div className={styles.sv_cards_container}>
              {hackathons.map((hackathon) => (
                <div className={styles.sv_cards}>
                  <div className={styles.card}>
                    <img
                      src={hackathon.image}
                      alt=""
                      className={styles.card_img}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src = "assets/common/img-error-replace.png";
                      }}
                    />
                    <p className={styles.card_title}>{hackathon.title}</p>
                    <p className={styles.card_description}>
                      {hackathon.description.substring(0, 250)}{" "}
                      {hackathon.description.length >= 20 && "..."}
                    </p>
                  </div>
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

export default MuAnnouncements;
