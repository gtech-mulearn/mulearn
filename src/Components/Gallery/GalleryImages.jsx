import React, { useState } from "react";
import events from "../../Pages/Gallery/data/EventPics.json";
import styles from "../../Pages/Gallery/Gallery.module.css";

const GalleryImages = () => {
  const [program, setProgram] = useState(events[0]);
  const [currentIndex, setIndex] = useState(0);
  const [imageView, setImageView] = useState(false);
  return (
    <>
      <div className={styles.tabs_container}>
        {/* tags */}
        {events.map((event) => (
          <p
            className={styles.tab}
            style={{
              color:
                program.Event_Name === event.Event_Name ? "#f78c40" : "#696969",
            }}
            onClick={() => {
              setProgram(event);
            }}
          >
            {event.Event_Name}
          </p>
        ))}
      </div>
      <div className={styles.spacing}></div>
      {
        <div className={`flex flex-wrap gap-5 justify-center min-w-screen`}>
          {program.pics.map((pic, index) => (
            <>
              <div
                className=" group bg-black flex items-center justify-center lg:w-1/5 md:w-1/4 sm rounded-lg"
                onClick={() => {
                  setIndex(index);
                  setImageView(true);
                }}
              >
                <div
                  className="absolute z-50  group-hover:flex hidden
                                 text-white/70 text-5xl "
                >
                  <ion-icon name="eye-outline"></ion-icon>
                </div>
                <img
                  src={pic}
                  alt="Unavailable Try Later"
                  className="text-white group-hover:opacity-20  overflow-hidden 
                                  block object-cover object-center w-full  h-full rounded-lg"
                />
              </div>
            </>
          ))}
        </div>
      }

      {/* The Image view */}

      <div
        className={`fixed w-screen h-screen top-0 left-0 right-0 bottom-0 z-[100] bg-black/50  text-white lg:text-3xl ${
          imageView ? "lg:block md:block " : "hidden"
        } select-none`}
      >
        <div className="flex justify-between items-center h-screen">
          {/* Backward switch */}

          <div
            className={`bg-white/10 h-full pr-5 justify-center flex items-center text-white/50 hover:text-orange-400 ${
              currentIndex > 0 ? "" : "opacity-0"
            }`}
            onClick={() => {
              if (currentIndex > 0) {
                setIndex(currentIndex - 1);
              }
            }}
          >
            <ion-icon name="caret-back-outline"></ion-icon>
          </div>

          {/* The Selected Image */}

          <div className="flex">
            <img
              src={program.pics[currentIndex]}
              alt="Unavailable Try Later"
              width={"100%"}
              height={"100%"}
            />
          </div>

          {/*Forward switch */}

          <div
            className={`bg-white/10 h-full lg:pr-10 md:pr-10 pr-5 justify-center flex items-center text-white/50 hover:text-orange-400 cursor-pointer ${
              currentIndex + 1 < program.pics.length ? "" : "opacity-0"
            }`}
            onClick={() => {
              if (currentIndex + 1 < program.pics.length) {
                setIndex(currentIndex + 1);
              }
            }}
          >
            <ion-icon name="caret-forward-outline"></ion-icon>
          </div>

          {/* Close Switch */}

          <div
            className="flex fixed top-0 right-0 justify-end text-5xl hover:text-orange-400"
            onClick={() => setImageView(false)}
          >
            <ion-icon name="close-circle-outline"></ion-icon>
          </div>
        </div>
      </div>
    </>
  );
};

export default GalleryImages;
