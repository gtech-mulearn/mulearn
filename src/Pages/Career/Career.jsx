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
            <span className={styles.ssheadingspan}>
              Calicut Forum for Information Technology - CAFIT
            </span>{" "}
            Hiring Call
          </p>
          <p className={styles.sstagline}>
            CafIT – Calicut forum for IT is a non profit organisation formed by
            the IT professionals of Calicut to bring the companies under a
            single umbrella and to promote the city as a viable destination for
            IT and IT enabled services. The members consist of established
            software houses from the city and malabar region, Kinfra IT park ,
            Technology Business Incubator (NITC),Govt Cyberpark and UL
            Cyberpark.
          </p>
          <div className={styles.opportunities}>
            <CareersCard
              title="Operations Intern"
              image="/assets/careers/cafit_logo.jpg"
              duration="2-3 months"
              payment="Voluntary"
              location="Remote"
              lastdate="12th February"
              applylink="https://airtable.com/shroaC1cR6hfXwFLu"
            />
            <CareersCard
              title="Content Management Intern"
              image="/assets/careers/cafit_logo.jpg"
              duration="2-3 months"
              payment="Voluntary"
              location="Remote"
              lastdate="12th February"
              applylink="https://airtable.com/shroaC1cR6hfXwFLu"
            />
          </div>
        </div>

        <div className={styles.second_section}>
          <p className={styles.ssheading}>
            <span className={styles.ssheadingspan}>CareStack Hiring Call</span>{" "}
            Hiring Call
          </p>
          <p className={styles.sstagline}>
            CareStack is a state-of-the-art all-in-one cloud-based Dental
            Practise Management Software. Our platform streamlines processes for
            the Dental Practices, allowing them to run more efficiently and
            effectively. Our ambition is to become a transformative force in the
            global dental industry.
          </p>
          <div className={styles.opportunities}>
            <CareersCard
              title="Software Development Intern"
              image="/assets/careers/carestack.webp"
              duration="2 months"
              criteria="B.Tech 6th Semester Students Only"
              payment="20K/Month"
              lastdate="21st February"
              applylink="https://airtable.com/shrdnHSS3OTu7ng6n"
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
