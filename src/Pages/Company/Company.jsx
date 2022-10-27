import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./Company.module.css";

import fvimg from "./assets/fvimg.gif";

import companiesonboarded from "./data/companiesonboarded";
import companyevents from "./data/companyevents";

import CommunityCard from "../../Components/CommunityCard/CommunityCard";

const Company = () => {
  return (
    <>
      <Navbar />
      <div className={styles.mmain_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn Partnered</span> Companies
              </p>
              <p className={styles.fv_tagline}>
                There are multiple opportunities around you right now. All you
                have to do is look out for the best one that suits you as well
                as your passion and skills.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img src={fvimg} alt="" className={styles.fv_img} />
            </div>
          </div>
        </div>
        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                Company <span>Onboardings</span>
              </p>
              <p className={styles.sv_tagline}>
                µLearn has partnered with multiple Communities to provide the
                student the best Resources and Opportunities possible
              </p>
            </div>
            <div className={styles.sv_cards_container}>
              {companiesonboarded.map((company) => (
                <a
                  href={company.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <CommunityCard cname={company.name} cimage={company.logo} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                Company <span>Events</span>
              </p>
              <p className={styles.sv_tagline}>
                These are the list of events which were conducted successfully
                by the oboarded companies.
              </p>
            </div>
            <div className={styles.tv_cards_container}>
              {companyevents.map((event) => (
                <div className={styles.tv_cards}>
                  <div className={styles.tcard}>
                    <img
                      src={event.image || event.companylogo}
                      alt=""
                      className={styles.tcard_img}
                    />
                    <p className={styles.tcard_name}>{event.name}</p>

                    <p className={styles.tcard_description}>
                      {event.description.substring(0, 250)}{" "}
                      {event.description.length >= 20 && "..."}
                    </p>
                    <p className={styles.tcard_date}>
                      Company:{event.companyname}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Company;
