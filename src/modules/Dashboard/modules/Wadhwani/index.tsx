import { useEffect, useState } from "react";
import {
    getWadhwaniClientToken,
    getWadhwaniCourseLink,
    getWadhwaniCourses
} from "./services/api";
import toast from "react-hot-toast";
import styles from "./index.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";


const Wadhwani = () => {
    const [data, setData] = useState<wadhwaniCourseResponse[]>([]);
    const [clientToken, setClientToken] = useState("");
    const [isLoading,setIsLoading]=useState(true)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const { response, error } = await getWadhwaniClientToken();
        if (error) {
            toast.error(error);
        } else if (response) {
            setClientToken(response.access_token);
            const { response: courses, error } = await getWadhwaniCourses(
                response.access_token
            );
            if (error) {
                toast.error(error);
            } else if (courses) {
                setData(courses);
            }
            setIsLoading(false)
        }
    };

    const handleCourseSelection = async (course: wadhwaniCourseResponse) => {
        const { response, error } = await getWadhwaniCourseLink(
            clientToken,
            course.courseRootId
        );
        if (error) {
            toast.error(error);
        } else if (response) {
            window.open(response.data, "_blank", "noopener,noreferrer");
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1>Wadhwani Foundation Courses</h1>
            <div className={styles.container}>
                {isLoading?<MuLoader/>:
                data.map(course => (
                    <div
                        key={course.courseId}
                        className={styles.card}
                        onClick={() => handleCourseSelection(course)}
                    >
                        <h2>{course.courseName}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wadhwani;
