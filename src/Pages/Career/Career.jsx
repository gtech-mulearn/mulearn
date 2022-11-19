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
              src="/assets/careers/fsimg.gif"
              className={styles.fsillustration}
              alt=""
            />
          </div>
        </div>
        <div className={styles.second_section}>
          <p className={styles.ssheading}>
            <span className={styles.ssheadingspan}>Undaku</span> Hiring Call
          </p>
          <p className={styles.ssheadingtagline}>
            Undaku is a ‘SasSiest No-code Plaorm with more flexibility to solve
            complex Logic B2B use cases.
          </p>
          <div className={styles.opportunities}>
            <CareersCard
              title="Sales and Marketing Intern"
              about="We are looking for a digital marketing intern who is passionate about making a difference. This is a great
              opportunity for someone who is passionate about marketing and wants to learn more about the
              industry."
              criteria="Click View More"
              vacancy="1"
              payment="INR 5K-10K"
              location="Kochi, Kerala, India"
              lastdate="25th November"
              jdlink="https://drive.google.com/file/d/1qyMnTbRK11ryyFoZfVzLNZQ3pDJrf7Ii/view?usp=sharing"
              applylink="https://airtable.com/shrDuyaALoq29Wkdh"
            />
            <CareersCard
              title="Content Writer Intern"
              about="We're looking for a talented content writer to help us tell our story to the world and establish Undaku as
              a global brand. You will create excellent content that will wow our prospects and educate our clients."
              criteria="Click View More"
              vacancy="1"
              payment="INR 5K-10K"
              location="Kochi, Kerala, India"
              lastdate="25th November"
              jdlink="https://drive.google.com/file/d/1w48QCkxLd7AhCePtceWjBzV2g1uEFyUe/view?usp=sharing"
              applylink="https://airtable.com/shrDuyaALoq29Wkdh"
            />
            <CareersCard
              title="MEAN Stack Developer Intern"
              about="We are looking for a MEAN Stack Intern to join our core platform development team. This
              is an excellent opportunity to learn and be involved in developing a cung-edge no-code platform.
              The internship will last for three months, with the possibility of being hired after the internship."
              criteria="Click View More"
              vacancy="2"
              payment="INR 5K-10K"
              location="Kochi, Kerala, India"
              lastdate="25th November"
              jdlink="https://drive.google.com/file/d/1Oh0lhi36JheqMUn33IXCbd0msN4APxMQ/view?usp=sharing"
              applylink="https://airtable.com/shrDuyaALoq29Wkdh"
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
  );
};

export default Career;
