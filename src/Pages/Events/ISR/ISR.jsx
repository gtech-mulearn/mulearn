import React, { useState } from "react"
import styles from "./ISR.module.css"

import fvimg from "./assets/fvimg.gif"
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
        {/*
        <section className=" container px-10 sm:px-12 my-14 mx-auto max-w-7xl flex justify-evenly items-center align-middle w-full">
          <img className="hidden sm:flex flex-1 object-contain max-w-48 max-h-48" src={fvimg} alt="join ISR" />
          <div className="flex-1 flex flex-col items-start">
            <div className="text-2xl mb-2 font-medium font-poppins">
              Do you like to speak at ISR?
            </div>
            <div className="font-poppins text-base lg:text-lg mb-4">
              If you have a story to tell, a journey to share, or a passion to
              inspire others with, then ISR is the place for you. Click on the
              button below and be our guest.
              </div>
            <div className="flex justify-center">
              <a
                href="https://forms.gle/9Z9Z9Z9Z9Z9Z9Z9Z9"
                target="_blank"
                rel="noreferrer"
              >
                <button className="bg-muorange text-white font-medium font-poppins py-2 px-4 rounded-md">
                  Yes, I'm In!
                </button>
              </a>
              </div>
          </div>
        </section> */}
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
