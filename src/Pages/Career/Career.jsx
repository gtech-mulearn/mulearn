import React, { useEffect, useState } from "react"
import Footer from "../../Components/Footer/Footer"
import Navbar from "../../Components/Navbar/Navbar"
import styles from "./Career.module.css"

const Career = () => {
  let companies = require("./data/companies.json")
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <img
            src="/assets/careers/fvimg.gif"
            alt=""
            className={styles.fv_image}
          />
          <div className={styles.fv_texts}>
            <p className={styles.fv_heading}>
              µLearn <span>Career Labs</span>
            </p>
            <p className={styles.fv_tagline}>
              In search of a job opportunity / internship? µLearn Career Labs
              helps you connect with opportunities from the industry.
            </p>
            <div className={styles.counts}>
              <p className={styles.hiring_count}>
                <span className={styles.count}>340+</span>
                <span className={styles.count_text}>Hired Candidates</span>
              </p>
              <p className={styles.hiring_count}>
                <span className={styles.count}>20+</span>
                <span className={styles.count_text}>
                  Companies & Organisations
                </span>
              </p>
              <p className={styles.hiring_count}>
                <span className={styles.count}>30+</span>
                <span className={styles.count_text}>Hiring Calls</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.image_container}>
        {companies.map((company) => (
          <img
            key={company.name}
            src={company.logo}
            alt={company.name}
            className={styles.company_image}
          />
        ))}
      </div>
      <Footer />
    </>
  )
}

export default Career
