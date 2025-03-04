import React, { useState, useEffect } from "react";
import { Content, Topic } from "../../services/LearningPathInterfaces";
import { FiStar, FiEdit, FiCode } from "react-icons/fi";
import styles from "./LearningPathOne.module.css"; // Assuming this is the correct import for styles
import LearningPathInnerTable from "./LearningPathInnerTable";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";  

type LearningPathDataProps = {
    learningPathData?: Topic; // Assuming `SingleLearningPath` has a `content` array
};

const LearningPathTable: React.FC<LearningPathDataProps> = ({ learningPathData }) => {
    const [expandedTopics, setExpandedTopics] = useState<Set<number>>(new Set());

    const toggleTopic = (index: number) => {
        setExpandedTopics((prevExpandedTopics) => {
            const newExpandedTopics = new Set(prevExpandedTopics);
            if (newExpandedTopics.has(index)) {
                newExpandedTopics.delete(index);
            } else {
                newExpandedTopics.add(index);
            }
            return newExpandedTopics;
        });
    };
    useEffect(() => {
        if (learningPathData && learningPathData.content) {
            const allTopicIndexes = learningPathData.content.map((_, index) => index);
            setExpandedTopics(new Set(allTopicIndexes));
        }
    }, [learningPathData]);

    return (
        <div>
            {learningPathData && learningPathData.content && learningPathData.content.length > 0 ? (
                learningPathData?.content.map((topic: Content, index) => (
                    <div key={index} className={styles.contentSection}>
                        <div className={styles.contentHeader} 
                                onClick={() => toggleTopic(index)} 
                        >
                            <h2 className={styles.contentTitle}>{topic.title}</h2>
                            <div className={styles.contentClose}>
                            {/* <div className={styles.progressContainer}>
                                <span>0/{topic.content.length}</span>
                                <div className={styles.progressBar}>
                                    <div className={styles.progressFill} />
                                </div>
                            </div> */}

                            {/* Expand/Collapse Icon Button */}
                            <button
                                className={styles.toggleButton}
                            >
                                {expandedTopics.has(index) ? <FiChevronUp /> : <FiChevronDown />}
                            </button>
                            </div>
                        </div>

                        {expandedTopics.has(index) && (
                            <>
                                <div className={styles.tableHeader}>
                                    <div>Topics</div>
                                    {/* <div>Done</div> */}
                                    {/* <div>Proof Of Work</div>
                                    <div>Notes</div>
                                    <div>Status</div> */}
                                </div>

                                {learningPathData && (
                                    <LearningPathInnerTable
                                        content={topic.content}
                                        expanded={expandedTopics.has(index)}
                                    />
                                )}

                            </>
                        )}
                    </div>
                ))
            ) : (
                <p>No topics available</p>
            )}
        </div>
    );
};

export default LearningPathTable;
