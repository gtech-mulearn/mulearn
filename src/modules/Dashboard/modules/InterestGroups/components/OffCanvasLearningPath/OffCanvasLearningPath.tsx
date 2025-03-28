import React from 'react';
import styles from './OffCanvasLearningPath.module.css';

interface OffCanvasProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export const OffCanvasLearningPath: React.FC<OffCanvasProps> = ({ isOpen, onClose, data }) => {
  const offCanvasClass = isOpen
    ? `${styles.offCanvas} ${styles.offCanvasOpen}`
    : styles.offCanvas;

  if (!data) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={offCanvasClass} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>

        {/* Title & Description */}
        <div className={styles.offCanvasSection} style={{marginTop: 40}}>
          <h2 className={styles.offCanvasSectionTitle}>{data.title}</h2>
          <div className={styles.offCanvasSectionContent}>
            <p>{data.brief}</p>
            <p>{data.desc}</p>
          </div>
        </div>

        {/* Interest Group & Skills */}
        <div className={styles.offCanvasSection}>
          <h3 className={styles.offCanvasSectionTitle}>Interest Group</h3>
          <div className={styles.offCanvasSectionContent}>
            <p>{data.ig}</p>
            <strong>Skills:</strong>{" "}
            {data.skills?.map((skill: string) => (
              <span key={skill} className={styles.skillPill}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Published Info */}
        <div className={styles.offCanvasSection}>
          <h3 className={styles.offCanvasSectionTitle}>Published Info</h3>
          <div className={styles.offCanvasSectionContent}>
            <p>
              <strong>By:</strong> {data.publishedBy}
            </p>
            {/* <p>
              <strong>When:</strong> {data.publishedWhen}
            </p> */}
          </div>
        </div>

        {/* Prerequisites */}
        <div className={styles.offCanvasSection}>
          <h3 className={styles.offCanvasSectionTitle}>Prerequisites</h3>
          <div className={styles.offCanvasSectionContent}>
            <ul>
              {data.prerequisites?.map((preq: string, i: number) => (
                <li key={i}>{preq}</li>
              ))}
            </ul>
          </div>
        </div>


        {/* Additional Info */}
        <div className={styles.offCanvasSection}>
          <h3 className={styles.offCanvasSectionTitle}>Task Info</h3>
          <div className={styles.offCanvasSectionContent}>
            <p><strong>Hashtag:</strong> {data.hashtag}</p>
            <p><strong>Karma Points:</strong> {data.karma}</p>
          </div>
        </div>

        <div className={styles.offCanvasSection}>
        <a href={data.discord_link} target="_blank"><button className={styles.proofOfWorkButton}> Submit proof of work</button></a>
        </div>
      </div>
    </div>
  );
};