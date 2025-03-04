import { PowerfulButton } from "@/MuLearnComponents/MuButtons/MuButton";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import "react-tooltip/dist/react-tooltip.css";
import LearningPathCard from "../components/LearningPathCard";
import { getLearningPaths } from "../services/LearningPathApis";
import { LearningPathList } from "../services/LearningPathInterfaces";
import styles from "./LearningPaths.module.css";
import { IoIosFunnel } from "react-icons/io";
import Pagination from "@/MuLearnComponents/Pagination/Pagination";

const LearningPaths = () => {
    const [data, setData] = useState<LearningPathList[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage, setPerPage] = useState(12);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setCurrentPage(1);
    };

    useEffect(() => {
        getLearningPaths(setData);
    }, []);

    const filteredRoadmaps = data.filter((roadmap) =>
        roadmap.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredRoadmaps.length / perPage);
    const startIndex = (currentPage - 1) * perPage;
    const paginatedRoadmaps = filteredRoadmaps.slice(startIndex, startIndex + perPage);

    return (
        <>
            {true ? (
                <div className={styles.roadmaps}>
                    <div className={styles.roadmapsHeading}>
                        <div className={styles.roadmapsHeadingMain}>
                            <h4 className={styles.roadmapsMainHeading}>Learning Paths Listing</h4>
                            <p className={styles.roadmapsSubHeading}>
                                Explore curated roadmaps to navigate technology, management, and creativity with clarity and purpose.
                            </p>
                        </div>
                        <div>
                            <PowerfulButton className="btn filterbtn">
                                <IoIosFunnel /> Filter
                            </PowerfulButton>
                        </div>
                    </div>

                    <div className={styles.searchContainer}>
                        <FiSearch className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search learning paths..."
                            className={styles.searchInput}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>

                    <div className={styles.hackathonBox}>
                        {paginatedRoadmaps.length > 0 ? (
                            paginatedRoadmaps.map((lp, i) => (
                                <LearningPathCard key={i} learningPath={lp} />
                            ))
                        ) : (
                            <p>No learning paths found</p>
                        )}
                    </div>

                    {/* Pagination Component */}
                    <div style={{marginTop: '40px'}}/>
                    {
                        filteredRoadmaps.length > perPage && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                handlePreviousClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                handleNextClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                                perPage={perPage}
                                setPerPage={setPerPage}
                                options={[12, 24, 30, 60, 90]}
                                onPerPageNumber={(value) => {
                                    setPerPage(value);
                                    setCurrentPage(1); // Reset to first page when perPage changes
                                }}
                            />
                        )
                    }
                </div>
            ) : (
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}>
                        <MuLoader />
                    </div>
                </div>
            )}
        </>
    );
};

export default LearningPaths;
