import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./News.module.css";

import NewsData from "./NewsData";

const News = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn</span> Featured
              </p>
              <p className={styles.fv_tagline}>
                These are the various cutting from various daily news papers
                having readers throughout kerala featuring µLearn and programs
                conducted by µLearn.
              </p>
            </div>
          </div>

          <div className={styles.news_container}>
            <div className={styles.news}>
              {NewsData.map((news, id) => (
                <div class={styles.hvr_grow}>
                  <img
                    src={news.image}
                    alt="News Image"
                    className={styles.news_image}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default News;
