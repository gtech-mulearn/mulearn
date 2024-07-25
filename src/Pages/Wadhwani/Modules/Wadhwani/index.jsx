import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./index.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import axios from "axios";
const Wadhwani = () => {
    const [data, setData] = useState<[]>([]);
    const [clientToken, setClientToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [sheet, setSheet] = useState<[]>([]);


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
                try {
                    setIsLoading(true);
                    const response = await axios.get(
                        "https://opensheet.elk.sh/1LEvZozIVVquXjSvtptQcjiU0_WFaxVuEYBCYyCdsCtY/sheet"
                    );
                    setSheet(response.data);
                } catch (error) {
                    console.log(error);
                } finally {
                    setIsLoading(false);
                }
                setData(courses);
            }
            setIsLoading(false)
        }
    };

    const handleCourseSelection = async (courseRootId) => {
        const { response, error } = await getWadhwaniCourseLink(clientToken, courseRootId);
        if (error) {
            toast.error(error);
            return null;
        } else if (response) {
            console.log(response.data)
            window.open(response.data, "_blank");
        }
    };


        const CourseCard = ({ title, desc, duration, rootId }) => {
        return (
            <div className={styles.containercard}>
                <div className={styles.details}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.desc}>{desc}</p>
                    <p className={styles.duration}>{duration}hrs</p>
                </div>
                <div onClick={() => handleCourseSelection(rootId)} className={styles.cta}>
                    Checkout Courses
                </div>
            </div>
        );
    };
    if (isLoading) {
        return <MuLoader />;
    }
    return (
        <div className={styles.wrapper}>
            <h1>Wadhwani Foundation Courses</h1>
            <div className={styles.second_view_container}>
                <div className={styles.second_view}>
                    <div className={styles.courses_container}>
                        <div className={styles.course}>
                            {sheet.map((sheet) => (
                                <CourseCard
                                    key={sheet.courseId}
                                    title={sheet.courseName}
                                    desc={stringSlice(sheet.description)}
                                    duration={sheet.CourseDuration}
                                    rootId={getRootIdByTitle(sheet.courseName)}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Wadhwani;