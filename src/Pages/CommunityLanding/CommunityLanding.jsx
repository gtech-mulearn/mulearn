import React, { useEffect } from "react";
import styles from "./CommunityLanding.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

import { useParams } from "react-router-dom";

const CommunityLanding = () => {
  let { id } = useParams();

  const data = require("./data.json").filter(function (community) {
    return community.id === id;
  });

  console.log(data);

  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>{data[0].community}</p>
              {data[0].description.length > 100 &&
                data[0].description.length < 500 && (
                  <p className={styles.fv_tagline}>{data[0].description}</p>
                )}
              {data[0].website.length > 0 && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={data[0].website}
                >
                  <button className={styles.primary}>Official Website</button>
                </a>
              )}
            </div>
            <div className={styles.fv_images}>
              <img
                src="/assets/communitylanding/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
          {data[0].description.length > 500 && (
            <div className={styles.description_view_container}>
              <div className={styles.description_view}>
                <p className={styles.section_header}>
                  About {data[0].community}
                </p>
                <p className={styles.section_contentpara}>
                  {data[0].description}
                </p>
              </div>
            </div>
          )}
          {data[0].specialities.length > 0 && (
            <div className={styles.description_view_container}>
              <div className={styles.description_view}>
                <p className={styles.section_header}>Our Speicalities</p>
                <p className={styles.section_contentpara}>
                  {data[0].specialities}
                </p>
              </div>
            </div>
          )}
          <div className={styles.second_view_container}>
            <div className={styles.second_view}>
              {data[0].mission.length > 0 && (
                <div className={styles.section}>
                  <p className={styles.section_header}>Our Mission</p>
                  <p className={styles.section_content}>{data[0].mission}</p>
                </div>
              )}
              {data[0].vision.length > 0 && (
                <div className={styles.section}>
                  <p className={styles.section_header}>Our Vision</p>
                  <p className={styles.section_content}>{data[0].vision}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunityLanding;
