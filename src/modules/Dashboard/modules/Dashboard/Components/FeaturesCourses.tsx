import React from "react";
import styles from "./FeaturedCourses.module.css";
import { FaStar } from "react-icons/fa";

const FeaturedCourses = () => {
  const courses = [
    {
      image: "/assets/digital-design.png",
      title: "Digital design Systems",
      instructor: "Mike J. Cole",
      startDate: "Mar 11",
      rating: 4.6,
      type: "UI/UX",
      duration: "60 H",
    },
    {
      image: "/assets/financial-markets.png",
      title: "Financial Markets",
      instructor: "Robert Shiller",
      startDate: "Apr 20",
      rating: 4.8,
      type: "Business",
      duration: "40 H",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured courses</h2>
        <span className={styles.arrow}>›</span>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.thLeft}>Course name</th>
            <th>Start</th>
            <th>Rate</th>
            <th>Type</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course, index) => (
            <tr key={index} className={styles.row}>
              <td className={styles.courseInfo}>
                <img src={course.image} alt={course.title} className={styles.image} />
                <div>
                  <div className={styles.courseTitle}>{course.title}</div>
                  <div className={styles.instructor}>{course.instructor}</div>
                </div>
              </td>
              <td>{course.startDate}</td>
              <td className={styles.rating}>
                <FaStar className={styles.starIcon} />
                {course.rating}
              </td>
              <td>
                <span className={styles.tag}>{course.type}</span>
              </td>
              <td>{course.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeaturedCourses;
