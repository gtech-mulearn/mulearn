import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Gallery.module.css";
import kakt from "./Kk.module.css";

import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Events from "./data/Events";
import News from "./data/News";

import fvimg from "./assets/fvimg.png";

const Gallery = () => {
  const [evalue, setEValue] = React.useState(0);

  const ehandleChange = (event, newValue) => {
    setEValue(newValue);
  };

  const [nvalue, setNValue] = React.useState(0);

  const nhandleChange = (event, newValue) => {
    setNValue(newValue);
  };

  const [program, setProgram] = useState(Events[0]);
  const [news, setNews] = useState(News[0]);

  const allImages = Events.map((item) => item.image);

  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn </span> Gallery
              </p>
              <p className={styles.fv_tagline}>
                Welcome, to µLearn Gallery, Listed below are the key pictures of
                various milestones accomplished by µLearn in the past one year.
                Together, we learned and witnessed a lot of things and going
                back and taking a look at those wonderful memories again is a
                always something special!.{" "}
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt='' className={styles.fv_img} />
            </div>
          </div>
        </div>

        {/* Gallery Header */}
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>µLearn</span> Community Event Gallery.
              </p>
              <p className={styles.sv_tagline}>
                Beautiful memories often need to be documented, so that you
                could revisit them. These are some of the pictures from our
                events.
              </p>
            </div>

            <div className={styles.tabs_container}>
              {Events.map((event) => (
                <p
                  className={styles.tab}
                  onClick={() => {
                    setProgram(event);
                    console.log(event);
                  }}
                >
                  {event.Event_Name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Images */}
        {program && (
          <section className={kakt.gallerySection}>
            <h1>{`${Events}`}</h1>
            <div className={kakt.row}>
              <div className={kakt.column}>
                <div className={kakt.img_wrapper}>
                  {program.Photo_1 && (
                    <img
                      src={program.Photo_1}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_5 && (
                    <img
                      src={program.Photo_5}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_9 && (
                    <img
                      src={program.Photo_9}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_13 && (
                    <img
                      src={program.Photo_13}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                </div>
              </div>
              <div className={kakt.column}>
                <div className={kakt.img_wrapper}>
                  {program.Photo_2 && (
                    <img
                      src={program.Photo_2}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_6 && (
                    <img
                      src={program.Photo_6}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_10 && (
                    <img
                      src={program.Photo_10}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_14 && (
                    <img
                      src={program.Photo_14}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                </div>
              </div>
              <div className={kakt.column}>
                <div className={kakt.img_wrapper}>
                  {program.Photo_3 && (
                    <img
                      src={program.Photo_3}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_7 && (
                    <img
                      src={program.Photo_7}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_11 && (
                    <img
                      src={program.Photo_11}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_15 && (
                    <img
                      src={program.Photo_15}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                </div>
              </div>
              <div className={kakt.column}>
                <div className={kakt.img_wrapper}>
                  {program.Photo_4 && (
                    <img
                      src={program.Photo_4}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_8 && (
                    <img
                      src={program.Photo_8}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_12 && (
                    <img
                      src={program.Photo_12}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                  {program.Photo_16 && (
                    <img
                      src={program.Photo_16}
                      alt=''
                      className={kakt.gallery_img}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
