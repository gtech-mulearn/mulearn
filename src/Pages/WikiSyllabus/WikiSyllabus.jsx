import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./WikiSyllabus.module.css";

import profile from "./data/profile";
import MentorCard from "../../Components/MentorCard/MentorCard";

const WikiSyllabus = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn Wiki</span> Syllabus
              </p>
              <p className={styles.fv_tagline}>
                WikiSyllabus is a collaborative initiative undertaken to assist
                students in finding a means to connect their education to
                “what's new” in the industry. As a dynamic website, this wiki
                hosts, enriches, links, extends and updates the university
                curriculum.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img
                src="assets/wiki/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>Our </span>Motive
              </p>
              <p className={styles.sv_tagline}>
                The goal is to make WikiSyllabus the only source you will ever
                need to get your hands on for all your academic needs on a
                particular subject. The initiative is a collaborative effort
                amongst teachers and students. A further contribution from
                multiple sources and constant refurbishing of the content make
                the resources for each topic or subject unique, thereby serving
                as your ultimate go-to guide.
              </p>
            </div>
            <br />
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                The <span> Pathway</span>
              </p>
              <p className={styles.sv_tagline}>
                <ul>
                  <li className={styles.list_item}>
                    Choose a subject from the KTU curriculum or a recent
                    occurrence in the field
                  </li>
                  <li className={styles.list_item}>
                    Collect contributions from a team of enthusiastic learners
                    and experts on that particular topic.
                  </li>
                  <li className={styles.list_item}>
                    Facilitate the material to the students across, where it is
                    free for anyone to add on and upgrade the quality.
                  </li>
                  <li className={styles.list_item}>
                    As this process advances and passes on to the next batch,
                    the materials keep improving with better-perfected content.
                  </li>
                </ul>
              </p>
            </div>
            <br />
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>Wiki Syllabus </span>Contributors.
              </p>
            </div>
            <div className={styles.contributors_cards}>
              {profile.map((mentor) => (
                <div className={styles.card}>
                  <MentorCard
                    name={mentor.name}
                    designation={mentor.designation}
                    image={mentor.photo}
                    linkedIn={mentor.linkedin}
                    interest={mentor.stack ? mentor.stack : ""}
                    source={mentor.source ? mentor.source : ""}
                  />
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

export default WikiSyllabus;
