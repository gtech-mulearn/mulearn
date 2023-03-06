import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Career.module.css";

import CareersCard from "../../Components/CareersCard/CareersCard";
import ClosedCareersCard from "../../Components/ClosedCareers/ClosedCareers";

const Career = () => {
  let companies = require("./data/companies.json");
  let newHiring = require("./data/newHiringCall.json");
  let previousHiring = require("./data/previousHiringCall.json");

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
                <span className={styles.count_text}>Companies</span>
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
      <div className={styles.main_container}>
        <div className={styles.second_view_container}>
          <div className={styles.hiring_name}>New Hiring Calls</div>
          <div className={styles.hiring_tagline}>
          Unlock your potential and accelerate your career growth with the endless opportunities available on Career Labs
          </div>
          <div className={styles.cards_container}>
            {newHiring.newcalls.map((role) => (
              <CareersCard
                logo={role.logo}
                role={role.role}
                remuneration={role.remuneration}
                vacancies={role.vacancies}
                location={role.location}
                lastdate={role.lastdate}
                applylink={role.applylink}
                jdlink={role.jdlink}
                duration={role.duration}
              />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.main_container}>
        <div className={styles.second_view_container}>
          <div className={styles.hiring_name}>Previous Hiring Calls</div>
          <div className={styles.hiring_tagline}>
            Listed below are the list of hiring calls that were announced
            through career labs previously.
          </div>
          <div className={styles.cards_container}>
            {previousHiring.map((role) => (
              <ClosedCareersCard
                logo={role.logo}
                title={role.title}
                company={role.company}
                qualifications={role.qualifications}
                remumeration={role.remumeration}
                date={role.date}
                roles={role.roles}
                remuneration={role.remuneration}
                location={role.location}
                lastdate={role.lastdate}
                poster={role.poster}
                duration={role.duration}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Career;
