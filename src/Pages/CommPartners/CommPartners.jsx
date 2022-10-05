import React from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import styles from "./CommPartners.module.css";

import partners from "./data/partners";

import fvimg from "./assets/fvimg.gif";
import CommunityCard from "../../Components/CommunityCard/CommunityCard";

const CommunityPartner = () => {
  return (
    <>
      <Navbar />
      <div className={styles.mmain_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                <span>µLearn Community</span> Partners
              </p>
              <p className={styles.fv_tagline}>
                When a group of like-minded people come together interesting
                things take place. What if multiple communties join their hands
                together for a common aim things get much more interesting!
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
                <span>Community</span> Partners
              </p>
              <p className={styles.sv_tagline}>
                µLearn has partnered with multiple communties to provide the
                peers the best resouces and events to learn and upskill
                themselves.
              </p>
            </div>
            <br />
            <div className={styles.partners_view_container}>
              <div className={styles.partners_view}>
                {partners.map((partner) => (
                  <a
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <CommunityCard
                      cname={partner.name}
                      cimage={partner.image}
                      clink={partner.link}
                      interst="InterestGrp Name"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CommunityPartner;
