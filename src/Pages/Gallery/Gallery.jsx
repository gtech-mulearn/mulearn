import React, { useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Gallery.module.css";

import Box from "@mui/material/Box";
import Tabs, { tabsClasses } from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import Events from "./data/Events";

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
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                {" "}
                <span>µLearn</span> Community Event Gallery.
              </p>
              <p className={styles.sv_tagline}>
                Beautiful memories often need to document, so that you could
                revisit them. These are some of the pictures from our events.
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
                </div>
              )}
            </div>
          </div>
        </div>

        {/* <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                {" "}
                <span>µLearn</span> News Articles.
              </p>
              <p className={styles.sv_tagline}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi
                maxime ea quisquam sequi.impedit hic!
              </p>
            </div>
            <Box
              sx={{
                flexGrow: 1,
                maxWidth: { xs: 320, sm: 480, md:720, lg:1000, xl:1300 },
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
                <Tab
                  onClick={() => {
                    setProgram(1);
                  }}
                  label="Launch of MuLearn"
                />
                <Tab
                  onClick={() => {
                    setProgram(2);
                  }}
                  label="MuOnam"
                />
                <Tab label="CTF Award Ceremony at KTU" />
                <Tab label="Session on skill gap at KTU Fresher's Induction Program" />
                <Tab label="YIP events" />
                <Tab label="MoU with IEEE Kerala Section" />
                <Tab label="MoU with Ether India" />
              </Tabs>
            </Box>
            <div className={styles.cards_view_container}>
              {program == 1 && (
                <div className={styles.cards_view}>
                  <div className={styles.card_container}>
                    <img
                      src="https://drive.google.com/uc?export=view&id=1aa5OxeKsmHevobh6-eS1eHDc6Dcr1ab7"
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                  <div className={styles.card_container}>
                    <img
                      src="https://drive.google.com/uc?export=view&id=1aa5OxeKsmHevobh6-eS1eHDc6Dcr1ab7"
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                  <div className={styles.card_container}>
                    <img
                      src="https://drive.google.com/uc?export=view&id=1aF7AfZfzch3MOfkbdoDiPJ7MqQlc0fIE"
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                  <div className={styles.card_container}>
                    <img
                      src="https://drive.google.com/uc?export=view&id=1-5eAtkEWG8ERms-QbYf595dgOyut3ugR"
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                </div>
              )}
              {program == 2 && (
                <div className={styles.cards_view}>
                  <div className={styles.card_container}>
                    <img
                      src="https://drive.google.com/uc?export=view&id=1o81t_EcS8I_oQCEIPfiR52wGsr-SiJPu"
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                  <div className={styles.card_container}>
                    <img
                      src="https://drive.google.com/uc?export=view&id=1KkOM77XPvk4tSaDbPQNK_tHp8Kl5eGbq"
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                  <div className={styles.card_container}>
                    <img
                      src="https://drive.google.com/uc?export=view&id=1l-KGFUjC57e5zRqoaOL3iy5Eb3BvtXXp"
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div> */}
      </div>
      <Footer />
    </>
  );
};

export default Gallery;
