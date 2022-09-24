import React from "react";
import { Card } from "./Card";
import Marquee from "react-fast-marquee";
import Style from "./testimonial.module.css";

export const Testimonail = () => {
  return (
  <>
    <h1 className={Style.head}>Testimonials</h1>
    <div className={`${Style.box} center`}>
      <Marquee speed={30} pauseOnHover={true} pauseOnClick={true} gradient={false}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Marquee>
    </div>
  </>
  );
};
