// App.tsx
import React from 'react';
import styles from './CoursesMainPage.module.css';
import Wadhwani from '../../Wadhwani';
import OpenGrad from '../../OpenGrad';

const CoursesMainPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.pageTitle}>Hot Trending Courses!</h1>
      <p className={styles.pageSubtitle}>Discover our top-tier selection of trending bootcamps. Stay ahead in your field with the latest and most sought-after bootcamps.</p>
      <Wadhwani/>
      <OpenGrad/>
    </div>
  );
};

export default CoursesMainPage;