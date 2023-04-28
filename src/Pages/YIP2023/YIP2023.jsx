import React from "react";
import styles from "./YIP2023.module.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
import boxoneimg from "./assets/boxoneimg.png";
import lines from "./assets/lines.png";

const YIP2023 = () => {
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.box_one_container}>
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
                <button className={styles.apply_now}>Apply Now</button>
                <div className={styles.lower_box}>
                  <p className={styles.lb_texts}>
                    YIP 5.0 is here and{" "}
                    <b>it's bigger and more impactful than ever before!</b>{" "}
                    Backed by the Kerala government.
                    <br />
                    <br />
                    This year's initiative is set to provide an incredible
                    opportunity for <b>college and university students</b> to
                    showcase their innovation skills and create
                    <b>real-world impact</b>.
                  </p>
                </div>
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
