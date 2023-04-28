import React from "react";
import styles from "./YIP2023.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import boxoneimg from "./assets/boxoneimg.png";
import lines from "./assets/lines.png";
import oglines from "./assets/oglines.png";
import bthimg from "./assets/bthimg.png";
import qrcode from "./assets/qrcode.png";
import cat from "./assets/cat.png";

const YIP2023 = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.box_one}>
              <div className={styles.upper_box}>
                <div className={styles.ub_texts}>
                  <p className={styles.ub_heading}>
                    The Kerala's Biggest Innovation Celebration is Here!
                  </p>
                  <img src={lines} alt="" className={styles.lines} />
                  <p className={styles.ub_text}>
                    Young Innovators Programme 5.0
                  </p>
                </div>

                <div className={styles.ub_img}>
                  <img src={boxoneimg} alt="" className={styles.boxoneimg} />
                </div>
              </div>
              <a href="https://yip.kerala.gov.in/" target="_blank" rel="noopener noreferrer">
                <button className={styles.apply_now}>Apply Now</button>
              </a>
              <div className={styles.lower_box}>
                <p className={styles.lb_texts}>
                  YIP 5.0 is here and{" "}
                  <b>it's bigger and more impactful than ever before!</b> Backed
                  by the Kerala government.
                  <br />
                  <br />
                  This year's initiative is set to provide an incredible
                  opportunity for <b>college and university students</b> to
                  showcase their innovation skills and create
                  <b>real-world impact</b>.
                </p>
              </div>
            </div>
            <div className={styles.right_side}>
              <div className={styles.box_two}>
                <p className={styles.bt_header}>Download the YIP App Now!</p>
                <div className={styles.box_two_bottom_section}>
                  <img src={qrcode} alt="" className={styles.bt_qrcode} />
                  <img src={cat} alt="" className={styles.bt_img} />
                </div>
              </div>
              <div className={styles.box_three}>
                <p className={styles.bth_header}>
                  Brainstorm, Collaborate, And Create
                </p>
                <img src={oglines} alt="" className={styles.oglines} />
                <p className={styles.bth_text}>
                  Join forces with your{" "}
                  <b>
                    friends and other young innovators from across the state to
                    brainstorm, collaborate, and create innovative
                  </b>{" "}
                  solutions to real-world problems.
                </p>
                <img src={bthimg} alt="" className={styles.bth_img} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default YIP2023;
