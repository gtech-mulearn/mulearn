import React, { Fragment } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Career.module.css";

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
              src="/assets/careers/illustration.png"
              className={styles.fsillustration}
              alt=""
            />
          </div>
        </div>
        <div className={styles.second_section}>
          <p className={styles.ssheading}>Open Opportunities</p>
          <div className={styles.opportunities}>
            <div className={styles.opportunity}>
              <div className={styles.op_logo}>
                <img
                  src="/assets/careers/softnotion.png"
                  alt=""
                  className={styles.company_logo}
                />
              </div>
              <div className={styles.op_texts}>
                <p className={styles.op_header}>React.js Intern</p>
                <p className={styles.op_duration}>
                  <span>Duration: </span>3months
                </p>
                <p className={styles.op_duration}>
                  <span>Package: </span>12k to 15k per month
                </p>
                <p className={styles.op_duration}>
                  <span>Criteria: </span>BTech (Recent Passouts)
                </p>
                <div className={styles.op_buttons}>
                  <button className={styles.op_jobdescription}>
                    View More
                  </button>
                  <button className={styles.op_applynow}>Apply Now</button>
                </div>
              </div>
            </div>
            <div className={styles.opportunity}>
              <div className={styles.op_logo}>
                <img
                  src="/assets/careers/softnotion.png"
                  alt=""
                  className={styles.company_logo}
                />
              </div>
              <div className={styles.op_texts}>
                <p className={styles.op_header}>React.js Intern</p>
                <p className={styles.op_duration}>
                  <span>Duration: </span>3months
                </p>
                <p className={styles.op_duration}>
                  <span>Package: </span>12k to 15k per month
                </p>
                <p className={styles.op_duration}>
                  <span>Criteria: </span>BTech (Recent Passouts)
                </p>
                <div className={styles.op_buttons}>
                  <button className={styles.op_jobdescription}>
                    View More
                  </button>
                  <button className={styles.op_applynow}>Apply Now</button>
                </div>
              </div>
            </div>
            <div className={styles.opportunity}>
              <div className={styles.op_logo}>
                <img
                  src="/assets/careers/softnotion.png"
                  alt=""
                  className={styles.company_logo}
                />
              </div>
              <div className={styles.op_texts}>
                <p className={styles.op_header}>React.js Intern</p>
                <p className={styles.op_duration}>
                  <span>Duration: </span>3months
                </p>
                <p className={styles.op_duration}>
                  <span>Package: </span>12k to 15k per month
                </p>
                <p className={styles.op_duration}>
                  <span>Criteria: </span>BTech (Recent Passouts)
                </p>
                <div className={styles.op_buttons}>
                  <button className={styles.op_jobdescription}>
                    View More
                  </button>
                  <button className={styles.op_applynow}>Apply Now</button>
                </div>
              </div>
            </div>
            <div className={styles.opportunity}>
              <div className={styles.op_logo}>
                <img
                  src="/assets/careers/softnotion.png"
                  alt=""
                  className={styles.company_logo}
                />
              </div>
              <div className={styles.op_texts}>
                <p className={styles.op_header}>React.js Intern</p>
                <p className={styles.op_duration}>
                  <span>Duration: </span>3months
                </p>
                <p className={styles.op_duration}>
                  <span>Package: </span>12k to 15k per month
                </p>
                <p className={styles.op_duration}>
                  <span>Criteria: </span>BTech (Recent Passouts)
                </p>
                <div className={styles.op_buttons}>
                  <button className={styles.op_jobdescription}>
                    View More
                  </button>
                  <button className={styles.op_applynow}>Apply Now</button>
                </div>
              </div>
            </div>
            <div className={styles.opportunity}>
              <div className={styles.op_logo}>
                <img
                  src="/assets/careers/softnotion.png"
                  alt=""
                  className={styles.company_logo}
                />
              </div>
              <div className={styles.op_texts}>
                <p className={styles.op_header}>React.js Intern</p>
                <p className={styles.op_duration}>
                  <span>Duration: </span>3months
                </p>
                <p className={styles.op_duration}>
                  <span>Package: </span>12k to 15k per month
                </p>
                <p className={styles.op_duration}>
                  <span>Criteria: </span>BTech (Recent Passouts)
                </p>
                <div className={styles.op_buttons}>
                  <button className={styles.op_jobdescription}>
                    View More
                  </button>
                  <button className={styles.op_applynow}>Apply Now</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Career;
