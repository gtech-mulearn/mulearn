// App.tsx
import React from 'react';
import styles from './CoursesMainPage.module.css';
import Wadhwani from '../../Wadhwani';
import OpenGrad from '../../OpenGrad';
import { Helmet } from 'react-helmet';

const CoursesMainPage: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Courses | µLearn</title>
        <meta
          name="description"
          content="Discover our top-tier selection of trending bootcamps. Stay ahead in your field with the latest and most sought-after bootcamps."
        />
        <meta property="og:title" content="Courses | µLearn" />
        <meta property="og:url" content="https://app.mulearn.org/dashboard/courses" />
        <meta
          property="og:description"
          content="Discover our top-tier selection of trending bootcamps. Stay ahead in your field with the latest and most sought-after bootcamps."
        />
      </Helmet>
      <div className={styles.container}>
        <h1 className={styles.pageTitle}>Hot Trending Courses!</h1>
        <p className={styles.pageSubtitle}>Discover our top-tier selection of trending bootcamps. Stay ahead in your field with the latest and most sought-after bootcamps.</p>
        <Wadhwani />
        <OpenGrad />
      </div>
    </>
  );
};

export default CoursesMainPage;