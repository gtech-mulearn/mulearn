// src/components/LearningPathCard.tsx
import React from 'react';
import styles from './LearningPathCard.module.css';
import { LearningPath } from '../data/interestGroups'; // Adjust the import path as needed

interface LearningPathCardProps {
  id: string; // Interest group ID
  level: string;
  card: LearningPath['cards'][0]; // Use the card type from your LearningPath interface
  onSelect: (level: string, card: LearningPath['cards'][0]) => void; // Callback for selection
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ id, level, card, onSelect }) => {
  const handleCardClick = () => {
    // Log the id to debug
    // console.log('Navigating with ID:', id);
    // Call the onSelect callback instead of navigating
    onSelect(level, card);
  };

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
      <div className={styles.levelBadge}>{level}</div>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>{card.title}</h3>
          <div className={styles.playButton}>
            <span>▶</span>
          </div>
        </div>
        <div className={styles.cardContent}>
          <p>{card.resources} Resources</p>
          <p>{card.proofOfWork} Challenges</p>
        </div>
      </div>
    </div>
  );
};

export default LearningPathCard;