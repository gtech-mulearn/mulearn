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
              Mulearn <br />
              Career Labs.
            </p>
            <p className="fstagline">
              In search of a job opportunity / internship? µLearn Career Labs
              helps you connect with opportunities from the industry.
            </p>
          </div>
          <div className="fsimage">
            <img
              src="assets/illustration.png"
              className="fsillustration"
              alt=""
            />
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Career;
