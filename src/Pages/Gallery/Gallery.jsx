import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Gallery.module.css";

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
              All of the accomplishments over the past year are documented in the images. Together, we experienced a great deal of learning and seeing, and it is always great to reflect on those incredible experiences.{" "}
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                {" "}
                <span>µLearn</span> Community Event Gallery.
              </p>
              <p className={styles.sv_tagline}>
              Beautiful memories often need to be documented so that you can revisit them. These are some of the pictures from our events.
              </p>
            </div>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: { xs: 320, sm: 480, md: 720, lg: 1000, xl: 1300 },
                bgcolor: "background.paper",
              }}
            >
              <Tabs
                value={evalue}
                onChange={ehandleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                }}
              >
                {Events.map((event) => (
                  <Tab
                    onClick={() => {
                      setProgram(event);
                      console.log(event);
                    }}
                    label={event.Event_Name}
                  />
                ))}
              </Tabs>
            </Box>
            <div className={styles.cards_view_container}>
              {program && (
                <div className={styles.cards_view}>
                  {program.Photo_1 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_1}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}

                  {program.Photo_2 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_2}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                  {program.Photo_3 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_3}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                  {program.Photo_4 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_4}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                  {program.Photo_5 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_5}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                  {program.Photo_6 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_6}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                  {program.Photo_7 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_7}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                  {program.Photo_8 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_8}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                  {program.Photo_9 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_9}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                  {program.Photo_10 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_10}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                  {program.Photo_11 && (
                    <div className={styles.card_container}>
                      <img
                        src={program.Photo_11}
                        alt=""
                        className={styles.card_img}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                {" "}
                <span>µLearn</span> News Articles.
              </p>
              <p className={styles.sv_tagline}>
              These are various newspaper clippings and articles from the press and online publications, where µLearn featured.
              </p>
            </div>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: { xs: 320, sm: 480, md: 720, lg: 1000, xl: 1300 },
                bgcolor: "background.paper",
              }}
            >
              <Tabs
                value={nvalue}
                onChange={nhandleChange}
                variant="scrollable"
                scrollButtons
                aria-label="visible arrows tabs example"
                sx={{
                  [`& .${tabsClasses.scrollButtons}`]: {
                    "&.Mui-disabled": { opacity: 0.3 },
                  },
                }}
              >
                {News.map((news) => (
                  <Tab
                    onClick={() => {
                      setNews(news);
                      console.log(news);
                    }}
                    label={news.Event_Name}
                  />
                ))}
              </Tabs>
            </Box>
            <div className={styles.cards_view_container}>
              {news && (
                <div className={styles.cards_view}>
                  {news.p1 && (
                    <a href={news.p1} target="_blank" rel="noopener noreferrer">
                      <div className={styles.card_container}>
                        <img src={news.p1} alt="" className={styles.card_img} />
                      </div>
                    </a>
                  )}

                  {news.p2 && (
                    <a href={news.p2} target="_blank" rel="noopener noreferrer">
                      <div className={styles.card_container}>
                        <img src={news.p2} alt="" className={styles.card_img} />
                      </div>
                    </a>
                  )}
                  {news.p3 && (
                    <a href={news.p3} target="_blank" rel="noopener noreferrer">
                      <div className={styles.card_container}>
                        <img src={news.p3} alt="" className={styles.card_img} />
                      </div>
                    </a>
                  )}
                  {news.p4 && (
                    <a href={news.p4} target="_blank" rel="noopener noreferrer">
                      <div className={styles.card_container}>
                        <img src={news.p4} alt="" className={styles.card_img} />
                      </div>
                    </a>
                  )}
                  {news.p5 && (
                    <a href={news.p5} target="_blank" rel="noopener noreferrer">
                      <div className={styles.card_container}>
                        <img src={news.p5} alt="" className={styles.card_img} />
                      </div>
                    </a>
                  )}
                  {news.p6 && (
                    <a href={news.p6} target="_blank" rel="noopener noreferrer">
                      <div className={styles.card_container}>
                        <img src={news.p6} alt="" className={styles.card_img} />
                      </div>
                    </a>
                  )}
                  {news.p7 && (
                    <a href={news.p7} target="_blank" rel="noopener noreferrer">
                      <div className={styles.card_container}>
                        <img src={news.p7} alt="" className={styles.card_img} />
                      </div>
                    </a>
                  )}
                  {news.p8 && (
                    <a href={news.p8} target="_blank" rel="noopener noreferrer">
                      <div className={styles.card_container}>
                        <img src={news.p8} alt="" className={styles.card_img} />
                      </div>
                    </a>
                  )}
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

export default Gallery;
