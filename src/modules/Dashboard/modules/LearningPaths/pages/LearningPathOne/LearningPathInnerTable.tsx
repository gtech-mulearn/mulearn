import React, { useState } from "react";
import { Content } from "../../services/LearningPathInterfaces";
import { FiEdit } from "react-icons/fi";
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import styles from "./LearningPathOne.module.css";
import ProofOfWorkModal from "./ProofOfWorkModal";

type LearningPathInnerTableParams = {
    content: Content[];
    expanded: boolean;
};

const LearningPathInnerTable = ({ content, expanded }: LearningPathInnerTableParams) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState<string>('');

    const handleOpenModal = (contentId: string) => {
        setSelectedContentId(contentId);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedContentId('');
    };

    const handleProofSubmit = async (proofUrl: string) => {
        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/update-proof', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contentId: selectedContentId,
                    proofUrl
                })
            });

            if (!response.ok) {
                throw new Error('Failed to update proof');
            }

            // Handle successful update (e.g., refresh content or update local state)
        } catch (error) {
            console.error('Error updating proof:', error);
            // Handle error appropriately
        }
    };

    return (
        <>
            <div className={`${styles.lessonContainer} ${expanded ? styles.expanded : ""}`}>
                {content && content?.length > 0 ? (
                    content.map((lesson: Content, lessonIndex) => (
                        <div key={lessonIndex} className={styles.lessonRow}>
                            <div className={styles.lessonLink}>
                                <a href={lesson.url} target="_blank" rel="noopener noreferrer">
                                    {lesson.title}
                                </a>
                            </div>
                            {/* <div>
                                <input type="checkbox" className={styles.checkbox} onChange={() => {}} />
                            </div> */}
                            {/* <div>
                                <button 
                                    className={`${styles.iconButton} ${styles.bookmark}`}
                                    onClick={() => handleOpenModal(lesson.title)}
                                >
                                    <BsFillCloudArrowUpFill />
                                </button>
                            </div> */}
                            {/* <div>
                                <button className={styles.iconEditButton}>
                                    500 Karma
                                </button>
                            </div> */}
                            {/* <div>
                                <button className={styles.statusButton} style={{color: 'orange'}}>
                                    pending
                                </button>
                            </div> */}
                        </div>
                    ))
                ) : (
                    <p>No lessons available</p>
                )}
            </div>

            <ProofOfWorkModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                contentId={selectedContentId}
                existingProofUrl={content.find(c => c.id?.toString() === selectedContentId)?.url}
                onSubmit={handleProofSubmit}
            />
        </>
    );
};

export default LearningPathInnerTable;