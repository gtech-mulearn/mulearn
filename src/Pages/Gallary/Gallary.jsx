import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Gallary.module.css";

import fvimg from "./assets/fvimg.png";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Gallary = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn </span> Gallary
              </p>
              <p className={styles.fv_tagline}>
                Welcome, to µLearn Gallary, Listed below are the key pictures of
                various milestones accomplished by µLearn in the past one year.
                Together, we learned and witness a lot of things and going back
                and taking a look at those wonderful memeories again is a always
                something special!.{" "}
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}></div>
            <div className={styles.sv_tabs_container}>
              <Tabs forceRenderTabPanel defaultIndex={1}>
                <TabList>
                  <Tab>News Articles</Tab>
                  <Tab>Media Gallary</Tab>
                </TabList>
                <TabPanel>
                  <Tabs forceRenderTabPanel>
                    <TabList>
                      <Tab>Malayala Manarama</Tab>
                      <Tab>The Hindu</Tab>
                      <Tab>The Times Of India</Tab>
                    </TabList>
                    <TabPanel>
                      <div className={styles.cards_view_container}>
                        <div className={styles.cards_view}>
                          <div className={styles.card_container}>
                            <img
                              src="https://drive.google.com/uc?export=view&id=1TAoIi1TqapKFqcq6yDjLyfmESCFqNm5U"
                              alt=""
                              className={styles.card_img}
                            />

                            <p className={styles.card_heading}>
                              µLearn Featured on Malayala Manorama
                            </p>

                            <p className={styles.card_description}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, sunt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className={styles.cards_view_container}>
                        <div className={styles.cards_view}>
                          <div className={styles.card_container}>
                            <img
                              src="https://drive.google.com/uc?export=view&id=1TAoIi1TqapKFqcq6yDjLyfmESCFqNm5U"
                              alt=""
                              className={styles.card_img}
                            />

                            <p className={styles.card_heading}>
                              µLearn Featured on Malayala Manorama
                            </p>

                            <p className={styles.card_description}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, sunt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className={styles.cards_view_container}>
                        <div className={styles.cards_view}>
                          <div className={styles.card_container}>
                            <img
                              src="https://drive.google.com/uc?export=view&id=1TAoIi1TqapKFqcq6yDjLyfmESCFqNm5U"
                              alt=""
                              className={styles.card_img}
                            />

                            <p className={styles.card_heading}>
                              µLearn Featured on Malayala Manorama
                            </p>

                            <p className={styles.card_description}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, sunt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </TabPanel>
                <TabPanel>
                  <Tabs forceRenderTabPanel>
                    <TabList>
                      <Tab>Google I/O</Tab>
                      <Tab>IEEE</Tab>
                      <Tab>Interest Group Meetups</Tab>
                    </TabList>
                    <TabPanel>
                      <div className={styles.cards_view_container}>
                        <div className={styles.cards_view}>
                          <div className={styles.card_container}>
                            <img
                              src="https://drive.google.com/uc?export=view&id=1TAoIi1TqapKFqcq6yDjLyfmESCFqNm5U"
                              alt=""
                              className={styles.card_img}
                            />

                            <p className={styles.card_heading}>
                              µLearn Featured on Malayala Manorama
                            </p>

                            <p className={styles.card_description}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, sunt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className={styles.cards_view_container}>
                        <div className={styles.cards_view}>
                          <div className={styles.card_container}>
                            <img
                              src="https://drive.google.com/uc?export=view&id=1TAoIi1TqapKFqcq6yDjLyfmESCFqNm5U"
                              alt=""
                              className={styles.card_img}
                            />

                            <p className={styles.card_heading}>
                              µLearn Featured on Malayala Manorama
                            </p>

                            <p className={styles.card_description}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, sunt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                    <TabPanel>
                      <div className={styles.cards_view_container}>
                        <div className={styles.cards_view}>
                          <div className={styles.card_container}>
                            <img
                              src="https://drive.google.com/uc?export=view&id=1TAoIi1TqapKFqcq6yDjLyfmESCFqNm5U"
                              alt=""
                              className={styles.card_img}
                            />

                            <p className={styles.card_heading}>
                              µLearn Featured on Malayala Manorama
                            </p>

                            <p className={styles.card_description}>
                              Lorem ipsum dolor sit amet consectetur adipisicing
                              elit. Repudiandae, sunt.
                            </p>
                          </div>
                        </div>
                      </div>
                    </TabPanel>
                  </Tabs>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Gallary;
