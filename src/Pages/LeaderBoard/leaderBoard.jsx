import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./LeaderBoard.module.css";

import fvimg from "./assets/fvimg.png";
//import CommunityCard from "../../Components/CommunityCard/CommunityCard";

const LeaderBoard = () => {
  return (
    <>
      <Navbar />
      <div className={styles.mmain_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>#scoreboard!</span>
              </p>
              <p className={styles.fv_tagline}>
                Through our scoreboards, you may keep track of your progress and
                that of your college. You and your college will advance thanks
                to all of your arduously earned <span>karma points</span>. This
                is your opportunity to compete against the top scores and see
                how you match up!
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
        <div className={styles.fourth_view_container}>
          <div className={styles.fourth_view}>
            <div></div>
            <div className={styles.left_side}>
              <p className={styles.sv_heading}>
                <span>College Leader Board</span>
              </p>
              <div className={styles.fv_images}>
                <img
                  src="/assets/leaderBoard/college.webp"
                  alt="college score board"
                  className={styles.fv_img}
                />
              </div>
            </div>
            <div className={styles.right_side}>
              <p className={styles.sv_heading}>
                <span>Student Leader Board</span>
              </p>
              <div className={styles.fv_images}>
                <img
                  src="/assets/leaderBoard/student.webp"
                  alt="college score board"
                  className={styles.fv_img}
                />
              </div>
            </div>
          </div>
          <div className={styles.fourth_view}>
            <div></div>
            <div className={styles.left_side}>
              <p className={styles.sv_heading}>
                <span>Monthly College Leader Board</span>
              </p>
              <div className={styles.fv_images}>
                <img
                  src="/assets/leaderBoard/monthly.webp"
                  alt="college score board"
                  className={styles.fv_img}
                />
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LeaderBoard;
