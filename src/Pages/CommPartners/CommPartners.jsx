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
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Non
                laborum vitae obcaecati vero excepturi recusandae placeat
                dolorum hic sequi dolorem.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi consequatur dicta, vitae sequi alias suscipit.
              </p>
            </div>
            <br />
            <div className={styles.partners_view_container}>
              <div className={styles.partners_view}>
                {partners.map((partner) => (
                  <CommunityCard
                    cname={partner.name}
                    cimage={partner.image}
                    clink="#"
                    interst="InterestGrp Name"
                  />
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
