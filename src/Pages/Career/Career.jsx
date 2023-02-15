import React, { Fragment } from "react"
// import CareersCard from "../../Components/CareersCard/CareersCard";
import Footer from "../../Components/Footer/Footer"
import Navbar from "../../Components/Navbar/Navbar"
import styles from "./Career.module.css"
import ClosedCareers from "../../Components/ClosedCareers/ClosedCareers"
import CareersCard from "../../Components/CareersCard/CareersCard"

import ClosedCarrersData from "./data/data"

const Career = () => {
  return (
    <Fragment>
      <Navbar />
      <main>
        <div className={styles.first__section}>
          <div className={styles.fstexts}>
            <p className={styles.fsheading}>
              µLearn <br />
              Career Labs.
            </p>
            <p className={styles.fstagline}>
              In search of a job opportunity / internship? µLearn Career Labs
              helps you connect with opportunities from the industry.
            </p>
          </div>
          <div className={styles.fsimage}>
            <img
              src="/assets/careers/fsimg.gif"
              className={styles.fsillustration}
              alt=""
            />
          </div>
        </div>

        <div className={styles.second_section}>
          <p className={styles.ssheading}>
            <span className={styles.ssheadingspan}>EY - Hiring Call</span>{" "}
          </p>
          <p className={styles.sstagline}>
            EY provides consulting, assurance, tax and transaction services that
            help solve our client's toughest challenges and build a better
            working world for all.
          </p>
          <div className={styles.opportunities}>
            <CareersCard
              title="Project Manager Intern"
              image="/assets/careers/EY.webp"
              duration="6 months"
              payment="Paid"
              location="Kochi or Trivandrum"
              lastdate="21st February"
              applylink="https://airtable.com/shrx9rKtLdFG2Edfv"
            />
            <CareersCard
              title="Buisness Analyst Intern"
              image="/assets/careers/EY.webp"
              duration="6 months"
              payment="Paid"
              location="Kochi or Trivandrum"
              lastdate="21st February"
              applylink="https://airtable.com/shrx9rKtLdFG2Edfv"
            />
            <CareersCard
              title="Full Stack Developer Intern"
              image="/assets/careers/EY.webp"
              duration="6 months"
              payment="Paid"
              location="Kochi or Trivandrum"
              lastdate="21st February"
              applylink="https://airtable.com/shrx9rKtLdFG2Edfv"
            />
            <CareersCard
              title="Database Consultant Intern Intern"
              image="/assets/careers/EY.webp"
              duration="6 months"
              payment="Paid"
              location="Kochi or Trivandrum"
              lastdate="21st February"
              applylink="https://airtable.com/shrx9rKtLdFG2Edfv"
            />
          </div>
        </div>

        <div className={styles.second_section}>
          <p className={styles.ssheading}>
            <span className={styles.ssheadingspan}>
              Citizen Digital Foundation
            </span>{" "}
            Hiring Call
          </p>
          <p className={styles.sstagline}>
            Citizen Digital Foundation (CDF) is a pioneering non-profit
            organization, providing knowledge solutions for Digital & Media
            Literacy and Responsible Tech Innovation across sections of society,
            business, and government.
          </p>
          <div className={styles.opportunities}>
            <CareersCard
              title="Fundraising Intern"
              image="/assets/careers/cdf_logo.webp"
              duration="2-3 months"
              payment="Paid(Based on funds raised)"
              location="Remote"
              lastdate="21st February"
              applylink="https://airtable.com/shrsPBZTpSUBzMVkY"
            />
          </div>
        </div>

        <div className={styles.closedcareerscontainer}>
          <div className={styles.second_section}>
            <p className={styles.ssheading}>Previous Hiring Calls</p>
            <div className={styles.opportunities}>
              {ClosedCarrersData.map((data) => (
                <ClosedCareers
                  company={data.Company}
                  title={data.Title}
                  duration={data.Duration}
                  payment={data.Stipend || data.Package}
                  criteria={data.Qualifications && data.Qualifications[0]}
                  date={data.date}
                  roles={data.Roles}
                  jdlink={data.poster}
                  location={data.location}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Career
