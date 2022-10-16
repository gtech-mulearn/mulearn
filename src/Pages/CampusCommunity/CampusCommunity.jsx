import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import styles from "./CampusCommunity.module.css";
import { Link } from "react-router-dom";

const CampusCommunity = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn</span> Campus Chapters
              </p>
              <p className={styles.fv_tagline}>
                Each campus has its own culture, with students having their
                specific interests and liking. Campus chapters seek to bring
                together students within a college, developing the μLearn
                culture from within. Campus Chapters thus act as a body that
                allows μLearn to reach out to its members with their specific
                needs and provide them with all necessary resources to help them
                venture into their interests.
              </p>
              <button className={styles.leadcampus}>Lead a Campus</button>
            </div>
            <div className={styles.fv_image}>
              <img
                src="/assets/campuscommunity/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              {/* <p className={styles.sv_pheading}>Lorem, ipsum dolor.</p> */}
              <p className={styles.sv_heading}>Why µLearn for Campuses?</p>
            </div>
            <div className={styles.d_main_container}>
              <div style={{ marginTop: 0 }} className={styles.d_container}>
                <div className={styles.d_heading}>
                  <div className={styles.d_number}>1</div>
                  <span>Echo Chambers</span>
                </div>
                <p className={styles.d_text}>
                  Regular Communities teach us upskilling and knowledge at a
                  limited resource, post which they all tend to fall into the
                  echo chamber and leave students with the belief that they are
                  well versed while just being at an average level.
                </p>
              </div>
            </div>
            <div className={styles.d_video_container}>
              <div className={styles.d_video}>
                <iframe
                  src="https://www.youtube.com/embed/pEwJhL9A7xc"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>

              <div className={styles.d_main_container}>
                <div className={styles.d_container}>
                  <div className={styles.d_heading}>
                    <div className={styles.d_number}>2</div>
                    <span>Quality Resources</span>
                  </div>
                  <p className={styles.d_text}>
                    Students get privileged access to core and relevant courses,
                    such as those provided by our community partner Google.u
                  </p>
                </div>
                <div className={styles.d_container}>
                  <div className={styles.d_heading}>
                    <div className={styles.d_number}>3</div>
                    <span>The Real World</span>
                  </div>
                  <p className={styles.d_text}>
                    µLearn campus chapters help to break the echo chambers and
                    move out and experience the real world.Get mentored by
                    experienced company professionals from various domains.
                  </p>
                </div>
                <div className={styles.d_container}>
                  <div className={styles.d_heading}>
                    <div className={styles.d_number}>4</div>
                    <span>Infinite Opportunties.</span>
                  </div>
                  <p className={styles.d_text}>
                    At µLearn, the students get connected with the rest of the
                    community chapters, so they are in an infinite loop of
                    upskilling and connecting with new opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <p className={styles.tv_heading}>
                <span>Campus</span> Success Stories
              </p>
              <p className={styles.tv_tagline}>
                Let's hear from them itself. The students who have upbring the
                feeling of a community in their own campus from scratch.
              </p>
            </div>
            <div className={styles.tv_story_container}>
              <div className={styles.tv_story}>
                <img
                  src="/assets/campuscommunity/sandra.jpg"
                  alt=""
                  className={styles.story_img}
                />
                <p className={styles.story_name}>Jessno Oommen Jose</p>
                <p className={styles.story_text}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nulla aperiam nemo dolorum magni. In excepturi, at blanditiis
                  consequuntur consequatur aliquid.
                </p>
                <Link to="/blog">
                  <p className={styles.read_more}>Read More...</p>
                </Link>
              </div>
              <div className={styles.tv_story}>
                <img
                  src="/assets/campuscommunity/jessno.jpg"
                  alt=""
                  className={styles.story_img}
                />
                <p className={styles.story_name}>Jessno Oommen Jose</p>
                <p className={styles.story_text}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nulla aperiam nemo dolorum magni. In excepturi, at blanditiis
                  consequuntur consequatur aliquid.
                </p>
              </div>
              <div className={styles.tv_story}>
                <img
                  src="/assets/campuscommunity/amritha.jpeg"
                  alt=""
                  className={styles.story_img}
                />
                <p className={styles.story_name}>Jessno Oommen Jose</p>
                <p className={styles.story_text}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Nulla aperiam nemo dolorum magni. In excepturi, at blanditiis
                  consequuntur consequatur aliquid.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CampusCommunity;
