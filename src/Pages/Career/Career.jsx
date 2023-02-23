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
            <span className={styles.ssheadingspan}>µLearn X Yip</span> Hiring
            Call
          </p>
          <p className={styles.ssheadingtagline}>
            We want people with integrity, who are fair, impartial, honest, and
            truthful. We are looking for dynamic and adaptable individuals who
            are not afraid to think creatively and to be proactive, flexible,
            and responsive.
          </p>
          <div className={styles.opportunities}>
            <CareersCard
              title="District Coordinator"
              duration="1 Year"
              payment="INR 15K - 20K/Month"
              criteria="Click View More"
              vacancy="03"
              location="Respective Districts"
              lastdate="27th February"
              jdlink="https://mulearn.org/jd"
              applylink="https://mulearn.org/jd"
            />
          </div>
          <p className={styles.ssheadingposttagline}>
            If you think you embody these values, we would love to see some of
            them! Apply for a full-time/part-time/paid/volunteer position with
            us here.
          </p>
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
