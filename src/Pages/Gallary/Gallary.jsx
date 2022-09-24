import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Gallary.module.css";

import fvimg from "./assets/fvimg.png";

const Gallary = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn </span> Gallary
              </p>
              <p className={styles.fv_tagline}>
                Welcome, to µLearn Gallary, Listed below are the key pictures of
                various milestones accomplished by µLearn in the past one year.
                Together, we learned and witness a lot of things and going back
                and taking a look at those wonderful memeories again is a always
                something special!.{" "}
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                Select <span>Category</span>
              </p>
              <p className={styles.sv_tagline}>
                Lot of things running through your minds?. Don't worry we have
                things sorted out.
              </p>
            </div>
            <div className={styles.sv_category_container}>
              <div className={styles.category_box}>All</div>
              <div className={styles.category_box}>Images</div>
              <div className={styles.category_box}>Videos</div>
              <div className={styles.category_box}>Meetups</div>
              <div className={styles.category_box}>Others</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallary;
