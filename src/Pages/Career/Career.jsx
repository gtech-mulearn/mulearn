import React, { Fragment } from "react";
import CareersCard from "../../Components/CareersCard/CareersCard";
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
            <CareersCard
              title="React.js Intern"
              duration="3 months"
              payment="12k to 15k per month"
              criteria="BTech (Recent Passouts)"
              lastdate="31st October"
              jdlink="https://drive.google.com/file/d/1KB4xi_GXJm1zgspZ-O_Qui9C-tZXWOiz/view?usp=sharing"
              applylink=""
            />
            <CareersCard
              title="Quality Testing Intern"
              duration="3 months"
              payment="12k to 15k per month"
              criteria="BTech (Recent Passouts)"
              lastdate="31st October"
              jdlink="https://drive.google.com/file/d/14oAv0A2b6ClNuf28ETwTcGI8IgNDOlPs/view?usp=sharing"
              applylink=""
            />
            <CareersCard
              title="Node JS Intern"
              duration="3 months"
              payment="12k to 15k per month"
              criteria="BTech (Recent Passouts)"
              lastdate="31st October"
              jdlink="https://drive.google.com/file/d/1C8iUqa7BUXyeJSgST5dWaWmDsRJRj4Ip/view?usp=sharing"
              applylink=""
            />
            <CareersCard
              title="iOS Intern"
              duration="3 months"
              payment="12k to 15k per month"
              criteria="BTech (Recent Passouts)"
              lastdate="31st October"
              jdlink="https://drive.google.com/file/d/1qqfSlVDQ4t78dFMdv5n5RJwxc03-rELd/view?usp=sharing"
              applylink=""
            />
            <CareersCard
              title="Android Intern"
              duration="3 months"
              payment="12k to 15k per month"
              criteria="BTech (Recent Passouts)"
              lastdate="31st October"
              jdlink="https://drive.google.com/file/d/1Gq6s5GDkZ4aR0kWYjnH05av-ZaRq6Wsm/view?usp=sharing"
              applylink=""
            />
          </div>
        </div>
      </main>
      <Footer />
    </Fragment>
  );
};

export default Career;
