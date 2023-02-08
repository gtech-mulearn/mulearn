import React, { useState } from "react";
import styles from "./MuAnnouncements.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";

import announcementsData from "./data/Announcements.json";

const GridItem = ({ item }) => {
  const description = item["desc"];
  let shortDescription = "";
  let posterLink = item["poster"];
  if (posterLink.includes("\n")) {
    posterLink = posterLink.split("\n")[0];
  }
  if (!posterLink) {
    shortDescription =
      description.length > 350
        ? description.substring(0, 350) + "..."
        : description;
  } else {
    shortDescription =
      description.length > 100
        ? description.substring(0, 100) + "..."
        : description;
  }

  return (
    <div className="bg-white font-poppins rounded-lg shadow-lg border text-normal overflow-hidden">
      <img src={posterLink} className="w-full max-h-60 object-cover" alt="" />
      <div className="p-4 ">
        <p className="py-1 text-xl font-medium" style={{ color: "#f78c40" }}>
          {item["title"]}
        </p>
        <p className="py-1">{shortDescription}</p>
        <p className="py-1 text-slate-600">{item.Date}</p>
        {/* <p>Event Type: {item["Event Type"]}</p> */}
      </div>
    </div>
  );
};

const Grid = ({ data, selectedCategory }) => {
  const filteredData = data.filter((item) => {
    if (selectedCategory === "All") {
      return true;
    }

    return item.Category === selectedCategory;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-8 p-4">
      {filteredData.map((item) => (
        <GridItem key={item["Sl .No"]} item={item} />
      ))}
    </div>
  );
};

const CategorySwitch = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}) => (
  <div className="flex justify-center gap-3 mb-4 flex-wrap p-4">
    {categories.map((category) => (
      <button
        key={category}
        className={`font-poppins box-border border border-gray-300 font-normal px-3 py-1  text-sm font-medium leading-5  rounded-md ${
          category === selectedCategory
            ? "bg-gray-900 text-white"
            : "bg-transparent text-gray-700"
        }`}
        onClick={() => setSelectedCategory(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

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
