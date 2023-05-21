import React from "react";
import img from "../assets/yipform.svg";
import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";
import styles from "./YipForm.module.css";

const YipForm = () => {
  return (
    <div>
      <Navbar />
      <div className={styles.content}>
        <h2>
          Engage more student participation from your campuses for a chance to
          grab <span>exciting awards</span> for best performing colleges.
        </h2>
        <img src={img} alt="Team Work" />
        <a href="#" target="_blank" rel="noopener noreferrer">
          <button>Check Out</button>
        </a>
      </div>
      <Footer />
    </div>
  );
};

export default YipForm;
