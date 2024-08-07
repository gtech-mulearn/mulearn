import React from "react";
import styles from "./index.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";

interface CourseCardProps {
    title: string;
    // desc: string;
    // duration: string;
    url: string;
    imageUrl: string;
    lessons: string;
}

const OpenGrad: React.FC = () => {
    const isLoading = false; // Set to true if you want to show the loader

    const hardcodedCourses = [
        {
            courseId: "1",
            url: "home/test",
            courseName: "MBA Bundle",
            // description:
            //     "This is a description of course 1. It provides an overview of the course content.",
            // CourseDuration: "10",
            imageUrl:
                "https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/157986/courses/189940/17128570399041564c161_efc4_475b_9151_8549c1ac8969_lyst1712857039920.jpg",
            lessons: " "
        },
        {
            courseId: "1",
            url: "CAT-Malayalam",
            courseName: "CAT (Malayalam)",
            // description:
            //     "This is a description of course 1. It provides an overview of the course content.",
            // CourseDuration: "10",
            imageUrl:
                "https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/157986/courses/195295/1718119061947Screenshot_2024_06_11_at_81501_PMpng_lyst1718119061974.png",
            lessons: "17 lessons"
        },
        {
            courseId: "3",
            url: "CUET-UG-Malayalam",
            courseName: "CUET UG (Malayalam)",
            // description:
            //     "This is a description of course 1. It provides an overview of the course content.",
            // CourseDuration: "10",
            imageUrl:
                "https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/157986/courses/189121/1712066546664ddd958be_3b42_4082_84de_893bf0061a32_lyst1786.jpg",
            lessons: "60 lessons"
        },
        {
            courseId: "4",
            url: "CUET-UG-Mock-Tests-test",
            courseName: "CUET UG Questions & Mocks",
            // description:
            //     "This is a description of course 1. It provides an overview of the course content.",
            // CourseDuration: "10",
            imageUrl:
                "https://imgproxy.learnyst.com/learnyst-user-assets/school-assets/schools/157986/courses/186487/1711619074132fc94d707_d408_4c2d_aeaa_446cd850b7f4_lyst9700.jpg",
            lessons: " "
        }
        // {
        //     courseId: "",
        //     url: "root",
        //     courseName: "",
        //     // description:
        //     //     "This is a description of course 1. It provides an overview of the course content.",
        //     // CourseDuration: "10",
        //     imageUrl: "",
        //     lessons:
        // },
    ];

    const handleCourseSelection = (id: string) => {
        // Replace with actual course link if necessary
        const courseLink = `https://opengrad-foundation.learnyst.com/learn/${id}`;
        window.open(courseLink, "_blank");
    };

    const CourseCard: React.FC<CourseCardProps> = ({
        title,
        // desc,
        // duration,
        url,
        imageUrl,
        lessons
    }) => {
        return (
            <div className={styles.containercard}>
                <img
                    src={imageUrl}
                    alt={title}
                    className={styles.courseImage}
                />
                <div className={styles.details}>
                    <p className={styles.title}>{title}</p>
                    {/* <p className={styles.desc}>{desc}</p>
                    <p className={styles.duration}>{duration}hrs</p> */}
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
    if (isLoading) {
        return <MuLoader />;
    }
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
                                    // desc={course.description}
                                    // duration={course.CourseDuration}
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
