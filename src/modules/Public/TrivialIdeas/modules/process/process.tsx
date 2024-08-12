import React from 'react';
import StepBox from '../../components/stepBox/stepBox';
import styles from './Process.module.css';

const ProcessDiagram = () => {
const steps = [
    {
        number: 1,
        title: 'Develop Your Project',
        description: 'Unleash your programming skills and create something truly innovative.'
    },
    {
        number: 2,
        title: 'Hosted PWA Format',
        description: 'Your project must be in the form of a hosted Progressive Web App.'
    },
    {
        number: 3,
        title: 'GitHub Repository',
        description: 'Include a link to your GitHub repository in the About section of your PWA.'
    },
    {
        number: 4,
        title: 'Evaluation Criteria',
        description: 'Projects will be evaluated based on the content, the GitHub repository and the deployed PWA.'
    },
    {
        number: 5,
        title: 'Discord Submission',
        description: 'Share your project by posting it in our Trivial Ideas channel on Discord. Be sure to use the tag #buildinship.'
    },
    {
        number: 6,
        title: 'Win Amazing Prizes',
        description: 'Submit your project and stand a chance to win cash prizes up to 1 Lakh and earn 400 karma points.'
    },
];

  return (
    <div className={styles.processDiagram}>
      <h2 className={styles.heading}>How Does This Work?</h2>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <React.Fragment key={step.number}>
            <StepBox
              number={step.number}
              title={step.title}
              description={step.description}
            />
            {index < steps.length - 1 && <div className={styles.arrow}>&#8594;</div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProcessDiagram;
