// src/components/LearningPathCard.tsx
import React from 'react';
import styles from './LearningPathCard.module.css';
import { LearningPath } from '../data/interestGroups';
import { FormattedLevel } from '../../LearningPathNew/services/api';
import { FiArrowRight } from 'react-icons/fi';

interface LearningPathCardProps {
  id: string;
  level: string;
  card: LearningPath['cards'][0];
  onSelect: (level: string, card: LearningPath['cards'][0]) => void; // Update onSelect type
}

const LearningPathCard: React.FC<LearningPathCardProps> = ({ id, level, card, onSelect }) => {
  const handleCardClick = () => {
    onSelect(level, card); // Pass formattedTasks through onSelect
  };

  return (
    <div className={styles.cardContainer} onClick={handleCardClick}>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <h3>{card.title}</h3>
          <div className={styles.playButton}>
            <FiArrowRight/>
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