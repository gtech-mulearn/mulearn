import React from "react";
import Lottie from "lottie-react";
import Loader from "./Loader.json";
import "./Preloader.css";



function Preloader() {
  return (
    <div className="preloader-wrapper">
      <div className="preloader-logo">
        <img src="/assets/Preloader/Logo2.png" alt="" />
      </div>
      <div className="preloader">
        <Lottie animationData={Loader} />
      </div>
    </div>
  );
}

export default Preloader;
