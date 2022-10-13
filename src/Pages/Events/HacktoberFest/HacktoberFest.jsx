import React from "react";
import Footer from "../../../Components/Footer/Footer";
import Navbar from "../../../Components/Navbar/Navbar";
import styles from "./HacktoberFest.module.css";

const HacktoberFest = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.header}>Bring Every Buissness Online</p>
              <p className={styles.tagline}>
                Bring Every Buissness Onine is an Open Source Initative to make
                an open source collection of webpages for every business out
                there. To contribute to this project all you have to do is build
                a website for a store or buiness online.
              </p>
              <button className={styles.primary_btn}>Contribute Now!</button>
            </div>
            <img src="/assets/events/hacktoberfest/fvimg.gif"/>
          </div>
        </div>

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.svheader}>How to Contribute?</p>
              <p className={styles.svtagline}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
                totam blanditiis ipsam omnis laboriosam, nam sequi atque quod?
                Provident, quis natus asperiores atque quibusdam quasi.
              </p>
            </div>
            <div className={styles.sv_points}>
              <div className={styles.sv_point}>
                <div className={styles.svp_heading}>Fork</div>
                <div className={styles.svp_text}>
                  To start contributing to this <span>Awesome project</span>.
                  Your first step would be to <span>Fork</span> this repository
                  to your own github account.
                </div>
              </div>

              <div className={styles.sv_point}>
                <div className={styles.svp_heading}>Create</div>
                <div className={styles.svp_text}>
                  Next is the core step in this challenge. You have to create a
                  website for a buissness nearby by following the requirements
                  specified below.
                </div>
              </div>

              <div className={styles.sv_point}>
                <div className={styles.svp_heading}>Contribute</div>
                <div className={styles.svp_text}>
                  Since you have created a website for a buissness nearby you
                  are ready to contribute to this project. For that all you have
                  to do is make Pull request to our repository.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.third_view_container}>
          <div className={styles.third_view}>
            <div className={styles.tv_texts}>
              <p className={styles.tvheader}>Minimum Requirements</p>
              <p className={styles.tvtagline}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam,
                alias numquam nam nobis voluptatibus ratione, provident sequi
                consectetur quos reprehenderit iusto esse nesciunt libero.
                Suscipit.
              </p>
            </div>
            <div className={styles.tvpoints}>
              <ul>
                <li className={styles.listitem}>
                  The webpage should have images of the buisness
                </li>
                <li className={styles.listitem}>
                  Basic Details such as location, working hours etc.. should be
                  present.
                </li>
                <li className={styles.listitem}>
                  Contact Details of the buissness should be added.
                </li>
                <li className={styles.listitem}>
                  Make the webpage as creative as possible.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HacktoberFest;
