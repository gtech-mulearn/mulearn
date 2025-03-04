import React from "react";
import styles from "./CourseSection.module.css";

// Define Course type
type Course = {
  image: string;
  name: string;
  progress?: number;
  total?: number;
  completed?: boolean;
  duration?: number;
  date?: string;
};

// Define props type
interface CourseSectionProps {
  title: string;
  courses: Course[];
  isUpcoming?: boolean;
}

const CourseSection: React.FC<CourseSectionProps> = ({ title, courses, isUpcoming }) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        <span className={styles.arrow}>›</span>
      </div>
      <div className={styles.list}>
        {courses.map((course, index) => (
          <div key={index} className={styles.courseItem}>
            {/* <img src={course.image} alt={course.name} className={styles.image} /> */}
            <div className={styles.courseInfo}>
              <div className={styles.courseTitle}>{course.name}</div>
              {!isUpcoming ? (
                <div className={styles.progress}>
                  {course.completed ? (
                    <span className={styles.completed}>Complete</span>
                  ) : (
                    <>
                      <span className={styles.progressText}>
                        {course.progress} / {course.total}
                      </span>
                      <div className={styles.progressBar}>
                        <div
                          className={styles.progressFill}
                          style={{ width: `${((course.progress || 0) / (course.total || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className={styles.upcomingDetails}>
                  <span className={styles.duration}>{course.duration} min</span>
                  <span className={styles.date}>{course.date}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSection;
