import React, { useState, useEffect } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./LeaderBoard.module.css";

import fvimg from "./assets/fvimg.png";
import axios from "axios";

const LeaderBoard = () => {
  const [colleges, setColleges] = useState("");
  const [students, setStudents] = useState("");

  useEffect(() => {
    axios
      .get('https://mulearn.org/api/v1/leaderboard/college/')
      .then(function (response) {
        // console.log(response.data.response);
        setColleges(response.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get('https://mulearn.org/api/v1/leaderboard/students/')
      .then(function (response) {
        // console.log(response.data.response);
        setStudents(response.data.response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

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

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              {" "}
              <p className={styles.sv_heading}>
                <span>College</span> Leader Board
              </p>
            </div>

            <div className={styles.sv_cards_container}>
              {colleges &&
                colleges.map((college, position) => {
                  return (
                    <div className={styles.sv_card}>
                      <p className={styles.card_position}>
                        {position + 1} <span>Position</span>
                      </p>
                      <p className={styles.card_code}>
                        College Code: {college.code}
                      </p>
                      <p className={styles.card_college}>{college.institution}</p>
                      <p className={styles.total_karma}>
                        Karma Points: {college.total_karma}
                      </p>
                      {/* <p className={styles.card_membercount}>
                        Total Members: {college.member_count}
                      </p> */}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              {" "}
              <p className={styles.sv_heading}>
                <span>Students</span> Leader Board
              </p>
            </div>

            <div className={styles.sv_cards_container}>
              {students &&
                students.map((student, position) => {
                  return (
                    <div className={styles.sv_card}>
                      <p className={styles.card_position}>
                        {position + 1} <span>Position</span>
                      </p>
                      <p className={styles.card_code}>
                        College Code: {student.institution}
                      </p>
                      <p className={styles.card_college}>{student.full_name}</p>
                      <p className={styles.total_karma}>
                        Karma Points: {student.total_karma}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        {/* <div className={styles.fourth_view_container}>
          <div className={styles.fourth_view}>
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
            <div className={styles.left_side}>
              <p className={styles.sv_heading}>
                <span>Monthly Student Leader Board</span>
              </p>
              <div className={styles.fv_images}>
                <img
                  src="/assets/leaderBoard/monthly_student.webp"
                  alt="college score board"
                  className={styles.fv_img}
                />
              </div>
            </div>
          </div>
        </div> */}
      </div>

      <Footer />
    </>
  );
};

export default LeaderBoard;
