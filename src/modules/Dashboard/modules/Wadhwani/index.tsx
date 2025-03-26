import React, { useEffect, useState, useCallback } from "react";
import toast from "react-hot-toast";
import styles from "./index.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import axios from "axios";
import {
    getWadhwaniClientToken,
    getWadhwaniCourseLink,
    getWadhwaniCourses
} from './services/api'

interface CourseCardProps {
    title: string;
    desc: string;
    duration: string;
    rootId: string;
}

interface WadhwaniCourseResponse {
    courseId: string;
    courseRootId: string;
    courseName: string;
    thumbnail: string;
    description: string;
}

interface WadhwaniSheetResponse {
    courseId: string;
    courseRootId: string;
    courseName: string;
    thumbnail: string;
    description: string;
    CourseDuration: string;
}

const Wadhwani: React.FC = () => {
    const [data, setData] = useState<WadhwaniCourseResponse[]>([]);
    const [clientToken, setClientToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [sheet, setSheet] = useState<WadhwaniSheetResponse[]>([]);

    const fetchData = useCallback(async () => {
        try {
            setIsLoading(true);
            // Fetch token and courses in parallel
            const [tokenResponse, coursesResponse] = await Promise.all([
                getWadhwaniClientToken(),
                axios.get("https://opensheet.elk.sh/1LEvZozIVVquXjSvtptQcjiU0_WFaxVuEYBCYyCdsCtY/sheet")
            ]);

            if (tokenResponse.error) {
                toast.error(tokenResponse.error);
                return;
            }

            if (tokenResponse.response) {
                setClientToken(tokenResponse.response.access_token);
                const { response: courses, error } = await getWadhwaniCourses(
                    tokenResponse.response.access_token
                );
                
                if (error) {
                    toast.error(error);
                } else if (courses) {
                    setData(courses);
                }
            }

            setSheet(coursesResponse.data);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load courses. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCourseSelection = async (courseRootId: string) => {
        const { response, error } = await getWadhwaniCourseLink(clientToken, courseRootId);
        if (error) {
            toast.error(error);
            return null;
        } else if (response) {
            console.log(response.data)
            window.open(response.data, "_blank");
        }
    };


function getRootIdByTitle(titleToSearch: string): string  {
    const course = data.find(course => course.courseName === titleToSearch);
    return course ? course.courseRootId : "null";
}
function stringSlice(inputString: string): string {
    const secondPeriodIndex = inputString.indexOf(
        ".",
        inputString.indexOf(".") + 1
    );
    if (secondPeriodIndex !== -1) {
        return inputString.substring(0, secondPeriodIndex + 1).trim();
    }
    return inputString.substring(0, 200);
}

    const CourseCard: React.FC<CourseCardProps> = ({ title, desc, duration, rootId }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const truncatedDesc = desc.length > 100 ? desc.slice(0, 100) + "..." : desc;

        return (
            <div className={styles.containercard}>
                <div className={styles.details}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.desc}>
                        {isExpanded ? desc : truncatedDesc}
                        {desc.length > 100 && (
                            <span
                                className={styles.readMore}
                                onClick={() => setIsExpanded(!isExpanded)}
                                style={{ color: "gray", cursor: "pointer", marginLeft: "5px" }}
                            >
                                {isExpanded ? "Read Less" : "Read More"}
                            </span>
                        )}
                    </p>
                    <p className={styles.duration}>Duration: {duration}hrs</p>
                </div>
                <div onClick={() => handleCourseSelection(rootId)} className={styles.cta}>
                    Enroll
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