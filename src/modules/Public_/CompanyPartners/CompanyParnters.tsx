import React from "react";
import styles from "./Company.module.css";
import fvimg from "./assets/Connecting teams.gif";
import HomeNav from "@/modules/Common/HomeNav/HomeNav";
import Footer from "@/modules/Common/Footer/Footer";

//@ts-ignore
import companiesonboarded from "./data/companiesonboarded";
import CommunityCard from "../CommPartners/CommunityCard/CommunityCard";

const CompanyPartners = () => {
  return (
    <>
      <HomeNav />
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
              {companiesonboarded.map((company: { name: string; logo: string; link: string; }) => (
                <CommunityCard
                  cname={company.name}
                  cimage={company.logo}
                  clink={company.link}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CompanyPartners;
