import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import MentorCard from "../../Components/MentorCard/MentorCard";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Courses.module.css";

import courses from "./data/courses";

const Courses = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn Courses</span>
              </p>
              <p className={styles.fv_tagline}>
                Here we have listed down a set of free courses which you can use to practice and upskill yourself.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img
                src="assets/courses/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            
            <div className={styles.courses_container}>
              <div className={styles.course}>
                {courses.map((course) => {
                  return (
                    <MentorCard
                      name={course.coursername}
                      designation={course.coursedetails}
                      source={course.duration}
                      clink={course.link}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Courses;
