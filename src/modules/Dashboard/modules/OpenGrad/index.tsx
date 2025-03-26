import React, { useState } from "react";
import styles from "./index.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

interface CourseCardProps {
    title: string;
    url: string;
    imageUrl: string;
    lessons: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
    title,
    url,
    imageUrl,
    lessons
}) => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <div className={styles.containercard}>
            <div className={styles.imageContainer}>
                {!imageLoaded && <div className={styles.imagePlaceholder} />}
                <img
                    src={imageUrl}
                    alt={title}
                    className={`${styles.courseImage} ${imageLoaded ? styles.loaded : ''}`}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                />
            </div>
            <div className={styles.details}>
                <p className={styles.title}>{title}</p>
                <p className={styles.lessons}>{lessons}</p>
            </div>
            <button
                onClick={() => handleCourseSelection(url)}
                className={styles.cta}
            >
                Checkout Course
            </button>
        </div>
    );
};

const OpenGrad: React.FC = () => {
    const handleCourseSelection = (id: string) => {
        const courseLink = `https://opengrad-foundation.learnyst.com/learn/${id}`;
        window.open(courseLink, "_blank");
    };

    const hardcodedCourses = [
        {
            courseId: "1",
            url: "home/test",
            courseName: "MBA Bundle",
            imageUrl:
                "https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/157986/courses/189940/17128570399041564c161_efc4_475b_9151_8549c1ac8969_lyst1712857039920.jpg",
            lessons: " "
        },
        {
            courseId: "1",
            url: "CAT-Malayalam",
            courseName: "CAT (Malayalam)",
            imageUrl:
                "https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/157986/courses/195295/1718119061947Screenshot_2024_06_11_at_81501_PMpng_lyst1718119061974.png",
            lessons: "17 lessons"
        },
        {
            courseId: "3",
            url: "CUET-UG-Malayalam",
            courseName: "CUET UG (Malayalam)",
            imageUrl:
                "https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/157986/courses/189121/1712066546664ddd958be_3b42_4082_84de_893bf0061a32_lyst1786.jpg",
            lessons: "60 lessons"
        },
        {
            courseId: "4",
            url: "CUET-UG-Mock-Tests-test",
            courseName: "CUET UG Questions & Mocks",
            imageUrl:
                "https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/157986/courses/186487/1711619074132fc94d707_d408_4c2d_aeaa_446cd850b7f4_lyst9700.jpg",
            lessons: " "
        }
    ];

    return (
        <div className={styles.wrapper}>
            <h1>OpenGrad Courses</h1>
            <div className={styles.second_view_container}>
                <div className={styles.second_view}>
                    <div className={styles.courses_container}>
                        <div className={styles.course}>
                            {hardcodedCourses.map(course => (
                                <CourseCard
                                    key={course.courseId}
                                    title={course.courseName}
                                    url={course.url}
                                    imageUrl={course.imageUrl}
                                    lessons={course.lessons}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenGrad;
