import React, { Fragment } from "react";
import CareersCard from "../../Components/CareersCard/CareersCard";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Career.module.css";
import ClosedCareers from "../../Components/ClosedCareers/ClosedCareers";

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
              src="/assets/careers/illustration.webp"
              className={styles.fsillustration}
              alt=""
            />
          </div>
        </div>
        {/* <div className={styles.second_section}>
          <p className={styles.ssheading}>Open Opportunities</p>
          <div className={styles.opportunities}>
            <CareersCard
              title="React.js Intern"
              duration="3 months"
              payment="12k to 15k per month"
              criteria="BTech (Recent Passouts)"
              lastdate="1st November"
              jdlink="https://drive.google.com/file/d/1KB4xi_GXJm1zgspZ-O_Qui9C-tZXWOiz/view?usp=sharing"
              applylink="https://airtable.com/shr5Wy2PVLHFVOgkA"
            />
          </div>
        </div> */}
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
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Career;
