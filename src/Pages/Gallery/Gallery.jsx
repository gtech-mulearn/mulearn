import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import GalleryImages from "../../Components/Gallery/GalleryImages";
import ScrollToTop from "../../Components/ScrollToTop/ScrollToTop";
import styles from "./Gallery.module.css";
import "./Gallery.css";

import EventPics from "./data/EventPics";

const Gallery = () => {

  return (
    <>
      <Navbar />
      <ScrollToTop />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn </span> Gallery
              </p>
              <p className={styles.fv_tagline}>
                Welcome, to µLearn Gallery, Listed below are the key pictures of
                various milestones accomplished by µLearn in the past one year.
                Together, we learned and witnessed a lot of things and going
                back and taking a look at those wonderful memories again is a
                always something special!.{" "}
              </p>
            </div>
            <div className={styles.fv_images}>
              <img
                src="/assets/gallery/new_frame.webp"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>

        {/* Gallery Header */}
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>µLearn</span> Community Event Gallery.
              </p>
              <p className={styles.sv_tagline}>
                Beautiful memories often need to be documented, so that you
                could revisit them. These are some of the pictures from our
                events.
              </p>
            </div>
            <GalleryImages events={EventPics} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
