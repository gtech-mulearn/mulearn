import React, { useState, useEffect } from "react";
import styles from "./OpenMic.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import axios from "axios";

const OpenMic = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  useEffect(() => {
    axios
      .get(
        "https://opensheet.elk.sh/1r5Pav8TlUEao_9GuMcFasKUEPSDIJOPB9PXKbt4KlTQ/openmic"
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
        setError(
          "We are currently facing some difficulties in fetching the data at the moment, will be back soon."
        );
      });
  }, []);
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
                <span>µLearn </span>Open Mic
              </p>
              <p className={styles.fv_tagline}>
                Already too exhausted by your weekly chores? Insert Open Mic 🎤
                into the equation and your weak becomes much more fun! Open Mic
                is an original initiative by µLearn held every Thursday at 8:00
                PM as part of Weekly Twitch. The event aims to provide members
                an open stage to exhibit their skills and talents to the
                community.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img
                src="/assets/events/openmic/fvimg.gif"
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
                <span>Open Mic </span> Events
              </p>
              <p className={styles.sv_tagline}>
                Listed below are upcoming and previously conducted events for
                the Open Mic Weekly Twitch
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
            {error && (
              <div>
                <h1
                  style={{
                    width: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: "500",
                    padding: "10px",
                  }}
                >
                  {error}
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OpenMic;