import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../pages/LearningPaths.module.css";
import { FaRegBookmark } from "react-icons/fa";
import { Avatar, AvatarGroup } from "@chakra-ui/react";

interface LearningPathProps {
    id: string | null;
    title: string | null;
    desc: string | null;
    level: number | null;
    tags: string[];
    ig: string | null;
    learners: number | null;
}

const LearningPathCard: FC<{ learningPath: LearningPathProps }> = ({ learningPath }) => {
    const navigate = useNavigate();
    const MAX_LENGTH = 80; // Set character limit
    const description = learningPath.desc || "No description available";
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpand = () => setIsExpanded(!isExpanded);
    return (
        <div className={styles.card}>
            <div className={styles.cardTitleContainer}>
                <h3 className={styles.cardTitle}>{learningPath.title}</h3>
                <FaRegBookmark />
            </div>
            <div>
                <p className={styles.cardDesc}>
                    {isExpanded || description.length <= MAX_LENGTH
                        ? description
                        : `${description.substring(0, MAX_LENGTH)}... `}
                    {description.length > MAX_LENGTH && (
                        <span className={styles.readMore} onClick={toggleExpand}>
                            {isExpanded ? " Show less" : " Read more"}
                        </span>
                    )}
                </p>
            </div>

            <div className={styles.tagContainer}>
                {learningPath.tags.map(tag => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                ))}
            </div>

            <div className={styles.peersContainer}>
                <div className={styles.peerAvatars}>
                    <AvatarGroup>
                        <Avatar size="xs" name="Sage" src="https://bit.ly/dan-abramov" />
                        <Avatar size="xs" name="Sage" src="https://bit.ly/sage-adebayo" />
                        <Avatar size="xs" name="Sage" src="https://bit.ly/dan-abramov" />
                        <Avatar size="xs" name="Sage" src="ttps://images.unsplash.com/photo-1531746020798-e6953c6e8e04" />
                    </AvatarGroup>
                    {/* Avatar images here */}
                </div>
                <span className={styles.learners}>{learningPath.learners}+ Peers</span>
            </div>

            <div className={styles.viewDetailsBtn} onClick={() => navigate(`/dashboard/learning-paths/${learningPath.id}`)}>View Details</div>
        </div>

    );
};

export default LearningPathCard;
