import React from "react";
import styles from "./CommunityLanding.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const CommunityLanding = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>TinkerHub Foundation</p>
              {/* <p className={styles.fv_tagline}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae
                pariatur repellat aperiam sed enim, voluptatem saepe explicabo
                eius ex iure hic dolorum iste numquam vel dolores animi
                doloribus quibusdam adipisci ipsa similique aut vero! Nihil,
                tempore?
              </p> */}
              <a target="_blank" rel="noopener noreferrer" href="#">
                <button className={styles.primary}>Official Website</button>
              </a>
            </div>
            <div className={styles.fv_images}>
              <img
                src="/assets/communitylanding/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
          <div className={styles.description_view_container}>
            <div className={styles.description_view}>
              <p className={styles.section_header}>
                About TinkerHub Foundation
              </p>
              <p className={styles.section_content}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos dicta error provident, deleniti autem consectetur,
                dolores at suscipit obcaecati eaque possimus. Iste voluptatem
                hic tenetur animi odit eaque unde mollitia debitis? Tempora
                veritatis eligendi officia.
              </p>
            </div>
          </div>
          <div className={styles.description_view_container}>
            <div className={styles.description_view}>
              <p className={styles.section_header}>Our Speicalities</p>
              <p className={styles.section_content}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Dignissimos dicta error provident, deleniti autem consectetur,
                dolores at suscipit obcaecati eaque possimus. Iste voluptatem
                hic tenetur animi odit eaque unde mollitia debitis? Tempora
                veritatis eligendi officia.
              </p>
            </div>
          </div>
          <div className={styles.second_view_container}>
            <div className={styles.second_view}>
              <div className={styles.section}>
                <p className={styles.section_header}>Our Mission</p>
                <p className={styles.section_content}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos dicta error provident, deleniti autem consectetur,
                  dolores at suscipit obcaecati eaque possimus. Iste voluptatem
                  hic tenetur animi odit eaque unde mollitia debitis? Tempora
                  veritatis eligendi officia.
                </p>
              </div>
              <div className={styles.section}>
                <p className={styles.section_header}>Our Vision</p>
                <p className={styles.section_content}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Dignissimos dicta error provident, deleniti autem consectetur,
                  dolores at suscipit obcaecati eaque possimus. Iste voluptatem
                  hic tenetur animi odit eaque unde mollitia debitis? Tempora
                  veritatis eligendi officia.
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

export default CommunityLanding;
