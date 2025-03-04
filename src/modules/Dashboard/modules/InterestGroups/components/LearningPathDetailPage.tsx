// src/components/LearningPathDetailPage.tsx
import React from 'react';
import styles from './LearningPathDetailPage.module.css';
import { LearningPath } from '../data/interestGroups'; // Adjust the import path as needed
import { useNavigate } from 'react-router-dom';

interface LearningPathDetailPageProps {
  level: string;
  card: LearningPath['cards'][0];
  onBack: () => void; // Callback to go back to cards
}

const LearningPathDetailPage: React.FC<LearningPathDetailPageProps> = ({ level, card, onBack }) => {
  const navigate = useNavigate(); // Keep navigate for the back button if needed, but we’ll use onBack

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>{card.title}</h1>
        <p>Level: {level}</p>
      </div>
      <div className={styles.content}>
        <section className={styles.description}>
          <h2>Description</h2>
          <p>{card.data.description}</p>
        </section>
        <section className={styles.whatYouWillLearn}>
          <h2>What You Will Learn</h2>
          <ul>
            {card.data.whatYouWillLearn.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
        <section className={styles.challenges}>
          <h2>Challenges</h2>
          {card.data.challenges.map((challenge, index) => (
            <div key={index} className={styles.challenge}>
              <h3>{challenge.title}</h3>
              <p>{challenge.description}</p>
              {

              challenge.resources && (
                <>
                <h4>Resources:</h4>
              <div className='flex flex-wrap gap-4 justify-center items-center'>
                {challenge.resources.map((resource, idx) => (
                  <div key={idx} className={styles.resourceTag}>
                    <a href={resource} target="_blank" rel="noopener noreferrer" className='!no-underline !text-neutral-700'>
                      {resource}
                    </a>
                  </div>
                ))}
              </div>
                </>
              )
              }
            </div>
          ))}
        </section>
        <div className={styles.stats}>
          <p>Resources: {card.resources}</p>
          <p>Challenges: {card.proofOfWork}</p>
          <p>Rating: {card.rating}</p>
          {/* {card.hasGift && <p>Gift Available!</p>} */}
        </div>
      </div>
      <button className={styles.backButton} onClick={onBack}>
        Back to Learning Paths
      </button>
    </div>
  );
};

export default LearningPathDetailPage;