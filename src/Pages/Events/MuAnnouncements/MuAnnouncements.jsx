import React, { useState } from "react";
import styles from "./MuAnnouncements.module.css";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";

import college100k from "./data/college100k";
import college200k from "./data/college200k";
import bootcamps from "./data/bootcamps";
import hackathons from "./data/hackathons";

import announcementsData from "./data/Announcements.json";
import { fontFamily } from "@mui/system";

const GridItem = ({ item }) => {
  const description = item["Event Discription"];
  let shortDescription = "";
  let posterLink = item["Link for event poster"];
  if (posterLink.includes("\n")) {
    posterLink = posterLink.split("\n")[0];
  }
  if (!posterLink) {
    shortDescription =
      description.length > 500
        ? description.substring(0, 300) + "..."
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
          {item["Event Name"]}
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
    <div className="grid grid-cols-4 gap-8 p-4">
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
    "ISR",
    "Mentor Connect",
    "Hiring",
    "Salt Mango Tree",
    "Task announcement",
    "Open mike",
    "Lets Chill",
    "General announcements",
    "Achivement",
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

        <div className={styles.second_view_container}>
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>200K Karma</span> Points
              </p>
              <p className={styles.sv_tagline}>
                These are the list of Mulearn Campuses which have achieved a
                total of 200K Karma Points for their contributions and
                achievements.
              </p>
            </div>
            <div className={styles.sv_cards_container}>
              {college200k.map((college) => (
                <div className={styles.sv_cards}>
                  <div className={styles.card}>
                    <img
                      src={college.image}
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>100K Karma</span> Points
              </p>
              <p className={styles.sv_tagline}>
                Students are individually awarded Karma Points for their
                achievements. When a group of several student join hands
                together big achievements are made.
              </p>
            </div>
            <div className={styles.sv_cards_container}>
              {college100k.map((college) => (
                <div className={styles.sv_cards}>
                  <div className={styles.card}>
                    <img
                      src={college.image}
                      alt=""
                      className={styles.card_img}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Bootcamp ---------- */}
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>Bootcamps</span>
              </p>
              <p className={styles.sv_tagline}>{/* tagline */}</p>
            </div>
            <div className={styles.sv_cards_container}>
              {bootcamps.map((bootcamp) => (
                <div className={styles.sv_cards}>
                  <div className={styles.card}>
                    <img
                      src={bootcamp.image}
                      alt=""
                      className={styles.card_img}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "assets/common/img-error-replace.webp";
                      }}
                    />
                    <p className={styles.card_title}>{bootcamp.title}</p>
                    <p className={styles.card_description}>
                      {bootcamp.description.substring(0, 250)}{" "}
                      {bootcamp.description.length >= 20 && "..."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ---------- Bootcamp ---------- */}
          <div className={styles.second_view}>
            <div className={styles.sv_texts}>
              <p className={styles.sv_heading}>
                <span>Hackathons</span>
              </p>
              <p className={styles.sv_tagline}>{/* tagline */}</p>
            </div>
            <div className={styles.sv_cards_container}>
              {hackathons.map((hackathon) => (
                <div className={styles.sv_cards}>
                  <div className={styles.card}>
                    <img
                      src={hackathon.image}
                      alt=""
                      className={styles.card_img}
                      onError={({ currentTarget }) => {
                        currentTarget.onerror = null;
                        currentTarget.src =
                          "assets/common/img-error-replace.webp";
                      }}
                    />
                    <p className={styles.card_title}>{hackathon.title}</p>
                    <p className={styles.card_description}>
                      {hackathon.description.substring(0, 250)}{" "}
                      {hackathon.description.length >= 20 && "..."}
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

export default MuAnnouncements;
