import React from "react";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import styles from "./CampusCommunity.module.css";

const CampusCommunity = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn</span> Campus Community
              </p>
              <p className={styles.fv_tagline}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta
                consectetur non perferendis quasi vero consequuntur corrupti,
                recusandae quaerat molestias eaque dolorum impedit eius rem ut
                optio laboriosam natus saepe nesciunt neque asperiores cum.
                Minus, neque!
              </p>
              <button className={styles.leadcampus}>Lead a Campus</button>
            </div>
            <div className={styles.fv_image}>
              <img
                src="assets/campuscommunity/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_pheading}>Lorem, ipsum dolor.</p>
              <p className={styles.sv_heading}>
                Lorem <span>ipsum dolor</span> sit amet.
              </p>
            </div>
            <div className={styles.d_main_container}>
              <div style={{ marginTop: 0 }} className={styles.d_container}>
                <div className={styles.d_heading}>
                  <div className={styles.d_number}>1</div>
                  <span>Lorem, ipsum dolor.</span>
                </div>
                <p className={styles.d_text}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Soluta consectetur non perferendis quasi vero consequuntur
                  corrupti, recusandae quaerat molestias eaque dolorum impedit
                  eius rem ut optio laboriosam natus saepe nesciunt neque
                  asperiores cum. Minus, neque!
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
                    <span>Lorem, ipsum dolor.</span>
                  </div>
                  <p className={styles.d_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta consectetur non perferendis quasi vero consequuntur
                    corrupti, recusandae quaerat molestias eaque dolorum impedit
                    e
                  </p>
                </div>
                <div className={styles.d_container}>
                  <div className={styles.d_heading}>
                    <div className={styles.d_number}>3</div>
                    <span>Lorem, ipsum dolor.</span>
                  </div>
                  <p className={styles.d_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta consectetur non perferendis quasi vero consequuntur
                    corrupti,
                  </p>
                </div>
                <div className={styles.d_container}>
                  <div className={styles.d_heading}>
                    <div className={styles.d_number}>4</div>
                    <span>Lorem, ipsum dolor.</span>
                  </div>
                  <p className={styles.d_text}>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Soluta consectetur non perferendis quasi vero consequuntur
                    corrupti.
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
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Incidunt quod unde fugiat quisquam libero? Corrupti voluptatibus nisi commodi. Sint, sunt!
              </p>
            </div>
            <div className={styles.tv_story_container}>
              <div className={styles.tv_story}>
                <img
                  src="https://via.placeholder.com/150"
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
                  src="https://via.placeholder.com/150"
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
                  src="https://via.placeholder.com/150"
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
