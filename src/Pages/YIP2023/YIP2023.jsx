import React from "react";
import styles from "./YIP2023.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import boxoneimg from "./assets/boxoneimg.png";

const YIP2023 = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.box_one}>
              <div className={styles.box_one_texts}>
                <p className={styles.box_one_heading}>
                  The Kerala's Biggest{" "}
                  <span>Innovation Celebration is here!</span>
                </p>
                <p className={styles.box_one_tagline}>
                  Young Innovators Program 5.0
                </p>
              </div>
              <div className={styles.box_one_image}>
                <img src={boxoneimg} alt="" className={styles.box_one_img} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default YIP2023;
