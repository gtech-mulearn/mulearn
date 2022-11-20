import React, { useEffect, useState } from "react";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import "./News.css";

import NewsData from "./data/News";

import fvimg from "./assets/fvimg.png";
import Modal from "../../Components/Modal/Modal";

const News = () => {
  const [allimages, setAllImage] = useState();
  const [program, setProgram] = useState(NewsData[0]);
  const [clickedImg, setClickedImg] = useState(null);

  const handleClick = (img) => {
    setClickedImg(img);
    document.body.style.overflow = "hidden";
  };

  useEffect(() => {
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }

    let allPics = [];

    NewsData.forEach((item) => {
      item.pics.forEach((pic) => {
        allPics.push(pic);
      });
    });

    setAllImage(shuffleArray(allPics));
  }, [program]);

  return (
    <>
      <Navbar />
      <div className="main_container">
        <div className="first_view_container">
          <div className="first_view">
            <div className="fv_texts">
              <p className="fv_heading">
                Welcome to <span>µLearn </span> News Gallery
              </p>
            </div>
            <div className="fv_images">
              <img src={fvimg} alt="" className="fv_img" />
            </div>
          </div>
        </div>

        {/* Gallery Header */}
        <div className="second_view_container">
          <div className="second_view">
            <div className="sv_texts">
              <p className="sv_heading">
                <span>µLearn</span> News Gallery
              </p>
              <p className="sv_tagline">
                Beautiful memories often need to be documented, so that you
                could revisit them. These are some of the pictures from our
                events.
              </p>
            </div>

            <div className="tabs_container">
              {NewsData.map((event) => (
                <p
                  className="tab"
                  style={{
                    color:
                      program.Event_Name === event.Event_Name
                        ? "#f78c40"
                        : "#696969",
                  }}
                  onClick={() => {
                    setProgram(event);
                  }}
                >
                  {event.Event_Name}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* Gallery Body */}
        {program && (
          <section id="gallery">
            <div className="gallery_grid">
              {(program.Event_Name === "All News" && allimages
                ? allimages
                : program.pics
              )
                .slice(0, 20)
                .map((pic) => (
                  <div className="gallery_item">
                    <img
                      className="gallery_img"
                      src={pic}
                      alt=""
                      loading="lazy"
                      width="100%"
                      height="100%"
                      onClick={() => {
                        handleClick(pic);
                      }}
                    />
                    <img
                      className="zoom_icon"
                      src={require("../../UI icons/zoom.svg").default}
                      alt=""
                      onClick={() => {
                        handleClick(pic);
                      }}
                    />
                  </div>
                ))}
            </div>
          </section>
        )}
      </div>
      {clickedImg && (
        <Modal clickedImg={clickedImg} setClickedImg={setClickedImg} />
      )}
      <Footer />
    </>
  );
};

export default News;
