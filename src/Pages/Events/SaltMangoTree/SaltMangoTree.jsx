import React, { useState } from "react";
import styles from "./SaltMangoTree.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";



const SaltMangoTree = () => {
  const data = require("./data/data.json");
  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className={styles.card_description}>
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className={styles.readhide}>
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    );
  };
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn </span>Salt Mango Tree
              </p>
              <p className={styles.fv_tagline}>
                English! English! English! I avoid I don't like it, but English
                likes me, I can't avoid! Well since avoiding English isn't an
                option, let's try to work towards improving our knowledge of
                English, by practicing, together.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img
                src="/assets/events/saltmangotree/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                {" "}
                <span>Salt Mango Tree </span> Events
              </p>
              <p className={styles.sv_tagline}>
                Listed below are upcoming and previously conducted events for
                the english learning program Salt Mango Tree.
              </p>
            </div>
            <div className={styles.sv_cards_container}>
              {data
                .slice(0)
                .reverse()
                .map((event) => (
                  <div className={styles.sv_cards}>
                    <div className={styles.card}>
                      <img
                        src={event.image}
                        alt=""
                        className={styles.card_img}
                      />
                      <p className={styles.card_name}>{event.name}</p>

                      {event.description && (
                        <ReadMore>{event.description}</ReadMore>
                      )}
                      <p className={styles.card_date}>Held On:{event.date}</p>
                    </div>
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

export default SaltMangoTree;
