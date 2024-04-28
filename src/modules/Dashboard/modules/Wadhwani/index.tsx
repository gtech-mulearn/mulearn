import { useEffect, useState } from "react";
import { getWadhwaniClientToken, getWadhwaniCourses } from "./services/api";
import toast from "react-hot-toast";
import styles from "./index.module.css";

const Wadhwani = () => {
    const [data, setData] = useState<wadhwaniCourseResponse[]>([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { response, error } = await getWadhwaniClientToken();
        if (error) {
            toast.error(error);
        } else if (response) {
            const { response: courses, error } = await getWadhwaniCourses(
                response.access_token
            );
            if (error) {
                toast.error(error);
            } else if (courses) {
                setData(courses);
            }
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1>Wadhwani Foundation Courses</h1>
            <div className={styles.container}>
                {data.map(course => (
                    <div key={course.courseId} className={styles.card}>
                        <h2>{course.courseName}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wadhwani;
