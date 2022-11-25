import React, { useState } from "react";

import "./gallery.css";

const GalleryImages = ({ events }) => {

  const [program, setProgram] = useState(events[0]);
  const [currentIndex, setIndex] = useState(0);
  const [imageView, setImageView] = useState(false);

  function galleryViewOn(index) {
    setIndex(index);
    setImageView(true);
    document.body.style.overflow = "hidden";
  }

  function closeButton() {
    setImageView(false);
    document.body.style.overflow = "unset";
  }

  function goBackward(index) {
    if (index > 0)
      setIndex(index - 1);
  }

  function goForward(index) {
    if (index + 1 < program.pics.length)
      setIndex(index + 1);
  }

  return (
    <>
      <div className="tabs_container">
        {/*Gallery tags */}
        {events.map((event) => (
          <p className="tab" style={{ color: program.Event_Name === event.Event_Name ? "#f78c40" : "#696969", }}
            onClick={() => { setProgram(event); }}
          >{event.Event_Name}</p>
        ))}
      </div>
      <div className=" mt-8"></div>
      {/* Gallery */}
      <div className={` flex flex-wrap gap-5 justify-center min-w-screen gallery-item`}>
        {program.pics.map((pic, index) => (
          <>
            <div className=" group galleryImages lg:w-1/5 md:w-1/3" onClick={() => galleryViewOn(index)}>
              <div className="gallery-setter  group-hover:flex hidden">
                <ion-icon name="expand"></ion-icon>
                <span className="text-sm text-white/10">Expand</span>
              </div>
              <img src={pic} alt="Unavailable Try Later" className=" group-hover:opacity-20" />
            </div>
          </>
        ))}
      </div>


      {/* The Image view */}
      <div className={`${imageView ? "" : "hidden"} select-none`}>
        <div className='overlay'>
          <span className={`direction ${currentIndex > 0 ? "" : "opacity-0"}`} onClick={() => goBackward(currentIndex)}>
            <ion-icon name="caret-back-outline" />
          </span>
          <img src={program.pics[currentIndex]} loading="urgent" alt="ImageUnavaialble Try again later" />
          <span className={`direction ${currentIndex + 1 < program.pics.length ? "" : "opacity-0"}`} onClick={() => goForward(currentIndex)}>
            <ion-icon name="caret-forward-outline" />
          </span>
          {/* CLOSE */}
          <span className='dismiss direction' onClick={() => closeButton()}>
            <ion-icon name="close-circle-outline"></ion-icon>
          </span>
        </div>
      </div>
    </>
  );
};

export default GalleryImages;
