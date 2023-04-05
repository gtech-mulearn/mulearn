import React, { useState } from "react";

import Navbar from "../../../Components/Navbar/Navbar";
import Footer from "../../../Components/Footer/Footer";



import Grid from "../../../Components/Grid/Grid";
import CategorySwitch from "../../../Components/Grid/CategorySwitch";
import axios from "axios";

const MuAnnouncements = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [announcementData,setannouncementData] = useState([])
  axios.get("https://opensheet.elk.sh/1r5Pav8TlUEao_9GuMcFasKUEPSDIJOPB9PXKbt4KlTQ/muannouncement").then(
    (response)=>{
      setannouncementData(response.data)
    }
  )
  const categories = [
    "All",
    "Event / Programs",
    "Achievement",
    "ISR",
    "Mentor Connect",
    "Hiring",
    "Salt Mango Tree",
    "Task announcement",
    "Open Mic",
    "Lets Chill",
    "General announcements",
  ];
  return (
    <>
      <Navbar />
      <section className="container mb-4 max-w-7xl mx-auto p-8 flex flex-col md:flex-row justify-between items-center ">
        <div className="max-w-lg md:max-w-2xl text-center md:text-left">
          <p
            className="font-noto-sans text-4xl font-semibold leading-snug lg:text-6xl lg:leading-snug"
            style={{ color: "#303030" }}
          >
            Welcome to <span className="text-muorange">µLearn</span>{" "}
            Announcements
          </p>
          <p className="mt-2 font-poppins md:mt-4 md:text-lg">
            Lots of amazing things filled with happiness and joy is happening
            around you each day. Listed below are few such amazing moments that
            have been announced in µLearn.
          </p>
        </div>
          <img
            src="assets/announcements/fvimg.gif"
            alt=""
            className="mt-8 md:mt-0 w-72 md:w-96"
          />
      </section>

      <section className="container max-w-7xl mx-auto">
        <CategorySwitch
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <Grid data={announcementData} selectedCategory={selectedCategory} />
      </section>
      <Footer />
    </>
  );
};

export default MuAnnouncements;
