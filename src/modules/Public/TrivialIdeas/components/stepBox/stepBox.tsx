import React from 'react';
import styles from './stepBox.module.css';

interface StepBoxProps {
    number: number;
    title: string;
    description: string;
    
}

const StepBox = ({ number, title, description }:StepBoxProps) => {
  return (
    <div className={styles.stepBox}>
      <div className={styles.numberCircle}>{number}</div>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  );
};

export default StepBox;
