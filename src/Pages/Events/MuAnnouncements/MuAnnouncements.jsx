import React, { useState } from "react";
import styles from "./MuAnnouncements.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";

import announcementsData from "./Announcements.json";

import Grid from "../../../Components/Grid/Grid";
import CategorySwitch from "../../../Components/Grid/CategorySwitch";


const MuAnnouncements = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = [
    "All",
    "Event / Programs",
    "Achievement",
    "ISR",
    "Mentor Connect",
    "Hiring",
    "Salt Mango Tree",
    "Task announcement",
    "Open mike",
    "Lets Chill",
    "General announcements",
  ];
  return (
    <>
      <Navbar />
      <div className={styles.main_container}>
        <div className={styles.first_view_container}>
          <div className={styles.first_view}>
            <div className={styles.fv_texts}>
              <p className={styles.fv_heading}>
                Welcome to <span>µLearn</span> Announcements
              </p>
              <p className={styles.fv_tagline}>
                Lots of amazing things filled with happiness and joy is
                happening around you each day. Listed below are few such amazing
                moments that have been announced in µLearn.
              </p>
            </div>
            <div className={styles.fv_images}>
              <img
                src="assets/announcements/fvimg.gif"
                alt=""
                className={styles.fv_img}
              />
            </div>
          </div>
        </div>

        <section className="container max-w-7xl mx-auto">
          <CategorySwitch
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Grid data={announcementsData} selectedCategory={selectedCategory} />
        </section>
      </div>
      <Footer />
    </>
  );
};

export default MuAnnouncements;
