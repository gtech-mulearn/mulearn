import React, { useState } from "react"
import styles from "./ISR.module.css"

import fvimg from "./assets/fvimg.gif"
import rvimg from "./assets/rvimg.gif"
import Navbar from "../../../Components/Navbar/Navbar"
import Footer from "../../../Components/Footer/Footer"
import axios from "axios"

const ISR = () => {
  const [isrData, setisrData] = useState([])
  const [error, setError] = useState()
  axios
    .get(
      "https://opensheet.elk.sh/1r5Pav8TlUEao_9GuMcFasKUEPSDIJOPB9PXKbt4KlTQ/isrcsv"
    )
    .then((response) => {
      setisrData(response.data)
    })
    .catch((error) => {
      console.log(error)
      setError(
        "We are currently facing some difficulties in fetching the data at the moment, will be back soon."
      )
    })

  const ReadMore = ({ children }) => {
    const text = children
    const [isReadMore, setIsReadMore] = useState(true)
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore)
    }
    return (
      <p className={styles.card_description}>
        {isReadMore ? text.slice(0, 150) : text}
        <span onClick={toggleReadMore} className={styles.readhide}>
          {isReadMore ? "...read more" : " show less"}
        </span>
      </p>
    )
  }

  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn Inspiration</span> Station Radio.
              </p>
              <p className={styles.fv_tagline}>
                Everyone has a story to tell, the story about finding their
                passion, the story of learning new things and much more. Often
                times these stories are filled with fun and inspirations which
                fuel others to start their own journey. Join in every
                Tuesday@8:00PM to get Inspired.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
        <div className={styles.request_view_container}>
          <div className={styles.request_view}>
            <div className={styles.rv_images}>
              <img src={rvimg} alt="" className={styles.rv_img} />
            </div>
            <div className={styles.rv_texts}>
              <p className={styles.rv_heading}>
                Become <span>Inspiration Station Radio</span> Speaker
              </p>
              <p className={styles.rv_tagline}>
                If you have a story to tell, or you know someone who has a story
                to tell, then you can request them to come to the Inspiration
                Station Radio and share their story with our listeners.
              </p>
              <a
                href="https://mulearn.org/isropencall"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className={styles.rv_button}>Apply Now</button>
              </a>
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                {" "}
                <span>Previously</span> On Inspiration Station Radio.
              </p>
              <p className={styles.sv_tagline}>
                Listed below are the speakers who came to the inspiration
                stations and insprired our listeners with their stories and
                experiences.
              </p>
            </div>
            <div className={styles.sv_cards_container}>
              {isrData
                .slice(0)
                .reverse()
                .map((isr) => (
                  <div className={styles.sv_cards}>
                    <div className={styles.card}>
                      <img src={isr.image} alt="" className={styles.card_img} />
                      <p className={styles.card_name}>{isr.speaker}</p>

                      <ReadMore>{isr.description}</ReadMore>
                      <p className={styles.card_date}>Held On:{isr.date}</p>
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
  )
}

export default ISR
