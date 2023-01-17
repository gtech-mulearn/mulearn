import React, { Fragment } from "react";
// import CareersCard from "../../Components/CareersCard/CareersCard";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Career.module.css";
import ClosedCareers from "../../Components/ClosedCareers/ClosedCareers";
import CareersCard from "../../Components/CareersCard/CareersCard";

import ClosedCarrersData from "./data/data";

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
        <div className={styles.sectionseperator_container}>
          <img
            className={styles.sectionseperator}
            src="/assets/careers/internsbanner.png"
            alt=""
          />
        </div>
        <div className={styles.second_section}>
          <p className={styles.ssheading}>
            <span className={styles.ssheadingspan}>GTech µLearn</span> Intern
            Call 
          </p>
          <p className={styles.ssheadingtagline}>
            We want people with integrity, who are fair, impartial, honest, and
            truthful. We are looking for dynamic and adaptable individuals who
            are not afraid to think creatively and to be proactive, flexible,
            and responsive.
          </p>

          <a
            href="https://www.notion.so/mulearn/Roles-Responsibilities-a3b213ddc2dc49179f5fbbcaa1ce909a"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.op_jobdescription}>Apply Now</button>
          </a>
          <div className={styles.opportunities}>
            <CareersCard
              title="Content Writers"
              duration="3 months"
              criteria="Click View More"
              location="Remote"
              lastdate="24th January"
              jdlink="https://www.notion.so/mulearn/Content-Writer-Intern-a447df56f2964e68a448d3eae580f929"
              applylink="https://airtable.com/shrTET7ltEPJggVcT"
            />
            <CareersCard
              title="Creative Designers"
              duration="3 months"
              criteria="Click View More"
              location="Remote"
              lastdate="24th January"
              jdlink="https://www.notion.so/mulearn/Creative-Designer-Interns-07d3c27dd2ec4bb6bea5eda7f843973d"
              applylink="https://airtable.com/shrTET7ltEPJggVcT"
            />
            <CareersCard
              title="Social Media Manager"
              duration="3 months"
              criteria="Click View More"
              location="Remote"
              lastdate="24th January"
              jdlink="https://www.notion.so/mulearn/Social-Media-Manager-Interns-2dc4a48bfc57496eadb40eaffa5ad989"
              applylink="https://airtable.com/shrTET7ltEPJggVcT"
            />
            <CareersCard
              title="Video Editors"
              duration="3 months"
              criteria="Click View More"
              location="Remote"
              lastdate="24th January"
              jdlink="https://www.notion.so/mulearn/Video-Editors-Interns-bce20bc1f84649078958a3e8a2e0a4d3"
              applylink="https://airtable.com/shrTET7ltEPJggVcT"
            />
          </div>
        </div>
        {/* <div className={styles.second_section}>
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

          <a
            href="https://mulearn.notion.site/Roles-Responsibilities-2c4bec241ba742c1a4508f3a94531c2e"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className={styles.op_jobdescription}>
              Hiring Call Details
            </button>
          </a>
          <div className={styles.opportunities}>
            <CareersCard
              title="District Coordinator"
              duration="1 Year"
              payment="INR 15K - 20K/Month"
              criteria="Click View More"
              vacancy="02"
              location="Kottayam & Malappuram"
              lastdate="18th January"
              jdlink="http://mulearn.org/jd"
              applylink="https://airtable.com/shrxkzH8Iv8GHcXCM"
            />
          </div>
          <p className={styles.ssheadingposttagline}>
            If you think you embody these values, we would love to see some of
            them! Apply for a position with us here.
          </p>
        </div> */}
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
  );
};

export default Career;
