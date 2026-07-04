import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import styles from "./index.module.css";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import {
    getWadhwaniClientToken,
    getWadhwaniCourseLink,
    getWadhwaniCourses
} from './services/api'

const DISCORD_SUBMIT_LINK = "https://discord.com/channels/771670169691881483/1455593272633458818";
const POW_LINK = "https://mulearn.org/r/wadhwani-proofofwork"

interface CourseCardProps {
    title: string;
    desc: string;
    fullDesc: string;
    duration: string;
    rootId: string;
    karma: string;
    hashtags: string;
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
    Karma: string;
    Hashtags: string;
}

const Wadhwani: React.FC = () => {
    const [data, setData] = useState<WadhwaniCourseResponse[]>([]);
    const [clientToken, setClientToken] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [sheet, setSheet] = useState<WadhwaniSheetResponse[]>([]);


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

function parseBoldText(text: string): (string | JSX.Element)[] {
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={index}>{part.slice(2, -2)}</strong>;
        }
        return part;
    });
}

    const CourseCard: React.FC<CourseCardProps> = ({ title, desc, fullDesc, duration, rootId, karma, hashtags }) => {
        const [isExpanded, setIsExpanded] = useState(false);
        const truncatedDesc = desc.length > 100 ? desc.slice(0, 100) + "..." : desc;

        return (
            <>
                {isExpanded && <div className={styles.backdrop} onClick={() => setIsExpanded(false)} />}
                <div className={`${styles.containercard} ${isExpanded ? styles.expanded : ""}`} style={{ minHeight: isExpanded ? "auto" : "320px" }}>
                <div className={styles.details}>
                    <p className={styles.title}>{title}</p>
                    <p className={styles.desc}>
                        {isExpanded ? parseBoldText(fullDesc) : parseBoldText(truncatedDesc)}
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
                    <div className={styles.badgesContainer}>
                        {duration && (
                            <Badge variant="primary" className={styles.badge}>
                                 {duration}hours
                            </Badge>
                        )}
                        {karma && (
                            <Badge variant="secondary" className={styles.badge}>
                                 {karma} Karma
                            </Badge>
                        )}
                        {hashtags && (
                            <Badge variant="default" className={styles.badge}>
                                {hashtags}
                            </Badge>
                        )}
                    </div>
                </div>
                {isExpanded && (
                    <button 
                        className={styles.closeBtn}
                        onClick={() => setIsExpanded(false)}
                        aria-label="Close"
                    >
                        ×
                    </button>
                )}
                <div className={styles.ctaContainer}>
                    <button type="button" onClick={() => handleCourseSelection(rootId)} className={styles.cta}>
                        Enroll
                    </button>
                    <button type="button" onClick={() => window.open(POW_LINK, "_blank")} className={styles.cta}>
                        Submit Proof of Work
                    </button>
                    <button type="button" onClick={() => window.open(DISCORD_SUBMIT_LINK, "_blank")} className={styles.cta}>
                        Submit Task
                    </button>
                </div>
            </div>
            </>
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
                                    fullDesc={sheet.description}
                                    duration={sheet.CourseDuration}
                                    rootId={getRootIdByTitle(sheet.courseName)}
                                    karma={sheet.Karma}
                                    hashtags={sheet.Hashtags}
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